// to fetch and display all quesions

import axios from "axios"
import React, { useEffect, useState } from "react"
import NavBar from "../../../src/components/NavBar"
import { getTimeHelper } from "../../../components/helper/getTimerAlert"

const ReportsList = () => {
  // api route -- get all reports
  const [isLoading, setIsLoading] = useState(false)
  const [reports, setReports] = useState([])

  const _getLocalData = typeof window !== "undefined" && localStorage.getItem("role")
  if(_getLocalData && _getLocalData ==="patient") {
    const _getLocalDataUserId = typeof window !== "undefined" && localStorage.getItem("user")
    if(_getLocalDataUserId) {
      getTimeHelper(_getLocalDataUserId)
    }
  }

  useEffect(() => {
    const getReports = async () => {
      const res = await axios.get("/api/report")
      setReports(res.data)
      setIsLoading(false)
    }

    setIsLoading(true)
    getReports()
  }, [])

  if (isLoading) return <p>Loading ... </p>

  console.log(reports)
  return (
    <>
      <NavBar />
      <div className='m-4 py-10'>
        <h1>Reports List</h1>

        {/* plural */}
        {reports.map((report, i) => {
          return (
            <a
              href={`Report/${report.id}`}
              key={i}
              className='block mx-5 my-2 shadow border text-xl p-4'
            >
              {report.title}
            </a>
          )
        })}
        <a href='/Patients' className='underline underline-offset-8'>
          Back
        </a>
      </div>
    </>
  )
}

export default ReportsList
