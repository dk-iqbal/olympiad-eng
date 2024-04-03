import React from 'react'
import { Box, CircularProgress, Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import { ArrowBack } from '@mui/icons-material'
import { toast } from 'react-toastify'
import SaveButton from 'src/layouts/components/common/SaveButton'
import Button from 'src/layouts/components/common/Button'
import { useRouter } from 'next/router'
import { validateFiled } from 'src/utils/util'
import Form from 'src/layouts/components/common/Form'
import CommonForm from '../../../layouts/components/common/CommonForm'
import { fetchUsers } from 'src/services/CommonFunction'
import { USER_ROLE, USER_STATUS } from 'src/utils/util'
import { fetchCourseByStatus } from '../../../utils/functions/commonFunctions'
import { COURSE_STATUS, COURSE_TYPE } from '../../../utils/util'
import { createEnrollment, editEnrollment } from 'src/utils/functions/enrolmentFunction'
import { isString } from 'lodash'
import moment from 'moment'

interface ErrorData {
  student: string
  course: string
  amount: string
}

interface FormData {
  studentId: string
  student: any
  course: any
  studentName: string
  courseId: string
  courseName: string
  instructorId: string
  instructorName: string
  organizationId: string
  studentMobileNumber: string
  amount: string
  transactionType: string
  isAmountPaid: boolean
  status: { label: ''; value: '' }
  enrollmentDate: string | Date
  paymentDate: string | Date
  discountAmount: number
  transactionId: string
}

const initialData: FormData = {
  studentId: '',
  studentName: '',
  student: '',
  course: '',
  courseId: '',
  courseName: '',
  instructorId: '',
  instructorName: '',
  organizationId: '',
  studentMobileNumber: '',
  amount: '',
  transactionType: '',
  isAmountPaid: true,
  status: { label: '', value: '' },
  enrollmentDate: '',
  paymentDate: '',
  discountAmount: 0,
  transactionId: ''
}

const initialErrorData: ErrorData = {
  student: '',
  course: '',
  amount: ''
}

const CourseEnrolment = () => {
  const router = useRouter()
  const { id, selectedItem } = router.query
  const pardedSelectedItem = isString(selectedItem) ? JSON.parse(selectedItem) : selectedItem

  //#region state
  const [formData, setFormData] = useState<FormData>(initialData)
  const [errors, setErrors] = useState<ErrorData>(initialErrorData)
  const [studentDdl, setStudentDdl] = useState([])
  const [courseDdl, setCourseDdl] = useState([])
  const [loading, setLoading] = useState(false)

  //#endregion

  //#region use Effect Hooks
  useEffect(() => {
    if (id) {
      const updatedFormData = {
        ...formData,
        studentId: pardedSelectedItem?.studentId,
        studentName: pardedSelectedItem?.studentName,
        courseId: pardedSelectedItem?.courseId,
        courseName: pardedSelectedItem?.courseName,
        instructorId: pardedSelectedItem?.instructorId,
        instructorName: pardedSelectedItem?.instructorName,
        organizationId: pardedSelectedItem?.organizationId,
        studentMobileNumber: pardedSelectedItem?.studentMobileNumber,
        amount: pardedSelectedItem?.amount,
        transactionType: pardedSelectedItem?.transactionType,
        isAmountPaid: pardedSelectedItem?.isAmountPaid,
        status: { label: pardedSelectedItem.status, value: pardedSelectedItem.status },
        enrollmentDate: moment(pardedSelectedItem?.enrollmentDate).format('YYYY-MM-DD'),
        paymentDate: moment(pardedSelectedItem?.payments[0]?.paymentDate).format('YYYY-MM-DD'),
        discountAmount: pardedSelectedItem?.payments[0]?.discountAmount,
        transactionId: pardedSelectedItem?.payments[0]?.transactionId,
        student: { label: pardedSelectedItem.studentName, value: pardedSelectedItem.studentId },
        course: { label: pardedSelectedItem.courseName, value: pardedSelectedItem.courseId }
      }
      setFormData(updatedFormData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  useEffect(() => {
    if (!id) {
      const updatedFormData = {
        studentId: formData?.student?.value,
        studentName: formData?.student?.name,
        courseId: formData.course?.value,
        courseName: formData.course?.name,
        instructorId: formData.course?.instructorId,
        instructorName: formData.course?.instructorName,
        organizationId: formData.course?.organizationId,
        studentMobileNumber: formData.student?.phone,
        amount: formData.course?.price,
        transactionType: '',
        isAmountPaid: true,
        status: formData.status,
        enrollmentDate: moment(new Date()).format('YYYY-MM-DD'),
        paymentDate: moment(new Date()).format('YYYY-MM-DD'),
        discountAmount: (formData.course?.price * formData.course?.discount) / 100 || 0,
        transactionId: '',
        student: formData.student,
        course: formData.course
      }

      setFormData(updatedFormData)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.course, formData.student])

  //#endregion

  //#region functions
  /*
  1. Validate Form fields
*/
  const validateForm = () => {
    const nameError = validateFiled(formData?.['student'])
    const coursesError = validateFiled(formData?.['course'])
    const amountError = validateFiled(formData?.['amount'])

    setErrors({
      student: nameError,
      course: coursesError,
      amount: amountError
    })

    return !nameError && !coursesError && !amountError
  }

  /*
  1. Input Fields with validation
*/
  const inputField = [
    {
      name: 'student',
      label: 'Student Name',
      placeholder: 'Search Student Name',
      inputMode: 'text',
      fieldType: 'select',
      required: true,
      options: studentDdl || [],
      disabled: id ? true : false
    },
    {
      name: 'course',
      label: 'Courses',
      placeholder: 'Search Course Name',
      inputMode: 'text',
      fieldType: 'select',
      required: true,
      options: courseDdl || [],
      disabled: id ? true : false
    },
    {
      name: 'amount',
      label: 'Courses Amount',
      placeholder: 'Enter Course Amount',
      inputMode: 'numeric',
      fieldType: 'text',
      required: true
    },
    {
      name: 'discountAmount',
      label: 'Discunt Amount',
      placeholder: 'Enter Discunt Amount',
      inputMode: 'numeric',
      fieldType: 'text',
      required: false
    },
    {
      name: 'transactionId',
      label: 'TransactionId',
      placeholder: 'Enter transactionId',
      inputMode: 'text',
      fieldType: 'text',
      required: false
    },
    {
      name: 'transactionType',
      label: 'TransactionType',
      placeholder: 'Enter Transaction Type',
      inputMode: 'text',
      fieldType: 'text',
      required: false
    },
    {
      name: 'enrollmentDate',
      label: 'enrollmentDate',
      placeholder: 'Enter Enrollment Date',
      inputMode: 'text',
      type: 'date',
      fieldType: 'text',
      required: false
    },
    {
      name: 'paymentDate',
      label: 'Payment Date',
      placeholder: 'Enter Payment Date',
      inputMode: 'text',
      type: 'date',
      fieldType: 'text',
      required: false
    },
    {
      name: 'status',
      label: 'status',
      placeholder: 'Search status',
      inputMode: 'text',
      fieldType: 'select',
      required: false,
      options: ['Pending', 'Approved'].map(s => ({ label: s, value: s }))
    }
  ]

  const fetchAllStudent = async () => {
    setLoading(true)
    try {
      const response = await fetchUsers(USER_ROLE.STUDENT, USER_STATUS.ACTIVE)
      setStudentDdl(
        response?.map((student: any) => ({
          ...student,
          label: `${student?.name}- ${student.phone}`,
          value: student?._id
        }))
      )
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }

  const fetchCourses = async () => {
    setLoading(true)
    try {
      const response = await fetchCourseByStatus(COURSE_STATUS.APPROVED, COURSE_TYPE.COURSE)
      setCourseDdl(
        response?.map((course: any) => ({
          ...course,
          label: course?.name,
          value: course?._id
        }))
      )
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }

  /*
  1. handle submit and check validationForm
  */
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const newErrors = validateForm()
    if (newErrors) {
      const createPayload = {
        studentId: formData?.studentId,
        studentName: formData?.studentName,
        courseId: formData.courseId,
        courseName: formData.courseName,
        instructorId: formData.instructorId,
        instructorName: formData.instructorName,
        organizationId: formData.organizationId,
        studentMobileNumber: formData.studentMobileNumber,
        amount: formData?.amount,
        transactionType: formData?.transactionType,
        isAmountPaid: true,
        status: formData?.status?.value,
        enrollmentDate: formData?.enrollmentDate,
        paymentDate: formData?.paymentDate,
        discountAmount: formData.discountAmount,
        transactionId: formData?.transactionId
      }

      if (id) {
        await editEnrollment(id as string, createPayload as any)
      } else {
        await createEnrollment(createPayload as any)
      }
      toast.success(`${id ? 'Created' : 'Updated'}  Enrolment Successfully`)
      router.push('/enrolment/history')
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchAllStudent()
    fetchCourses()
  }, [])

  //#endregion

  return (
    <Box width='100%'>
      {loading ? (
        <Box sx={{ justifyContent: 'center', display: 'flex', paddingY: 1 }}>
          <CircularProgress color='primary' size={40} variant='indeterminate' />
        </Box>
      ) : (
        <Form onSubmit={onSubmit} heading={id ? 'Update Course Enrollment Form' : 'Create Course Enrollment Form'}>
          <CommonForm
            inputField={inputField}
            errors={errors}
            setErrors={setErrors}
            formData={formData}
            setFormData={setFormData}
          />
          <Grid container justifyContent='center' alignItems={'center'}>
            <Button
              color='primary'
              name='Back'
              startIcon={<ArrowBack />}
              sx={{ height: '38px' }}
              onClick={() => router.back()}
            />
            <SaveButton loading={loading} text={id ? 'Update Course Enrollment' : 'Add Course Enrollment'} />
          </Grid>
        </Form>
      )}
    </Box>
  )
}

export default CourseEnrolment
