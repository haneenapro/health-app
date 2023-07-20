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

apiRoute.get(async (req, res)=>{
    try {
        const departments = await prisma.department.findMany({})
  
        if (departments) return res.status(200).send(departments)
        return res.status(204).send({ message: "No data found", status: 204 })
      } catch (error) {
        return res
          .status(500)
          .send({ message: "Something went wrong", status: 500 })
      }
})

apiRoute.use(upload.single('file'));
apiRoute.post(async (req, res) => {
    try {
        const information = await prisma.department.create({
            data: { name: req.body.name, image: req.file.filename },
        })

        return res
            .status(201)
            .send({ message: "Information Added Successfully", information })
    } catch (error) {
        return res
            .status(500)
            .send({ message: "Something went wrong", status: 500 })
    }
});

export default apiRoute;

export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, consume as stream
    },
};