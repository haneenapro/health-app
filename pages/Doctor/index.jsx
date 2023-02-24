import Head from "next/head"
import Button from "../../components/ui/Button"
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

  if (session.user.role === "patient") {
    void router.push("/Patients")
    return null
  }

  return <Page />
}

function Page() {
  const { data: session } = useSession()

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
          <h1 className='text-4xl'> Welcome Dr. {session.user.name} !!! </h1>
        </div>

        <div className='m-7'>
          <h2> Dashboard </h2>{" "}
        </div>

        <div className='md:flex-row m-7 flex flex-col flex-wrap gap-3'>
          <a
            className='group relative flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
            href='Doctor/question'
          >
            Answer the Questions
          </a>

          <a
            className='group relative flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
            href='Doctor/info-dynamic/new'
          >
            Add Information to Blog
          </a>

          <a
            className='group relative flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
            href='Doctor/info-dynamic'
          >
            View Blog Information
          </a>
        </div>
      </main>
    </>
  )
}
