import { prisma } from "../../../src/db/prisma"
import nextConnect from 'next-connect';
import multer from 'multer';

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => cb(null, Date.now() + file.originalname),
  }),
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.get(async (req, res) => {
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

})
apiRoute.use(upload.single('file'));
apiRoute.post(async (req, res) => {
  const information = await prisma.hospital.create({
    data: {
      name: req.body.name,
      address: req.body.address,
      description: req.body.description,
      departments: {
        connect: JSON.parse(req.body.departments).map((_elm) => { return { id: _elm.id } })
      },
      image: req.file.filename 
    }
  })
  return res
    .status(201)
    .send({ message: "Information Added Successfully", information })
})


export default apiRoute;

export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, consume as stream
    },
};