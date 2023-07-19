import { prisma } from "../../../src/db/prisma"

export default async function handler(req, res) {
    const id = req.query.id

    //Get
    if (req.method === "GET") {
        try {
            const doctor = await prisma.doctor.findFirst({
                where: { id: id },
                select: {
                    id: true,
                    name: true,
                },
            })
            if (doctor) return res.status(200).send(doctor)
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
          await prisma.doctor.delete({
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
        const updatedDoctor = await prisma.doctor.update({
            where: { id: id },
            data: {...req.body},
        })

        return res.send({
            message: "Update success",
            updatedDoctor,
            status: 200,
        })
        try {
            const { name } = req.body
            const updatedDoctor = await prisma.doctor.update({
                where: { id: Number(id) },
                data: {...req.body},
            })

            return res.send({
                message: "Update success",
                updatedDoctor,
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
