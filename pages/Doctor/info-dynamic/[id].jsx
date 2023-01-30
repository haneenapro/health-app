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
        <h1 className='text-xl'>Information page ... </h1>
        <h1>{information.name}</h1>
        <div>{information.title}</div>
        <div>{information.desc}</div>
        <div dangerouslySetInnerHTML={{ __html: information.fullInfo }} />
      </div>
      <div>
        <a href='/Doctor/info-dynamic' className='underline underline-offset-8'>
          Back{" "}
        </a>

        <a
          href={`/Doctor/info-dynamic/${id}/edit`}
          className='underline underline-offset-8'
        >
          Update
        </a>
      </div>
    </>
  )
}

export default SingleInformation
