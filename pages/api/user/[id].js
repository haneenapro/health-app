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

apiRoute.use(upload.single('file'));
apiRoute.put(async (req, res) => {
    console.log(req.body, "@@@@");
    console.log(req.query.id, "@@@@");
    console.log(req.file, "@@@@");
    try {
        const information = await prisma.User.update({
            where: { id: req.query.id },
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