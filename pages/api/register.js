import { prisma } from "../../src/db/prisma"

export default async function handler(req, res) {
  if (req.method === "POST") {
    // const { name, email, password } = req.body
    // use library to encrypt password

    //sends to database
    console.log(req.body)

    const { name, email, password, role } = req.body

    if (!name | !email | !password | !role)
      return res.status(400).send("Fill out all fields")

    const user = await prisma.user.create({
      data: { name, email, password, role },
    })

    return res.status(201).send({
      message: "Registration successful",
      user: { name: user.name, role: user.role },
    })
  }

  return res.status(400).send("Not allowed")
}
