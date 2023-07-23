import React, {useState} from "react"
import NavBar from "../../../src/components/NavBar"
import Link from "next/link"
import { FilePlus2 } from "lucide-react"
import axios from 'axios'


export const getServerSideProps = async () => {
    const departmentData = await prisma.department.findMany()

    return {
        props: {
            departmentData,
        },
    }
}
const index = ({ departmentData }) => {
    const [departments, setDepartments] = useState(departmentData || [])
    console.log(departments,"@@@@");
    async function handleDelete(e) {
        await axios.delete(`/api/department/${e}`).then((res)=>{
            alert("Succesfully deleted")
        }).then((res)=> {
            axios.get('/api/department').then((_rest)=> {
                setDepartments(_rest.data)
            })
        })
    }
    return (
        <div className="container mx-auto">
            <NavBar />
            <div className='mt-6 flex justify-between items-center'><div className=' flex items-center justify-left gap-x-6'>
              <Link
                href='/Admin'
                className='text-base font-semibold leading-7 text-gray-900'
              >
                <span aria-hidden='true'>←</span> Back
              </Link>
            </div>
                <h1 className='text-[24px] md:text-[48px] font-semibold pb-12'>
                    Department Lists
                </h1>
                    <Link
                        className='flex items-center gap-2 group relative justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                        href='/Admin/department/new'
                    >
                        <FilePlus2 className='text-center' />
                        Add Department
                    </Link>
            </div>
            <div className=''>
                <table className='w-full'>
                    <thead class='text-xs text-gray-700 uppercase border-b-2 border-gray-700'>
                        <tr>
                            <th class='px-6 py-3'>ID</th>
                            <th class='px-6 py-3'>Name</th>
                            <th class='px-6 py-3 text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {departments.length > 0
                            ? departments.map((_elm) => (
                                <tr className='border-b border-gray-500'>
                                    <th class='px-6 py-3'>{_elm?.id}</th>
                                    <th class='px-6 py-3'>{_elm?.name}</th>
                                    <th class='px-6 py-3 text-center'>
                                        <Link href={`/Admin/department/${_elm.id}`} className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white p-1 px-2 border border-blue-500 hover:border-transparent rounded'>
                                            Edit
                                        </Link>
                                        <button className='ml-2 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white px-2 border border-red-500 hover:border-transparent rounded' onClick={(e)=> handleDelete(_elm.id)} >
                                            Delete
                                        </button>
                                    </th>
                                </tr>
                            ))
                            : "No departments found"}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default index
