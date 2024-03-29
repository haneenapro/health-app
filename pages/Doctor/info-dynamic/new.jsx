import axios from "axios"
import React, { useState } from "react"
import Button from "../../../components/ui/Button"
import Input from "../../../components/ui/Input"
import QuillText from "../../../components/Home/QuillText"
import NavBar from "../../../src/components/NavBar"
import { useRouter } from "next/router"

function InfoForm() {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    desc: "",
    fullInfo: "",
  })

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const router = useRouter()

  function validateForm() {
    if (
      formData.name === "" ||
      formData.title === "" ||
      formData.desc === "" ||
      formData.fullInfo === ""
    ) {
      alert("All fields are required")
      return false
    }
    return true
  }

  async function handleSubmit(event) {
    event.preventDefault()
    // Send the form data to your server for registration
    console.log(formData)

    const result = await axios.post(
      "http://localhost:3000/api/information",
      formData
    )
    console.log(result)
    alert("Information Added successful!")

    if ((result.status = 201)) {
      router.push(`/Doctor/info-dynamic/${result.data.information.id}`)
    }
  }

  return (
    <>
      <NavBar />
      <div className='flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <div className='w-full max-w-md space-y-8'>
          <div>
            <div className=' flex items-center justify-left gap-x-6'>
              <a
                href='/Doctor'
                className='text-base font-semibold leading-7 text-gray-900'
              >
                <span aria-hidden='true'>←</span> Back
              </a>
            </div>
            <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
              Add information to Blog
            </h2>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (validateForm()) {
                handleSubmit(e)
              }
            }}
            className='mt-8 space-y-6 bg-white p-6 rounded'
          >
            <div className='-space-y-px rounded-md shadow-sm'>
              <div className='pt-8'>
                <Input
                  label={"Health Professional Name"}
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className='pt-6'>
                <Input
                  label={"Enter Title"}
                  name='title'
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>

              <div className='pt-6'>
                <Input
                  label={"Enter description"}
                  name='desc'
                  value={formData.desc}
                  onChange={handleChange}
                />
              </div>
              <div className='pt-6'>
                <QuillText
                  label={"Enter Full Information"}
                  className='p-10'
                  name='fullInfo'
                  value={formData.fullInfo}
                  onChange={(val) =>
                    setFormData({ ...formData, fullInfo: val })
                  }
                />
              </div>
            </div>

            <Button type='submit'>Submit</Button>
          </form>
        </div>
      </div>
    </>
  )
}

export default InfoForm
