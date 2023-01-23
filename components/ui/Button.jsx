import React from "react"

const Button = ({
  className = "group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
  children,
  onClick,
}) => {
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  )
}

export default Button
