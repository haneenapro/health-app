import { prisma } from "../../src/db/prisma"
const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  if (req.method === "POST") {
    // const { name, email, password } = req.body
    // use library to encrypt password

    //sends to database
    console.log(req.body, "@@@-------")
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_SMTP_USERNAME,
        pass: process.env.GMAIL_SMTP_PASSWORD
      },
    });

    if (req.body.flag && req.body.flag === "cancle") {
      await prisma.UserPayment.update({
        where: { id: Number(req.body.id) },
        data: {
          status: "canclled"
        }
      })
      let mailDetails = {
        to: req.body.email,
        subject: "Doctor Appointment Status",
        html: `<div>
        <p><h3>Your appointment has been canclled successfully.</h3></p>
        <h4>Thank You for choosing health app!<h4></div>`
      };
      transporter.sendMail(mailDetails);
      return res.send({ message: "ok" })
    }
    if (req.body.id) {
      await prisma.UserPayment.update({
        where: { id: Number(req.body.id) },
        data: {
          status: "verified",
          link: req.body.link ? req.body.link : ""
        }
      })
    }
    if (req.body.link) {
      let mailDetails = {
        to: req.body.email,
        subject: "Doctor Appointment Meet Link",
        html: `<div>
        <p><h3>Your appointment has been scheduled with following details.</h3></p>
        <p><strong>Hospital :</strong>${req.body.hospital}</p>
        <p><strong>Department :</strong>${req.body.department}</p>
        <p>
        <strong>Doctor :</strong>${req.body.doctor}</p> 
        <p><strong>Time :</strong>${req.body.schedule}</p> 
        <p><strong>Meet Link :</strong>${req.body.link}</p> 
        <h4>Thank You for choosing health app!<h4></div>`
      };
      transporter.sendMail(mailDetails);
      return res.send({ message: "ok" })
    } else {
      let mailDetails = {
        to: req.body.email,
        subject: "Doctor Appointment Meet Link",
        html: `<div>
        <p><h3>Your appointment has been scheduled with following details.</h3></p>
        <p><strong>Hospital :</strong>${req.body.hospital}</p>
        <p><strong>Department :</strong>${req.body.department}</p>
        <p>
        <strong>Doctor :</strong>${req.body.doctor}</p> 
        <p><strong>Time :</strong>${req.body.schedule}</p>
        <h4>Thank You for choosing health app!<h4></div>`
      };
      transporter.sendMail(mailDetails);
      return res.send({ message: "ok" })
    }
    return res.send({ message: "ok" })

  }

  return res.status(400).send("Not allowed")
}
