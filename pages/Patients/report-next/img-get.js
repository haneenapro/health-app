import { useState, useEffect } from "react"
import Head from "next/head"
import Image from "next/image"
// import Layout from "@components/Layout"
// import Container from "@components/Container"
import Button from "../../../components/ui/Button"
import images from "../../data/images.json"
import styles from "../../../styles/Home.module.scss"
// import styles from "../../styles/Home.module.scss"

export default function Home({ images }) {
  console.log("images", images)
  return (
    <div>
      <Head>
        <title>My Images</title>
        <meta name='description' content='All of my images.' />
      </Head>

      <div className='m-10'>
        <h1 className='sr-only'>My Images</h1>

        <h2 className='text-[40px] font-bold pl-10'>Report Cards </h2>
        <div className='pl-10 flex items-center justify-left gap-x-6'>
          <a
            href='/Patients'
            className='text-base font-semibold leading-7 text-gray-900'
          >
            <span aria-hidden='true'>←</span> Back
          </a>
        </div>

        <ul className=''>
          {images.map((image) => {
            return (
              <li key={image.id} className='m-10 mb-20'>
                <a href={image.link} rel='noreferrer'>
                  <div className=''>
                    <Image
                      width={image.width}
                      height={image.height}
                      src={image.image}
                      alt=''
                    />
                  </div>
                  <h3 className='text-2xl font-bold'>{image.id}</h3>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const results = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/image`,
    {
      headers: {
        Authorization: `Basic ${Buffer.from(
          process.env.CLOUDINARY_API_KEY +
            ":" +
            process.env.CLOUDINARY_API_SECRET
        ).toString("base64")}`,
      },
    }
  ).then((r) => r.json())

  const { resources } = results

  const images = resources.map((resource) => {
    const { width, height } = resource
    return {
      id: resource.asset_id,
      title: resource.public_id,
      image: resource.secure_url,
      width,
      height,
    }
  })
  return {
    props: { images },
  }
}
