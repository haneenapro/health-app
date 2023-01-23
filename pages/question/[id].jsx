// to fetch and display all quesions

import axios from "axios"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import Button from "../../components/ui/Button"

const SingleQuestion = () => {
  // api route -- get all questions
  const router = useRouter()
  const id = router.query.id

  const [isLoading, setIsLoading] = useState(true)
  const [question, setQuestion] = useState([])

  useEffect(() => {
    if (!id) {
      return
    }
    const getQuestions = async () => {
      const res = await axios.get(`/api/question/${id}`)
      setQuestion(res.data)
      console.log(res.data)
      setIsLoading(false)
    }

    setIsLoading(true)
    getQuestions()
  }, [id])

  if (isLoading) return <p>Loading ... </p>

  return (
    <div className='m-4 py-10'>
      <h1>{question.title}</h1>

      <h2>{question.question}</h2>

      {question.answers.length === 0 ? (
        <p>No answers yet ... </p>
      ) : (
        question.answers.map((question, i) => {
          return (
            <a
              href={`/question/${question.id}`}
              key={i}
              className='block mx-5 my-2 shadow border text-xl p-4'
            >
              {question.answer}
            </a>
          )
        })
      )}

      {/* Form component to add answers */}
    </div>
  )
}

export default SingleQuestion
