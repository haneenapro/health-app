import { prisma } from "../../src/db/prisma"

export default async function handler(req, res) {

    //Get
    if (req.method === "POST") {
        try {
            const { date, token, hospital, amount, doctor, department } = req.body
            const addTime = await prisma.AvailableTime.create({
                data: { date, token, amount }
            })
            if (addTime) {
                const findExisting = await prisma.DoctorSchedule.findMany({
                    where: {
                        doctor: {
                            id: doctor
                        },
                        hospital: {
                            id: Number(hospital)
                        },
                        department: {
                            id: Number(department)
                        }
                    }
                })
                if (findExisting && findExisting.length > 0) {
                    await prisma.DoctorSchedule.update({
                        where: {
                            id: findExisting[0].id
                        },
                        data: {
                            date: {
                                connect: {
                                    id: addTime.id
                                }
                            }
                        }
                    })
                } else {
                    await prisma.DoctorSchedule.create({
                        data: {
                            hospital: {
                                connect: {
                                    id: Number(hospital)
                                }
                            },
                            department: {
                                connect: {
                                    id: Number(department)
                                }
                            },
                            date: {
                                connect: {
                                    id: addTime.id
                                }
                            },
                            doctor: {
                                connect: {
                                    id: doctor
                                }
                            },
                        }
                    })

                    await prisma.doctor.update({
                        where: {
                            id: doctor
                        },
                        data: {
                            hospitals: {
                                connect: [{
                                    id: Number(hospital)
                                }]
                            },
                            departments: {
                                connect: [{
                                    id: Number(department)
                                }]
                            },
                        }
                    })
                }
            }

            if (addTime) return res.status(200).send(addTime)
            return res.status(204).send({ message: "No data found", status: 204 })
        } catch (error) {
            return res
                .status(500)
                .send({ message: "Something went wrong", status: 500 })
        }
    }
    return res.status(400).send("Not allowed")
}
