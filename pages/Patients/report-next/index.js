import { useState } from "react"
import Head from "next/head"
// import styles from "../styles/Home.module.scss"

export default function ForReport() {
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

    const formData = new FormData()

    for (const file of fileInput.files) {
      formData.append("file", file)
    }

    formData.append("upload_preset", "my-uploads")

    const data = await fetch(
      "https://api.cloudinary.com/v1_1/dalhkaer8/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json())

    setImageSrc(data.secure_url)
    setUploadData(data)

    console.log("data", data)
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
            <p>
              <button>Upload Files</button>
            </p>
          )}

          {uploadData && (
            <code>
              {" "}
              <pre>{JSON.stringify(uploadData, null, 2)}</pre>{" "}
            </code>
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
