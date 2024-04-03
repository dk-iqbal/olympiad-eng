import { LockOpen } from '@mui/icons-material'
import { Box, CircularProgress, List } from '@mui/material'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import CommonListDetails from 'src/layouts/components/common/CommonListDetails'
import Dialog from 'src/layouts/components/common/Dialog'
import { activateUser, fetchUsers } from 'src/services/CommonFunction'
import { USER_ROLE, USER_STATUS } from 'src/utils/util'

function ArchivedAdminList() {
  //#region States
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedItem, setSelectedItem] = useState({})
  const [adminUsers, setAdminUsers] = useState([])

  //#endregion

  const handleClickActions = (item: any, i: number, actions: any) => {
    if (actions.length > 0) {
      switch (i) {
        case 0: {
          setDeleteModalOpen(true)
          setSelectedItem(item?.selectedItem)
          break
        }
        default:
          break
      }
    }
  }

  //#region define functions
  /*
  1. On delete function
*/
  const onUserDeactivation = async (item: any) => {
    try {
      await activateUser(item._id, !item.status)
      toast.success('Account Activated Successfully')
      setLoading(false)
      setDeleteModalOpen(false)
      fetchAllArchvedAdmin()
    } catch (error) {
      console.error('Error deactivating user:', error)
      toast.success('Something went wrong!!')
    }
  }

  const fetchAllArchvedAdmin = async () => {
    setLoading(true)
    const response = await fetchUsers(USER_ROLE.ADMIN, USER_STATUS.INACTIVE)
    setAdminUsers(response)
    setLoading(false)
  }

  useEffect(() => {
    fetchAllArchvedAdmin()
  }, [])

  return (
    <>
      {loading ? (
        <Box sx={{ justifyContent: 'center', display: 'flex', paddingY: 1 }}>
          <CircularProgress color='primary' size={40} variant='indeterminate' />
        </Box>
      ) : (
        <List sx={{ width: '100%', mt: 1 }}>
          {adminUsers?.length > 0 ? (
            adminUsers?.map((item: any, index: number) => {
              const updateItem = {
                id: item._id,
                username: item?.username,
                listItem: [
                  {
                    label: 'name',
                    value: item.name
                  },
                  {
                    label: 'phone',
                    value: `${item.phone}`
                  }
                ],
                selectedItem: item
              }
              const actions = [{ icon: <LockOpen color='info' />, name: 'Account Deactivation' }]

              return (
                <CommonListDetails
                  notShowDetails={true}
                  key={item.username}
                  item={updateItem}
                  index={index}
                  handleClickActions={handleClickActions}
                  actions={actions}
                />
              )
            })
          ) : (
            <Box
              sx={{
                textAlign: 'center',
                p: 2,
                color: 'red',
                fontSize: 18
              }}
            >
              Data Not Found
            </Box>
          )}
        </List>
      )}

      <Dialog
        open={deleteModalOpen}
        setOpen={setDeleteModalOpen}
        loading={loading}
        headertext='Accounts Deactivation'
        actionButtonName='Confirm'
        bodyText={`Are you sure? You want to Activate user`}
        handleChange={() => onUserDeactivation(selectedItem)}
      />
    </>
  )
}

export default ArchivedAdminList
