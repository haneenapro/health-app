import { prisma } from "../../../../src/db/prisma"

export default async function handler(req, res) {
  const id = req.query.id

  //Get
  if (req.method === "GET") {
    try {
      const departments = await prisma.department.findMany({
        where: {
          hospitals: {
            some: {
              id: Number(id),
            },
          },
        },
        include: {
          hospitals: true,
        },
      })

      if (departments) return res.status(200).send(departments)
      return res.status(204).send({ message: "No data found", status: 204 })
    } catch (error) {
      return res
        .status(500)
        .send({ message: "Something went wrong", status: 500 })
    }
  }

  return res.status(400).send("Not allowed")
}