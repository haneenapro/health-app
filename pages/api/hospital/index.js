import { prisma } from "../../../src/db/prisma"

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const hospitals = await prisma.hospital.findMany({
        include: {
          DoctorSchedule: true
        }
      })
      if (hospitals) return res.status(200).send(hospitals)
      return res.status(204).send({ message: "No data found", status: 204 })
    } catch (error) {
      return res
        .status(500)
        .send({ message: "Something went wrong", status: 500 })
    }
  }
  if (req.method === "POST") {
    console.log(req.body,"@@");
    const information = await prisma.hospital.create({
      data: {
        name: req.body.name,
        address: req.body.address,
        description: req.body.description,
        departments: {
          connect: req.body.departments.map((_elm)=> {return {id: Number(_elm.id)}})
        },
        doctors: {
          connect:  req.body.doctors.map((_elm)=> {return {id: _elm.id}})
        }
      }
    })
    return res
      .status(201)
      .send({ message: "Information Added Successfully", information })
    try {
      const information = await prisma.hospital.create({
        data: req.body
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
