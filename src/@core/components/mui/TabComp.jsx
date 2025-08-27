'use client'

//React Imports
import { useState } from 'react'

//MUI Imports
import Grid from '@mui/material/Grid2'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'

//Component Imports
import CustomTabList from '@core/components/mui/TabList'

const TabComp = ({ initialActiveTab, tabContentList, tabsOption }) => {
  //State
  const [activeTab, setActiveTab] = useState(initialActiveTab)

  const handleChange = (event, value) => {
    setActiveTab(value)
  }

  return (
    <TabContext value={activeTab}>
      <Grid container spacing={6}>
        <Grid size={{ xs: 12 }}>
          <CustomTabList onChange={handleChange} variant='scrollable' pill='true'>
            {tabsOption.map((itm, idx) => (
              <Tab
                key={idx}
                label={itm.label}
                icon={activeTab === itm.value ? itm.activeIcon : itm.defaultIcon}
                iconPosition={itm.iconPosition}
                value={itm.value}
              />
            ))}
          </CustomTabList>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TabPanel value={activeTab} className='p-0'>
            {tabContentList[activeTab]}
          </TabPanel>
        </Grid>
      </Grid>
    </TabContext>
  )
}

export default TabComp
