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

  const handleDelete = async (id) => {
    await axios.delete(`/api/information/${id}`)
    const updatedInformations = informations.filter((info) => info.id !== id)
    setInformations(updatedInformations)
    alert("One item deleted!!")
  }

  return (
    <>
      <NavBar />
      <div className='m-12 md:mx-24 md:my-2 py-5 md:py-10 '>
        <h1 className='text-[24px] md:text-[48px] font-semibold pb-12'>
          Health Informations{" "}
        </h1>

        {informations.map((information, i) => {
          return (
            <>
              <a
                href={`info-dynamic/${information.id}`}
                key={i}
                className='block mx-5 my-2 shadow border text-xl p-4 mb-10'
              >
                <div className='text-xl md:text-2xl font-semibold'>
                  {information.title}
                </div>
                <div className='text-sm md:text-[18px]'>
                  {information.desc}{" "}
                </div>
              </a>
              <button
                onClick={() => handleDelete(information.id)}
                className='mx-[30px] rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 '
              >
                Delete
              </button>
            </>
          )
        })}
        <div className='mt-[20px] mx-[30px]'>
          <a
            href='/'
            className='rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 '
          >
            Back
          </a>
        </div>
      </div>
    </>
  )
}

export default InformationList
