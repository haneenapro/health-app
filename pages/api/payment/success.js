const nodemailer = require('nodemailer');
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

      

        
          let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_SMTP_USERNAME,
                pass: process.env.GMAIL_SMTP_PASSWORD     
            },
          });
        
        // try {
            const {
                userId,
                hospitalId,
                departmentId,
                doctorId,
                availableTimeId,
                appointmentType
            } = req.body
            console.log(req.body, "@@@@@@");
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
                    },
                    appointmentType: appointmentType
                },
                include: {
                    hospital: true,
                    doctor: true,
                    department: true,
                    availableTime: true,
                    User: true
                }
            })
            console.log(information,"@@@@@@@@--------");
            if(res) {
                let mailDetails = {
                    from: 'zireavai8@gmail.com',
                    to: information.User.email,
                    // to: 'saranbrl35@gmail.com',
                    subject: "Doctor Appointment",
                    html: `<div>
                    <p><h3>Your appointment has been scheduled.</h3></p>
                    <p><strong>Hospital :</strong>${information.hospital.name}</p>
                    <p><strong>Department :</strong>${information.department.name}</p>
                     <p>
                     <strong>Doctor :</strong>${information.doctor.name}</p> 
                    <p><strong>Time :</strong>${information.availableTime.date}</p> 
                     <h5>Further update will be provided soon!</h5>  
                     <h4>Thank You for choosing health app!<h4></div>`
                };
                transporter.sendMail(mailDetails, function (err, data) {
                    if (err) {
                        console.log(err,"@@@@");
                        
                        
                    } else {
                        console.log("@sent success@@@");
                       
                    }
                });
        
            }
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
