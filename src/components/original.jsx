import { useSession, signOut } from "next-auth/react"

const NavBar = () => {
  const { status, data } = useSession()

  console.log(data)

  return (
    <div className='bg-black'>
      <nav className='flex space-x-6 md:space-x-96 px-10 py-5 text-white font-bold mx-[100px]'>
        <div>
          <a href='' className=''>
            HCS
          </a>
        </div>

        <div className='flex'>
          <ul className='flex space-x-3 md:space-x-10'>
            <li className=''>
              <a href='/' className=''>
                Home
              </a>
            </li>

            <li className=''>
              <a href='/about-us' className=''>
                About
              </a>
            </li>

            <li className=''>
              <a href='/info-dynamic' className=''>
                Information
              </a>
            </li>

            {status === "loading" ? (
              <p>Loading ... </p>
            ) : status === "authenticated" ? (
              <div>
                <li className=''>
                  <a
                    href={data.user.role === "doctor" ? "/Doctor" : "/Patients"}
                    className=''
                  >
                    Go to dashboard
                  </a>
                </li>
                <li className=''>
                  <button onClick={() => signOut()}>Log Out</button>
                </li>
                {/* Sign out link --  */}
              </div>
            ) : (
              <div className='flex gap-1'>
                <li className=''>
                  <a href='/register' className=''>
                    Sign In
                  </a>
                </li>

                <li className=''>
                  <a href='/login' className=''>
                    Log In
                  </a>
                </li>
              </div>
            )}
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default NavBar
