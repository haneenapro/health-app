import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Image from "next/image"
import axios from "axios"
import NavBar from "../../src/components/NavBar"

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
            <div className='flex flex-wrap items-center justify-center'>
                {data?.length > 0 ? (
                    data?.map((o, i) => {
                        return <div className='flex-1 max-w-sm flex items-center p-4' key={i}>
                            <div>
                                <div className='bg-white rounded-lg flex items-center justify-center p-2'>
                                    <Image
                                        className='rounded'
                                        src={o?.image ? o.image : ""}
                                        width={80}
                                        height={80}
                                        alt='images'
                                    />
                                </div>
                                <h3 className='text-center sm:font-normal lg:font-medium text-md my-2'>
                                    {o?.title}
                                </h3>
                                <h6 className='text-sm text-center mb-2'>{o?.sub_title}</h6>
                                <button className='bg-transparent text-center hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>
                                    Consult Now
                                </button>
                            </div>
                        </div>
                    })
                ) : (
                    <div className='text-sm'>No data available</div>
                )}
            </div>
        </>
    )
}

export default index