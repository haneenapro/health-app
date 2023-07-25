import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { getTimeHelper } from "../../../components/helper/getTimerAlert"

const SingleQuestion = () => {
  // api route -- get all questions
  const router = useRouter()
  const id = router.query.id

  const [isLoading, setIsLoading] = useState(true)
  const [question, setQuestion] = useState([])

  const _getLocalData = typeof window !== "undefined" && localStorage.getItem("role")
  if(_getLocalData && _getLocalData ==="patient") {
    const _getLocalDataUserId = typeof window !== "undefined" && localStorage.getItem("user")
    if(_getLocalDataUserId) {
      getTimeHelper(_getLocalDataUserId)
    }
  }

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

      <p className='capitalize'>Asked by: {question.User?.name}</p>

      {question.answers.length === 0 ? (
        <p>No answers yet ... </p>
      ) : (
        question.answers.map((question, i) => {
          return (
            <div key={i} className=' mx-5 my-2 shadow-sm border p-4'>
              <a href={`question/${question.id}`} className='block text-xl'>
                {question.answer}
              </a>
              {question.User?.name && (
                <p> Answered By: {question.User?.name} </p>
              )}
            </div>
          )
        })
      )}

      <div className='pl-10 pt-10 flex items-center justify-left gap-x-6'>
        <a
          href='/Patients/question'
          className='text-base font-semibold leading-7 text-gray-900'
        >
          <span aria-hidden='true'>←</span> Back
        </a>
      </div>

      {/* Form component to add answers */}
    </div>
  )
}

export default SingleQuestion
