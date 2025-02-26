import { createUser, getUser } from "@/db/queries";
import { hashPassword } from "@/lib/auth/passwords";
import { registerFormSchema } from "@/lib/auth/schemas";
import {
  createSession,
  generateSessionToken,
  getCurrentSession,
  setSessionTokenCookie,
} from "@/lib/auth/sessions";

export async function POST(request: Request) {
  // TODO: Implement rate limiting

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
