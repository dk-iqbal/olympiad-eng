import React, { useState, useEffect } from 'react'
import { Add, Delete, Edit, Lock, LockOpen } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { Grid, useTheme, Paper, Box, List, CircularProgress } from '@mui/material'
import { uniqBy } from 'lodash'
import BaseLayout from 'src/layouts/components/common/BaseLayout'
import Button from 'src/layouts/components/common/Button'
import CustomAutocomplete from 'src/layouts/components/common/Autocomplete'
import ListItemComponent from 'src/layouts/components/common/ListItem'
import { toast } from 'react-toastify'
import Dialog from 'src/layouts/components/common/Dialog'
import { deleteEnrollment, editEnrollment, getAllEnrollment } from 'src/utils/functions/enrolmentFunction'
import moment from 'moment'

interface Option {
  label: string
  value: string
}

const EnrolmentHistory = () => {
  const router = useRouter()
  const theme = useTheme()

  //#region States
  const [loading, setLoading] = useState(true)
  const [dectivedModalOpen, setDectivedModalOpen] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [activeCourses, setActiveCourses] = useState([])
  const [selectedItem, setSelectedItem] = useState({})
  const [courses, setCourses] = useState([])
  const [searchDdl, setSearchDdl] = useState<{
    course: Option[]
    instructor: Option[]
    status: Option[]
  }>({
    course: [],
    instructor: [],
    status: []
  })

  const [searchValue, setSearchValue] = useState({
    course: null,
    instructor: null,
    status: null
  })

  //#endregion

  const handleClickActions = (i: number, actions: any, item: any) => {
    switch (i) {
      case 2: {
        setDeleteModal(true)
        setSelectedItem(item?.selectedItem)
        break
      }
      case 1: {
        setDectivedModalOpen(true)
        setSelectedItem(item?.selectedItem)
        break
      }

      case 0: {
        router.push({
          pathname: `/enrolment/course-enrolment`,
          query: { id: item.id, selectedItem: JSON.stringify(item?.selectedItem) }
        })
        break
      }
      default:
        break
    }
  }

  const fetchAllActiveCourse = async () => {
    setLoading(true)
    try {
      const response = await getAllEnrollment()
      setActiveCourses(response)
      setCourses(response)
      const course = uniqBy(
        response?.map((c: any) => ({
          label: c.courseName,
          value: c.courseId
        })), 'value')
      const instructor = uniqBy(
        response?.map((c: any) => ({
          label: c?.instructorName,
          value: c?.instructorId
        })),
        'value'
      )
      const status = uniqBy(
        response?.map((c: any) => ({
          label: c.status,
          value: c.status
        })),
        'value'
      )
      setSearchDdl({
        course: course as Array<unknown> as Option[],
        instructor: instructor as Array<unknown> as Option[],
        status: status as Array<unknown> as Option[]
      })
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }

  /*
  1. On deactivate function by status
*/
  const onCourseDeactivation = async (item: any) => {
    try {
      setLoading(true)
      const payload = { status: item.status === 'Pending' ? 'Approved' : 'Pending' }
      await editEnrollment(item._id, payload as any)
      toast.success('Course Deactivated Successfully')
      fetchAllActiveCourse()
      setDectivedModalOpen(false)
    } catch (error) {
      console.error('Error deactivating user:', error)
      toast.error('Something went wrong!!')
    }
  }

  const onEnrolmentDelete = async (item: any) => {
    try {
      setLoading(true)
      await deleteEnrollment(item._id)
      toast.success('Enrolment Deleted Successfully')
      fetchAllActiveCourse()
      setDeleteModal(false)
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
    if (filters?.instructor) {
      filteredCourses = filteredCourses?.filter((course: any) => {
        return filters.instructor?.value === course.instructorId
      })
    }
    if (filters?.status) {
      filteredCourses = filteredCourses?.filter((course: any) => {
        return filters.status?.value === course.status
      })
    }
    filteredCourses = filteredCourses
    setActiveCourses(filteredCourses)
  }

  // Function to handle any filter change
  const handleFilterChange = (value: any, filterType: any) => {
    filterCourses({ ...searchValue, [filterType]: value })
    setSearchValue({ ...searchValue, [filterType]: value })
  }

  useEffect(() => {
    fetchAllActiveCourse()
  }, [])

  return (
    <BaseLayout
      heading='Enrolment History'
      isActionButton={
        <Button
          name='Add New'
          endIcon={<Add />}
          onClick={() => router.push('/enrolment/course-enrolment')}
          bgColor={theme.palette.primary.dark}
          color={theme.palette.common.white}
        />
      }
    >
      <Paper sx={{ mt: { xs: 1, sm: 2 } }}>
        <Grid container spacing={1} p={1} justifyContent={'center'} alignItems={'center'}>
          {/* Course Categories */}
          <Grid item xs={12} md={6} lg={3}>
            <CustomAutocomplete
              onChange={e => handleFilterChange(e, 'course')}
              options={searchDdl?.course || []}
              placeholder='Select Course'
              value={searchValue?.course}
            />
          </Grid>

          {/* Course Instructors */}
          <Grid item xs={12} md={6} lg={4}>
            <CustomAutocomplete
              onChange={e => handleFilterChange(e, 'instructor')}
              options={searchDdl?.instructor || []}
              placeholder='Select Instructor'
              value={searchValue?.instructor}
            />
          </Grid>

          {/* Course Status */}
          <Grid item xs={12} md={4} lg={3}>
            <CustomAutocomplete
              onChange={e => handleFilterChange(e, 'status')}
              options={searchDdl?.status || []}
              placeholder='Select Status'
              value={searchValue?.status}
            />
          </Grid>

          <Grid item xs={12} md={4} lg={2}>
            <Button
              name='Filter'
              type='submit'
              bgColor={theme.palette.primary.dark}
              color={theme.palette.common.white}
            />
          </Grid>
        </Grid>

        {loading ? (
          <Box sx={{ justifyContent: 'center', display: 'flex', paddingY: 1 }}>
            <CircularProgress color='primary' size={40} variant='indeterminate' />
          </Box>
        ) : (
          <>
            {activeCourses?.length > 0 ? (
              <Box
                sx={{
                  maxHeight: `auto`,
                  overflowX: 'hidden',
                  overflowY: 'auto',
                  padding: '5px'
                }}
              >
                <List
                  sx={{
                    bgcolor: 'inherit',
                    mb: 1,
                    mt: { xs: 1, md: 1 },
                    '& ul': { padding: 0 }
                  }}
                >
                  {activeCourses?.map((course: any, index) => {
                    const actions = [
                      { icon: <Edit color='warning' />, name: 'Edit' },
                      { icon: course.status === 'Approved' ? <LockOpen color='primary' /> : <Lock color='success' />, name: 'Status' },
                      {
                        icon: <Delete color='error' />,
                        name: 'Delete'
                      }
                    ]
                    const modifyObject = {
                      id: course._id,
                      name: course.courseName,
                      status: course.status,
                      details: [
                        { label: 'Instructor', value: course?.instructorName },
                        { label: 'Enrollment Date', value: moment(course?.enrollmentDate).format('DD-MM-YYYY') },
                        { label: 'Student Name', value: course?.studentName },
                        { label: 'Transaction Type', value: course?.transactionType },
                        { label: 'Amount', value: course?.amount }
                      ].filter(item => item?.value),
                      selectedItem: course
                    }

                    return (
                      <ListItemComponent
                        actions={actions}
                        notShowDetails={true}
                        index={index}
                        item={modifyObject}
                        handleClickActions={handleClickActions}
                        key={index}
                      />
                    )
                  })}
                </List>
              </Box>
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
          </>
        )}

        <Dialog
          open={dectivedModalOpen}
          setOpen={setDectivedModalOpen}
          loading={loading}
          headertext='Enrolment Status'
          actionButtonName='Confirm'
          bodyText={`Are you sure? You want to ${selectedItem === 'Pending' ? 'Approved' : 'Pending'} `}
          handleChange={() => onCourseDeactivation(selectedItem)}
        />

        <Dialog
          open={deleteModal}
          setOpen={setDeleteModal}
          loading={loading}
          headertext='Enrolment Delete'
          actionButtonName='Confirm'
          bodyText={`Are you sure? You want to Delete this Enrolment ?`}
          handleChange={() => onEnrolmentDelete(selectedItem)}
        />
      </Paper>
    </BaseLayout>
  )
}

export default EnrolmentHistory
