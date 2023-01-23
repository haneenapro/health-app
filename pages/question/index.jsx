// to fetch and display all quesions

import axios from "axios"
import React, { useEffect, useState } from "react"

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
  return (
    <div className='m-4 py-10'>
      <h1>QuestionsList</h1>

      {questions.map((question, i) => {
        return (
          <a
            href={`/question/${question.id}`}
            key={i}
            className='block mx-5 my-2 shadow border text-xl p-4'
          >
            {question.title}
          </a>
        )
      })}
    </div>
  )
}

export default QuestionsList
