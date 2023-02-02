import Head from "next/head"
import Features from "../components/Home/features"
import Button from "../components/ui/Button"
import NavBar from "../src/components/NavBar"
import Footer from "../src/components/Footer"

export default function MainPage() {
  return (
    <>
      <Head>
        <title>Health Consulation System </title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className=''>
        <div className='isolate bg-white'>
          <div className='absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]'>
            <svg
              className='relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]'
              viewBox='0 0 1155 678'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fill='url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)'
                fillOpacity='.3'
                d='M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z'
              />
              <defs>
                <linearGradient
                  id='45de2b6b-92d5-4d68-a6a0-9b9b2abad533'
                  x1='1155.49'
                  x2='-78.208'
                  y1='.177'
                  y2='474.645'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop stopColor='#9089FC' />
                  <stop offset={1} stopColor='#FF80B5' />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <NavBar />

          <div className='px-6 pt-6 lg:px-8'>
            <main>
              <div className='relative px-6 lg:px-8'>
                <div className='mx-auto max-w-2xl py-16 sm:py-24 lg:py-40'>
                  <div className='text-center'>
                    <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
                      Health Consultation System
                    </h1>
                    <p className='mt-6 text-lg leading-8 text-gray-600'>
                      This system is a health based system. Here people can find
                      information blog, ask question to a health professional
                      and save reports.
                    </p>
                    <div className='mt-10 flex items-center justify-center gap-x-6'>
                      <a
                        href='about-us'
                        className='text-base font-semibold leading-7 text-gray-900'
                      >
                        Learn more <span aria-hidden='true'>→</span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className='absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]'>
                  <svg
                    className='relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]'
                    viewBox='0 0 1155 678'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fill='url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)'
                      fillOpacity='.3'
                      d='M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z'
                    />
                    <defs>
                      <linearGradient
                        id='ecb5b0c9-546c-4772-8c71-4d3f06d544bc'
                        x1='1155.49'
                        x2='-78.208'
                        y1='.177'
                        y2='474.645'
                        gradientUnits='userSpaceOnUse'
                      >
                        <stop stopColor='#9089FC' />
                        <stop offset={1} stopColor='#FF80B5' />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </main>
          </div>

          {/* Next One  */}
          <div className='px-28 py-28 bg-blue-200 '>
            <div className='text-center font-bold'>
              <h1 className='text-xl font-bold md:text-2xl text-center'>
                Professionals here advertise the best one they know
              </h1>
              <h2 className='text-sm md:text-xl pt-4'>
                In this world where it is difficult to trust professionals, here
                you can ask professionals suggestions and international
                suggestion for the cure and not just temporary recovary. In this
                world where it is difficult to trust professionals ask
                professionals
              </h2>
            </div>
          </div>
        </div>

        <div className='main-features'>
          <div className='py-10 px-5 my-[50px]'>
            <h2 className='font-bold text-2xl text-center'>Main Features </h2>

            <Features />
          </div>
        </div>

        <section>
          <div className='m-[50px] p-[25px] md:m-[100px] md:p-[50px] text-center flex flex-wrap gap-5 justify-center bg-blue-200 rounded-md'>
            <h3 className='font-bold text-2xl'> Are you Ready? </h3>
            <p className=''>
              Get to explore the world of accurate information in Health and
              Science. Make the right decison for your health or for the health
              of someone you really care.
            </p>

            <div className='w-[165px] md:w-[230px] lg:w-[500px]'>
              <a
                href='register'
                className='rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
              >
                Create an Account!
              </a>
            </div>
          </div>
        </section>

        <section>
          <Footer />
        </section>
      </main>
    </>
  )
}
