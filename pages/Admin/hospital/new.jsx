import { useState } from "react"
import Button from "../../../components/ui/Button"
import NavBar from "../../../src/components/NavBar"
import { useRouter } from "next/router"
import Input from "../../../components/ui/Input"
import { useSession } from "next-auth/react"
import axios from "axios"
import Link from "next/link"

export const getServerSideProps = async () => {
    const departments = await prisma.department.findMany()
    const doctors = await prisma.doctor.findMany()

    return {
        props: {
            departments,
            doctors: JSON.parse(JSON.stringify(doctors))
        },
    }
}

function CreateHospital({ departments, doctors }) {
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        description: "",
        departments: [],
        doctors: []
    })
    const [imageData, setImageData] = useState(null)

    const router = useRouter()
    const { status, data: session } = useSession()

    if (status === "loading") return <div>Loading...</div>

    if (status === "unauthenticated" || session.user.role !== "admin") {
        router.push("/login")
        return null
    }

    function handleChange(event) {
        const { name, value } = event.target
        if (name === "department") {
            if (value === "") return
            if (formData.departments.findIndex(_elm => _elm.id == value) <= -1) {
                setFormData({
                    ...formData,
                    departments: [...formData.departments, { id: Number(value) }]
                })
            } else {
                setFormData({
                    ...formData,
                    departments: formData.departments.filter(_elm => _elm.id != value)
                })
            }
        } else if (name === "doctor") {
            if (value === "") return
            if (formData.doctors.findIndex(_elm => _elm.id == value) <= -1) {
                setFormData({
                    ...formData,
                    doctors: [...formData.doctors, { id: Number(value) }]
                })
            } else {
                setFormData({
                    ...formData,
                    doctors: formData.doctors.filter(_elm => _elm.id != value)
                })
            }
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }))
        }
    }

    function validateForm() {
        if (
            formData.name === "" ||
            formData.address === "" ||
            formData.description === ""
        ) {
            alert("All fields are required")
            return false
        }
        return true
    }

    async function handleSubmit(event) {
        event.preventDefault()
        let newFormDate = new FormData()
        newFormDate.append("name", formData.name)
        newFormDate.append("address", formData.address)
        newFormDate.append("description", formData.description)
        newFormDate.append("departments", JSON.stringify(formData.departments))
        newFormDate.append("doctors", JSON.stringify(formData.doctors))
        newFormDate.append("file", imageData)
        await axios.post("/api/hospital",
            newFormDate,
            {
                headers: {
                    'Content-Type': 'multipart/formdata'
                },
            }
        ).then((res) => {
            if (res.status === 201) {
                alert("Information Added successful!")
                router.push(`/Admin`)
            } else {
                alert("Something went wrong")
            }
        }).catch((err) => {
            alert("Something went wrong")
        })
    }


    function imageUploadHandler(e) {
        const file = e.target.files[0]
        setImageData(file)
    }

    return (
        <>
            <NavBar />
            <div className='flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
                <div className='w-full max-w-md space-y-8'>
                    <div>
                        <div className=' flex items-center justify-left gap-x-6'>
                            <Link
                                href='/Admin/hospital'
                                className='text-base font-semibold leading-7 text-gray-900'
                            >
                                <span aria-hidden='true'>←</span> Back
                            </Link>
                        </div>
                        <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
                            Add New Hospital
                        </h2>
                    </div>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            if (validateForm()) {
                                handleSubmit(e)
                            }
                        }}
                        className='mt-8 space-y-6 bg-white p-6 rounded py-3'
                    >
                        <div className='-space-y-px rounded-md shadow-sm py-3'>
                            <div className='pt-8'>
                                <Input
                                    label={"Hospital Name"}
                                    name='name'
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className='pt-6'>
                                <Input
                                    label={"Address"}
                                    name='address'
                                    value={formData.address}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='pt-6'>
                                <label for="">Enter Description</label>
                                <textarea
                                    label={"Enter Full Information"}
                                    className='relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                                    name='description'
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="pt-6">
                                <label for="">Select Department</label>
                                <select
                                    name="department"
                                    onChange={handleChange}
                                    value=""
                                    className='relative block bg-white w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                                >
                                    <option value="">-- Select Department --</option>
                                    {departments?.map((_department) => (
                                        <option value={_department.id}>{_department.name}</option>
                                    ))}
                                </select>
                                <div className="mt-2 flex flex-wrap">
                                    {formData.departments?.map((_elm) => {
                                        const _getName = departments.find(_depart => _depart.id == _elm.id)
                                        if (_getName) {
                                            return (
                                                <span className="rounded-3xl p-2 mx-2 text-white text-xs bg-gray-600">{_getName.name}</span>
                                            )
                                        }
                                    })}
                                </div>
                            </div>
                            <div className='pt-8'>
                                <Input
                                    label={"Hospital Image"}
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

export default CreateHospital
