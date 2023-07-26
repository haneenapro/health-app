import React from "react"

const features = [
  {
    image: (
      <img
        src='images/info.png'
        alt='img'
        className='h-[440px] w-[300px] rounded-l-lg'
        style={{objectFit: "cover"}}
      />
    ),
    name: "Information Section",
    desc: "You can view information about health.",
  },
  {
    image: (
      <img
        src='images/q-a.jpg'
        alt='img'
        className='h-[440px] w-[300px] rounded-l-lg'
        style={{objectFit: "cover"}}
      />
    ),
    name: "Q/A Section",
    desc: "You can ask question about health.",
  },
  {
    image: (
      <img
      src='images/cunsultant.png'
        alt='img'
        className='h-[440px] w-[300px] rounded-l-lg'
        style={{objectFit: "cover"}}
      />
    ),
    name: "Book Consultation",
    desc: "You can book your consultation online or offline.",
  },
  {
    image: (
      <img
        src='images/reminder.jpg'
        alt='img'
        className='h-[440px] w-[300px] rounded-l-lg'
        style={{objectFit: "cover"}}
      />
    ),
    name: "Medication Reminder System",
    desc: "You can get notification reminder",
  },
]

const Features = () => {
  return (
    <div>
      <div className='flex flex-col gap-2 justify-between px-20 md:flex-row'>
        {features.map((feature, index) => {
          return (
            <Card
              key={index}
              image={feature.image}
              name={feature.name}
              desc={feature.desc}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Features

const Card = ({ image, name, desc }) => {
  return (
    <div className='py-10'>
      <div className=' py-3'> {image} </div>
      <div className='font-bold'>{name}</div>
      <div> {desc} </div>
    </div>
  )
}
