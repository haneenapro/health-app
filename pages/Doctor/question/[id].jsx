// to fetch and display all quesions

import axios from "axios"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import Button from "../../../components/ui/Button"

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
              <span className='block text-sm text-gray-400'>
                {question.User?.name}
              </span>
            </a>
          )
        })
      )}

      {/* Form component to add answers */}

      <div className='ml-5'>
        <AnswerForm questionId={question.id} />
      </div>
    </div>
  )
}

export default SingleQuestion

const AnswerForm = ({ questionId }) => {
  const [answer, setAnswer] = useState("")

  const { data: session } = useSession()
  const handleSubmit = async (e) => {
    const res = await axios.post("/api/answer", {
      answer,
      questionId,
      userId: session.user.id,
    })

    console.log(res.data)
    window.location.reload()
  }

  return (
    <div className='flex flex-col'>
      <textarea
        className='p-2 my-2 block rounded w-80'
        placeholder='Enter your answer here ... '
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />

      <Button
        onClick={handleSubmit}
        type='submit'
        className='p-2 rounded bg-blue-600 text-white w-80'
      >
        Submit
      </Button>

      <div className=' flex items-center justify-left gap-x-6'>
        <a
          href='/Doctor/question'
          className='text-base font-semibold leading-7 text-gray-900'
        >
          <span aria-hidden='true'>←</span> Back
        </a>
      </div>
    </div>
  )
}
