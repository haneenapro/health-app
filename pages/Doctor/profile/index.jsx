import { useSession } from "next-auth/react"
import Head from "next/head"

const Profile = () => {
  const { status, data: session } = useSession()

  if (status === "loading") return <p>Loading ...</p>
  return (
    <>
      <Head>
        <title>User profile</title>
      </Head>

      <body className='max-w-7xl mx-auto'>
        <h2>User profile</h2>

        <div>
          <p>Name: {session?.user?.name}</p>
          <p>Email: {session?.user?.email}</p>
        </div>
      </body>
    </>
  )
}

export default Profile
