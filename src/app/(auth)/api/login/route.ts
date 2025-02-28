import { getUser } from "@/db/queries";
import { verifyPassword } from "@/lib/auth/passwords";
import { loginFormSchema } from "@/lib/auth/schemas";
import {
  createSession,
  generateSessionToken,
  getCurrentSession,
  invalidateExpiredSessions,
  setSessionTokenCookie,
} from "@/lib/auth/sessions";
import { redis } from "@/lib/redis";
import { Ratelimit } from "@upstash/ratelimit";

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "10 m"),
});

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  const { success: allow } = await ratelimit.limit(ip);
  if (!allow) return new Response(null, { status: 429 });

  const { session: currentSession } = await getCurrentSession();
  if (currentSession) return new Response(null, { status: 403 });

  const body = await request.json();
  const { success, data } = loginFormSchema.safeParse(body);
  if (!success) return new Response(null, { status: 400 });

  const { email, password } = data;
  const user = await getUser({ email });

  // Avoid returning at early here to prevent malicious actors from easily
  // discovering genuine usernames via error message or response time.

  const isCorrectPassword = user
    ? await verifyPassword(user.passwordHash, password)
    : false;

  if (!user || !isCorrectPassword) {
    // TODO: Implement throttling on failed login attempts
    return new Response(null, { status: 401 });
  }

  const sessionToken = generateSessionToken();
  const session = await createSession(sessionToken, user.id);
  await setSessionTokenCookie(sessionToken, session.expiresAt);

  invalidateExpiredSessions();

  return new Response(null, { status: 200 });
}
