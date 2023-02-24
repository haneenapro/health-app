import { useState } from "react"
import Head from "next/head"
import Input from "../../components/ui/Input"
import Button from "../../components/ui/Button"
// import styles from "../styles/Home.module.scss"
import { useSession } from "next-auth/react"
import axios from "axios"

export default function ForReport() {
  const { data: session } = useSession()

  const [formData, setFormData] = useState({ title: "", desc: "", image: "" })
  const [imageSrc, setImageSrc] = useState()
  const [uploadData, setUploadData] = useState()

  /**
   * handleOnChange
   * @description Triggers when the file input changes (ex: when a file is selected)
   */

  function handleOnChange(changeEvent) {
    const reader = new FileReader()

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result)
      setUploadData(undefined)
    }

    reader.readAsDataURL(changeEvent.target.files[0])
  }

  /**
   * handleOnSubmit
   * @description Triggers when the main form is submitted
   */
  async function handleOnSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === "file"
    )

    const formdata = new FormData()

    for (const file of fileInput.files) {
      formdata.append("file", file)
    }

    formdata.append("upload_preset", "my-uploads")

    const data = await fetch(
      "https://api.cloudinary.com/v1_1/dalhkaer8/image/upload",
      {
        method: "POST",
        body: formdata,
      }
    )
      .then((r) => r.json())
      .then(async (data) => {
        console.log("data", data.secure_url)
        setImageSrc(data.secure_url)
        setUploadData(data)

        const result = await axios.post("http://localhost:3000/api/report", {
          ...formData,
          image: data.secure_url,
          userId: session?.user?.id,
        })
        console.log(result.data)
      })
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className=''>
      <Head>
        <title>Image Uploader</title>
        <meta name='description' content='Upload your image to Cloudinary!' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='m-14 space-y-6 bg-white p-6 rounded'>
        <h1 className='font-bold text-[40px]'> Upload your Report Card</h1>

        <p className='text-sm'>Your Report Cards are safe with us</p>

        <div
          onSubmit={handleOnSubmit}
          className='mt-8 space-y-6 bg-white p-6 rounded'
        >
          <div className='-space-y-px rounded-md shadow-sm'>
            <div className='pt-6'>
              <Input
                label={"Report Title"}
                type='text'
                name='title'
                required
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div className='pt-6'>
              <Input
                label={"Report Description"}
                type='text'
                name='desc'
                required
                value={formData.desc}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <form
          className=''
          method='post'
          onChange={handleOnChange}
          onSubmit={handleOnSubmit}
        >
          <p>
            <input type='file' name='file' />
          </p>

          <img src={imageSrc} />

          {imageSrc && !uploadData && (
            <Button
              className='mt-5 bg-blue-500 p-3 text-white rounded block'
              type='submit'
            >
              Submit
            </Button>
          )}

          <div className=' flex items-center justify-left gap-x-6'>
            <a
              href='/Patients'
              className='text-base font-semibold leading-7 text-gray-900'
            >
              <span aria-hidden='true'>←</span> Back
            </a>
          </div>
        </form>
      </main>
    </div>
  )
}
