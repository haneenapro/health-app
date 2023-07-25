"use client"
// to fetch and display all information titles and little information

import axios from "axios"
import React, { useEffect, useState } from "react"
import NavBar from "../../src/components/NavBar"
import Link from "next/link"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import { getTimeHelper } from "../../components/helper/getTimerAlert"

const HospitalList = () => {
  // api route -- get all informations
  const [isLoading, setIsLoading] = useState(false)
  const [informations, setInformations] = useState([])
  const [searchValue, setSearchValue] = useState("")
  const router = useRouter()
  const { status, data: session } = useSession()

  const _getLocalData = typeof window !== "undefined" && localStorage.getItem("role")
  if(_getLocalData && _getLocalData ==="patient") {
    const _getLocalDataUserId = typeof window !== "undefined" && localStorage.getItem("user")
    if(_getLocalDataUserId) {
      getTimeHelper(_getLocalDataUserId)
    }
  }


  if (status === "unauthenticated") {
    router.push("/login")
    return null
  }


  useEffect(() => {
    const getHospitals = async () => {
      const res = await axios.get("/api/hospital")
      setInformations(res.data)
      setIsLoading(false)
    }

    setIsLoading(true)
    getHospitals()
  }, [])

  if (isLoading) return <p>Loading ... </p>

  if (status === "loading") return <div>Loading...</div>
  return (
    <>
      <NavBar />

      <div className="container mx-auto">
        {/* Hospital List */}
        <div class="mb-5 flex justify-between mt-8">
          <h1 class="font-bold text-xl"> Choose Hospitals </h1>

          {/* <!-- Search Bar --> */}

          <form>
            <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div class="relative ">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Hospital Names ..."
                onChange={(e) => setSearchValue(e.target.value)} />
              {/* <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}
            </div>
          </form>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-2 md:px-0">
          {/* <!-- Card --> */}
          {informations?.filter(value => value.name.toLowerCase().includes(searchValue.toLowerCase())).map((_hospital, _index) => (
            <div class="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-white dark:border-gray-700 flex flex-col items-start justify-between p-2">
              <a href="#" class="mx-auto">
                <img
                  className='rounded'
                  src={_hospital?.image ? '/uploads/' + _hospital.image : ""}
                  width={100}
                  height={100}
                  alt='images'
                />
              </a>
              <div class="p-5">
                <a href="#">
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black"> {_hospital.name} </h5>
                </a>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{_hospital.description}</p>
                <Link href={`/department?hospital_id=${_hospital.id}`} class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-indigo-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-black-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Book an Appointment
                  <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default HospitalList
