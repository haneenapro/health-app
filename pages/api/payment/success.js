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
        // try {
            const {
                userId,
                hospitalId,
                departmentId,
                doctorId,
                availableTimeId
            } = req.body
            const information = await prisma.UserPayment.create({
                data: {
                    User: {
                        connect: {
                            id: userId
                        }
                    },
                    hospital: {
                        connect: {
                            id: Number(hospitalId)
                        }
                    },
                    department: {
                        connect: {
                            id: Number(departmentId)
                        }
                    },
                    doctor: {
                        connect: {
                            id: doctorId
                        }
                    },
                    availableTime: {
                        connect: {
                            id: Number(availableTimeId)
                        }
                    }
                }
            })
            return res
                .status(201)
                .send({ message: "Information Added Successfully", information })
        // } catch (error) {
        //     return res
        //         .status(500)
        //         .send({ message: "Something went wrong", status: 500 })
        // }
    }

    return res.status(400).send("Not allowed")
}
