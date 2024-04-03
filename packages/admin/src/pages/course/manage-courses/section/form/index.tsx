import { Box, CircularProgress, Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import { ArrowBack } from '@mui/icons-material'
import { toast } from 'react-toastify'
import CustomForm from 'src/layouts/components/common/CommonForm'
import Form from 'src/layouts/components/common/Form'
import SaveButton from 'src/layouts/components/common/SaveButton'
import { validateFiled } from 'src/utils/util'
import { useRouter } from 'next/router'
import Button from 'src/layouts/components/common/Button'
import { getAllCourses } from 'src/utils/functions/courseFunction'
import { isString } from 'lodash'
import { editSection } from 'src/utils/functions/sectionFunction'
import { createNewSection } from 'src/utils/functions/commonFunctions'

interface FormData {
  name: string | any
  status: string | any,
  courseId: string,
  courseName: string,
  course: any,
  isActive: boolean,
}

const initialData: FormData = {
  name: '',
  status: '',
  courseId: '',
  courseName: '',
  course: '',
  isActive: true,
}

interface ErrorData {
  name: string,
  course: string
}

const initialErrorData: ErrorData = {
  name: '',
  course: ''
}

const SectionForm = () => {
  const router = useRouter()
  const {id, selectedItem } = router.query;
  const parseSelectedItem = isString(selectedItem) ? JSON.parse(selectedItem) : selectedItem

  //#region state
  const [formData, setFormData] = useState<FormData>(initialData)
  const [errors, setErrors] = useState<ErrorData>(initialErrorData)
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState<any[]>([]);

  //#endregion

const getAllCourseAndModelTest = async () => {
  const response  = await getAllCourses();
  const modifyResponse = response?.map((c: any) => ({
    label: c.name,
    value: c._id
  }));
  setCourses(modifyResponse)
}

  //#region use Effect Hooks
  useEffect(() => {
    if (selectedItem) {
      setFormData({
        ...formData,
        name: parseSelectedItem?.name,
        isActive: parseSelectedItem?.isActive,
        courseId: parseSelectedItem?.courseId,
        courseName: parseSelectedItem?.courseName,
        course: {label: parseSelectedItem?.courseName, value: parseSelectedItem?.courseId},
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem])

  useEffect(() => {
    getAllCourseAndModelTest();
  }, [])

  //#endregion

  //#region functions
  /*
  1. Validate Form fields
*/
  const validateForm = () => {
    const nameError = validateFiled(formData?.name);
    const courseError = validateFiled(formData?.['course']?.value)

    setErrors({
      name: nameError,
      course: courseError
    })

    return !nameError && !courseError
  }

  /*
  1. Input Fields with validation
*/
  const inputField = [
    {
      name: 'course',
      label: 'Course',
      placeholder: 'Select Course / Model Test',
      fieldType: 'select',
      options: courses || [],
      required: true
    },
    {
      name: 'name',
      label: 'Name',
      placeholder: 'Enter Name',
      inputMode: 'text',
      fieldType: 'text',
      required: true
    },
    {
      name: 'isActive',
      label: 'Status',
      inputMode: 'text',
      fieldType: 'checkbox',
      required: false
    }
  ]

  /*
  1. handle submit and check validationForm
  */
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const newErrors = validateForm()
    if (newErrors) {
      const payload = {
        name: formData.name,
        courseId: formData?.course?.value,
        courseName: formData?.course?.label,
        isActive: formData.isActive
      };
      if (id) {
        await editSection(id as string, payload)
      } else {
        await createNewSection([payload])
      }
      toast.success(`Section ${id ? 'Updated' : 'Created'}  Successfully`)
      router.push('/course/manage-courses/section/list')
    }
    setLoading(false)
  }

  //#endregion

  return (
    <Box width='100%'>
      {loading ? (
        <Box sx={{ justifyContent: 'center', display: 'flex', paddingY: 1 }}>
          <CircularProgress color='primary' size={40} variant='indeterminate' />
        </Box>
      ) : (
        <Form onSubmit={onSubmit} heading={id ? 'Update Section Form' : 'Create Section Form'}>
          <CustomForm
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
            <SaveButton loading={loading} text={id ? 'Update Section' : 'Confirm New Section'} />
          </Grid>
        </Form>
      )}
    </Box>
  )
}

export default SectionForm
