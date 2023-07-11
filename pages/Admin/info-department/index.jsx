// to fetch and display all information titles and little information

import axios from "axios"
import React, { useEffect, useState } from "react"
import NavBar from "../../../src/components/NavBar"

const DepartmentList = () => {
  // api route -- get all informations
  const [isLoading, setIsLoading] = useState(false)
  const [departments, setDepartments] = useState([])

  useEffect(() => {
    const getDepartments = async () => {
      const res = await axios.get("/api/department")
      setDepartments(res.data)
      setIsLoading(false)
      console.log(res, "Saran");
    }
 
    // const getDepartments = async () => {
    //     const res = await axios.get("/api/department")
    //    console.log(res, "Saran");
    //   }

    getDepartments();

    setIsLoading(true)
    // getInformations()
  }, [])

  if (isLoading) return <p>Loading ... </p>

  // console.log(informations)

  const handleDelete = async (id) => {
    await axios.delete(`/api/department/${id}`)
    const updatedDepartments = departments.filter((info) => info.id !== id)
    setDepartments(updatedDepartments)
    alert("One item deleted!!")
  }

  return (
    <>
      <NavBar />
      <div className='m-12 md:mx-24 md:my-2 py-5 md:py-10 '>
        <h1 className='text-[24px] md:text-[48px] font-semibold pb-12'>
          All Departments{" "}
        </h1>

        {departments.map((department, i) => (
            <React.Fragment>
                <a
              href={`info-department/${department.id}`}
              key={i}
              className='block mx-5 my-2 shadow border text-xl p-4 mb-10'
            > 
            
              <div class="w-full max-w-sm bg-white border border-black rounded-lg shadow ">
              <div class="flex justify-end px-4 pt-4">
                  
              </div>
              <div class="flex flex-col items-center pb-10">
                  <img class="w-24 h-24 mb-3 rounded-full shadow-lg" src={department?.image} alt="Bonnie image"/>
                  <h5 class="mb-1 text-xl font-medium text-gray-900 ">{department?.name} </h5>
                  <span class="text-sm text-gray-500 ">{department.doctorsAvailable ? department.doctorsAvailable : "N/A"}</span>

                  <div class="flex mt-4 space-x-3 md:mt-6">
                      <a href="#" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Consult Now</a>
                  </div>
              </div>
              </div>
            </a>

            {/* <a
              href={`info-dynamic/${department.id}`}
              key={i}
              className='block mx-5 my-2 shadow border text-xl p-4 mb-10'
            >
              <div className='text-xl md:text-2xl font-semibold'>
                {department.name}
              </div>
              <div className='text-sm md:text-[18px]'>
                {department?.doctorsAvailable ? department.doctorsAvailable : "N/A"}{" "}
              </div>
            </a> */}
            <button
              onClick={() => handleDelete(department.id)}
              className='mx-[30px] rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 '
            >
              Delete
            </button>
            </React.Fragment>
        ))}
        <div className='mt-[20px] mx-[30px]'>
          <a
            href='/Admin'
            className='rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 '
          >
            Back
          </a>
        </div>
      </div>
    </>
  )
}

export default DepartmentList
