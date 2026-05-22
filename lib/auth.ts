import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const {
  handlers,
  signIn,
  signOut,
  auth,
} = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },

      async authorize(credentials) {
        if (!credentials) {
          return null
        }

        if (
          credentials.username === "rpadmin" &&
          credentials.password === "adm1npass"
        ) {
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

  secret: process.env.NEXTAUTH_SECRET,
})