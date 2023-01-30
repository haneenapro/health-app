import Head from "next/head"
import Button from "../../components/ui/Button"
import { NextPage } from "next"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/router"
import NavBar from "../../src/components/NavBar"

export default function MainPage() {
  const router = useRouter()
  const { status, data: session } = useSession()

  if (status === "loading") return <div>Loading...</div>

  if (status === "unauthenticated") {
    router.push("/login")
    return null
  }

  console.log(session.user.role)
  if (session.user.role === "doctor") {
    void router.push("/Doctor")
    return null
  }

  return <Page />
}

function Page() {
  return (
    <>
      <Head>
        <title>Welcome Page</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className=''>
        <div className=''>
          <NavBar />
        </div>

        <div className='p-10 '>
          <h1> Welcome User!!! </h1>
        </div>

        <h2> Dashboard </h2>

        <div className='flex gap-1 m-7'>
          <a
            className='group relative flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
            href='Patients/question/new'
          >
            {" "}
            Consult a Doctor
          </a>

          <a
            className='group relative flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
            href='Patients/question'
          >
            {" "}
            View Question/Answer
          </a>

          <a
            className='group relative flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
            href='/Patients/info-dynamic'
          >
            {" "}
            View Blog Information
          </a>
        </div>
      </main>
    </>
  )
}
