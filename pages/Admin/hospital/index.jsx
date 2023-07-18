import React from "react"
import NavBar from "../../../src/components/NavBar"
import Link from "next/link"
import { FilePlus2 } from "lucide-react"

export const getServerSideProps = async () => {
    const hospitals = await prisma.hospital.findMany()
    const doctors = await prisma.doctor.findMany()

    return {
        props: {
            hospitals,
            doctors,
        },
    }
}
const index = ({ hospitals }) => {
    return (
        <div className="container mx-auto">
            <NavBar />
            <div className='mt-6 flex justify-between items-center'>
                <h1 className='text-[24px] md:text-[48px] font-semibold pb-12'>
                    Hospital Lists
                </h1>
                    <Link
                        className='flex items-center gap-2 group relative justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                        href='/Admin/hospital/new'
                    >
                        <FilePlus2 className='text-center' />
                        Add Hospital
                    </Link>
            </div>
            <div className=''>
                <table className='w-full'>
                    <thead class='text-xs text-gray-700 uppercase border-b-2 border-gray-700'>
                        <tr>
                            <th class='px-6 py-3'>ID</th>
                            <th class='px-6 py-3'>Name</th>
                            <th class='px-6 py-3'>Address</th>
                            <th class='px-6 py-3'>Desription</th>
                            <th class='px-6 py-3 text-end'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hospitals.length > 0
                            ? hospitals.map((_elm) => (
                                <tr className='border-b border-gray-500'>
                                    <th class='px-6 py-3'>{_elm?.id}</th>
                                    <th class='px-6 py-3'>{_elm?.name}</th>
                                    <th class='px-6 py-3'>{_elm?.address}</th>
                                    <th class='px-6 py-3'>{_elm?.description}</th>
                                    <th class='px-6 py-3 text-end'>
                                        <Link href={`/Admin/hospital/${_elm.id}`} className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white px-2 border border-blue-500 hover:border-transparent rounded'>
                                            Edit
                                        </Link>
                                    </th>
                                </tr>
                            ))
                            : "No schedule found"}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default index
