import { prisma } from "../../../../src/db/prisma"


export default async function handler(req, res) {
    //Get
    const departmentId =req.query.department_id
    const hospitalId =req.query.hospital_id
    if (req.method === "GET") {
        try {
            const doctors = await prisma.doctor.findMany({
                where: {
                    hospitals: {
                        some: {
                            id: Number(hospitalId),
                        },
                    },
                    departments: {
                        some: {
                            id: Number(departmentId)
                        }
                    },
                },
                include: {
                    hospitals: true,
                    departments: true,
                    schedules: {
                        select: {
                            hospitalId: true,
                            departmentId: true,
                            date: true,
                          },
                    }
                },
            })
            if (doctors && doctors.length > 0)
                return res.status(200).send(doctors)
            return res.status(204).send({ message: "No data found", status: 204 })
        } catch (error) {
            return res
                .status(500)
                .send({ message: "Something went wrong", status: 500 })
        }
    }

    return res.status(400).send("Not allowed")
}
