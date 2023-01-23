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

      <main class='bg-gray-100'>
        <div class='container mx-auto p-8'>
          <h1 class='text-4xl text-center font-medium'>Contact Us</h1>
          <form class='bg-white p-8 rounded-lg'>
            <label class='block font-medium mb-2'>Name:</label>
            <input
              class='border border-gray-400 p-2 rounded-lg w-full'
              type='text'
              name='name'
              required
            />
            <label class='block font-medium mb-2 mt-4'>Email:</label>
            <input
              class='border border-gray-400 p-2 rounded-lg w-full'
              type='email'
              name='email'
              required
            />
            <label class='block font-medium mb-2 mt-4'>Message:</label>
            <textarea
              class='border border-gray-400 p-2 rounded-lg w-full'
              name='message'
              required
            ></textarea>
            <button class='bg-green-500 text-white py-2 px-4 rounded-lg mt-4'>
              Submit
            </button>
          </form>
          <div class='text-center mt-8'>
            <p class='font-medium'>Phone: 555-555-5555</p>
            <p class='font-medium'>Email: info@website.com</p>
            <p class='font-medium'>Address: 123 Main St, Anytown USA</p>
          </div>
        </div>
      </main>
    </>
  )
}
