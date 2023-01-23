const Input = ({ label, type = "text", name, value, onChange }) => {
  return (
    <div className='flex flex-col '>
      <label>{label}</label>

      <input
        type={type}
        className='relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default Input
