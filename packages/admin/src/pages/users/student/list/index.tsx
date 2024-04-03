import { Add } from '@mui/icons-material'
import React from 'react'
import { useTheme } from '@mui/material'
import { useRouter } from 'next/router'
import BaseLayout from 'src/layouts/components/common/BaseLayout'
import Button from 'src/layouts/components/common/Button'
import Tab from 'src/layouts/components/common/Tab'
import ActiveStudentList from './ActiveStudentList'
import ArchivedStudentList from './ArchivedStudentList'

const StudentTab = () => {
  const router = useRouter()
  const theme = useTheme()

  const admins = [
    {
      index: 0,
      heading: 'Active',
      component: <ActiveStudentList />,
      hasPermission: true
    },
    {
      index: 1,
      heading: 'Archived',
      component: <ArchivedStudentList />,
      hasPermission: true
    }
  ]

  return (
    <BaseLayout
      heading='STUDENT LIST'
      isActionButton={
        <Button
          name='Add New'
          endIcon={<Add />}
          onClick={() => router.push({ pathname: 'form' })}
          bgColor={theme.palette.primary.dark}
          color={theme.palette.common.white}
        />
      }
    >
      <Tab components={admins.filter(item => item.hasPermission)} />
    </BaseLayout>
  )
}

export default StudentTab
