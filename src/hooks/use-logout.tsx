import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { logout } from "@/lib/auth/api";

export function useLogout() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const action = () => {
    startTransition(async () => {
      const { success, error } = await logout();
      if (success) {
        router.refresh();
      } else {
        toast.error(error);
      }
    });
  };

  return { logout: action, isPending };
}
