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

  //   if (req.method === "POST") {
  //     const quest = await prisma.question.create({
  //       data: {
  //         title: req.body.title,
  //         question: req.body.question,
  //       },
  //     })

  //     return res.status(201).send("Question Added Successfully")
  //   }

  return res.status(400).send("Not allowed")
}
