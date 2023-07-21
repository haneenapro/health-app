import React, { useState } from "react"
import NavBar from "../../../src/components/NavBar"
import Link from "next/link"
import prisma from "../../../src/db/prisma"
import Input from "../../../components/ui/Input"
import Button from "../../../components/ui/Button"
import axios from "axios"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"

export async function getServerSideProps(context) {
  const { id } = context.params

  const departmentData = await prisma.department.findUnique({
    where: {
      id: Number(id),
    },
  })

  return {
    props: {
      departmentData,
    },
  }
}
const index = ({ departmentData }) => {

  const { status, data: session } = useSession()
  let router = useRouter()
  const id = router.query?.id
  const [formData, setFormData] = useState(departmentData)
  function handleChange(event) {
    const { name, value } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    await axios
      .put(`/api/department/${id}`, formData)
      .then((res) => {
        if (res.status === 200) {
          alert("Information Added successful!")
          router.push(`/Admin/department`)
        } else {
          alert("Something went wrong")
        }
      })
      .catch((err) => {
        alert("Something went wrong")
      })
  }

  if (status === "loading") return <div>Loading...</div>

  if (status === "unauthenticated") {
    router.push("/login")
    return null
  }
  if (session.user.role !== "admin") {
    return router.push('/')
  }

  return (
    <>
      <NavBar />
      <div className='flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <div className='w-full max-w-md space-y-8'>
          <div>
            <div className=' flex items-center justify-left gap-x-6'>
              <Link
                href='/Admin/department'
                className='text-base font-semibold leading-7 text-gray-900'
              >
                <span aria-hidden='true'>←</span> Back
              </Link>
            </div>
            <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
              Edit Department
            </h2>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSubmit(e)
            }}
            className='mt-8 space-y-6 bg-white p-6 rounded py-3'
          >
            <div className='-space-y-px rounded-md shadow-sm py-3'>
              <div className='pt-8'>
                <Input
                  label={"Departnemt Name"}
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  required
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

export default index
