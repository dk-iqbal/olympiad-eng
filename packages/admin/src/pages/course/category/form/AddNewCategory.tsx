import { Box, CircularProgress, Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import { ArrowBack } from '@mui/icons-material'
import { toast } from 'react-toastify'
import baseAxios from '../../../../services/config'
import { CATEGORY_API } from '../../../../services/api-end-points/index'
import CustomForm from 'src/layouts/components/common/CommonForm'
import Form from 'src/layouts/components/common/Form'
import SaveButton from 'src/layouts/components/common/SaveButton'
import { validateFiled } from 'src/utils/util'
import { useRouter } from 'next/router'
import Button from 'src/layouts/components/common/Button'

interface FormData {
  name: string | any
  status: string | any
}

const initialData: FormData = {
  name: '',
  status: ''
}

interface ErrorData {
  name: string
}

const initialErrorData: ErrorData = {
  name: ''
}

const AddNewCategory = () => {
  const router = useRouter()
  const { query } = router

  //#region state
  const [formData, setFormData] = useState<FormData>(initialData)
  const [errors, setErrors] = useState<ErrorData>(initialErrorData)
  const [loading, setLoading] = useState(false)

  //#endregion

  //#region use Effect Hooks
  useEffect(() => {
    if (query) {
      setFormData({
        name: query?.name,
        status: query?.status
      })
    }
  }, [query])

  //#endregion

  //#region functions
  /*
  1. Validate Form fields
*/
  const validateForm = () => {
    const nameError = validateFiled(formData?.name)

    setErrors({
      name: nameError
    })

    return !nameError
  }

  /*
  1. Input Fields with validation
*/
  const inputField = [
    {
      name: 'name',
      label: 'Name',
      placeholder: 'Enter Name',
      inputMode: 'text',
      fieldType: 'text',
      required: true
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
        status: true
      }
      if (query?.id) {
        await baseAxios.put(`${CATEGORY_API.edit_category}/${query.id}`, payload)
      } else {
        await baseAxios.post(CATEGORY_API.category_create, payload)
      }
      toast.success(`Category ${query?.id ? 'Updated' : 'Created'}  Successfully`)
      router.push('/course/category')
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
        <Form onSubmit={onSubmit} heading={query?.id ? 'Update Category Form' : 'Create Category Form'}>
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
            <SaveButton loading={loading} text={query?.id ? 'Update New Category' : 'Confirm New Category'} />
          </Grid>
        </Form>
      )}
    </Box>
  )
}

export default AddNewCategory
