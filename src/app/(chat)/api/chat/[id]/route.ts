import { deleteChat } from "@/db/queries";
import { getCurrentSession } from "@/lib/auth/sessions";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  // TODO: Implement rate limiting

  const { user } = await getCurrentSession();
  if (!user) return new Response(null, { status: 401 });

  const { id } = await params;

  const chat = await deleteChat({ id, userId: user.id });
  if (!chat) return new Response(null, { status: 404 });

  return new Response(null, { status: 200 });
}
