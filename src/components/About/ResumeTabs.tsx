import React from 'react'
import { TabPanel } from '@/components'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { resumeTabs } from '@/utils'
import { styled } from '@mui/material'
import Education from './Education'
import WorkExperience from './WorkExperience'
import Skills from './Skills'
import Certification from './Certification'

const StlyedTabs = styled(Tabs)(({ theme }) => ({
  width: '90%',
  margin: '0 auto',
  padding: '1rem',
  backgroundColor: 'transparent',
  boxShadow: 'none',
  '& .MuiTabs-indicator': {
    backgroundColor: 'transparent',
  },

  '& .MuiTabs-flexContainer': {
    justifyContent: 'center',
  },
}))

const ResumeTabs = () => {
  const [activeTab, setActiveTab] = React.useState(1);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };
  const switchTab = (value: string) => {
    switch (value) {
      case 'education':
        return <Education />
      case 'experience':
        return <WorkExperience />
      case 'skills':
        return <Skills />
      case 'certifications':
        return <Certification />
      default:
        return null
    }
  };
  return (
    <>
      <StlyedTabs
        value={activeTab}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="inherit"
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        {resumeTabs.map((tab, index) => (

          <Tab
            key={tab.label}
            label={tab.label}
            id={`scrollable-auto-tab-${tab.value}`}
            aria-controls={`scrollable-auto-tabpanel-${tab.value}`}
            value={index}
            sx={{
              borderRadius: activeTab === index ? '5px' : '3px',
              transition: 'all 0.3s ease-in-out',
              backgroundColor: activeTab === index ? 'secondary.main' : 'white',
              color: activeTab === index ? 'white' : 'text.primary',
              fontWeight: activeTab === index ? 700 : 600,
              width: '280px',
              padding: '1.5rem',
              margin: '0 .8rem',
              boxShadow: activeTab === index ? '0px 0px 10px 0px rgba(0,0,0,0.75)' : 'rgb(209, 217, 230) 5px 5px 15px 0px, rgb(255, 255, 255) -5px -5px 15px 0px',
              '&:hover': {
                backgroundColor: 'secondary.main',
                color: 'white',
                fontWeight: 700,
                transform: 'scale(1.1)',
                borderRadius: '8px',
              },
            }}
          />
        ))}
      </StlyedTabs>
      {resumeTabs.map((tab, index) => {
        const { label, value } = tab
        return (
          <TabPanel
            key={label}
            value={activeTab}
            index={index}
          >
            {switchTab(value)}
          </TabPanel>
        )
      })}
    </>
  )
}

export default ResumeTabs