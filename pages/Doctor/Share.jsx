import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import NavBar from '../../src/components/NavBar'
import Link from 'next/link'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import prisma from '../../src/db/prisma'


export async function getServerSideProps(context) {
    const { user } = context.query

    const userData = await prisma.UserPayment.findUnique({
        where: {
            id: Number(user),
        },
        include: {
            availableTime: true,
            User: true,
            department: true,
            hospital: true,
            doctor: true
        }
    })

    return {
        props: {
            userData: JSON.parse(JSON.stringify(userData)),
        },
    }
}
const Share = ({ userData }) => {
    console.log(userData, "@@@");
    let router = useRouter()
    const id = router.query?.user

    const [selectLink, setSelectLink] = useState('')

    async function handleSubmit(event) {
        event.preventDefault()
        await axios
            .post(`/api/share`, {
                email: userData.User.email,
                schedule: userData.availableTime.date,
                doctor: userData.doctor.name,
                hospital: userData.hospital.name,
                user: userData.User.name,
                department: userData.department.name,
                link: selectLink,
                id: id
            })
            .then((res) => {
                if (res.status === 200) {
                    alert("Link Send successfully!!!")
                    router.push(`/Doctor/profile`)
                } else {
                    alert("Something went wrong")
                }
            })
            .catch((err) => {
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
                                href='/Admin/department'
                                className='text-base font-semibold leading-7 text-gray-900'
                            >
                                <span aria-hidden='true'>←</span> Back
                            </Link>
                        </div>
                        <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
                            Share Meet Link
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
                                    label={"Enter Meet Link"}
                                    name='link'
                                    value={selectLink}
                                    onChange={(e) => setSelectLink(e.target.value)}
                                    required
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

export default Share