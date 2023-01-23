import { prisma } from "../../../src/db/prisma"

export default async function handler(req, res) {
  if (req.method === "GET") {
    const informations = await prisma.information.findMany({})

    return res.send(informations)
  }

  if (req.method === "POST") {
    const quest = await prisma.information.create({
      data: {
        title: req.body.title,
        information: req.body.information,
        name: req.body.name,
        desc: req.body.desc,
        fullInfo: req.body.fullInfo,
      },
    })

    return res.status(201).send("Information Added Successfully")
  }

  return res.status(400).send("Not allowed")
}
