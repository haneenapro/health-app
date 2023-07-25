import { useSession } from "next-auth/react"
import Head from "next/head"
import NavBar from "../../../src/components/NavBar"
import { unstable_getServerSession } from "next-auth"
import { authOptions } from "../../api/auth/[...nextauth]"
import axios from "axios"
import { getTimeHelper } from "../../../components/helper/getTimerAlert"

export async function getServerSideProps({ req, res }) {

  const hospitals = await prisma.hospital.findMany({
    include: {
      doctors: true,
      departments: true
    }
  })

  const session = await unstable_getServerSession(req, res, authOptions)
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  const userData = await prisma.User.findUnique({
    where: { id: session.user.id },
    include: {
      Payment: {
        select: {

          doctor: true,
          User: true,
          id: true,
          department: true,
          status: true,
          hospital: true,
          availableTime: {
            select: {
              id: true,
              token: true,
              date: true,
              amount: true,
            },
          },
          appointmentType: true,
          link: true
        }
      }
    }
  })

  return {
    props: {
      hospitals: JSON.parse(JSON.stringify(hospitals)),
      userData: JSON.parse(JSON.stringify(userData))
    },
  }
}

const Profile = ({ userData }) => {
  const { status, data: session } = useSession()

  const _getLocalData = typeof window !== "undefined" && localStorage.getItem("role")
  if(_getLocalData && _getLocalData ==="patient") {
    const _getLocalDataUserId = typeof window !== "undefined" && localStorage.getItem("user") 
    if(_getLocalDataUserId) {
      getTimeHelper(_getLocalDataUserId)
    }
  }

  async function verifyUser(_data) {
    await axios
      .post(`/api/share`, {
        id: _data.id,
        email: _data.User.email,
        flag: "cancle",
      })
      .then((res) => {
        if (res.status === 200) {
          alert("User verified successfully")
          window.location.reload(false)
        } else {
          alert("Something went wrong")
        }
      })
      .catch((err) => {
        alert("Something went wrong")
      })
  }

  if (status === "loading") return <p>Loading ...</p>
  return (
    <>

      <NavBar />

      <div className="container mx-auto mt-6">
        <h2>User profile</h2>

        <div>
          <p>Name: {session?.user?.name}</p>
          <p>Email: {session?.user?.email}</p>
        </div>
        <div className=' flex items-center justify-left gap-x-6'>
          <a
            href='/Patients'
            className='text-base font-semibold leading-7 text-gray-900'
          >
            <span aria-hidden='true'>←</span> Back
          </a>
        </div>

        <div className="mt-6">
          <h3 className="font-bold">Appointments</h3>
          <div class="relative overflow-x-auto">
            <table class="w-full text-sm text-left text-gray-600">
              <thead class='text-xs text-gray-700 uppercase border-b-2 border-gray-700'>
                <tr>
                  <th class='px-6 py-3'>ID</th>
                  <th class='px-6 py-3'>Paitent Name</th>
                  <th class='px-6 py-3'>Hospital Name</th>
                  <th class='px-6 py-3'>Department Name</th>
                  <th class='px-6 py-3'>Date/Time</th>
                  <th class='px-6 py-3'>Appointment Type</th>
                  <th class='px-6 py-3'>Link</th>
                  <th class='px-6 py-3'>Status</th>
                  <th class='px-6 py-3 text-center'>Action</th>
                </tr>
              </thead>
              <tbody>
                {userData.Payment.length > 0
                  ? userData.Payment.map((_elm) => (
                    <tr className='border-b border-gray-500'>
                      <th class='px-6 py-3'>{_elm?.id}</th>
                      <th class='px-6 py-3'>{_elm?.User.name}</th>
                      <th class='px-6 py-3'>{_elm?.hospital.name}</th>
                      <th class='px-6 py-3'>{_elm?.department.name}</th>
                      <th class='px-6 py-3'>{_elm?.availableTime.date}</th>
                      <th class='px-6 py-3'>{_elm?.appointmentType}</th>
                      <th class='px-6 py-3'>{_elm?.link ? _elm.link : "N/A"}</th>
                      <th class='px-6 py-3'>{_elm?.status}</th>
                      <th class='px-6 py-3 text-center'>
                        {
                          _elm.status === "notverified" ? <button onClick={() => verifyUser(_elm)} className='bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white p-1 px-2 border border-red-500 hover:border-transparent rounded'>Cancle</button> : ''
                        }
                      </th>
                    </tr>
                  ))
                  : "No appoinments found"}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
