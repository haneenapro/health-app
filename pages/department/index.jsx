import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Image from "next/image"
import axios from "axios"
import NavBar from "../../src/components/NavBar"
import Link from "next/link"

const index = () => {
    let router = useRouter()
    const id = router.query?.hospital_id
    const [data, setData] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!id) {
            return
        }
        const getDepartments = async () => {
            const res = await axios.get(`/api/hospital/department/${id}`)
            setData(res.data)
            setIsLoading(false)
        }

        setIsLoading(true)
        getDepartments()
    }, [id])

    if (isLoading) return <p>Loading ... </p>

    return (
        <>
            <NavBar />
            <div className="container mx-auto py-4">
            <h2 className='my-7 text-2xl font-bold border-b border-slate-300'> Available Departments </h2>{" "}
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6'>
                    {data?.length > 0 ? (
                        data?.map((o, i) => {
                            return (
                                <div className='w-full p-4 shadow-lg flex flex-col justify-center items-center' key={i}>
                                    <img
                                        className='rounded'
                                        src={o?.image ? o.image : ""}
                                        width={100}
                                        height={100}
                                        alt='images'
                                    />
                                    <h3 className='text-center text-lg text-md my-2'>
                                        {o?.name}
                                    </h3>
                                    {/* <h6 className='text-sm text-center mb-2'>{o?.name}</h6> */}
                                    <Link href={`/doctors?hospital_id=${id}&&department_id=${o.id}`} className='w-full bg-transparent text-center hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>
                                        Consult Now
                                    </Link>
                                </div>)
                        })
                    ) : (
                        <div className='text-sm'>No data available</div>
                    )}
                </div>
            </div>
        </>
    )
}

export default index