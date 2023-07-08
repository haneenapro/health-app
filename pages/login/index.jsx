"use client"
import { useState } from "react"
import Button from "../../components/ui/Button"
import Input from "../../components/ui/Input"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/router"

function Login() {
  const { status, data: session } = useSession()
  const router = useRouter()

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (status === "authenticated") {
    session.user.role === "doctor" && void router.push("/Doctor")
    session.user.role === "patient" && void router.push("/Patients")
    return null
  }

  return <LoginForm />
}

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "Patients",
  })

  const router = useRouter()

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { email, password, role } = formData

    if (!email | !password | !role) return window.alert("Fill out all fields")

    const res = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: true,
      callbackUrl: "/" + formData.role,
    })

    console.log(res)

    // const { error } = await signIn("credentials", {
    //   email: email,
    //   password: password,
    //   redirect: false,
    // })

    // if (error) {
    //   // handle error
    // } else {
    //   router.push(callbackUrl)
    // }

    // router.push(res.url)
  }

  const loginSocial = async (e) => {
    await signIn('google', { redirect: true, callbackUrl: '/Patients' })
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
            Log in to your account
          </h2>
          <div className=' flex items-center justify-left gap-x-6'>
            <a
              href='/'
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
            <div className='pt-7'>
              <Input
                label={"Enter your email"}
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className='pt-6'>
              <Input
                label={"Enter password"}
                type='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className='pt-6'>
              <label> Choose your Role </label>
              <br></br>
              <input
                label={"Enter password"}
                type='radio'
                id='doctor'
                name='role'
                value={"Doctor"}
                onChange={handleChange}
              />
              <label htmlFor='doctor'>Doctor</label>
              <br></br>
              <input
                label={"Enter password"}
                type='radio'
                id='Patients'
                name='role'
                value={"Patients"}
                onChange={handleChange}
              />
              <label htmlFor='Patients'>Patient</label>
            </div>
          </div>

          <Button type='submit'>Log In</Button>


          <button class="w-full bg-white shadow-sm border border-orange-300 hover:bg-orange-100 text-orange-500 hover:text-orange-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex gap-2 items-center justify-center" type="button" onClick={() => loginSocial('google')}>
            Google
          </button>

        </form>
      </div>
    </div>
  )
}

export default Login
