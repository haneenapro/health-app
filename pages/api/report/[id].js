import { prisma } from "../../../src/db/prisma"

export default async function handler(req, res) {
  const id = req.query.id

  if (req.method === "GET") {
    const report = await prisma.report.findFirst({
      where: { id: id },
      select: {
        id: true,
        desc: true,
        title: true,
      },
    })

    return res.send(report)
  }

  // if (req.method === "DELETE") {
  //   const question = await prisma.question.delete({
  //     where: { id: id },
  //   })

  //   return res.send({ message: "Deleted question successfully" })
  // }

  return res.status(400).send("Not allowed")
}
