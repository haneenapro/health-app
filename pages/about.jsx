import { useState } from "react"

const AboutPage = () => {
  const [counter, setCounter] = useState(0)

  const addCount = () => {
    setCounter(counter + 1)
  }

  return (
    <div>
      <h1 className='text-lg text-purple-500'>Hi I m haneena</h1>

      <div>Count: {counter}</div>

      <div>
        <button
          className='bg-blue-400 text-white p-2 rounded-sm'
          onClick={addCount}
        >
          Add plus 1
        </button>
      </div>
    </div>
  )
}

export default AboutPage
