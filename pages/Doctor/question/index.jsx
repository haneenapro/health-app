// to fetch and display all quesions

import axios from "axios"
import React, { useEffect, useState } from "react"
import NavBar from "../../../src/components/NavBar"

const QuestionsList = () => {
  // api route -- get all questions
  const [isLoading, setIsLoading] = useState(false)
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    const getQuestions = async () => {
      const res = await axios.get("/api/question")
      setQuestions(res.data)
      setIsLoading(false)
    }

    setIsLoading(true)
    getQuestions()
  }, [])

  if (isLoading) return <p>Loading ... </p>

  console.log(questions)

  // const [selectedQuestion, setSelectedQuestion] = useState(null)
  // const [showForm, setShowForm] = useState(false)

  // const handleUpdate = (question) => {
  //   setSelectedQuestion(question)
  //   setShowForm(true)
  // }

  const handleDelete = async (id) => {
    await axios.delete(`/api/question/${id}`)
    const updatedQuestions = questions.filter((info) => info.id !== id)
    setQuestions(updatedQuestions)
    alert("One item deleted!!")
  }
  return (
    <>
      <NavBar />
      <div className='mx-12 md:mx-24 mt-6 py-5 md:py-10'>
        <h1 className='text-[24px] md:text-[48px] font-semibold pb-12'>
          QuestionsList
        </h1>

        {questions.map((question, i) => {
          return (
            <>
              <a
                href={`/Doctor/question/${question.id}`}
                key={i}
                className='block mx-5 my-2 shadow border text-xl p-4 '
              >
                <div className='text-xl md:text-2xl font-semibold'>
                  {question.title}
                </div>
              </a>
              <button
                onClick={() => handleDelete(question.id)}
                className='mx-[30px] mb-10 rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white red:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 '
              >
                Delete
              </button>
            </>
          )
        })}
        <div className=' flex items-center justify-left gap-x-6'>
          <a
            href='/Doctor'
            className='text-base font-semibold leading-7 text-gray-900'
          >
            <span aria-hidden='true'>←</span> Back
          </a>
        </div>
      </div>
    </>
  )
}

export default QuestionsList
