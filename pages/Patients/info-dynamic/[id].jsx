// to fetch and display all quesions

import axios from "axios"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import Button from "../../../components/ui/Button"

const SingleInformation = () => {
  // api route -- get all questions
  const router = useRouter()
  const id = router.query.id

  const [isLoading, setIsLoading] = useState(true)
  const [information, setInformation] = useState([])

  useEffect(() => {
    if (!id) {
      return
    }
    const getInformations = async () => {
      const res = await axios.get(`/api/information/${id}`)
      setInformation(res.data)
      console.log(res.data)
      setIsLoading(false)
    }

    setIsLoading(true)
    getInformations()
  }, [id])

  if (isLoading) return <p>Loading ... </p>

  return (
    <>
      <div className='m-4 py-10'>
        {/* <h1 className='text-xl'>Information page </h1> */}
        <h2 className='font-bold'>{information.title}</h2>
        <div className='italic'>{information.name}</div>
        <div className='font-semibold w-[800px] text-gray-600 text-justify'>
          {information.desc}
        </div>
        <div
          className='font-semibold w-[800px] text-gray-300'
          dangerouslySetInnerHTML={{ __html: information.fullInfo }}
        />
      </div>
      <div className='mb-10'>
        <a
          href='/Patients/info-dynamic'
          className='mx-[30px] rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
        >
          Back{" "}
        </a>
      </div>
    </>
  )
}

export default SingleInformation
