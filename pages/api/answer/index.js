import { prisma } from "../../../src/db/prisma"

export default async function handler(req, res) {
  if (req.method === "POST") {
    const answer = await prisma.answer.create({
      data: {
        answer: req.body.answer,
        questionId: req.body.questionId,
        userId: req.body.userId,
      },
    })

    return res.status(201).send("Answer added ")
  }

  return res.status(400).send("Not allowed")
}
