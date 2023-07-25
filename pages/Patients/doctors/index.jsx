import prisma from "../../../src/db/prisma"
import NavBar from "../../../src/components/NavBar"
import { getTimeHelper } from "../../../components/helper/getTimerAlert"

export const getServerSideProps = async () => {
  const doctors = await prisma.doctor.findMany()

  return {
    props: {
      doctors: JSON.parse(JSON.stringify(doctors))
    },
  }
}

const DoctorsList = ({ doctors }) => {
  const _getLocalData = typeof window !== "undefined" && localStorage.getItem("role")
  if(_getLocalData && _getLocalData ==="patient") {
    const _getLocalDataUserId = typeof window !== "undefined" && localStorage.getItem("user")
    if(_getLocalDataUserId) {
      getTimeHelper(_getLocalDataUserId)
    }
  }
  return (
    <>
      <NavBar />
      <div className='mt-[30px] ml-[30px]'>
        <h1 className='text-4xl'>Doctors Details </h1>

        <div className='flex flex-col gap-4      '>
          {doctors.map((doc) => {
            return (
              <div className='shadow-sm border p-2'>
                <p className='text-2xl font-bold'>{doc.name}</p>

                <span>{doc.email}</span>
              </div>
            )
          })}
        </div>
        <div className=' flex items-center justify-left gap-x-6 mt-3'>
          <a
            href='/Patients'
            className='text-base font-semibold leading-7 text-gray-900'
          >
            <span aria-hidden='true'>←</span> Back
          </a>
        </div>

        {/*  */}
      </div>
    </>
  )
}

export default DoctorsList
