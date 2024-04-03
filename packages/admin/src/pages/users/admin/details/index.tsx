import { Box } from '@mui/material'
import { LockReset } from '@mui/icons-material'
import moment from 'moment'
import Profile from 'src/layouts/components/common/Profile'
import { useRouter } from 'next/router'

const UserDetails = () => {
  //#region Hooks
  const router = useRouter()
  const { id, ...queryData } = router.query
  const selectedItem = queryData ? JSON.parse(queryData?.selectedItem as string) : null

  //#endregion

  // const parseInfo =
  //   selectedItem?.info && typeof selectedItem?.info === 'string' ? JSON.parse(selectedItem?.info) : selectedItem?.info

  const doctorData = [
    { label: 'Email', value: selectedItem?.email },
    { label: 'Status', value: selectedItem?.status ? 'Active' : 'Deactive' }
  ].filter(f => f.value)

  const userInfo = {
    basicInfo: {
      name: selectedItem?.name,
      updatedDate: moment(selectedItem?.updatedOn).format('MMMM D, YYYY h:mm A'),
      id: '1234567',
      mobile: selectedItem?.phone
    },
    details: doctorData,
    selectedItem: selectedItem
  }

  /*
    1. On Activation function for Activate or Deactivate selectedItem
  */
  const handleClickActions = (item: any, i: number) => {
    switch (i) {
      case 0: {
        router.push(`/reset-password`, {
          query: {
            id: selectedItem?._id || id,
            selectedItem: JSON.stringify(selectedItem),
            navigation: '/users/admin/list'
          }
        })
        break
      }
      default:
        break
    }
  }

  const editNavigate = `/users/admin/form`

  const actionViews = [{ label: 'Reset Password', value: '', icon: <LockReset color='primary' /> }]

  return (
    <Box>
      <Profile
        editNavigate={editNavigate}
        userInfo={userInfo}
        actionButtons={actionViews}
        handleClickActions={handleClickActions}
      />
    </Box>
  )
}

export default UserDetails
