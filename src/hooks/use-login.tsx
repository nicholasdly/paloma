import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { login } from "@/lib/auth/api";
import { loginFormSchema } from "@/lib/auth/schemas";

export function useLogin() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const action = async (values: z.infer<typeof loginFormSchema>) => {
    startTransition(async () => {
      const { success, error } = await login(values);
      if (success) {
        router.refresh();
      } else {
        toast.error(error);
      }
    });
  };

  return { login: action, isPending };
}
