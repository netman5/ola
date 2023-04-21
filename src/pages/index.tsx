import React from 'react'
import Head from 'next/head'
import { Hero, Layout, ProjectSection, ProjectModal, BlogSection, BlogModal } from '@/components'
import { useFetch, useToggle } from '@/hooks'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import prisma from '@/lib/prisma'
import { Project } from '@/types'

type Props = {
  projects: Project[]
}

export default function Home(props: Props) {
  const { isOpen: openModal, toggleOpen: setOpenModal } = useToggle(false)
  const { isOpen: openBlogModal, toggleOpen: setOpenBlogModal } = useToggle(false)
  const url = process.env.NEXT_PUBLIC_MEDIUM_API_URL || ''
  const { data, isLoading, isError } = useFetch(url)
  const [blogItem, setBlogId] = React.useState({})
  const [project, setProject] = React.useState({})

  const handleOpenModal = (id: string) => {
    setOpenModal()
    const project = props.projects.find((item: any) => item.id === id)
    setProject(project || {})
  }

  const handleOpenBlogModal = (item: any) => {
    setOpenBlogModal()
    setBlogId(item)
  }

  return (
    <>
      {openModal && <ProjectModal open={openModal} handleClose={handleOpenModal} project={project} />}
      {openBlogModal && <BlogModal blogItem={blogItem} open={openBlogModal} handleClose={handleOpenBlogModal}
      />}
      <Head>
        <title>Ola Ishola</title>
        <meta name="description" content="Personal website built with NextJS, MongoDB and Material UI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Layout>
        <Hero />
        <ProjectSection handleOpenModal={handleOpenModal} data={props.projects} />
        <BlogSection handleOpenBlogModal={handleOpenBlogModal} data={data} isLoading={isLoading} />
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req })

  if (!session) {
    res.statusCode = 403
    return {
      props: { projects: [] }
    }
  }

  const projects = await prisma.project.findMany({
    where: {
      author: {
        email: session?.user?.email
      },
      published: true
    },
    include: {
      author: {
        select: {
          name: true,
        }
      }
    }
  })
  return {
    props: { projects: JSON.parse(JSON.stringify(projects)) }
  }
}