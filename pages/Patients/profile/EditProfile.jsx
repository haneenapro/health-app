import Link from 'next/link'
import React, { useState } from 'react'
import NavBar from '../../../src/components/NavBar'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from '../../api/auth/[...nextauth]'
import Input from '../../../components/ui/Input'
import Button from '../../../components/ui/Button'
import axios from 'axios'
import { useRouter } from 'next/router'

export async function getServerSideProps({ req, res }) {

  const session = await unstable_getServerSession(req, res, authOptions)
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  const userData = await prisma.User.findUnique({
    where: { id: session.user.id },
  })

  return {
    props: {
      userData
    },
  }
}
const EditProfile = ({ userData }) => {
  console.log(userData, "@@");
  const [formData, setFormData] = useState(userData)
  const [imageData, setImageData] = useState(null)

  const router = useRouter()

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  function imageUploadHandler(e) {
    const file = e.target.files[0]
    setImageData(file)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if(!imageData) return alert("Image is required!!")
    let newFormDate = new FormData()
    newFormDate.append("name", formData.name)
    newFormDate.append("file", imageData)
    await axios.put(`/api/user/${userData.id}`,
        newFormDate, {
        headers: {
            'Content-Type': 'multipart/formdata'
        },
    }
    ).then((res) => {
        if (res.status === 201) {
            alert("Information Added successful!")
            router.push(`/Patients`)
        } else {
            alert("Something went wrong")
        }
    }).catch((err) => {
        alert("Something went wrong")
    })
}

  return (
    <>
      <NavBar />
      <div className='flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <div className='w-full max-w-md space-y-8'>
          <div>
            <div className=' flex items-center justify-left gap-x-6'>
              <Link
                href='/Patients'
                className='text-base font-semibold leading-7 text-gray-900'
              >
                <span aria-hidden='true'>←</span> Back
              </Link>
            </div>
            <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
              Edit User Details
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
                  label={"Name"}
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='pt-8'>
                <Input
                  label={"User Image"}
                  name='image'
                  onChange={imageUploadHandler}
                  type="file"
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

export default EditProfile