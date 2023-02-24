import { prisma } from "../../src/db/prisma"

export default async function handler(req, res) {
  if (req.method === "POST") {
    // const { name, email, password } = req.body
    // use library to encrypt password

    //sends to database
    console.log(req.body)

    const { title, desc, image, userId } = req.body

    if (!title | !desc) return res.status(400).send("Fill out all fields")

    const report = await prisma.report.create({
      data: { title, desc, image, userId },
    })

    return res.status(201).send({
      message: "Submitted successful",
      report: { title: report.title, desc: report.desc, image: report.image },
    })
  }

  return res.status(400).send("Not allowed")
}
