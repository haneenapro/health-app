import { prisma } from "../../../src/db/prisma"

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const hospitals = await prisma.hospital.findMany({})
      if (hospitals) return res.status(200).send(hospitals)
      return res.status(204).send({ message: "No data found", status: 204 })
    } catch (error) {
      return res
        .status(500)
        .send({ message: "Something went wrong", status: 500 })
    }
  }
  if (req.method === "POST") {
    try {
      const information = await prisma.department.create({
        data: {
          name: req.body.name,
        },
      })
      return res
        .status(201)
        .send({ message: "Information Added Successfully", information })
    } catch (error) {
      return res
        .status(500)
        .send({ message: "Something went wrong", status: 500 })
    }
  }

  return res.status(400).send("Not allowed")
}
