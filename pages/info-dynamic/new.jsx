//like register form
// to upload on blog
//1. form to input info
//2. like question page same

import axios from "axios"
import React, { useState } from "react"
import Button from "../../components/ui/Button"
import Input from "../../components/ui/Input"

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
  }

  return (
    <div className='flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='w-full max-w-md space-y-8'>
        <div>
          <img
            className='mx-auto h-12 w-auto'
            src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
            alt='Your Company'
          />
          <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
            Add information to Blog
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
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
              <Input
                label={"Enter Full Information"}
                className='p-10'
                name='fullInfo'
                value={formData.fullInfo}
                onChange={handleChange}
              />
            </div>

            <div className='flex items-center justify-between pt-6'>
              <div className='text-sm'>
                <a
                  href='login'
                  className='font-medium text-indigo-600 hover:text-indigo-500'
                >
                  ALready have an account? Log In.
                </a>
              </div>
            </div>
          </div>

          <Button type='submit'>Submit</Button>
        </form>
      </div>
    </div>
  )
}

export default InfoForm
