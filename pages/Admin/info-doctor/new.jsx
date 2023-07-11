import axios from "axios"
import React, { useState } from "react"
import Button from "../../../components/ui/Button"
import Input from "../../../components/ui/Input"
import NavBar from "../../../src/components/NavBar"
import { useRouter } from "next/router"

function InfoForm() {
  const [formData, setFormData] = useState({
    image: "",
    name: "",
    address: "",
    experineceYears: "",
    PhoneNumber: "",
    HospitalName: "",
    DepartmentId: "",
    DepartmentName: ""
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
      formData.image === "" ||
      formData.name === "" ||
      formData.address === ""  //many validations left???
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
      "/api/doctor",
      formData
    )
    console.log(result)
    alert("Doctoro Added successful!")

    if ((result.status = 201)) {
      router.push(`/Admin/info-doctor/${result.data.information.id}`)  //is correctn needed????
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
                href='/Admin' //need to push back to specific department ???
                className='text-base font-semibold leading-7 text-gray-900'
              >
                <span aria-hidden='true'>←</span> Back
              </a>
            </div>
            <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
              Add Department
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

            <div className='pt-6'>
                <Input
                  label={"Doctor Image"}
                  name='desc'
                  value={formData.image}
                  onChange={handleChange}
                />
              </div>

              <div className='pt-8'>
                <Input
                  label={"Name"}
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className='pt-6'>
                <Input
                  label={"Address"}
                  name='title'
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>

              <div className='pt-6'>
                <Input
                  label={"Experience Years"}
                  name='title'
                  value={formData.experineceYears}
                  onChange={handleChange}
                />
              </div>

              <div className='pt-6'>
                <Input
                  label={"Phone Number"}
                  name='title'
                  value={formData.PhoneNumber}
                  onChange={handleChange}
                />
              </div>

              <div className='pt-6'>
                <Input
                  label={"Hospital Name"}
                  name='title'
                  value={formData.HospitalName}
                  onChange={handleChange}
                />
              </div>

              <div className='pt-6'>
                <Input
                  label={"Department Id"}
                  name='title'
                  value={formData.DepartmentId}
                  onChange={handleChange}
                />
              </div>

              <div className='pt-6'>
                <Input
                  label={"Department Name"}
                  name='title'
                  value={formData.DepartmentName}
                  onChange={handleChange}
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
