import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { register } from "@/lib/auth/api";
import { registerFormSchema } from "@/lib/auth/schemas";

export function useRegister() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const action = async (values: z.infer<typeof registerFormSchema>) => {
    startTransition(async () => {
      const { success, error } = await register(values);
      if (success) {
        router.push("/");
      } else {
        toast.error(error);
      }
    });
  };

  return { register: action, isPending };
}
