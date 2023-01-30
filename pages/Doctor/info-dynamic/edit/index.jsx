import React, { useState, useEffect } from "react"
import Input from "../../../../components/ui/Input"
import Button from "../../../../components/ui/Button"
import QuillText from "../../../../components/Home/QuillText"
import axios from "axios"
import NavBar from "../../../../src/components/NavBar"

const UpdateForm = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    desc: "",
    fullInfo: "",
  })

  useEffect(() => {
    setFormData({
      name: props.information.name,
      title: props.information.title,
      desc: props.information.desc,
      fullInfo: props.information.fullInfo,
    })
  }, [props.information])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const updatedInformation = {
      name: formData.name,
      title: formData.title,
      desc: formData.desc,
      fullInfo: formData.fullInfo,
    }
    await axios.put(
      `http://localhost:3000/api/information/${props.information.id}`,
      updatedInformation
    )
    alert("Information updated successfully")
  }

  return (
    <>
      <NavBar />
      <div className='flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <div className='w-full max-w-md space-y-8'>
          <div>
            <div className=' flex items-center justify-left gap-x-6'>
              <a
                href='/Doctor'
                className='text-base font-semibold leading-7 text-gray-900'
              >
                <span aria-hidden='true'>←</span> Back
              </a>
            </div>
            <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
              Update information on Blog
            </h2>
          </div>

          <form
            onSubmit={handleSubmit}
            className='mt-8 space-y-6 bg-white p-6 rounded'
          >
            <div className='-space-y-px rounded-md shadow-sm'>
              <div className='pt-8'>
                <Input
                  label={"Health Professional Name"}
                  name='name'
                  value={information.name}
                  onChange={handleChange}
                />
              </div>

              {/* titlee */}
              <div className='pt-6'>
                <Input
                  label={"Enter Title"}
                  name='title'
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>

              <div className='pt-6'>
                <Input
                  label={"Enter description"}
                  name='desc'
                  value={formData.desc}
                  onChange={handleChange}
                />
              </div>
              <div className='pt-6'>
                <QuillText
                  label={"Enter Full Information"}
                  className='p-10'
                  name='fullInfo'
                  value={formData.fullInfo}
                  onChange={(val) =>
                    setFormData({ ...formData, fullInfo: val })
                  }
                />
              </div>
            </div>

            <Button type='submit'> Update </Button>
          </form>
        </div>
      </div>
    </>
  )
}

export default UpdateForm
