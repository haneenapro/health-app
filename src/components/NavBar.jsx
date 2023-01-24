import { useSession } from "next-auth/react"

const NavBar = () => {
  const { data } = useSession()

  console.log(data)

  return (
    <nav className='flex space-x-6 md:space-x-96 px-10 py-5 text-white font-bold mx-[100px]'>
      <div>
        <a href='' class=''>
          HCS
        </a>
      </div>

      <div className='flex'>
        <ul className='flex space-x-3 md:space-x-10'>
          <li class=''>
            <a href='' class=''>
              Home
            </a>
          </li>

          <li class=''>
            <a href='/about-us' class=''>
              About
            </a>
          </li>

          <li class=''>
            <a href='/info-dynamic' class=''>
              Information
            </a>
          </li>

          <li class=''>
            <a href='/register' class=''>
              Sign In/Log In
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default NavBar
