import dynamic from "next/dynamic"
import "react-quill/dist/quill.snow.css"

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
})

const QuillText = ({ label, type = "text", name, value, onChange }) => {
  const handleChange = (value) => {
    console.log(value)
    onChange(value)
  }

  return (
    <div className='flex flex-col '>
      <label>{label}</label>

      <QuillNoSSRWrapper
        className='relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default QuillText
