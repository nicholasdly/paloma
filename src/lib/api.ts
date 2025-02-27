import { z } from "zod";
import { loginFormSchema, registerFormSchema } from "./auth/schemas";
import { tc } from "./utils";

export async function register(values: z.infer<typeof registerFormSchema>) {
  const [response] = await tc(
    fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    }),
  );

  if (response?.ok) {
    return {
      success: true as const,
      error: null,
    };
  }

  if (response?.status === 409) {
    return {
      success: false as const,
      error: "An account already exists with that email.",
    };
  }

  return {
    success: false as const,
    error: "Something went wrong! Try again later.",
  };
}

export async function login(values: z.infer<typeof loginFormSchema>) {
  const [response] = await tc(
    fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    }),
  );

  if (response?.ok) {
    return {
      success: true as const,
      error: null,
    };
  }

  if (response?.status === 401) {
    return {
      success: false as const,
      error: "Incorrect email or password.",
    };
  }

  return {
    success: false as const,
    error: "Something went wrong! Try again later.",
  };
}

export async function logout() {
  const [response] = await tc(
    fetch("/api/logout", {
      method: "DELETE",
    }),
  );

  if (response?.ok) {
    return {
      success: true as const,
      error: null,
    };
  }

  return {
    success: false as const,
    error: "Something went wrong! Try again later.",
  };
}

export async function deleteChat(id: string) {
  const [response] = await tc(
    fetch(`/api/chat/${id}`, {
      method: "DELETE",
    }),
  );

  if (response?.ok) {
    return {
      success: true as const,
      error: null,
    };
  }

  return {
    success: false as const,
    error: "Something went wrong! Try again later.",
  };
}
