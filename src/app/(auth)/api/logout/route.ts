import {
  deleteSessionTokenCookie,
  getCurrentSession,
  invalidateExpiredSessions,
  invalidateSession,
} from "@/lib/auth/sessions";
import { redis } from "@/lib/redis";
import { Ratelimit } from "@upstash/ratelimit";

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "10 m"),
});

export async function DELETE(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  const { success: allow } = await ratelimit.limit(ip);
  if (!allow) return new Response(null, { status: 429 });

  const { session } = await getCurrentSession();
  if (!session) return new Response(null, { status: 403 });

  await Promise.all([
    invalidateSession(session.id),
    deleteSessionTokenCookie(),
  ]);

  invalidateExpiredSessions();

  return new Response(null, { status: 200 });
}
