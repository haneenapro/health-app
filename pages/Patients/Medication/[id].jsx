import { unstable_getServerSession } from 'next-auth'
import React, { useEffect, useState } from 'react'
import { authOptions } from '../../api/auth/[...nextauth]'
import NavBar from '../../../src/components/NavBar'
import Input from '../../../components/ui/Input'
import Button from '../../../components/ui/Button'
import Link from 'next/link'
import { useRouter } from 'next/router'


export async function getServerSideProps({ req, res }) {

    const session = await unstable_getServerSession(req, res, authOptions)
    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        }
    } else if (session.user.role !== "patient") {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    const userData = await prisma.User.findUnique({
        where: { id: session.user.id },
    })

    return {
        props: {
            userData: JSON.parse(JSON.stringify(userData))
        },
    }
}

const _initState = {
    name: "",
    description: "",
    dosages: "",
    frequency: "",
    status: "",
    times: []
}

const CreateMedication = ({ userData }) => {
    const router = useRouter()
    const { id } = router.query
    const [formData, setFormData] = useState(_initState)
    const [dateDate, setDateDate] = useState('')
    const _getLocalData = typeof window !== "undefined" && localStorage.getItem(userData.id)

     const _getLocalData2 = typeof window !== "undefined" && localStorage.getItem("role")
  if(_getLocalData2 && _getLocalData2 ==="patient") {
    const _getLocalDataUserId = typeof window !== "undefined" && localStorage.getItem("user")
    if(_getLocalDataUserId) {
      getTimeHelper(_getLocalDataUserId)
    }
  }
    useEffect(() => {
        if (_getLocalData) {
            setFormData(JSON.parse(_getLocalData)[id])
        }
    }, [_getLocalData])

    function handleChange(event) {
        const { name, value } = event.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }



    function addDateHandler(e) {
        let _newTime = formData.times || []
        console.log(_newTime, "@@@")
        _newTime.unshift(dateDate)
        setFormData({
            ...formData,
            times: _newTime
        })

    }
    function handleChangeDate(e) {
        let { value } = e.target
        setDateDate(value)
    }

    console.log(formData, "@@@");
    async function handleSubmit(event) {
        if (typeof window !== "undefined") {
            if (_getLocalData) {
                let _parsedData = JSON.parse(_getLocalData)
                _parsedData[id] = formData
                localStorage.setItem([userData.id], JSON.stringify(_parsedData))
                alert("Information edited successfully")
                return
            } else {
                localStorage.setItem([userData.id], JSON.stringify([formData]))
                alert("Information edited successfully")
                return
            }
        }
    }
    return (
        <>
            <NavBar />
            <div className='py-8'>
                <div className='container mx-auto'>
                    <div>
                        <div className=' flex items-center justify-left gap-x-6'>
                            <Link
                                href='/Patients/Medication'
                                className='text-base font-semibold leading-7 text-gray-900'
                            >
                                <span aria-hidden='true'>←</span> Back
                            </Link>
                        </div>

                    </div>
                    <div className='flex  justify-center gap-4 container mx-auto '>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault()
                                handleSubmit(e)
                            }}
                            className='mt-8 bg-white p-6 rounded py-3 w-[500px]'
                        >
                            <h2 className=' mt-4 text-center text-3xl font-bold tracking-tight text-gray-900'>
                                Add Medicine Details
                            </h2>
                            <div className='-space-y-px rounded-md shadow-sm py-3'>
                                <div className=''>
                                    <Input
                                        label={"Name"}
                                        name='name'
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className='pt-8'>
                                    <Input
                                        label={"Dosages/per day"}
                                        name='dosages'
                                        value={formData.dosages}
                                        onChange={handleChange}
                                        required
                                        type="number"
                                    />
                                </div>

                                <div className='pt-8'>
                                    <Input
                                        label={"Status"}
                                        name='status'
                                        value={formData.status}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className='pt-8'>
                                    <label>Description</label>
                                    <textarea
                                        className='relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                                        label={"Description"}
                                        name='description'
                                        value={formData.description}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                            </div>
                            <Button type='submit'>Submit</Button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateMedication