import Link from 'next/link'
import React, { useState } from 'react'
import NavBar from '../../src/components/NavBar'
import Input from '../../components/ui/Input'
import { useRouter } from 'next/router'
import Button from '../../components/ui/Button'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'
import axios from 'axios'

export async function getServerSideProps({ req, res }) {

    const session = await unstable_getServerSession(req, res, authOptions)
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  } else if (session.user.role !== "doctor") {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

    const doctors = await prisma.doctor.findMany({
        where: { userId: session.user.id },
    })

    return {
        props: {
            doctors: JSON.parse(JSON.stringify(doctors))
        },
    }
}

const EditDoctor = ({ doctors }) => {
    let router = useRouter()
    const [formData, setFormData] = useState(doctors[0])
    const [imageData, setImageData] = useState(null)
    function handleChange(event) {
        const { name, value } = event.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    function imageUploadHandler(e) {
        const file = e.target.files[0]
        setImageData(file)
    }

    async function handleSubmit(event) {
        event.preventDefault()
        // if(!imageData) return alert("Image field is required!!")
        let newFormData = new FormData()
        newFormData.append("name", formData.name)
        newFormData.append("experience", formData.experience)
        newFormData.append("qualification", formData.qualification)
        newFormData.append("address", formData.address)
        newFormData.append("file", imageData)
        await axios.put(`/api/doctor/${formData.id}`,
            newFormData
        ).then((res) => {
            if (res.status === 200) {
                alert("Information Added successful!")
                router.push(`/Doctor`)
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
                            Edit Doctor Details
                        </h2>
                    </div>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            handleSubmit(e)
                        }}
                        className='mt-8 space-y-6 bg-white p-6 rounded py-3'
                    >
                        <div className='-space-y-px rounded-md shadow-sm py-3'>
                            <div className='pt-8'>
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
                                    label={"Experience"}
                                    name='experience'
                                    value={formData.experience}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='pt-8'>
                                <Input
                                    label={"Qualification "}
                                    name='qualification'
                                    value={formData.qualification}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='pt-8'>
                                <Input
                                    label={"Address "}
                                    name='address'
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='pt-8'>
                                <Input
                                    label={"Doctor Image"}
                                    name='image'
                                    onChange={imageUploadHandler}
                                    type="file"
                                />
                            </div>
                        </div>

                        <Button type='submit'>Submit</Button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditDoctor