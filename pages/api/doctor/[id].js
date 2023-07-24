import nextConnect from "next-connect"
import multer from "multer"
import prisma from "../../../src/db/prisma"

const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) => cb(null, Date.now() + file.originalname),
  }),
})

const apiRoute = nextConnect({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` })
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
  },
})

apiRoute.get(async (req, res) => {
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
})
apiRoute.delete(async (req, res) => {
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
})

apiRoute.use(upload.single("file")).put(async (req, res) => {
  try {
    if (req.file) {
      let { name, experience, qualification, address } = req.body
      const updatedDoctor = await prisma.doctor.update({
        where: { id: req.query.id },
        data: {
          name: name,
          experience: experience,
          qualification: qualification,
          address: address,
          image: req.file.filename,
        },
      })
      return res.send({
        message: "Update success",
        updatedDoctor,
        status: 200,
      })
    } else {
      let { name, experience, qualification, address } = req.body
      const updatedDoctor = await prisma.doctor.update({
        where: { id: req.query.id },
        data: {
          name: name,
          experience: experience,
          qualification: qualification,
          address: address,
        },
      })
      return res.send({
        message: "Update success",
        updatedDoctor,
        status: 200,
      })
    }

  } catch (error) {
    return res
      .status(500)
      .send({ message: "Something went wrong", status: 500 })
  }
})

export default apiRoute

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
}
