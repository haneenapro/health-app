// to fetch and display all quesions

import axios from "axios"
import React, { useEffect, useState } from "react"
import NavBar from "../../../src/components/NavBar"
import { getTimeHelper } from "../../../components/helper/getTimerAlert"

const QuestionsList = () => {
  // api route -- get all questions
  const [isLoading, setIsLoading] = useState(false)
  const [questions, setQuestions] = useState([])
  const _getLocalData = typeof window !== "undefined" && localStorage.getItem("role")
  if(_getLocalData && _getLocalData ==="patient") {
    const _getLocalDataUserId = typeof window !== "undefined" && localStorage.getItem("user")
    if(_getLocalDataUserId) {
      getTimeHelper(_getLocalDataUserId)
    }
  }
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

  const handlerAddDoctor = async () => {
    await axios.post('/api/department', {
      name:"doctor ho ma"
    }).then((res)=>{
      console.log(res,"@@");
    })
  }
  const handlerDeleteDoctor = async () => {
    await axios.delete('/api/department/10').then((res)=>{
      console.log(res,"@@");
    })
  }
  const handlerUpdateDoctor = async () => {
    await axios.put('/api/department/10', {name:"Dr. Doctor"}).then((res)=>{
      console.log(res,"@@");
    })
  }
  const handlerDoctorDepartment = async () => {
    await axios.post('/api/update-doctor', {name:"Dr. Doctor"}).then((res)=>{
      console.log(res,"@@");
    })
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
                href={`/Patients/question/${question.id}`}
                key={i}
                className='block mx-5 my-2 shadow border text-xl p-4 '
              >
                <div className='text-xl md:text-2xl font-semibold'>
                  {question.title}
                </div>
              </a>
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
        <button type="" onClick={handlerDoctorDepartment}>Add Doctor</button>
      </div>
    </>
  )
}

export default QuestionsList
