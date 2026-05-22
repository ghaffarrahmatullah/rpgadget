"use client"

import { signOut } from "next-auth/react"

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({
        callbackUrl: "/login",
      })}
      className="bg-red-500 px-5 py-2 rounded-xl text-white font-semibold"
    >
      Logout
    </button>
  )
}