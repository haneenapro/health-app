import { useSession } from "next-auth/react"
import Head from "next/head"
import NavBar from "../../../src/components/NavBar"

const Profile = () => {
  const { status, data: session } = useSession()

  if (status === "loading") return <p>Loading ...</p>
  return (
    <>
      <Head>
        <title>User profile</title>
      </Head>
      <NavBar />

      <body className='max-w-7xl mx-auto mt-[30px] pb-[30px]'>
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
      </body>
    </>
  )
}

export default Profile
