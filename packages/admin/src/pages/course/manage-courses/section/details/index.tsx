import { Box } from '@mui/material'
import { LockReset } from '@mui/icons-material'
import moment from 'moment'
import Profile from 'src/layouts/components/common/Profile'
import { useRouter } from 'next/router'

const Details = () => {
  //#region Hooks
  const router = useRouter()
  const { id, ...selectedItem } = router.query

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
        router.push(`/instructor-user/reset-password/${id}`, {
          query: {
            // username: selectedItem.username,
            // selectedItem: selectedItem,
            // navigation: '/instructor-user'
          }
        })
        break
      }
      default:
        break
    }
  }

  const editNavigate = `/admin-user/edit/${id}`

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

export default Details
