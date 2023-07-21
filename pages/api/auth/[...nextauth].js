import NextAuth from "next-auth"

import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "../../../src/db/prisma"
import bcrypt from "bcrypt"

import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"

// describe("AuthOptions", () => {
export const authOptions = {
  session: { strategy: "jwt" },
  adaptor: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { name, email, password, role } = credentials
        // REGISTERRR
        const user = await prisma.user.findFirst({ where: { email }})
        if (credentials.register === "true") {
          if (!name | !email | !password | !role) throw new Error("Fill Out All The Forms")
          const pw = await bcrypt.hash(password, 10)
          if (user) throw new Error("User already exists. Please Login")
          const newUser = await prisma.user.create({
            data: { name, email, role, password: pw },
          })
          if (newUser.role === "doctor") {
            await prisma.doctor.create({
              data: {
                name: newUser.name,
                email: newUser.email,
                User: {
                  connect: {
                    id: newUser.id
                  }
                }
              }
            })
          }
          //Sign In
          return {
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            id: newUser.id,
          }
        }
        // SIGN INN

        
        if (!email | !password | !role) throw new Error("Fill Out All The Forms")
        if (!user) throw new Error("No such user ... ")
        
        if (user.role !== role) throw new Error("Wrong login attemp!!")

        console.log(user,);
        // if(user.role === "doctor" && user.doctor[0].isVerified === "false") {
        //   throw new Error("Doctor is not verified yet!!!!")
        //   return
        // }
        
        const passwordMatch = await bcrypt.compare(password, user.password)

        if (!passwordMatch)
          throw new Error("Password incorrect or user not found")

        console.log("User sign in success", user)
        return {
          name: user.name,
          email: user.email,
          role: user.role,
          id: user.id,
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET_KEY,
    }),

  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const { email } = user
        const findUser = await prisma.user.findFirst({ where: { email } })
        if (findUser) {
          token = { ...user, role: findUser.role, id: findUser.id }
        } else {
          token = { ...user }
        }
      }
      return token
    },
    async session({ session, token }) {
      return Promise.resolve({ ...session, user: token })
    },
    async signIn({ token, user, ...rest }) {
      if (rest?.account?.provider && rest?.account?.provider === "google") {
        const { email, name } = user
        const findUser = await prisma.user.findFirst({ where: { email } })
        const _role = "patient"
        const pw = await bcrypt.hash("test123", 10)
        if (!findUser) {
          const _newUSer = await prisma.user.create({
            data: { name, email, role: _role, password: pw },
          })
          return { token, user: _newUSer, redirect: "/Patient" }
        } else {
          return { token, user: findUser, redirect: "/Patient" }
        }
      } else {
        if (user) {
          const { role } = user
          if (role === "patient") {
            return { token, user, redirect: "/Patient" }
          } else if (role === "doctor") {
            return { token, user, redirect: "/Doctor" }
          } else if (role === "admin") {
            return { token, user, redirect: "/Admin" }
          } else {
            return
          }
        }
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  // debug: true
}

// Test codes

// it("should have session strategy set to jwt", () => {
//   expect(authOptions.session.strategy).toBe("jwt")
// })

// it("should have correct pages", () => {
//   expect(authOptions.pages.signIn).toBe("/login")
//   expect(authOptions.pages.error).toBe("/login")
// })

// it("should have a session callback", () => {
//   expect(typeof authOptions.callbacks.session).toBe("function")
// })

// it("should have a jwt callback", () => {
//   expect(typeof authOptions.callbacks.jwt).toBe("function")
// })

// it("should have a signIn callback", () => {
//   expect(typeof authOptions.callbacks.signIn).toBe("function")
// })
// })
export default NextAuth(authOptions)
