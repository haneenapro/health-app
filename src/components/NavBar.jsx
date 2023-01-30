/* This example requires Tailwind CSS v3.0+ */
// import { useState } from "react"
import { Dialog } from "@headlessui/react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import { useSession, signOut } from "next-auth/react"
import { useState } from "react"

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about-us" },
  { name: "Information Blog", href: "info-dynamic" },
]

const NavBar = () => {
  const { status, data } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  console.log(data)

  // export default function Example() {
  //   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className='px-6 pt-6 pb-3 lg:px-8 shadow-lg bg-gradient-to-r from-blue-400 via-[indigo-600] to-blue-100'>
      <nav className='flex items-center justify-between' aria-label='Global'>
        <div className='flex lg:flex-1'>
          <a href='/' className='-m-1.5 p-1.5'>
            <span className='sr-only'>Health Consultation System </span>
            <img className='h-12' src='images/logo.png' alt='HCS' />
          </a>
        </div>
        <div className='flex lg:hidden'>
          <button
            type='button'
            className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className='sr-only'>Open main menu</span>
            <Bars3Icon className='h-6 w-6' aria-hidden='true' />
          </button>
        </div>
        <div className='hidden lg:flex lg:gap-x-12'>
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className='text-sm font-semibold leading-6 text-gray-900'
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className='hidden lg:flex lg:flex-1 lg:justify-end '>
          {status === "loading" ? (
            <p>Loading ... </p>
          ) : status === "authenticated" ? (
            <div className='flex lg:gap-x-12 text-sm font-semibold leading-6 text-gray-900'>
              <div className=''>
                <a
                  href={data.user.role === "doctor" ? "/Doctor" : "/Patients"}
                  className=''
                >
                  Go to dashboard
                </a>
              </div>
              <div className=''>
                <button onClick={() => signOut()}>Log Out</button>
              </div>
              {/* Sign out link --  */}
            </div>
          ) : (
            <div className='flex lg:gap-x-12 text-sm font-semibold leading-6 text-gray-900'>
              <div className=''>
                <a href='/register' className=''>
                  Sign In
                </a>
              </div>

              <div className=''>
                <a href='/login' className=''>
                  Log In
                </a>
              </div>
            </div>
          )}
        </div>

        {/*  */}
      </nav>
      <Dialog as='div' open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <Dialog.Panel
          focus='true'
          className='fixed inset-0 z-10 overflow-y-auto bg-white px-6 py-6 lg:hidden'
        >
          <div className='flex items-center justify-between'>
            <a href='#' className='-m-1.5 p-1.5'>
              <span className='sr-only'>Health Consulation System </span>
              <img className='h-8' src='images/logo.png' alt='' />
            </a>
            <button
              type='button'
              className='-m-2.5 rounded-md p-2.5 text-gray-700'
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className='sr-only'>Close menu</span>
              <XMarkIcon className='h-6 w-6' aria-hidden='true' />
            </button>
          </div>
          <div className='mt-6 flow-root'>
            <div className='-my-6 divide-y divide-gray-500/10'>
              <div className='space-y-2 py-6'>
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className='-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10'
                  >
                    {item.name}
                  </a>
                ))}
              </div>

              <div className=' flex flex-1  '>
                {status === "loading" ? (
                  <p>Loading ... </p>
                ) : status === "authenticated" ? (
                  <div className='flow-root -my-6 divide-y divide-gray-500/10 space-y-2 py-6'>
                    <div className=''>
                      <a
                        href={
                          data.user.role === "doctor" ? "/Doctor" : "/Patients"
                        }
                        className='-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10'
                      >
                        Go to dashboard
                      </a>
                    </div>
                    <div className='-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10'>
                      <button onClick={() => signOut()}>Log Out</button>
                    </div>
                    {/* Sign out link --  */}
                  </div>
                ) : (
                  <div className='flow-root -my-6 divide-y divide-gray-500/10 space-y-2 py-6'>
                    <div className=''>
                      <a
                        href='/register'
                        className='-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10'
                      >
                        Sign In
                      </a>
                    </div>

                    <div className=''>
                      <a
                        href='/login'
                        className='-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10'
                      >
                        Log In
                      </a>
                    </div>
                  </div>
                )}
              </div>
              {/* <div className='py-6'>
                <a
                  href='/login'
                  className='-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-400/10'
                >
                  Log in
                </a>
              </div> */}
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </div>
  )
}
// }

export default NavBar
