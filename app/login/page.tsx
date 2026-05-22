"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"

export default function LoginPage() {
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const res = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    })

    if (res?.error) {
      setError("Username atau password salah")
      return
    }

    window.location.href = "/admin/products"
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        name="username"
        placeholder="username"
        className="border p-2"
      />

      <input
        name="password"
        type="password"
        placeholder="password"
        className="border p-2"
      />

      <button type="submit" className="bg-black text-white px-4 py-2">
        Login
      </button>

      {error && <p className="text-red-500">{error}</p>}
    </form>
  )
}