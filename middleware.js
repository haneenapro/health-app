import { withAuth } from "next-auth/middleware"
import { NextRequest, NextResponse } from "next/server"

// export function middleware(req) {
//   const sessionCookie = req.cookies.get("session")
//   req.cookies.set("new_cookie", "my_new_cookie")

//   if (req.nextUrl.pathname.startsWith("/admin")) {
//     if (!sessionCookie) {
//       //return next response
//       return NextResponse.redirect("/dashboard")
//     }
//   }
// }

export default withAuth(
  function middleware(req) {
    //return NextResponse

    // console.log(req.nextauth, req.nextUrl, req.url)

    return NextResponse.rewrite(new URL(req.url))
  },
  {
    callbacks: {
      authorized({ req, token }) {
        console.log(req.url, token)

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
