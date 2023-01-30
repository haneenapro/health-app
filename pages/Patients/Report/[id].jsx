// to fetch and display all quesions

import axios from "axios"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import Button from "../../../components/ui/Button"

const SingleReport = () => {
  // api route -- get all reports
  const router = useRouter()
  const id = router.query.id

  const [isLoading, setIsLoading] = useState(true)
  const [report, setReport] = useState([])

  useEffect(() => {
    if (!id) {
      return
    }
    const getReports = async () => {
      const res = await axios.get(`/api/report/${id}`)
      setReport(res.data)
      console.log(res.data)
      setIsLoading(false)
    }

    setIsLoading(true)
    getReports()
  }, [id])

  if (isLoading) return <p>Loading ... </p>

  return (
    <div className='m-4 py-10'>
      <h1>{report.title}</h1>

      <h2>{report.desc}</h2>

      {/* {report.answers.length === 0 ? (
        <p>No answers yet ... </p>
      ) : (
        report.answers.map((report, i) => {
          return (
            <a
              href={`report/${report.id}`}
              key={i}
              className='block mx-5 my-2 shadow border text-xl p-4'
            >
              {report.answer}
            </a>
          )
        })
      )} */}
      <div>
        <a href='/Patients/Report'> Back </a>
      </div>

      {/* Form component to add answers */}
    </div>
  )
}

export default SingleReport
