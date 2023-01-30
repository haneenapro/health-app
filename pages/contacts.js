import Head from "next/head"

export default function MainPage() {
  return (
    <>
      <head>
        <title>Contact Us</title>
        <link
          href='https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css'
          rel='stylesheet'
        />
      </head>

      <main className='bg-gray-100'>
        <div className='container mx-auto p-8'>
          <h1 className='text-4xl text-center font-medium'>Contact Us</h1>
          <form className='bg-white p-8 rounded-lg'>
            <label className='block font-medium mb-2'>Name:</label>
            <input
              className='border border-gray-400 p-2 rounded-lg w-full'
              type='text'
              name='name'
              required
            />
            <label className='block font-medium mb-2 mt-4'>Email:</label>
            <input
              className='border border-gray-400 p-2 rounded-lg w-full'
              type='email'
              name='email'
              required
            />
            <label className='block font-medium mb-2 mt-4'>Message:</label>
            <textarea
              className='border border-gray-400 p-2 rounded-lg w-full'
              name='message'
              required
            ></textarea>
            <button className='bg-green-500 text-white py-2 px-4 rounded-lg mt-4'>
              Submit
            </button>
          </form>
          <div className='text-center mt-8'>
            <p className='font-medium'>Phone: 555-555-5555</p>
            <p className='font-medium'>Email: info@website.com</p>
            <p className='font-medium'>Address: 123 Main St, Anytown USA</p>
          </div>
        </div>
      </main>
    </>
  )
}
