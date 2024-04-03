import React, { useState } from 'react'
import { AppBar, Box, Tab, Tabs, styled } from '@mui/material'

const tabHeight2 = '35px'
const CustomTab = styled(Tab)(() => ({
  backgroundColor: '#FFFFFF',
  minHeight: tabHeight2,
  color: '#000000',
  '&.Mui-selected': {
    backgroundColor: '#215280',
    color: '#FFFFFF'
  }
}))
const tabHeight = '38px'
const CustomTabs = styled(Tabs)(() => ({
  minHeight: tabHeight
}))

interface TabPanelProps {
  children?: React.ReactNode
  value: number
  index: number
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index, ...other }) => {
  return (
    <Box
      role='tabpanel'
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </Box>
  )
}

interface TabControlProps {
  components: {
    index: number
    heading: string
    component: React.ReactElement
  }[]
}

const TabControl: React.FC<TabControlProps> = ({ components }) => {
  const [value, setValue] = useState(0)

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box
      sx={{
        flexGrow: 1
      }}
    >
      <AppBar
        position='sticky'
        sx={{
          backgroundColor: '#FFFFFF',
          top: { xs: 95, sm: 110 }
        }}
      >
        <CustomTabs
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{
            style: {
              height: 5,
              background: '#FFFF00'
            }
          }}
        >
          {components.map(item => (
            <CustomTab key={item.index + 1} value={item.index} label={item.heading} />
          ))}
        </CustomTabs>
      </AppBar>
      {components.map(item => (
        <TabPanel key={item.index + 1} value={value} index={item.index}>
          {item.component}
        </TabPanel>
      ))}
    </Box>
  )
}

export default TabControl
