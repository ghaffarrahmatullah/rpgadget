import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const {
  handlers,
  signIn,
  signOut,
  auth,
} = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
  },

  trustHost: true,

  providers: [
    Credentials({
      name: "Credentials",

      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const username = credentials?.username
        const password = credentials?.password

        if (!username || !password) return null

        if (username === "rpadmin" && password === "adm1npass") {
          return {
            id: "1",
            name: "Admin",
          }
        }

        return null
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
})