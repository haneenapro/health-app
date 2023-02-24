import { useState, useEffect } from "react"
import Head from "next/head"
import Image from "next/image"
// import Layout from "@components/Layout"
// import Container from "@components/Container"
import Button from "../../../components/ui/Button"
import images from "../../data/images.json"
import styles from "../../../styles/Home.module.scss"
import { getSession } from "next-auth/react"
// import prisma from "../../../src/db/prisma"
import { authOptions } from "../../api/auth/[...nextauth]"
import { unstable_getServerSession } from "next-auth"
import prisma from "../../../src/db/prisma"

import NavBar from "../../../src/components/NavBar"

export async function getServerSideProps({ req, res }) {
  const session = await unstable_getServerSession(req, res, authOptions)

  const reports = await prisma.report.findMany({
    where: { userId: session.user.id },
    // select: {},
  })
  ///////////
  return {
    props: {
      reports: JSON.stringify(reports),
    },
  }
}

export default function Home({ reports }) {
  console.log(JSON.parse(reports))
  return (
    <div>
      <Head>
        <title>Reports</title>
        <meta name='description' content='All of my images.' />
      </Head>

      <NavBar />
      <div className='m-10'>
        <h1 className='sr-only'>My Report Cards </h1>

        <h2 className='text-[40px] font-bold pl-10'> Report Cards </h2>
        <div className='pl-10 flex items-center justify-left gap-x-6'>
          <a
            href='/Patients'
            className='text-base font-semibold leading-7 text-gray-900'
          >
            <span aria-hidden='true'>←</span> Back
          </a>
        </div>

        <div className='flex-col mt-4'>
          {JSON.parse(reports).map((report) => {
            return (
              <div className='max-w-2xl rounded shadow-sm bg-white p-4 mt-10'>
                <img src={report.image} />
                <h4 className='text-2xl'>{report.title}</h4>
                <p>{report.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
