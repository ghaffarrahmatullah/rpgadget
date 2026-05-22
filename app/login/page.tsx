"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"

export default function LoginPage() {
  const [loading, setLoading] = useState(false)

  async function action(formData: FormData) {
    setLoading(true)

    await signIn("credentials", {
      username: String(formData.get("username") || ""),
      password: String(formData.get("password") || ""),
      redirect: true,
      callbackUrl: "/admin/products",
    })

    setLoading(false)
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <form action={action} className="space-y-4 w-[300px]">

        <input
          name="username"
          placeholder="Username"
          className="w-full p-3 bg-zinc-900 rounded"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full p-3 bg-zinc-900 rounded"
        />

        <button
          disabled={loading}
          className="w-full bg-white text-black py-3 rounded font-bold"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </form>
    </main>
  )
}