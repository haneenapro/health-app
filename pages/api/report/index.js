import { prisma } from "../../../src/db/prisma"

export default async function handler(req, res) {
  if (req.method === "GET") {
    const reports = await prisma.report.findMany()
    console.log(reports)
    return res.send(reports)
  }

  if (req.method === "POST") {
    const report = await prisma.report.create({
      data: {
        title: req.body.title,
        desc: req.body.desc,
      },
    })

    return res.status(201).send("Report Added Successfully")
  }

  return res.status(400).send("Not allowed")
}
