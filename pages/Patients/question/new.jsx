import axios from "axios"
import React, { useState } from "react"
import Button from "../../../components/ui/Button"
import Input from "../../../components/ui/Input"
import NavBar from "../../../src/components/NavBar"
import { useRouter } from "next/router"

function QuestionForm() {
  const [formData, setFormData] = useState({
    title: "",
    question: "",
  })

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const router = useRouter()

  async function handleSubmit(event) {
    event.preventDefault()
    // Send the form data to your server for registration
    console.log(formData)

    const result = await axios.post(
      "http://localhost:3000/api/question",
      formData
    )
    console.log(result)
    alert("Question Added successful!")

    if ((result.status = 201)) {
      router.push(`/Patients/question`)
    }
  }

  return (
    <>
      <NavBar />
      <div className='flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <div className='w-full max-w-md space-y-8'>
          <div>
            <img
              className='mx-auto h-12 w-auto'
              src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
              alt='Your Company'
            />
            <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
              Ask A Question ??
            </h2>
            <div className=' flex items-center justify-left gap-x-6'>
              <a
                href='/Patients'
                className='text-base font-semibold leading-7 text-gray-900'
              >
                <span aria-hidden='true'>←</span> Back
              </a>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className='mt-8 space-y-6 bg-white p-6 rounded'
          >
            <div className='-space-y-px rounded-md shadow-sm'>
              <div className='pt-8'>
                <Input
                  label={"TITLE"}
                  name='title'
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>

              <div className='pt-6'>
                <Input
                  label={"Question"}
                  name='question'
                  value={formData.question}
                  onChange={handleChange}
                />
              </div>
            </div>

            <Button type='submit'> Add Question </Button>
          </form>
        </div>
      </div>
    </>
  )
}

export default QuestionForm
