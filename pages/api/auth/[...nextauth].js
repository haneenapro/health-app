import NextAuth from "next-auth"

import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "../../../src/db/prisma"
import { PrismaAdapter } from "@next-auth/prisma-adapter"

const authOptions = {
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(prisma),

  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials

        const user = await prisma.user.findFirst({ where: { email } })

        if (!user) throw new Error("No such user ... ")

        const passwordMatch = user.password === password

        if (!passwordMatch)
          throw new Error("Password incorrect or user not found")

        console.log("User sign in success", user)
        return { name: user.name, email: user.email, role: user.role }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
    //   error: '/auth/error', // Error code passed in query string as ?error=
    //  signOut: '/auth/signout',
    //   verifyRequest: '/auth/verify-request', // (used for check email message)
    //   newUser: '/auth/new-user' //
  },
  callbacks: {
    // async redirect({ url, baseUrl }) {
    //   return baseUrl
    // },
    async session({ session, token, user }) {
      return Promise.resolve({ ...session, user: token })
    },
    jwt({ token, user }) {
      if (user) {
        token = { ...user }
      }
      console.log("token", token)
      return token
    },
    signIn({ token, user, ...rest }) {
      const { role } = user
      console.log(role, rest)

      if (role === "patient") {
        return { token, user, redirect: "/Patient" }
      }
      if (role === "doctor") {
        return { token, user, redirect: "/Doctor" }
      }
      return
    },
  },
}

export default NextAuth(authOptions)
