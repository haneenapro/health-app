import { title } from "process"
import { prisma } from "../../../src/db/prisma"

export default async function handler(req, res) {
  const id = req.query.id

  if (req.method === "GET") {
    const information = await prisma.information.findFirst({
      where: { id: id },
      select: {
        id: true,
        name: true,
        title: true,
        desc: true,
        fullInfo: true,
      },
    })

    return res.send(information)
  }

  // Delete
  if (req.method === "DELETE") {
    const information = await prisma.information.delete({
      where: { id: id },
    })

    return res.send({ message: "Delete success" })
  }

  // Update
  if (req.method === "PUT") {
    const { title, name, desc, fullInfo } = req.body
    const updatedInformation = await prisma.information.update({
      where: { id: id },
      data: {
        title: title,
        name: name,
        desc: desc,
        fullInfo: fullInfo,
      },
    })

    return res.send({ message: "Update success", updatedInformation })
  }

  return res.status(400).send("Not allowed")
}
