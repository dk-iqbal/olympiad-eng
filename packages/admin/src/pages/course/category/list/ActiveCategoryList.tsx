import { Edit, Lock } from '@mui/icons-material'
import { Box, CircularProgress, List } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { CATEGORY_API } from 'src/services/api-end-points'
import baseAxios from 'src/services/config'
import { useRouter } from 'next/router'
import CommonListDetails from 'src/layouts/components/common/CommonListDetails'
import { USER_STATUS } from 'src/utils/util'
import Dialog from 'src/layouts/components/common/Dialog'
import { getCategoriesByStatus } from 'src/utils/functions/categoryFunction'

function ActiveCategoryList() {
  // #region hooks
  const router = useRouter()

  // #endregion

  // #region States
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState({})
  const [categories, setCategories] = useState([])

  // #endregion

  const handleClickActions = (item: any, i: number, actions: any) => {
    if (actions.length > 0) {
      switch (i) {
        case 1: {
          setDeleteModalOpen(true)
          setSelectedItem(item?.selectedItem)
          break
        }
        case 0: {
          router.push({
            pathname: `/course/category/form`,
            query: { id: item.id, ...item?.selectedItem }
          })
          break
        }
        default:
          break
      }
    }
  }

  const fetchActiveCategoryByStatus = async () => {
    try {
      setLoading(true)
      const response = await getCategoriesByStatus(USER_STATUS.ACTIVE)
      setCategories(response as any)
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  // #region define functions
  /*
    1. On deactivate function by status
  */
  const onCategoryDeactivation = async (item: any) => {
    try {
      setLoading(true)
      const payload = { status: !item.status }
      await baseAxios.put(`${CATEGORY_API.edit_category}/${item._id}`, payload)
      toast.success('Category Deactivated Successfully')
      fetchActiveCategoryByStatus()
      setDeleteModalOpen(false)
    } catch (error) {
      console.error('Error deactivating user:', error)
      toast.error('Something went wrong!!')
    }
  }

  // #endregion

  useEffect(() => {
    fetchActiveCategoryByStatus()
  }, [])

  return (
    <>
      {loading ? (
        <Box sx={{ justifyContent: 'center', display: 'flex', paddingY: 1 }}>
          <CircularProgress color='primary' size={40} variant='indeterminate' />
        </Box>
      ) : (
        <List sx={{ width: '100%', mt: 1 }}>
          {categories?.length > 0 ? (
            categories?.map((item: any, index: number) => {
              const updateItem = {
                id: item._id,
                username: item?.username,
                listItem: [
                  {
                    label: 'name',
                    value: item.name
                  },
                  {
                    label: 'status',
                    value: `${item.status ? 'Active' : 'Deactive'}`
                  }
                ],
                selectedItem: item
              }
              const actions = [
                { icon: <Edit color='warning' />, name: 'Edit' },
                { icon: <Lock color='error' />, name: 'Category Deactivation' }
              ]

              return (
                <CommonListDetails
                  notShowDetails={true}
                  key={item.username}
                  item={updateItem}
                  navigatePath='/course/category/details'
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
        headertext='Category Deactivation'
        actionButtonName='Confirm'
        bodyText={`Are you sure? You want to Deactivate `}
        handleChange={() => onCategoryDeactivation(selectedItem)}
      />
    </>
  )
}

export default ActiveCategoryList
