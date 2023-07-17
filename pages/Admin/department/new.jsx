import { useState } from "react"
import Button from "../../../components/ui/Button"
import NavBar from "../../../src/components/NavBar"
import { useRouter } from "next/router"
import Input from "../../../components/ui/Input"
import { useSession } from "next-auth/react"
import axios from "axios"
import Link from "next/link"

function CreateDepartment() {
    const [formData, setFormData] = useState({
        name: "",
    })
    const router = useRouter()
    const { status, data: session } = useSession()

    if (status === "loading") return <div>Loading...</div>

    if (status === "unauthenticated" || session.user.role !== "admin") {
        router.push("/login")
        return null
    }

    function handleChange(event) {
        const { name, value } = event.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }


    function validateForm() {
        if (
            formData.name === ""
        ) {
            alert("All fields are required")
            return false
        }
        return true
    }

    async function handleSubmit(event) {
        event.preventDefault()
        await axios.post("/api/department",
            formData
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

    return (
        <>
            <NavBar />
            <div className='flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
                <div className='w-full max-w-md space-y-8'>
                    <div>
                        <div className=' flex items-center justify-left gap-x-6'>
                            <Link
                                href='/Admin'
                                className='text-base font-semibold leading-7 text-gray-900'
                            >
                                <span aria-hidden='true'>←</span> Back
                            </Link>
                        </div>
                        <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
                            Add New Department
                        </h2>
                    </div>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            if (validateForm()) {
                                handleSubmit(e)
                            }
                        }}
                        className='mt-8 space-y-6 bg-white p-6 rounded'
                    >
                        <div className='-space-y-px rounded-md shadow-sm'>
                            <div className='pt-8'>
                                <Input
                                    label={"Department Name"}
                                    name='name'
                                    value={formData.name}
                                    onChange={handleChange}
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

export default CreateDepartment
