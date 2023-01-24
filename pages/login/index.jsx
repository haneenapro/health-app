import axios from "axios"
import React, { useState } from "react"
import Button from "../../components/ui/Button"
import Input from "../../components/ui/Input"
import { signIn, useSession } from "next-auth/react"

function LoginForm() {
  const { status, data: session } = useSession()

  console.log(status, session)

  const [formData, setFormData] = useState({ email: "", password: "" })

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const res = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: true,
      callbackUrl: "/Doctor",
    })

    console.log(formData)
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
          </div>

          <Button type='submit'>Log In</Button>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
