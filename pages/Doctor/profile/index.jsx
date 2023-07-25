import { useSession } from "next-auth/react"
import Head from "next/head"
import NavBar from "../../../src/components/NavBar"
import { unstable_getServerSession } from "next-auth"
import prisma from "../../../src/db/prisma"
import { authOptions } from "../../api/auth/[...nextauth]"
import Link from "next/link"
import axios from "axios"

export async function getServerSideProps({ req, res }) {
  const session = await unstable_getServerSession(req, res, authOptions)
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }
  const doctors = await prisma.Doctor.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      User: true,
      UserPayment: {
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
        },
      },
    },
  })

  return {
    props: {
      doctors: JSON.parse(JSON.stringify(doctors[0])),
    },
  }
}

const Profile = ({ doctors }) => {
  const { status, data: session } = useSession()
  console.log(doctors, '@@');

  async function verifyUser(_data) {
    await axios
      .post(`/api/share`, {
        email: _data.User.email,
        schedule: _data.availableTime.date,
        doctor: _data.doctor.name,
        hospital: _data.hospital.name,
        user: _data.User.name,
        department: _data.department.name,
        id: _data.id
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
      <Head>
        <title>User profile</title>
      </Head>
      <NavBar />
      <div className='container mx-auto mt-5'>
        <Link href="/Doctor" aria-hidden='true' className='float-right'>
          ← Back
        </Link>
        <div className='mt-5'>
          <h2>Profile</h2>
          <div>
            <p>
              <strong>Name: </strong>
              {session?.user?.name}
            </p>
            <p>
              <strong>Email:</strong> {session?.user?.email}
            </p>
          </div>
          <div className='flex items-center justify-left gap-x-6'>
            <a
              href='/Patients'
              className='text-base font-semibold leading-7 text-gray-900'
            ></a>
          </div>
        </div>
        <div>
          <h3 className="font-bold">User Schedules</h3>

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
                  <th class='px-6 py-3'>Statuss</th>
                  <th class='px-6 py-3'>Link</th>
                  <th class='px-6 py-3 text-center'>Action</th>
                </tr>
              </thead>
              <tbody>
                {doctors.UserPayment.length > 0
                  ? doctors.UserPayment.map((_elm) => (
                    <tr className='border-b border-gray-500'>
                      <th class='px-6 py-3'>{_elm?.id}</th>
                      <th class='px-6 py-3'>{_elm?.User?.name}</th>
                      <th class='px-6 py-3'>{_elm?.hospital.name}</th>
                      <th class='px-6 py-3'>{_elm?.department.name}</th>
                      <th class='px-6 py-3'>{_elm?.availableTime.date}</th>
                      <th class='px-6 py-3'>{_elm?.appointmentType}</th>
                      <th class='px-6 py-3'>{_elm?.status}</th>
                      <th class='px-6 py-3'>{_elm?.link ? _elm.link : "N/A"}</th>
                      <th class='px-6 py-3 text-center'>
                        {(_elm?.appointmentType === "online" && _elm.status === "notverified" && _elm.status !== "canclled") ? <Link href={`/Doctor/Share?user=${_elm.id}`} className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white p-1 px-2 border border-blue-500 hover:border-transparent rounded'>
                          Share Meet Link
                        </Link> : ""}
                        {(_elm.appointmentType === "offline" && _elm.status === "notverified" && _elm.status !== "canclled") ? <button onClick={() => verifyUser(_elm)} className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white p-1 px-2 border border-blue-500 hover:border-transparent rounded'>Verify</button> : ""}
                      </th>
                    </tr>
                  ))
                  : "No schedule found"}
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
