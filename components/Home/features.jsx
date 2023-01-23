import React from "react"

const features = [
  {
    image: (
      <img
        src='images/info.png'
        alt='img'
        className='h-[440px] w-[300px] rounded-l-lg'
      />
    ),
    name: "Information Section",
    desc: "In this section there is detail info about health.",
  },
  {
    image: (
      <img
        src='images/q-a.jpg'
        alt='img'
        className='h-[440px] w-[300px] rounded-l-lg'
      />
    ),
    name: "Q/A Section",
    desc: "In this section there is detail info about health.",
  },
  {
    image: (
      <img
        src='images/chart.jpg'
        alt='img'
        className='h-[440px] w-[300px] rounded-l-lg'
      />
    ),
    name: "Report Section",
    desc: "In this section there is detail info about health.",
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
    <div class='py-10'>
      <div className=' py-3'> {image} </div>
      <div class='font-bold'>{name}</div>
      <div> {desc} </div>
    </div>
  )
}
