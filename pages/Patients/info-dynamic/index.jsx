// to fetch and display all information titles and little information

import axios from "axios"
import React, { useEffect, useState } from "react"
import NavBar from "../../../src/components/NavBar"

const InformationList = () => {
  // api route -- get all informations
  const [isLoading, setIsLoading] = useState(false)
  const [informations, setInformations] = useState([])

  useEffect(() => {
    const getInformations = async () => {
      const res = await axios.get("/api/information")
      setInformations(res.data)
      setIsLoading(false)
    }

    setIsLoading(true)
    getInformations()
  }, [])

  if (isLoading) return <p>Loading ... </p>

  console.log(informations)
  return (
    <>
      <NavBar />
      <div className='m-4 py-10'>
        <h1>Health Informations </h1>

        {informations.map((information, i) => {
          return (
            <>
              <a
                href={`/Patients/info-dynamic/${information.id}`}
                key={i}
                className='block mx-5 my-2 shadow border text-xl p-4'
              >
                <div>{information.title}</div>
                {information.desc}
              </a>
            </>
          )
        })}
        <a href='/' className='underline underline-offset-8'>
          Back{" "}
        </a>
      </div>
    </>
  )
}

export default InformationList
