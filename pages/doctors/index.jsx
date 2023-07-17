import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Image from "next/image"
import axios from "axios"
import NavBar from "../../src/components/NavBar"

const index = () => {
  let router = useRouter()
  console.log(router, "@@");
  const hospital_id = router.query?.hospital_id
  const department_id = router.query?.department_id

  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!department_id || !hospital_id) {
      return
    }
    const getDoctors = async () => {
      const res = await axios.get(`/api/hospital/doctor?department_id=${department_id}&hospital_id=${hospital_id}`)
      setData(res.data)
      setIsLoading(false)
    }

    setIsLoading(true)
    getDoctors()
  }, [hospital_id, department_id])

  if (isLoading) return <p>Loading ... </p>

  const Search = () => {
    // Declare variables
    var input, filter, ul, li, a, i, txtValue
    input = document.getElementById("search")
    filter = input.value.toUpperCase()
    ul = document.getElementById("doctors")
    li = ul.getElementsByTagName("li")

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("h4")[0]
      txtValue = a.textContent || a.innerText
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = ""
      } else {
        li[i].style.display = "none"
      }
    }
  }

  return (
    <>
      <NavBar />
    <div className="container mx-auto">
    <div className='rounded m-4 p-4'>
        <div className='flex items-center justify-end'>
          <div className=''>
            <label for="">Filter: </label>
            <input
              id='search'
              type='search'
              className='bg-purple-white shadow rounded border-0 p-2'
              placeholder='Search by name...'
              onKeyUp={() => Search()}
            />
          </div>
        </div>
        <ul className='flex flex-col items-center justify-center' id={`doctors`}>
          {data?.length > 0 ? (
            data?.map((o, i) => {
              return (
                <li
                  className='shadow-lg overflow-hidden rounded p-4 my-2'
                  key={i}
                >
                  <div className='flex flex-wrap items-center justify-center'>
                    <div className='grow md:flex-1 lg:flex-1 p-4'>
                      <Image
                        className='rounded-full'
                        src={o?.image ? o.image : ""}
                        alt={"Image"}
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className='grow md:flex-1 lg:flex-1 flex flex-col p-2'>
                      <h4 className='text-bold my-2'>{o?.name}</h4>
                      <p className='my-0 font-normal text-sm'>
                        <span>
                          <b className='text-black font-medium'>Experiences: </b>
                          {o?.experience}
                        </span>
                        <br></br>
                        <span>
                          <b className='text-black font-medium'>
                            Qualification:{" "}
                          </b>{" "}
                          {o?.qualification}
                        </span>
                        <br></br>
                        <span>
                          <b className='text-black font-medium'>Department: </b>{" "}
                          {o?.department}
                        </span>
                      </p>
                    </div>
                    <div className='grow md:flex-1 lg:flex-1 flex flex-col'>
                      <h4 className='text-bold text-sm my-2'>
                        Date: {o?.schedule_time?.date}
                      </h4>
                      <p className='text-sm'>
                        <span>
                          <b className='text-black text-sm font-medium'>
                            Morning :
                          </b>{" "}
                          {o?.schedule_time?.available_time?.morning
                            ? o?.schedule_time?.available_time?.morning
                            : " - "}
                        </span>
                        <br></br>
                        <span>
                          <b className='text-black text-sm font-medium'>Day :</b>{" "}
                          {o?.schedule_time?.available_time?.day
                            ? o?.schedule_time?.available_time?.day
                            : " - "}
                        </span>
                        <br></br>
                        <span>
                          <b className='text-black text-sm font-medium'>
                            Evening :
                          </b>{" "}
                          {o?.schedule_time?.available_time?.evening
                            ? o?.schedule_time?.available_time?.evening
                            : " - "}
                        </span>
                      </p>
                    </div>
                    <div className='grow md:flex-1 lg:flex-1 text-center'>
                      <button className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>
                        Appointment
                      </button>
                    </div>
                  </div>
                </li>
              )
            })
          ) : (
            <div className='text-sm'>No data available</div>
          )}
        </ul>
      </div>
    </div>
    </>
  )
}

export default index