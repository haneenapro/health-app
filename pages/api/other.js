// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//import handler from "api/hello.js"

export default function handler(req, res) {
  const { pid } = req.query
  res.end(`Post: ${pid}`)
}
