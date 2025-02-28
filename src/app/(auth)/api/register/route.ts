import { createUser, getUser } from "@/db/queries";
import { hashPassword } from "@/lib/auth/passwords";
import { registerFormSchema } from "@/lib/auth/schemas";
import {
  createSession,
  generateSessionToken,
  getCurrentSession,
  setSessionTokenCookie,
} from "@/lib/auth/sessions";
import { redis } from "@/lib/redis";
import { Ratelimit } from "@upstash/ratelimit";

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "1 d"),
});

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  const { success: allow } = await ratelimit.limit(ip);
  if (!allow) return new Response(null, { status: 429 });

  const { session: currentSession } = await getCurrentSession();
  if (currentSession) return new Response(null, { status: 403 });

  const body = await request.json();
  const { success, data } = registerFormSchema.safeParse(body);
  if (!success) return new Response(null, { status: 400 });

  const { email, password } = data;
  const existingUser = await getUser({ email });

  if (existingUser?.email === email) return new Response(null, { status: 409 });

  const passwordHash = await hashPassword(password);
  const user = await createUser({ email, passwordHash });

  // TODO: Implement 2FA

  const sessionToken = generateSessionToken();
  const session = await createSession(sessionToken, user.id);
  await setSessionTokenCookie(sessionToken, session.expiresAt);

  return new Response(null, { status: 200 });
}
