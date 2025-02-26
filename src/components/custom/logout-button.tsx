"use client";

import { useLogout } from "@/hooks/use-logout";

export default function LogoutButton() {
  const { logout, isPending } = useLogout();

  return (
    <button
      type="button"
      className="w-full text-start"
      onClick={logout}
      disabled={isPending}
    >
      Log out
    </button>
  );
}
