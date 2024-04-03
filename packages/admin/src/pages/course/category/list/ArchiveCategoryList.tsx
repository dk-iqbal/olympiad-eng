import { LockOpen } from '@mui/icons-material'
import { Box, CircularProgress, List } from '@mui/material'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import baseAxios from './../../../../services/config'
import { CATEGORY_API } from './../../../../services/api-end-points/index'
import CommonListDetails from 'src/layouts/components/common/CommonListDetails'
import { USER_STATUS } from 'src/utils/util'
import Dialog from 'src/layouts/components/common/Dialog'
import { getCategoriesByStatus } from 'src/utils/functions/categoryFunction'

interface Category {
  _id: string
  name: string
  status: boolean
}

function ArchivedCategoryList() {
  //#region States
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState<Category>({ _id: '', name: '', status: false })
  const [categories, setCategories] = useState<Category[]>([])

  //#endregion

  const handleClickActions = (item: any, i: number, actions: any[]) => {
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
  1. On deactivate function by status
*/
  const onCategoryActivation = async (item: Category) => {
    try {
      const payload = { status: !item.status }
      await baseAxios.put(`${CATEGORY_API.edit_category}/${item._id}`, payload)
      toast.success('Category Activated Successfully')
      fetchActiveCategoryByStatus()
      setDeleteModalOpen(false)
    } catch (error) {
      console.error('Error deactivating user:', error)
      toast.error('Something went wrong!!')
    }
  }

  const fetchActiveCategoryByStatus = async () => {
    try {
      setLoading(true)
      const response = await getCategoriesByStatus(USER_STATUS.INACTIVE)
      setCategories(response as any)
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

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
            categories?.map((item, index) => {
              const updateItem = {
                id: item._id,
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
              const actions = [{ icon: <LockOpen color='info' />, name: 'Category Activation' }]

              return (
                <CommonListDetails
                  key={item._id}
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
        headertext='Category Activation'
        actionButtonName='Confirm'
        bodyText={`Are you sure? You want to Activate `}
        handleChange={() => onCategoryActivation(selectedItem)}
      />
    </>
  )
}

export default ArchivedCategoryList
