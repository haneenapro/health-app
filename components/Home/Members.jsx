import React from "react"

const members = [
  {
    name: "Sandhya Oli",
    image: (
      <img
        src='images/sandhya.png'
        alt='img'
        className='h-[440px] rounded-l-lg'
      />
    ),
    position: "Co-CEO",
    description:
      "Ali is the Co-CEO of this organisation. He is a software engineer. He is enthuiastic and concerned about health and fitness.",
  },
  {
    name: "Jack Wilson",
    image: (
      <img src='images/roshan.png' alt='img' className='h-[440px] rounded-lg' />
    ),
    position: "Manager",
    description:
      "Jack is the Co-CEO of this organisation. He is a software engineer.",
  },
  {
    name: "Haneena Zainab",
    image: (
      <img
        src='images/haneena.png'
        alt='img'
        className='h-[440px] rounded-r-lg'
      />
    ),
    position: "Founder",
    description:
      "Thomas is the Co-CEO of this organisation. He is a software engineer.",
  },
]

const Members = () => {
  return (
    <div>
      <div className='flex flex-col gap-2 justify-between px-20 md:flex-row'>
        {members.map((member, index) => {
          return (
            <Card
              key={index}
              name={member.name}
              position={member.position}
              image={member.image}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Members

const Card = ({ name, position, image }) => {
  return (
    <div className='py-10'>
      <div className=' py-3'> {image} </div>
      <div className='font-bold'>{name}</div>
      <div> {position} </div>
    </div>
  )
}
