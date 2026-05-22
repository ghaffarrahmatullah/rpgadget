import { signIn } from "@/lib/auth"

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center text-white">
      <form
        action={async (formData) => {
          "use server"

          await signIn("credentials", {
            username: formData.get("username"),
            password: formData.get("password"),
            redirectTo: "/admin/products",
          })
        }}
        className="bg-zinc-900 p-10 rounded-3xl w-full max-w-md space-y-5"
      >
        <h1 className="text-4xl font-bold mb-5 text-center">
          Admin Login
        </h1>

        <input
          name="username"
          placeholder="Username"
          className="w-full p-4 rounded-xl bg-zinc-800"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full p-4 rounded-xl bg-zinc-800"
        />

        <button
          className="w-full bg-white text-black py-4 rounded-xl font-bold"
        >
          Login
        </button>
      </form>
    </main>
  )
}