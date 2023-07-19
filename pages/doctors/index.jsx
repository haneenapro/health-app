import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Image from "next/image"
import axios from "axios"
import NavBar from "../../src/components/NavBar"

const index = () => {
  let router = useRouter()
  const hospital_id = router.query?.hospital_id
  const department_id = router.query?.department_id
  console.log(department_id,"@@@@");

  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!department_id || !hospital_id) {
      return
    }
    const getDoctors = async () => {
      const res = await axios.get(
        `/api/hospital/doctor?department_id=${department_id}&hospital_id=${hospital_id}`
      )
      setData(res.data)
      setIsLoading(false)
    }

    setIsLoading(true)
    getDoctors()
  }, [hospital_id, department_id])

  if (isLoading) return <p>Loading ... </p>
  console.log(data, "@@@")
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

  var path="https://uat.esewa.com.np/epay/main";

  function paymentHandler(element) {
    var form = document.createElement("form");
      form.setAttribute("method", "POST");
      form.setAttribute("action", path);

      var params = {
        amt: element.amount,
        psc: 0,
        pdc: 0,
        txAmt: 0,
        tAmt: element.amount,
        pid: element.id,
        scd: "EPAYTEST",
        su: "http://merchant.com.np/page/esewa_payment_success",
        fu: "http://localhost:3000/payment/failed"
    }

      for (var key in params) {
          var hiddenField = document.createElement("input");
          hiddenField.setAttribute("type", "hidden");
          hiddenField.setAttribute("name", key);
          hiddenField.setAttribute("value", params[key]);
          form.appendChild(hiddenField);
      }

      document.body.appendChild(form);
      form.submit();
  }

  return (
    <>
      <NavBar />
      <div className='container mx-auto'>
      <h2 className='m-7 text-2xl font-bold'> Available Doctors </h2>{" "}
        <div className='rounded m-4 p-4'>
          <div className='flex items-center justify-end'>
            <div className=''>
              <label for=''>Filter: </label>
              <input
                id='search'
                type='search'
                className='bg-purple-white shadow rounded border-0 p-2'
                placeholder='Search by name...'
                onKeyUp={() => Search()}
              />
            </div>
          </div>
          <ul
            className=''
            id={`doctors`}
          >
            {data?.length > 0 ? (
              data?.map((o, i) => {
                console.log(o,"@@@");
                let _department = o.departments.find((_elm)=> _elm.id == department_id)
                return (
                  <li
                    className='shadow-lg overflow-hidden rounded p-4 my-2 w-100 bg-slate-100 border border-slate-200'
                    key={i}
                  >
                    <div className='flex items-center justify-between flex-wrap'>
                      <div className='flex gap-14'>

                        <img
                          className='rounded-full'
                          src={o?.image ? o.image : "https://api.mero.doctor/images/doctor_male.png"}
                          alt={"Image"}
                          width={150}
                          height={150}
                        />
                        <div className='p-2'>
                          <h4 className='text-2xl font-bold'>{o?.name}</h4>
                          <p className="m-0">
                            <b className='text-black font-medium'>
                              Experiences:{" "}
                            </b>
                            {o?.experience}
                          </p>
                          <br></br>
                          <p className="m-0">
                            <b className='text-black font-medium'>
                              Qualification:{" "}
                            </b>{" "}
                            {o?.qualification}
                          </p>
                          <br></br>
                          <p className="m-0">
                            <b className='text-black font-medium'>
                              Department:{" "}
                            </b>{" "}
                            {_department.name}
                          </p>

                        </div>
                      </div>
                      <div className=" overflow-x-auto w-full md:w-[800px] border border-slate-200">
                        <table className="w-full">
                          <thead class="text-xs text-gray-700 uppercase border-b-2 border-gray-700">
                            <tr>
                              <th class="px-6 py-3">Date</th>
                              <th class="px-6 py-3">Token</th>
                              <th class="px-6 py-3">Amount</th>
                              <th class="px-6 py-3 text-end">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {o.schedules.length > 0 ?
                              o.schedules
                                .filter(
                                  (_filter) =>
                                    _filter.hospitalId === Number(hospital_id) && _filter.departmentId === Number(department_id)
                                )
                                .map((_elm) => {
                                  return _elm.date.map((elm) => (
                                    <tr className="border-b border-gray-500">
                                      <th class="px-6 py-3">{elm?.date}</th>
                                      <th class="px-6 py-3">{elm?.token}</th>
                                      <th class="px-6 py-3">{elm?.amount}</th>
                                      <th class="px-6 py-3 text-end"><button className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-1 border border-blue-500 hover:border-transparent rounded' onClick={(e)=>paymentHandler(elm)}>
                                        Book Appointment
                                      </button></th>
                                    </tr>
                                  ))
                                }) : "No schedule found"}
                          </tbody>
                        </table>
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

