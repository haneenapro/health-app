import axios from "axios"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import NavBar from "../../../src/components/NavBar"

const SingleInformation = () => {
  // api route -- get all questions
  const router = useRouter()
  const id = router.query.id

  const [isLoading, setIsLoading] = useState(true)
  const [information, setInformation] = useState({})
  const [updateForm, setUpdateForm] = useState({
    title: "",
    desc: "",
    fullInfo: "",
    name: "",
  })

  useEffect(() => {
    if (!id) {
      return
    }
    const getInformations = async () => {
      const res = await axios.get(`../../api/information/${id}`)
      setInformation(res.data)
      setUpdateForm({
        title: res.data.title,
        desc: res.data.desc,
        fullInfo: res.data.fullInfo,
        name: res.data.name,
      })
      setIsLoading(false)
    }

    setIsLoading(true)
    getInformations()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await axios.put(`../../api/information/${id}`, updateForm)
    console.log(res.data)
    // Redirect to the homepage
    router.push("/")
  }

  const handleChange = (e) => {
    setUpdateForm({
      ...updateForm,
      [e.target.name]: e.target.value,
    })
  }

  if (isLoading) return <p>Loading ... </p>

  return (
    <>
      <NavBar />
      <div className='mx-12 md:mx-24 md:mt-6 py-5 md:py-10'>
        <form onSubmit={handleSubmit}>
          <h1 className='text-[24px] md:text-[48px] font-semibold '>
            Update Information
          </h1>
          <div className='mt-6 text-xl md:text-2xl font-semibold'>
            <input
              type='text'
              name='title'
              value={updateForm.title}
              onChange={handleChange}
            />
          </div>
          <div className='my-10'>
            <textarea
              type='text'
              name='desc'
              value={updateForm.desc}
              onChange={handleChange}
            />
            <textarea
              type='text'
              name='fullInfo'
              value={updateForm.fullInfo}
              onChange={handleChange}
            />
          </div>
          <input
            type='text'
            name='name'
            value={updateForm.name}
            onChange={handleChange}
          />
          <button
            type='submit'
            className='rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
          >
            Update
          </button>
          <div className=' flex items-center justify-left gap-x-6'>
            <a
              href='/'
              className='text-base font-semibold leading-7 text-gray-900'
            >
              <span aria-hidden='true'>←</span> Back
            </a>
          </div>
        </form>
      </div>
    </>
  )
}

export default SingleInformation
