import { Edit, Lock, LockReset } from '@mui/icons-material'
import { Box, CircularProgress, List } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import CommonListDetails from 'src/layouts/components/common/CommonListDetails'
import { USER_ROLE, USER_STATUS } from 'src/utils/util'
import Dialog from 'src/layouts/components/common/Dialog'
import { activateUser, fetchUsers } from 'src/services/CommonFunction'

function ActiveAdminList() {
  // #region hooks
  const router = useRouter()

  // #endregion

  //#region States
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState({})
  const [adminUsers, setAdminUsers] = useState([])

  // #endregion

  const handleClickActions = (item: any, i: number, actions: any) => {
    if (actions.length > 0) {
      switch (i) {
        case 2: {
          router.push({
            pathname: `/reset-password`,
            query: {
              id: item?.selectedItem?._id,
              navigation: 'users/admin/list'
            }
          })
          break
        }
        case 1: {
          setDeleteModalOpen(true)
          setSelectedItem(item?.selectedItem)
          break
        }
        case 0: {
          router.push({
            pathname: `form`,
            query: {
              id: item?.selectedItem?._id,
              selectedItem: JSON.stringify(item?.selectedItem)
            }
          })
          break
        }
        default:
          break
      }
    }
  }

  // #region define functions
  /*
    1. On deactivate function by status
  */
  const onUserDeactivation = async (item: any) => {
    try {
      await activateUser(item._id, !item.status)
      toast.success('Account Deactivated Successfully')
      setLoading(false)
      setDeleteModalOpen(false)
      fetchAllActiveAdmin()
    } catch (error) {
      console.error('Error deactivating user:', error)
      toast.error('Something wend wrong!!')
    }
  }

  // #endregion

  const fetchAllActiveAdmin = async () => {
    setLoading(true)
    try {
      const response = await fetchUsers(USER_ROLE.ADMIN, USER_STATUS.ACTIVE)
      setAdminUsers(response)
    } catch (error) {
      console.error(error)
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchAllActiveAdmin()
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
              const actions = [
                { icon: <Edit color='warning' />, name: 'Edit' },
                { icon: <Lock color='error' />, name: 'Account Deactivation' },
                {
                  icon: <LockReset color='primary' />,
                  name: 'Reset Password'
                }
              ]

              return (
                <CommonListDetails
                  notShowDetails={false}
                  key={item.username}
                  item={updateItem}
                  navigatePath='/users/admin/details'
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
        bodyText={`Are you sure? You want to Deactivate user`}
        handleChange={() => onUserDeactivation(selectedItem)}
      />
    </>
  )
}

export default ActiveAdminList
