import React from 'react'
import BaseLayout from 'src/layouts/components/common/BaseLayout'
import Tab from 'src/layouts/components/common/Tab'
import PendingComments from './PendingComments'
import ApprovedComments from './ApprovedComments'

const AdminTab = () => {
  const admins = [
    {
      index: 0,
      heading: 'Pending',
      component: <PendingComments />,
      hasPermission: true
    },
    {
      index: 1,
      heading: 'Approved',
      component: <ApprovedComments />,
      hasPermission: true
    }
  ]

  return (
    <BaseLayout
      heading='COMMENTS LIST'
      isActionButton={
        <></>

        // <Button
        //   name='Add New'
        //   endIcon={<Add />}
        //   onClick={() => router.push({ pathname: 'form' })}
        //   bgColor={theme.palette.primary.dark}
        //   color={theme.palette.common.white}
        // />
      }
    >
      <Tab components={admins.filter(item => item.hasPermission)} />
    </BaseLayout>
  )
}

export default AdminTab
