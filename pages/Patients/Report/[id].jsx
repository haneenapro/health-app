// to fetch and display all quesions

import axios from "axios"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import Button from "../../../components/ui/Button"
import { getTimeHelper } from "../../../components/helper/getTimerAlert"

const SingleReport = () => {
  // api route -- get all reports
  const router = useRouter()
  const id = router.query.id

  const [isLoading, setIsLoading] = useState(true)
  const [report, setReport] = useState([])

  const _getLocalData = typeof window !== "undefined" && localStorage.getItem("role")
  if(_getLocalData && _getLocalData ==="patient") {
    const _getLocalDataUserId = typeof window !== "undefined" && localStorage.getItem("user")
    if(_getLocalDataUserId) {
      getTimeHelper(_getLocalDataUserId)
    }
  }

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

      <a className='rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
        {" "}
        View Report Card
      </a>

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
      <div className='mt-10'>
        <a
          href='/Patients/Report'
          className='rounded-md mt-6 border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
        >
          {" "}
          Back{" "}
        </a>
      </div>

      {/* Form component to add answers */}
    </div>
  )
}

export default SingleReport
