import axios from "axios"
import { signIn } from "next-auth/react"
import React, { useState } from "react"
import Button from "../../components/ui/Button"
import Input from "../../components/ui/Input"

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient",
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
    const { name, email, password, role } = formData

    if (!name | !email | !password | !role)
      return window.alert("Fill out all fields")

    await signIn("credentials", {
      name,
      email,
      password,
      role,
      register: true,
      redirect: true,
      callbackUrl: formData.role === "patient" ? "/Patients" : "/Doctor",
    })
  }

  const loginSocial = async (e) => {
    await signIn("google", { redirect: true, callbackUrl: "/Patients" })
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
            Sign in to your account
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
            <div className='pt-8'>
              <Input
                label={"Full Name"}
                name='name'
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className='pt-6'>
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
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {/* <div className='pt-6'>
              <label> Choose your Role </label>
              <br></br>
              <input
                label={"Enter password"}
                type='radio'
                id='doctor'
                name='role'
                value={"doctor"}
                onChange={handleChange}
                checked={formData.role === "doctor"}
              />
              <label htmlFor='doctor'>Doctor</label>
              <br></br>
              <input
                label={"Enter password"}
                type='radio'
                id='Patient'
                name='role'
                value={"patient"}
                onChange={handleChange}
                checked={formData.role === "patient"}
              />
              <label htmlFor='doctor'>Patient</label>
            </div> */}

            <div className='flex items-center justify-between pt-6'>
              <div className='text-sm'>
                <a
                  href='login'
                  className='font-medium text-indigo-600 hover:text-indigo-500'
                >
                  Already have an account? Log In.
                </a>
              </div>
            </div>
          </div>

          <Button type='submit'>Register</Button>

          {/* Customize this button for google login */}
          {formData.role === "patient" && (
            <div>
              <center>
                <p>OR SignIn With</p>
              </center>
              <button
                class='w-full bg-white shadow-sm border  text-dark-500 hover:text-orange-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex gap-2 items-center justify-center'
                type='button'
                onClick={() => loginSocial("google")}
              >
                Google
              </button>
            </div>
          )}
          {/* Customize this button for google login */}
        </form>
      </div>
    </div>
  )
}

export default RegisterForm
