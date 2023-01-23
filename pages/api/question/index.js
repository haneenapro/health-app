import { prisma } from "../../../src/db/prisma"

export default async function handler(req, res) {
  if (req.method === "GET") {
    const questions = await prisma.question.findMany({})

    return res.send(questions)
  }

  if (req.method === "POST") {
    const quest = await prisma.question.create({
      data: {
        title: req.body.title,
        question: req.body.question,
      },
    })

    return res.status(201).send("Question Added Successfully")
  }

  return res.status(400).send("Not allowed")
}
