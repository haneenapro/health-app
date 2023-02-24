import Head from "next/head"
import ForReport from "../../../src/components/report"
import NavBar from "../../../src/components/NavBar"

export default function ReportHere() {
  return (
    <>
      <Head>
        <title>Image Uploader</title>
        <meta name='description' content='Upload your image to Cloudinary!' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <NavBar />

      {/* Image upload component */}
      <ForReport />
    </>
  )
}
// import styles from "../styles/Home.module.scss"
