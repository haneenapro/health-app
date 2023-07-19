import { prisma } from "../../../src/db/prisma"

export default async function handler(req, res) {
  const id = req.query.id

  //Get
  if (req.method === "GET") {
    try {
      const hospital = await prisma.hospital.findFirst({
        where: { id: Number(id) },
        select: {
          id: true,
          name: true,
        },
      })

      if (hospital) return res.status(200).send(hospital)
      return res.status(204).send({ message: "No data found", status: 204 })
    } catch (error) {
      return res
        .status(500)
        .send({ message: "Something went wrong", status: 500 })
    }
  }

  // Delete
  if (req.method === "DELETE") {
    try {
      await prisma.hospital.delete({
        where: { id: Number(id) },
      })

      return res.send({ message: "Delete success", status: 200 })
    } catch (error) {
      return res
        .status(500)
        .send({ message: "Something went wrong", status: 500 })
    }
  }

  // Update
  if (req.method === "PUT") {
    try {
      const { name, address, description, departments, doctors } = req.body
      await prisma.hospital.update({
        where: { id: Number(id) },
        data: {
          name: name,
          address: address,
          description: description,
          departments: {
            set: [],
            connect: departments.map((_elm) => { return { id: Number(_elm.id) } })
          },
          doctors: {
            set: [],
            connect: doctors.map((_elm) => { return { id: _elm.id } })
          }
        },
      })

      return res.send({
        message: "Update success",
        status: 200,
      })
    } catch (error) {
      return res
        .status(500)
        .send({ message: "Something went wrong", status: 500 })
    }
  }

  return res.status(400).send("Not allowed")
}
