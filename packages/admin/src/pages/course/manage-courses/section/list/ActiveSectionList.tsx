import { Edit, Lock } from '@mui/icons-material'
import { Box, CircularProgress, Grid, List } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import CommonListDetails from 'src/layouts/components/common/CommonListDetails'
import { USER_STATUS } from 'src/utils/util'
import Dialog from 'src/layouts/components/common/Dialog'
import { editSection, getSectionsByStatus } from 'src/utils/functions/sectionFunction'
import { uniqBy } from 'lodash'
import CustomAutocomplete from 'src/layouts/components/common/Autocomplete'

interface Option {
  label: string
  value: string
}

function ActiveSectionList() {
  // #region hooks
  const router = useRouter()

  // #endregion

  // #region States
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState({})
  const [sections, setSections] = useState([])
  const [courses, setCourses] = useState([])
  const [searchDdl, setSearchDdl] = useState<{
    course: Option[]
  }>({
    course: [],
  })

  const [searchValue, setSearchValue] = useState({
    course: null,
  })

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
            pathname: `/course/manage-courses/section/form`,
            query: { id: item.id, selectedItem: JSON.stringify(item?.selectedItem) }
          })
          break
        }
        default:
          break
      }
    }
  }

  const fetchActiveSectionByStatus = async () => {
    try {
      setLoading(true)
      const response = await getSectionsByStatus(USER_STATUS.ACTIVE)
      setSections(response as any)
      setCourses(response as any)
      const course = uniqBy(
        response?.map((c: any) => ({
          label: c.courseName,
          value: c.courseId
        })), 'value')
        setSearchDdl({
          course: course as Array<unknown> as Option[],
        })
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  // #region define functions
  /*
    1. On deactivate function by status
  */
  const onSectionDeactivation = async (item: any) => {
    try {
      setLoading(true)
      const payload = { isActive: !item.isActive }
      await editSection(item._id, payload)
      toast.success('Section Deactivated Successfully')
      fetchActiveSectionByStatus()
      setDeleteModalOpen(false)
    } catch (error) {
      console.error('Error deactivating user:', error)
      toast.error('Something went wrong!!')
    }
  }

  // Function to filter courses based on selected filters
  const filterCourses = (filters: any) => {
    let filteredCourses = courses
    if (filters?.course) {
      filteredCourses = filteredCourses?.filter((course: any) => {
        return filters.course?.value === course.courseId
      })
    }
    filteredCourses = filteredCourses
    setSections(filteredCourses)
  }

  // Function to handle any filter change
  const handleFilterChange = (value: any, filterType: any) => {
    filterCourses({ ...searchValue, [filterType]: value })
    setSearchValue({ ...searchValue, [filterType]: value })
  }

  // #endregion

  useEffect(() => {
    fetchActiveSectionByStatus()
  }, [])

  return (
    <>
      {loading ? (
        <Box sx={{ justifyContent: 'center', display: 'flex', paddingY: 1 }}>
          <CircularProgress color='primary' size={40} variant='indeterminate' />
        </Box>
      ) : (
        <Box>
           <Grid container spacing={1} p={1} justifyContent={'center'} alignItems={'center'}>
          {/* Course Categories */}
          <Grid item xs={12}>
            <CustomAutocomplete
              onChange={e => handleFilterChange(e, 'course')}
              options={searchDdl?.course || []}
              placeholder='Select Olympiad'
              value={searchValue?.course}
            />
          </Grid>
        </Grid>
          <List sx={{ width: '100%', mt: 1 }}>
            {sections?.length > 0 ? (
              sections?.map((item: any, index: number) => {
                const updateItem = {
                  id: item._id,
                  listItem: [
                    {
                      label: 'Olympiad Name',
                      value: item.courseName
                    },
                    {
                      label: 'name',
                      value: item.name
                    }
                  ],
                  selectedItem: item
                }
                const actions = [
                  { icon: <Edit color='warning' />, name: 'Edit' },
                  { icon: <Lock color='error' />, name: 'Section Deactivation' }
                ]

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
        </Box>
      )}

      <Dialog
        open={deleteModalOpen}
        setOpen={setDeleteModalOpen}
        loading={loading}
        headertext='Section Deactivation'
        actionButtonName='Confirm'
        bodyText={`Are you sure? You want to Deactivate `}
        handleChange={() => onSectionDeactivation(selectedItem)}
      />
    </>
  )
}

export default ActiveSectionList
