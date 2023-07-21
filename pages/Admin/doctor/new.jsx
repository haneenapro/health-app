import { useState } from "react"
import Button from "../../../components/ui/Button"
import NavBar from "../../../src/components/NavBar"
import { useRouter } from "next/router"
import Input from "../../../components/ui/Input"
import { useSession } from "next-auth/react"
import axios from "axios"

function RegisterDoctor() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "doctor"
  })

  const router = useRouter()
  const { status, data: session } = useSession()

  if (status === "loading") return <div>Loading...</div>

  if (status === "unauthenticated") {
    router.push("/login")
    return null
  }
  if (session.user.role !== "admin") {
    return router.push('/')
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
      .post("/api/user", formData)
      .then((res) => {
        if (res.status === 201) {
          alert("Doctor Added successful!")
          router.push(`/Admin`)
        } else {
          alert("Something went wrong")
        }
      })
      .catch((err) => {
        alert("Something went wrong")
      })
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
              Register New Doctor
            </h2>
            <div className=' flex items-center justify-left gap-x-6'>
              <a
                href='/Admin'
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
                  label={"Full Name"}
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className='pt-6'>
                <Input
                  label={"Enter your email"}
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className='pt-6'>
                <Input
                  label={"Enter password"}
                  type='password'
                  name='password'
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            <Button type='submit'>Add Doctor</Button>
          </form>
        </div>
      </div>
    </>
  )
}

export default RegisterDoctor
