import { useState } from "react"
import Button from "../../../components/ui/Button"
import NavBar from "../../../src/components/NavBar"
import { useRouter } from "next/router"
import Input from "../../../components/ui/Input"
import { useSession } from "next-auth/react"
import axios from "axios"
import Link from "next/link"

function CreateHospital() {
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        description: "",
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
        await axios.post("/api/hospital",
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
                        className='mt-8 space-y-6 bg-white p-6 rounded'
                    >
                        <div className='-space-y-px rounded-md shadow-sm'>
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
                        </div>

                        <Button type='submit'>Submit</Button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateHospital
