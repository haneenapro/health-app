import { prisma } from "../../src/db/prisma"

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body
    // use library to encrypt password

    //sends to database
    const user = await prisma.user.findFirst({
      where: { email: req.body.email },
    })

    if (!user) return res.status(404).send("User not found")

    const passwordMatch = user.password === password
    if (!passwordMatch)
      return res.status(403).send("Password incorrect or user not found")

    return res.send("Login successful")
  }

  return res.status(400).send("Not allowed")
}
