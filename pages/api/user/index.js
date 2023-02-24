import { prisma } from "../../../src/db/prisma"

export default async function handler(req, res) {
  if (req.method === "GET") {
    const informations = await prisma.User.findMany({})

    return res.send(informations)
  }

  if (req.method === "PUT") {
    const user = await prisma.user.update({
      data: {
        name: req.body.name,
        // email: req.body.email,
      },
    })
    return res.send("SUccess")
  }
}
