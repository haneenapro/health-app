import NextAuth from "next-auth"

import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "../../../src/db/prisma"

const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials

        const user = await prisma.user.findFirst({
          where: { email },
        })

        if (!user) throw new Error("No such user ... ")

        const passwordMatch = user.password === password
        if (!passwordMatch)
          throw new Error("Password incorrect or user not found")
        console.log("Log in success", user)

        return { name: user.name, email: user.email, role: user.role }
      },
    }),
  ],
  pages: { signIn: "/login" },
  callbacks: {
    signIn({ user }) {
      const { role } = user
      console.log(role)
      if (role === "patient") {
        console.log(role, " patient")
        return "/Patients"
      }
      if (role === "doctor") {
        console.log(role, " doctorrr")
        return "/Doctor"
      }
      return "/testingg"
    },
  },
}

export default NextAuth(authOptions)
