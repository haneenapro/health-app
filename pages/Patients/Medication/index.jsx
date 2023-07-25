import { unstable_getServerSession } from "next-auth"
import React, { useEffect, useState } from "react"
import { authOptions } from "../../api/auth/[...nextauth]"
import NavBar from "../../../src/components/NavBar"
import Link from "next/link"
import { FilePlus2 } from "lucide-react"

export async function getServerSideProps({ req, res }) {
  const session = await unstable_getServerSession(req, res, authOptions)
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    }
  } else if (session.user.role !== "patient") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  const userData = await prisma.User.findUnique({
    where: { id: session.user.id },
  })

  return {
    props: {
      userData: JSON.parse(JSON.stringify(userData)),
    },
  }
}

const MedicationLists = ({ userData }) => {
  const [dataLists, setDataLists] = useState([])
  const _getLocalData =
    typeof window !== "undefined" && localStorage.getItem(userData.id)
  useEffect(() => {
    if (_getLocalData) {
      setDataLists(JSON.parse(_getLocalData))
    }
  }, [_getLocalData])

  function handleDelete(_index) {
    let _dataDeleted = dataLists.filter((_elm, _idx) => _index !== _idx)
    if (_dataDeleted.length > 0) {
      localStorage.setItem([userData.id], JSON.stringify(_dataDeleted))
      setDataLists(_dataDeleted)
    } else {
      localStorage.removeItem([userData.id])
      setDataLists([])
    }
  }
  console.log(dataLists, "@@@")
  return (
    <>
      <NavBar />

      <div className='container mx-auto mt-6'>
        <h2>Medication Plan Lists</h2>
        <div className=' flex items-center justify-between gap-x-6'>
          <Link
            href='/Patients'
            className='text-base font-semibold leading-7 text-gray-900'
          >
            ← Back
          </Link>
          <Link
            className='flex items-center gap-2 group relative justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 float-right'
            href='/Patients/Medication/new'
          >
            <FilePlus2 className='text-center' />
            Add Medication Plan
          </Link>
        </div>

        <div className='mt-6'>
          <div class='relative overflow-x-auto'>
            <table class='w-full text-sm text-left text-gray-600'>
              <thead class='text-xs text-gray-700 uppercase border-b-2 border-gray-700'>
                <tr>
                  <th class='px-6 py-3'>SN</th>
                  <th class='px-6 py-3'>Name</th>
                  <th class='px-6 py-3'>Dosages</th>
                  <th class='px-6 py-3'>Frequency</th>
                  <th class='px-6 py-3'>Description</th>
                  <th class='px-6 py-3'>Status</th>
                  <th class='px-6 py-3'>Times</th>
                  <th class='px-6 py-3 text-center'>Action</th>
                </tr>
              </thead>
              <tbody>
                {dataLists.length > 0 ? (
                  dataLists.map((_elm, _index) => (
                    <tr className='border-b border-gray-500 text-black' key={_index}>
                      <th class='px-6 py-3'>{_index + 1}</th>
                      <th class='px-6 py-3'>{_elm?.name}</th>
                      <th class='px-6 py-3'>{_elm?.dosages}</th>
                      <th class='px-6 py-3'>{_elm?.frequency}</th>
                      <th class='px-6 py-3'>{_elm?.description}</th>
                      <th class='px-6 py-3'>{_elm?.status}</th>
                      <th class='px-6 py-3'>
                        {_elm.times.map((_elm) => (
                            <p className="border-b-slate-900 m-0 py-2 text-black">{new Date(_elm).toLocaleString()}</p>
                        ))}
                      </th>
                      <th class='px-6 py-3 text-center'>
                        <Link
                          href={`/Patients/Medication/${_index}`}
                          className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white p-1 px-2 border border-blue-500 hover:border-transparent rounded'
                        >
                          Edit
                        </Link>
                        <button
                          className='ml-2 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white px-2 border border-red-500 hover:border-transparent rounded'
                          onClick={(e) => handleDelete(_index)}
                        >
                          Delete
                        </button>
                      </th>
                    </tr>
                  ))
                ) : (
                  <tr className='border-b border-gray-500'>
                    <th>No Plans Listed</th>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default MedicationLists
