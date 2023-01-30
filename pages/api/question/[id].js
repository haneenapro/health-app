import { prisma } from "../../../src/db/prisma"

export default async function handler(req, res) {
  const id = req.query.id

  if (req.method === "GET") {
    const question = await prisma.question.findFirst({
      where: { id: id },
      select: {
        id: true,
        answers: true,
        question: true,
        title: true,
      },
    })

    return res.send(question)
  }

  if (req.method === "DELETE") {
    const question = await prisma.question.delete({
      where: { id: id },
    })

    return res.send({ message: "Deleted question successfully" })
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
