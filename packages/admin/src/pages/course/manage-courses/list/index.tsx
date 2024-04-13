import React, { useState, useEffect } from 'react'
import { Add, AutoStories, Delete, Edit, ImportContacts, Lock, People, Stream } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { Grid, useTheme, Paper, Box, List, CircularProgress } from '@mui/material'
import { COURSE_API } from 'src/services/api-end-points'
import { uniqBy } from 'lodash'
import BaseLayout from 'src/layouts/components/common/BaseLayout'
import Button from 'src/layouts/components/common/Button'
import CardWithIcon from 'src/layouts/components/common/Card'
import CustomAutocomplete from 'src/layouts/components/common/Autocomplete'
import ListItemComponent from 'src/layouts/components/common/ListItem'
import baseAxios from 'src/services/config'
import { toast } from 'react-toastify'
import Dialog from 'src/layouts/components/common/Dialog'
import { COURSE_TYPE } from 'src/utils/util'
import { fetchCoursesByCourseType } from 'src/utils/functions/courseFunction'
import { CourseSummary, getCourseSummaryByCourseType } from 'src/utils/functions/courseDetailsFunciton'

interface Option {
  label: string
  value: string
}

const ActiveCourse = () => {
  const router = useRouter()
  const theme = useTheme()

  //#region States
  const [loading, setLoading] = useState(true)
  const [dectivedModalOpen, setDectivedModalOpen] = useState(false)
  const [activeCourses, setActiveCourses] = useState([])
  const [selectedItem, setSelectedItem] = useState({})
  const [courses, setCourses] = useState([])
  const [searchDdl, setSearchDdl] = useState<{
    category: Option[]
    instructor: Option[]
    status: Option[]
  }>({
    category: [],
    instructor: [],
    status: []
  })
  const [searchValue, setSearchValue] = useState({
    category: null,
    instructor: null,
    status: null
  })
  const [courseSummary, setCourseSummary] = useState<CourseSummary>()

  //#endregion

  const handleClickActions = (i: number, actions: any, item: any) => {
    switch (i) {
      case 2: {
        break
      }
      case 1: {
        setDectivedModalOpen(true)
        setSelectedItem(item?.selectedItem)
        break
      }

      case 0: {
        router.push({
          pathname: `/course/manage-courses/form`,
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
      const response = await fetchCoursesByCourseType(COURSE_TYPE.COURSE)
      setActiveCourses(response as any)
      setCourses(response as any)
      const category = uniqBy(response?.map((c: any) => ({
        label: c.categoryName,
        value: c.categoryId
      })), 'value')
      const instructor = uniqBy(
        response?.map((c: any) => ({
          label: c.instructorName,
          value: c.instructorId
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
        category: category,
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
      await baseAxios.put(`${COURSE_API.edit_course}/${item._id}`, payload)
      toast.success('Course Deactivated Successfully')
      fetchAllActiveCourse()
      setDectivedModalOpen(false)
    } catch (error) {
      console.error('Error deactivating user:', error)
      toast.error('Something went wrong!!')
    }
  }

  // Function to filter courses based on selected filters
  const filterCourses = (filters: any) => {
    let filteredCourses = courses
    if (filters?.category) {
      filteredCourses = filteredCourses?.filter((course: any) => {
        return filters.category?.value === course.categoryId
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

  const getCourseSummary = async () => {
    try {
      const response = await getCourseSummaryByCourseType(COURSE_TYPE.COURSE)
      setCourseSummary(response)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCourseSummary()
  }, [])

  useEffect(() => {
    fetchAllActiveCourse()
  }, [])


  const cardData = [
    {
      id: 1,
      href: '',
      icon: <ImportContacts sx={{ fontSize: 24 }} />,
      count: courseSummary?.totalActiveCourse,
      label: 'Active Courses'
    },
    {
      id: 2,
      href: '',
      icon: <AutoStories sx={{ fontSize: 24 }} />,
      count: courseSummary?.totalPendingCourse,
      label: 'Pending Courses'
    },
    {
      id: 3,
      href: '',
      icon: <Stream sx={{ fontSize: 24 }} />,
      count: courseSummary?.totalFreeCourse,
      label: 'Free Courses'
    },
    {
      id: 4,
      href: '',
      icon: <People sx={{ fontSize: 24 }} />,
      count: courseSummary?.totalPaidCourse,
      label: 'Paid Courses'
    }
  ]

  return (
    <BaseLayout
      heading='Manage Olympiad'
      isActionButton={
        <Button
          name='Add New'
          endIcon={<Add />}
          onClick={() => router.push('/course/manage-courses/form')}
          bgColor={theme.palette.primary.dark}
          color={theme.palette.common.white}
        />
      }
    >
      <Grid container spacing={2}>
        {cardData?.map(card => (
          <CardWithIcon href={card.href} icon={card.icon} count={card.count} label={card.label} key={card.id} />
        ))}
      </Grid>

      <Paper sx={{ mt: { xs: 1, sm: 2 } }}>
        <Grid container spacing={1} p={1} justifyContent={'center'} alignItems={'center'}>
          {/* Course Categories */}
          <Grid item xs={12} md={6} lg={3}>
            <CustomAutocomplete
              onChange={e => handleFilterChange(e, 'category')}
              options={searchDdl?.category || []}
              placeholder='Select Category'
              value={searchValue?.category}
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
                      { icon: <Lock color='primary' />, name: course.status === 'Approved' ? "Pending" : 'Approved' },
                      {
                        icon: <Delete color='error' />,
                        name: 'Delete'
                      }
                    ]
                    const parseCourse = JSON.parse(course?.info)
                    const modifyObject = {
                      id: course._id,
                      name: course.name,
                      status: course.status,
                      section: course.info.section,
                      lesson: course.info.lesson,
                      enrolled: course.info.enrolled,
                      details: [
                        { label: 'Instructor', value: course.instructorName },
                        { label: 'Category', value: course.categoryName },
                        { label: 'Price', value: course.price },
                        { label: 'Expiry', value: parseCourse.expiryPeriod }
                      ].filter(item => item?.value),
                      selectedItem: course
                    }

                    return (
                      <ListItemComponent
                        actions={actions}
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
          headertext='Course Deactivation'
          actionButtonName='Confirm'
          bodyText={`Are you sure? You want to ${(selectedItem as any)?.status === 'Pending' ? 'Approved' : 'Pending'} `}
          handleChange={() => onCourseDeactivation(selectedItem)}
        />
      </Paper>
    </BaseLayout>
  )
}

export default ActiveCourse
