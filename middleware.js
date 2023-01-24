import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    //   //return NextResponse
    console.warn("In midle ware")

    console.log(req.nextauth, req.nextUrl, req.url)
    //
    return NextResponse.rewrite(new URL(req.url))
  },
  {
    callbacks: {
      authorize({ req, token }) {
        console.log("Authotize -- with Auth", req.url, token)

        if (!token) return false

        if (req.nextUrl.pathname === "/Doctor") return token.role === "doctor"

        if (req.nextUrl.pathname === "/Patients")
          return token.role === "patient"

        console.log(role)
        return false
      },
    },
  }
)

export const config = { matcher: ["/Patients", "/Doctor"] }
