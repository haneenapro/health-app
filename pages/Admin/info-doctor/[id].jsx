// to fetch and display all quesions

import axios from "axios"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import Button from "../../../components/ui/Button"

const SingleDepartment = () => {
  // api route -- get all questions
  const router = useRouter()
  const id = router.query.id

  const [isLoading, setIsLoading] = useState(true)
  const [department, setDepartment] = useState([])

  useEffect(() => {
    if (!id) {
      return
    }
    const getDepartments = async () => {
      const res = await axios.get(`/api/department/${id}`)
      setDepartment(res.data)
      console.log(res.data)
      setIsLoading(false)
    }

    setIsLoading(true)
    getDepartments()
  }, [id])

  if (isLoading) return <p>Loading ... </p>

  return (
    <>
      <div className='m-4 py-10'>
        {/* <h1 className='text-xl'>Information page </h1> */}
        <h2 className='font-bold'>{department.title}</h2>
        <div className='italic'>{department.name}</div>
      </div>

    {/* Doctors Available */}
    <h3> Choose a Doctor </h3>

{/* Card */}
    <div class="w-full max-w-sm bg-white border border-black rounded-lg shadow ">
        <div class="flex justify-end px-4 pt-4">
            
        </div>
        <div class="flex flex-col items-center pb-10">
            <img class="w-24 h-24 mb-3 rounded-full shadow-lg" src="./images/neuro.jpg" alt="Bonnie image"/>
            <h5 class="mb-1 text-xl font-medium text-gray-900 ">{doctor.name} </h5>
            <span class="text-sm text-gray-500 dark:text-gray-400">{doctor.address}</span>
            <span class="text-sm text-gray-500 dark:text-gray-400">{doctor.experienceYears}</span>
            <span class="text-sm text-gray-500 dark:text-gray-400">{doctor.number}</span>
            <span class="text-sm text-gray-500 dark:text-gray-400"> {doctor.HospitalName} </span>

            <div class="flex mt-4 space-x-3 md:mt-6">
                 {/* <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> Consult Now</a>  */}
                <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Consult Now</a>
            </div>
        </div>
    </div>

    {/* Back */}
      <div className='mb-10'>
        <a
          href='/Admin/info-department'
          className='mx-[30px] rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
        >
          Back{" "}
        </a>

{/* Edit Form Data */}
        <a
          href={`/Doctor/info-dynamic/${id}/edit`}
          className='mx-[30px] rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
        >
          Update
        </a>
      </div>
    </>
  )
}

export default SingleDepartment
