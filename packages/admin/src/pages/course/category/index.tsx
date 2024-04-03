import { Add } from '@mui/icons-material'
import { useTheme } from '@mui/material'
import React from 'react'
import BaseLayout from 'src/layouts/components/common/BaseLayout'
import Button from 'src/layouts/components/common/Button'
import Tab from 'src/layouts/components/common/Tab'
import ActiveCategoryList from './list/ActiveCategoryList'
import { useRouter } from 'next/router'
import ArchivedCategoryList from './list/ArchiveCategoryList'

const CategoryTab = () => {
  const router = useRouter()
  const theme = useTheme()

  const admins = [
    {
      index: 0,
      heading: 'Active',
      component: <ActiveCategoryList />,
      hasPermission: true
    },
    {
      index: 1,
      heading: 'Archived',
      component: <ArchivedCategoryList />,
      hasPermission: true
    }
  ]

  return (
    <BaseLayout
      heading='CATEGORY LIST'
      isActionButton={
        <Button
          name='Add New'
          endIcon={<Add />}
          onClick={() => router.push('/course/category/form')}
          bgColor={theme.palette.primary.dark}
          color={theme.palette.common.white}
        />
      }
    >
      <Tab components={admins.filter(item => item.hasPermission)} />
    </BaseLayout>
  )
}

export default CategoryTab
