import Head from "next/head"
import Button from "../../components/ui/Button"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/router"
import NavBar from "../../src/components/NavBar"
import { BookOpen, Eye, FilePlus2, Pencil, User } from "lucide-react"
import Link from "next/link"

export default function MainPage() {
  const router = useRouter()
  const { status, data: session } = useSession()


  if (status === "unauthenticated") {
    router.push("/login")
    return null
  }

  if (session?.user.role === 'patient') {
    router.push("/Patients")
    return null
  }

  if (session?.user.role === 'doctor') {
    router.push("/Doctor")
    return null
  }

  if (status === "loading") return <div>Loading...</div>

  return <Page />
}

function Page() {
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
        <div className='m-7'>
          <a
            className='text-center w-32 h-32 font-bold justify-self-center flex flex-col items-center px-4 py-4 border drop-shadow-xl rounded-full text-black bg-gray-50 hover:bg-gray-200'
            href='Doctor/profile'
          >
            <User className='text-center h-16' />
            {session.user.name}
          </a>
        </div>

        {/* Dashboard */}
        <div className='mt-10'>
          <h2 className='m-7 text-2xl font-bold'> Dashboard </h2>{" "}
          <div className='md:flex-row m-7 flex flex-col flex-wrap gap-3'>
            {/* Styled Funtion */}
            <Link
              className='font-bold justify-self-center flex flex-col gap-4 items-center px-10 py-20 border drop-shadow-xl rounded-md text-blue-800 bg-white hover:bg-indigo-600 hover:text-white'
              href='Admin/hospital'
            >
              <FilePlus2 className='text-center' />
              Hospitals
            </Link>

            <Link
              className='font-bold justify-self-center flex flex-col gap-4 items-center px-10 py-20 border drop-shadow-xl rounded-md text-blue-800 bg-white hover:bg-indigo-600 hover:text-white'
              href='Admin/department'
            >
              <Pencil className='text-center' />
              Departments
            </Link>

            <Link
              className='font-bold justify-self-center flex flex-col gap-4 items-center px-10 py-20 border drop-shadow-xl rounded-md text-blue-800 bg-white hover:bg-indigo-600 hover:text-white'
              href='Admin/doctor/new'
            >
              <Eye className='text-center' />
              Register Doctor
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
