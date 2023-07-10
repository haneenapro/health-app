import { prisma } from "../../src/db/prisma"

export default async function handler(req, res) {

  //Get
  if (req.method === "POST") {
    // try {
      const hospital = await prisma.hospital.update({
        where: { id: 4 },
        data: {
            departments:{
                connect: {
                    id: 3
                }
            }
        }
      })

      if (hospital) return res.status(200).send(hospital)
      return res.status(204).send({ message: "No data found", status: 204 })
    // } catch (error) {
    //   return res
    //     .status(500)
    //     .send({ message: "Something went wrong", status: 500 })
    // }
  }
  return res.status(400).send("Not allowed")
}
