import { prisma } from "../../../src/db/prisma"
import bcrypt from "bcrypt"

export default async function handler(req, res) {
  if (req.method === "GET") {
    const informations = await prisma.User.findMany({})

    if (informations) return res.status(200).send(informations)
    return res.status(204).send({ message: "No data found", status: 204 })
  }

  if (req.method === "POST") {
    const { name, email, password, role } = req.body
    const pw = await bcrypt.hash(password, 10)
    const newUser = await prisma.user.create({
      data: { name, email, role, password:pw },
    })
    if (newUser.role === "doctor") {
      await prisma.doctor.create({
        data: {
          name: newUser.name,
          email: newUser.email,
          User: {
            connect: {
              id: newUser.id
            }
          }
        }
      })
    }
    return res
      .status(201)
      .send({ message: "Information Added Successfully", newUser })
  }
}
