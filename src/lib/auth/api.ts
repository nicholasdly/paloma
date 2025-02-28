import { z } from "zod";
import { tc } from "../utils";
import { loginFormSchema, registerFormSchema } from "./schemas";

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

  if (response?.status === 429) {
    return {
      success: false as const,
      error: "Too many requests! Try again later.",
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

  if (response?.status === 429) {
    return {
      success: false as const,
      error: "Too many requests! Try again later.",
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

  if (response?.status === 429) {
    return {
      success: false as const,
      error: "Too many requests! Try again later.",
    };
  }

  return {
    success: false as const,
    error: "Something went wrong! Try again later.",
  };
}
