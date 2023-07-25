"use client"
import Head from "next/head"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import NavBar from "../../src/components/NavBar"
import { Eye, FilePlus2, Pencil, User } from "lucide-react"
import Link from "next/link"
import { unstable_getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]"
import prisma from "../../src/db/prisma"

export async function getServerSideProps({ req, res }) {
  const session = await unstable_getServerSession(req, res, authOptions)
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    }
  } else if (session.user.role !== "admin") {
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

  const usersData = await prisma.User.findMany()
  const doctorCount = await prisma.Doctor.findMany()
  const patientCount = await prisma.User.findMany()
  const appointmentCount = await prisma.UserPayment.findMany()

  return {
    props: {
      userData: JSON.parse(JSON.stringify(userData)),
      doctorCount: doctorCount.length || 0,
      patientCount:
        patientCount.filter((_elm) => _elm.role === "patient").length || 0,
      appointmentCountTotal: appointmentCount.length || 0,
      appointmentCountNotVerified:
        appointmentCount.filter((_elm) => _elm.status === "notverified")
          .length || 0,
      appointmentCountVerified:
        appointmentCount.filter((_elm) => _elm.status === "verified").length ||
        0,
      appointmentCountCancelled:
        appointmentCount.filter((_elm) => _elm.status === "canclled").length ||
        0,
      usersData: JSON.parse(JSON.stringify(usersData)).map((_elm) => {
        return {
          ..._elm,
          createdAt: new Date(_elm.createdAt).toLocaleString()
        }
      }),
    },
  }
}
export default function MainPage(props) {
  const router = useRouter()
  const { status, data: session } = useSession()

  typeof window !== "undefined" && localStorage.setItem("role", "admin")


  if (status === "unauthenticated") {
    void router.push("/login")
    return null
  }

  if (status === "loading") return <div>Loading...</div>

  return <Page {...props} />
}

function Page({
  userData,
  doctorCount,
  patientCount,
  appointmentCountNotVerified,
  appointmentCountTotal,
  appointmentCountVerified,
  appointmentCountCancelled,
  usersData
}) {
  console.log(usersData, "@@@")
  const { data: session } = useSession()

  return (
    <>
      <Head>
        <title>Admin Panel </title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
        <link
          rel='spreadsheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css'
        />
      </Head>

      <main className=''>
        <div className=''>
          <NavBar />
        </div>
        <div className='m-7 flex sm:flex-nowrap flex-wrap gap-6 items-center'>
          <a
            className='text-center w-40 h-auto font-bold justify-self-center flex flex-col items-center p-2 border drop-shadow-xl rounded-2xl text-black bg-gray-50 hover:bg-gray-200'
            href='Admin/EditAdmin'
          >
            {userData?.image ? (
              <img
                className='rounded-2xl bg-contain w-40'
                src={userData?.image ? "/uploads/" + userData.image : ""}
                width={100}
                height={100}
                alt='images'
              />
            ) : (
              <User className='text-center h-16 capitalize' />
            )}
            <span className='mt-2'>{userData.name}</span>
          </a>
          <div className='w-full grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-3'>
            <div class='bg-white p-3 h-20 rounded-xl shadow-xl flex gap-3 items-center justify-between'>
              <div class='flex items-center'>
                <div>
                  <p class='font-semibold text-base m-0 uppercase'>
                    Total Doctors
                  </p>
                </div>
              </div>
              <div class='flex items-center'>
                <p class='text-blue-600 font-semibold text-4xl m-0'>
                  {doctorCount}
                </p>
              </div>
            </div>
            <div class='bg-white p-3 h-20 rounded-xl shadow-xl flex gap-3 items-center justify-between'>
              <div class='flex items-center'>
                <div>
                  <p class='font-semibold text-base m-0 uppercase'>
                    Total Patients
                  </p>
                </div>
              </div>
              <div class='flex items-center'>
                <p class='text-black-600 font-semibold text-4xl m-0'>
                  {patientCount}
                </p>
              </div>
            </div>

            <div class='bg-white p-3 h-20 rounded-xl shadow-xl flex gap-3 items-center justify-between'>
              <div class='flex items-center'>
                <div>
                  <p class='font-semibold text-base m-0 uppercase'>
                    Total Appointments
                  </p>
                </div>
              </div>
              <div class='flex items-center'>
                <p class='text-green-600 font-semibold text-4xl m-0'>
                  {appointmentCountTotal}
                </p>
              </div>
            </div>
            <div class='bg-white p-3 h-20 rounded-xl shadow-xl flex gap-3 items-center justify-between'>
              <div class='flex items-center'>
                <div className='text-ellipsis overflow-hidden'>
                  <p class='font-semibold text-base m-0 uppercase'>
                    Total Cancelled appointments
                  </p>
                </div>
              </div>
              <div class='flex items-center'>
                <p class='text-red-600 font-semibold text-4xl m-0'>
                  {appointmentCountCancelled}
                </p>
              </div>
            </div>
            <div class='bg-white p-3 h-20 rounded-xl shadow-xl flex gap-3 items-center justify-between'>
              <div class='flex items-center'>
                <div>
                  <p class='font-semibold text-base m-0 uppercase'>
                    Total Verified appointments
                  </p>
                </div>
              </div>
              <div class='flex items-center'>
                <p class='text-gray-600 font-semibold text-4xl m-0'>
                  {appointmentCountVerified}
                </p>
              </div>
            </div>
            <div class='bg-white p-3 h-20 rounded-xl shadow-xl flex gap-3 items-center justify-between'>
              <div class='flex items-center'>
                <div>
                  <p class='font-semibold text-base m-0 uppercase'>
                    Total Not Verified appointments
                  </p>
                </div>
              </div>
              <div class='flex items-center'>
                <p class='text-yellow-600 font-semibold text-4xl m-0'>
                  {appointmentCountNotVerified}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard */}
        <div className='mt-10'>
          <h2 className='m-7 text-2xl font-bold'> Dashboard </h2>{" "}
          <div className='md:flex-row m-7 flex flex-col flex-wrap gap-3'>
            {/* Styled Funtion */}
            <Link
              className='w-full sm:w-[300px] font-bold justify-self-center flex flex-col gap-4 items-center px-10 py-20 border drop-shadow-xl rounded-md text-blue-800 bg-white hover:bg-indigo-600 hover:text-white'
              href='Admin/hospital'
            >
              <FilePlus2 className='text-center' />
              Hospitals
            </Link>

            <Link
              className='w-full sm:w-[300px] font-bold justify-self-center flex flex-col gap-4 items-center px-10 py-20 border drop-shadow-xl rounded-md text-blue-800 bg-white hover:bg-indigo-600 hover:text-white'
              href='Admin/department'
            >
              <Pencil className='text-center' />
              Departments
            </Link>

            <Link
              className='w-full sm:w-[300px] font-bold justify-self-center flex flex-col gap-4 items-center px-10 py-20 border drop-shadow-xl rounded-md text-blue-800 bg-white hover:bg-indigo-600 hover:text-white'
              href='Admin/doctor/new'
            >
              <Eye className='text-center' />
              Register Doctor
            </Link>

            <Link
              className='w-full sm:w-[300px] font-bold justify-self-center flex flex-col gap-4 items-center px-10 py-20 border drop-shadow-xl rounded-md text-blue-800 bg-white hover:bg-indigo-600 hover:text-white'
              href='Admin/EditAdmin'
            >
              <Eye className='text-center' />
              Edit Profile
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
