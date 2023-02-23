import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "../../../src/db/prisma"
import { PrismaAdapter } from "@next-auth/prisma-adapter"

describe("AuthOptions", () => {
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
    },
    callbacks: {
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

  it("should have session strategy set to jwt", () => {
    expect(authOptions.session.strategy).toBe("jwt")
  })

  it("should have correct pages", () => {
    expect(authOptions.pages.signIn).toBe("/login")
    expect(authOptions.pages.error).toBe("/login")
  })

  it("should have a session callback", () => {
    expect(typeof authOptions.callbacks.session).toBe("function")
  })

  it("should have a jwt callback", () => {
    expect(typeof authOptions.callbacks.jwt).toBe("function")
  })

  it("should have a signIn callback", () => {
    expect(typeof authOptions.callbacks.signIn).toBe("function")
  })
})

export default NextAuth(authOptions)
