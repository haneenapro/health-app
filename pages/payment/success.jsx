import axios from 'axios';
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import prisma from '../../src/db/prisma';
import NavBar from '../../src/components/NavBar';
import Link from 'next/link';


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
  let newFilterData = appointmentData.date.filter((_elm) => _elm.id === Number(oid))
  appointmentData['date'] = newFilterData
  return {
    props: {
      appointmentData
    },
  }
}

const success = ({ appointmentData }) => {
  const { status, data: session } = useSession()
  let router = useRouter()
  const id = router.query
  useEffect(() => {
    if (session?.user?.id) {
      axios.post('/api/payment/success', {
        userId: session?.user.id,
        hospitalId: router.query?.hospital_id,
        departmentId: router.query?.department_id,
        appointmentType: router.query?.appointmentType,
        doctorId: appointmentData?.doctorId,
        availableTimeId: appointmentData?.date[0]?.id
      }).then((res) => {
        alert("success payment")
      })
    }
  }, [session?.user?.id])

  if (session?.user?.id && appointmentData) {
    console.log("@@hhhh");
  }


  return (
    <div>
      <NavBar />
      {id ? <div className='container mx-auto mt-6'>

        <h2>YOUR PAYMENT HAS BEEN SUCESSFULL!!</h2>
        <h3>Thank you for choosing health app</h3>
        <Link
          href='/Patients'
          className='text-base font-semibold leading-7 text-gray-900'
        >
          <span aria-hidden='true'>←</span> Goto Dashboard
        </Link>
      </div> : "Failed Transaction"}
    </div>
  )
}

export default success