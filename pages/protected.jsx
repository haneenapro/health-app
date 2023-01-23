import { useSession } from "next-auth/react"

const Protected = () => {
  const session = useSession()
  console.log(session)

  return <div>This page is protected for special people.</div>
}

export default Protected
