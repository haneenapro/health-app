
import bcrypt from "bcrypt"
import prisma from "../../src/db/prisma"
const nodemailer = require('nodemailer');

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { current_password, new_password, email, isReset } = req.body
        if (isReset && isReset === "true") {
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.GMAIL_SMTP_USERNAME,
                    pass: process.env.GMAIL_SMTP_PASSWORD
                },
            });

            let mailDetails = {
                from: 'zireavai8@gmail.com',
                to: email,
                // to: 'saranbrl35@gmail.com',
                subject: "Health App Password Reset Request",
                html: `<div>
                    <p><h3>Your password reset has been done.</h3></p>
                     <h5>Your new password: healthapp123</h5>  
                     <h4>Thank You for choosing health app!<h4></div>`
            };
            transporter.sendMail(mailDetails, async function (err, data) {
                if (err) {
                    console.log(err, "@@@@");

                    return res
                        .status(422)
                        .send({ message: "Something went wrong" })

                } else {
                    console.log("@sent success@@@");
                    const pw = await bcrypt.hash('healthapp123', 10)
                    await prisma.User.update({
                        where: { email }, data: {
                            password: pw
                        }
                    })
                    return res
                        .status(201)
                        .send({ message: "Password changed Successfully" })
                }
            });

        } else {
            const _getUser = await prisma.User.findFirst({ where: { email } })
            if (_getUser && _getUser.password && new_password) {
                const passwordMatch = await bcrypt.compare(current_password, _getUser.password)
                if (!passwordMatch) return res.status(422).send({ message: "Current password doesnt match!!" })
                const pw = await bcrypt.hash(new_password, 10)
                await prisma.User.update({
                    where: { email }, data: {
                        password: pw
                    }
                })
                return res
                    .status(201)
                    .send({ message: "Password changed Successfully" })
            } else {
                return res
                    .status(422)
                    .send({ message: "Something went wrong" })
            }
        }
    }
}
