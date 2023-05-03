/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { EditAboutForm, Layout } from '@/components'
import { styled } from '@mui/material'
import Typography from '@mui/material/Typography'
import AboutImage from './AboutImage'
import temImg from '@/assets/images/modalpic.jpeg'
import CurrentWork from './CurrentWork'
import AboutContent from './AboutContent'
import ResumeTabs from './ResumeTabs'
import { useSession } from 'next-auth/react';


const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.main,
  textAlign: 'center',
  margin: '2rem auto',
  fontSize: '92.558px !important',
  fontWeight: 700,
  lineHeight: '1.1',
  letterSpacing: '-0.02em',

  [theme.breakpoints.down('sm')]: {
    color: 'blue',
  },
}))

const AboutPageContainerStyling = styled('div')(({ theme }) => ({
  h2: {
    fontSize: '45px',
    fontWeight: 600,
    lineHeight: '1.1',
  },

  '.current': {
    width: '90%',
    margin: '5rem auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',

    h2: {
      textAlign: 'center',
      margin: '2rem auto',
    },

  },
  '.resume': {

    '.sub-header': {
      textAlign: 'center',
      margin: '2rem auto',
    },
  },
  [theme.breakpoints.down('sm')]: {
    color: 'blue',
  },
}))

const AboutInfoDiv = styled('div')(({ theme }) => ({
  width: '90%',
  margin: '5rem auto',
  display: 'flex',
  alignItems: 'center',
  gap: '5rem',

  '.about': {
    borderRadius: '20px',
    boxShadow: 'rgb(209, 217, 230) 5px 5px 15px 0px, rgb(255, 255, 255) -5px -5px 15px 0px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(4),
    gap: '2rem',
    backgroundColor: theme.palette.primary.light,

    p: {
      fontSize: '19px',
    },

  },

  [theme.breakpoints.down('sm')]: {
    color: 'blue',
  },
}))

const StyledResumeSection = styled('section')(({ theme }) => ({
  margin: '5rem auto',
  display: 'flex',
  flexDirection: 'column',

  [theme.breakpoints.down('sm')]: {
    color: 'blue',
  },
}))



const AboutPage = ({ data }) => {
  const { data: session } = useSession()
  const [isEditable, setIsEditable] = React.useState(false)

  const toggleEditable = () => {
    setIsEditable(!isEditable)
  }
  const userLoggedIn = session?.user?.email

  return (
    <Layout>
      <AboutPageContainerStyling>
        <StyledTypography variant='h1'>I'm Ola.</StyledTypography>
        {isEditable && userLoggedIn ? (
          <>
            <EditAboutForm about={data} />
          </>
        ) : (
          <>
            <AboutInfoDiv>
              <AboutImage />
              <div className='about'>
                <AboutContent />
              </div>
            </AboutInfoDiv>
            <div className='current'>
              <Typography variant='h2'>Currently working on</Typography>
              <CurrentWork
                appImage={temImg}
                year='2022-Present'
                appTitle='JobHunter'
                role='FullStack Developer'
                appDescription='Resume builder and job application tracker for african job seekers.'
              />

              <CurrentWork
                appImage={temImg}
                year='2023-Present'
                appTitle='Juubix'
                role='FullStack Developer'
                appDescription='Juubix a decentralized Talents and Investors matching platform.'
              />
            </div>
            {userLoggedIn && <button type='button' onClick={toggleEditable}>
              Edit
            </button>}
          </>
        )}

        <StyledResumeSection className='resume'>
          <Typography variant='h2' className='sub-header'>My Resume</Typography>
          <ResumeTabs />
        </StyledResumeSection>
      </AboutPageContainerStyling>

    </Layout>
  )
}

export default AboutPage