"use client";

import { signOut } from "next-auth/react";

export default function Logout() {
  return (
    <button
      className="btn"
      onClick={() => {
        signOut();
      }}
    >
      logout
    </button>
  );
}
