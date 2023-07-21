import axios from 'axios';
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import prisma from '../../src/db/prisma';


export const getServerSideProps = async (context) => {
  const { oid, hospital_id, department_id } = context.query;
  const appointmentData = await prisma.DoctorSchedule.findFirst({
    where: {
      hospital: {
        id: Number(hospital_id)
      },
      department: {
        id: Number(department_id)
      },
      date: {
        some: {
          id: Number(oid)
        }
      },
    },
    include: {
      date: true
    }
  })
  let newFilterData = appointmentData.date.filter((_elm)=> _elm.id === Number(oid))
  appointmentData['date'] = newFilterData
  return {
      props: {
          appointmentData
      },
  }
}

const success = ({appointmentData}) => {
  const { status, data: session } = useSession()
  let router = useRouter()
  const id = router.query
  useEffect(()=>{
    if(session?.user?.id) {
      axios.post('/api/payment/success', {
        userId: session?.user.id,
        hospitalId: router.query?.hospital_id,
        departmentId: router.query?.department_id,
        doctorId: appointmentData?.doctorId,
        availableTimeId: appointmentData?.date[0]?.id
    }).then((res)=>{
      alert("success payment")
    })
  }
  },[session?.user?.id])

  if(session?.user?.id && appointmentData) {
    console.log("@@hhhh");
  }


  return (
    <div>
      {id ? <div>
        <small>User : {session?.user.id}</small>
        <small>Paymentid: {id.oid}</small>
        <small>Amount: {id.amount}</small>
        <small>RefId: {id.refId}</small>


        <h5>YOUR PAYMENT HAS BEEN SUCESSFUL</h5>
        
      </div>: "Failed Transaction"}
    </div>
  )
}

export default success