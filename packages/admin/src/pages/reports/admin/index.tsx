import React, { useState, useEffect } from 'react'
import { Grid, useTheme, Paper, Box, List, CircularProgress, Typography } from '@mui/material'
import { sum, uniqBy } from 'lodash'
import BaseLayout from 'src/layouts/components/common/BaseLayout'
import Button from 'src/layouts/components/common/Button'
import CustomAutocomplete from 'src/layouts/components/common/Autocomplete'
import ListItemComponent from 'src/layouts/components/common/ListItem'
import { getAllEnrollment } from 'src/utils/functions/enrolmentFunction'
import moment from 'moment'
import InputField from 'src/layouts/components/common/InputField'

interface Option {
  label: string
  value: string
}

const AdminReport = () => {
  const theme = useTheme()

  //#region States
  const [loading, setLoading] = useState(true)
  const [activeCourses, setActiveCourses] = useState([])
  const [courses, setCourses] = useState([])
  const [searchDdl, setSearchDdl] = useState<{
    course: Option[]
    instructor: Option[]
    date: string
  }>({
    course: [],
    instructor: [],
    date: ''
  })

  const [searchValue, setSearchValue] = useState({
    course: null,
    instructor: null,
    date: null
  })
  const [totalAmount, setTotalAmount] = useState(0);

  //#endregion

  const handleClickActions = (i: number, actions: any, item: any) => {
    console.log(actions, item)
    switch (i) {
      case 2: {
        break
      }
      case 1: {
        break
      }

      case 0: {
        break
      }
      default:
        break
    }
  }

  const fetchAllActiveCourse = async () => {
    setLoading(true)
    try {
      const response = await getAllEnrollment();
      setActiveCourses(response)
      setCourses(response)
      const total = sum(response?.map((i: any) => i.amount));

      setTotalAmount(total || 0)
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
      setSearchDdl({
        course: course as Array<unknown> as Option[],
        instructor: instructor as Array<unknown> as Option[],
        date: ''
      })
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
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
    if (filters?.date) {
      filteredCourses = filteredCourses?.filter((course: any) => {
        return filters.date === moment(course.enrollmentDate).format('YYYY-MM-DD')
      })
    }
    filteredCourses = filteredCourses
    const total = sum(filteredCourses?.map((i: any) => i.amount))
    setActiveCourses(filteredCourses)
    setTotalAmount(total || 0)
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
    <BaseLayout heading='Admin Report'>
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
            <InputField
              name='date' type='date'
              value={searchValue.date} placeholder='Select Date'
              onChange={e => handleFilterChange(e.target.value, 'date')}
            />
          </Grid>

          <Grid item xs={12} md={4} lg={2}>
            <Button
              name='Filter'
              type='button'
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

                    const modifyObject = {
                      id: course._id,
                      name: course.courseName,
                      status: `${course?.transactionType}`,
                      details: [
                        { label: 'Instructor', value: course?.instructorName },
                        { label: 'Enrolment Date', value: moment(course?.enrollmentDate).format('DD-MM-YYYY') },
                        { label: 'Student: ', value: course?.studentName },
                        { label: 'Trans. ID', value: course?.payments[0].transactionId },
                        { label: 'Amount', value: course?.amount }
                      ].filter(item => item?.value),
                      selectedItem: course
                    }

                    return (
                      <ListItemComponent
                        notShowDetails={true}
                        index={index}
                        item={modifyObject}
                        handleClickActions={handleClickActions}
                        key={index}
                      />
                    )
                  })}
                </List>
                <Typography sx={{ fontWeight: 'bold', textAlign: 'right' }}>{`Total: ${totalAmount}`}</Typography>
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
      </Paper>
    </BaseLayout>
  )
}

export default AdminReport
