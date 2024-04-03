import { Add } from '@mui/icons-material'
import { useTheme } from '@mui/material'
import React from 'react'
import BaseLayout from 'src/layouts/components/common/BaseLayout'
import Button from 'src/layouts/components/common/Button'
import Tab from 'src/layouts/components/common/Tab'
import ActiveSectionList from './list/ActiveSectionList'
import { useRouter } from 'next/router'
import ArchiveSectionList from './list/ArchiveSectionList'

const SectionTab = () => {
  const router = useRouter()
  const theme = useTheme()

  const admins = [
    {
      index: 0,
      heading: 'Active',
      component: <ActiveSectionList />,
      hasPermission: true
    },
    {
      index: 1,
      heading: 'Archived',
      component: <ArchiveSectionList />,
      hasPermission: true
    }
  ]

  return (
    <BaseLayout
      heading='SECTION LIST'
      isActionButton={
        <Button
          name='Add New'
          endIcon={<Add />}
          onClick={() => router.push('/course/manage-courses/section/form')}
          bgColor={theme.palette.primary.dark}
          color={theme.palette.common.white}
        />
      }
    >
      <Tab components={admins.filter(item => item.hasPermission)} />
    </BaseLayout>
  )
}

export default SectionTab
