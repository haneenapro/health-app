import Link from "next/link"
import React, { useState } from "react"
import NavBar from "../../../src/components/NavBar"
import { unstable_getServerSession } from "next-auth"
import { authOptions } from "../../api/auth/[...nextauth]"
import Input from "../../../components/ui/Input"
import Button from "../../../components/ui/Button"
import axios from "axios"
import { useRouter } from "next/router"
import { getTimeHelper } from "../../../components/helper/getTimerAlert"
import { signOut } from "next-auth/react"

export async function getServerSideProps({ req, res }) {
  const session = await unstable_getServerSession(req, res, authOptions)
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    }
  }
  const userData = await prisma.User.findUnique({
    where: { id: session.user.id },
  })

  return {
    props: {
      userData: JSON.parse(JSON.stringify(userData)),
    },
  }
}
const EditProfile = ({ userData }) => {
  const [formData, setFormData] = useState({
    current_password: "",
    new_password: "",
  })

  const router = useRouter()

  const _getLocalData =
    typeof window !== "undefined" && localStorage.getItem("role")
  if (_getLocalData && _getLocalData === "patient") {
    const _getLocalDataUserId =
      typeof window !== "undefined" && localStorage.getItem("user")
    if (_getLocalDataUserId) {
      getTimeHelper(_getLocalDataUserId)
    }
  }

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
      .post(`/api/forgetpassword`, { ...formData, email: userData.email })
      .then((res) => {
        if (res.status === 201) {
          alert("Password changed successfully")
          router.push(`/Patients`)
        } else {
          alert("Something went wrong")
        }
      })
      .catch((err) => {
        if (err.response.data.message) {
          alert(err.response.data.message)
        } else {
          alert("Something went wrong")
        }
      })
  }
  async function resetPassword() {
    await axios
      .post(`/api/forgetpassword`, { isReset: "true", email: userData.email })
      .then((res) => {
        if (res.status === 201) {
          alert("Please check your mail and login again!")
          signOut()
        } else {
          alert("Something went wrong")
        }
      })
      .catch((err) => {
        if (err.response.data.message) {
          alert(err.response.data.message)
        } else {
          alert("Something went wrong")
        }
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
            <h2 className='w-full mt-6 text-center text-2xl font-bold tracking-tight text-gray-900'>
              Change Password / Reset Password
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
                  label={"Current Password"}
                  name='current_password'
                  value={formData.current_password}
                  onChange={handleChange}
                  required
                  placeholder='*******'
                />
              </div>
              <div className='pt-8'>
                <Input
                  label={"New Password"}
                  name='new_password'
                  type='password'
                  value={formData.new_password}
                  onChange={handleChange}
                  required
                  placeholder='*******'
                />
              </div>
            </div>

            <Button type='submit'>Submit</Button>
            <center>OR</center>
            <button
              className='group relative flex w-full justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
              type='button'
              onClick={resetPassword}
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default EditProfile
