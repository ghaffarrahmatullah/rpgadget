"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"

export default function LoginPage() {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)

    const res = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    })

    setLoading(false)

    if (res?.error) {
      setError("Username atau password salah")
      return
    }

    window.location.href = "/admin/products"
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">

      {/* Glow background */}
      <div className="absolute inset-0">
        <div className="absolute w-[500px] h-[500px] bg-purple-600 blur-[150px] opacity-30 top-[-100px] left-[-100px]" />
        <div className="absolute w-[500px] h-[500px] bg-blue-600 blur-[150px] opacity-30 bottom-[-100px] right-[-100px]" />
      </div>

      {/* Card */}
      <div className="relative w-full max-w-md p-8 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl">

        {/* Title */}
        <h1 className="text-3xl font-bold text-white text-center mb-2">
          Welcome Back
        </h1>
        <p className="text-zinc-400 text-center mb-8">
          Sign in to access admin dashboard
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Username */}
          <div>
            <label className="text-sm text-zinc-400">Username</label>
            <input
              name="username"
              placeholder="Enter username"
              className="w-full mt-1 px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white outline-none focus:border-purple-500 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-zinc-400">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter password"
              className="w-full mt-1 px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white outline-none focus:border-purple-500 transition"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:scale-[1.02] active:scale-[0.98] transition"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-xs text-zinc-500 mt-6">
          Secure Admin Access • RpGadget
        </p>
      </div>
    </div>
  )
}