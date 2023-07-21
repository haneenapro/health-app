import Link from 'next/link'
import React, { useState } from 'react'
import NavBar from '../../src/components/NavBar'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export async function getServerSideProps({ req, res }) {

    const hospitals = await prisma.hospital.findMany({
        include: {
            doctors: true,
            departments: true
        }
    })

    const session = await unstable_getServerSession(req, res, authOptions)

    const doctors = await prisma.doctor.findMany({
        where: { userId: session.user.id },
    })

    return {
        props: {
            hospitals,
            doctors
        },
    }
}

const ScheduleAppoinment = ({ hospitals, doctors }) => {
    const router = useRouter()
    const { status, data: session } = useSession()

    if (status === "loading") return <div>Loading...</div>

    if (status === "unauthenticated") {
        router.push("/login")
        return null
    }

    if (session.user.role !== "doctor") {
        alert("You are not authorized for this page")
        void router.push("/")
        return null
    }
    const [formData2, setFormData2] = useState({})

    function dateHandler(e) {
        setFormData2({
            ...formData2,
            [e.target.name]: e.target.value
        })
    }

    async function handleSubmitDate() {
        await axios.post(`/api/availableTime`,
            { ...formData2, doctor: doctors[0].id }
        ).then((res) => {
            if (res.status === 200) {
                alert("Information Added successful!")
                setFormData2({})
            } else {
                alert("Something went wrong")
            }
        }).catch((err) => {
            alert("Something went wrong")
        })
    }
    return (
        <>
            <NavBar />
            <div className='flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
                <div className='w-full max-w-md space-y-8'>
                    <div>
                        <div className=' flex items-center justify-left gap-x-6'>
                            <Link
                                href='/Doctor'
                                className='text-base font-semibold leading-7 text-gray-900'
                            >
                                <span aria-hidden='true'>←</span> Back
                            </Link>
                        </div>
                        <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
                            Schedule Appoinment
                        </h2>
                    </div>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            handleSubmitDate(e)
                        }}
                        className='mt-8 space-y-6 bg-white p-6 rounded py-3'
                    >
                        <div className='-space-y-px rounded-md shadow-sm py-3'>

                            <div className='pt-6'>
                                <Input
                                    label={"Date"}
                                    name='date'
                                    value={formData2.date}
                                    onChange={dateHandler}
                                    type="datetime-local"
                                    required
                                />
                                <div className='pt-6'>
                                    <Input
                                        label={"Token"}
                                        name='token'
                                        value={formData2.token}
                                        onChange={dateHandler}
                                        required
                                    />
                                </div>
                                <div className='pt-6'>
                                    <Input
                                        label={"Amount"}
                                        name='amount'
                                        value={formData2.amount}
                                        onChange={dateHandler}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="pt-6">
                                <label for="">Select Hospital</label>
                                <select
                                    name="doctor"
                                    onChange={(e) => setFormData2({ ...formData2, hospital: e.target.value, department: "" })}
                                    value={formData2.hospital}
                                    required
                                    className='relative block bg-white w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                                >
                                    <option>-- Select Hospital --</option>
                                    {hospitals?.map((_doctor) => (
                                        <option value={_doctor.id}>{_doctor.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="pt-6">
                                <label for="">Select Department</label>
                                <select
                                    name="doctor"
                                    onChange={(e) => setFormData2({ ...formData2, department: e.target.value })}
                                    value={formData2.department}
                                    required
                                    className='relative block bg-white w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                                >
                                    <option>-- Select Department --</option>
                                    {formData2.hospital && hospitals?.filter((_elm) => _elm.id == formData2.hospital)[0]?.departments?.map((_depart) => (
                                        <option value={_depart.id}>{_depart.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <Button type='submit'>Submit</Button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ScheduleAppoinment