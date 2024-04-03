import { Box, Grid, useTheme } from '@mui/material'
import { useState } from 'react'
import { ArrowBack } from '@mui/icons-material'
import { validateConfirmPassword, validatePassword } from 'src/utils/util'
import CustomForm from 'src/layouts/components/common/CommonForm'
import Form from 'src/layouts/components/common/Form'
import Button from 'src/layouts/components/common/Button'
import { resetPassowrd } from 'src/services/CommonFunction'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

const inputField = [
  {
    name: 'password',
    label: 'Password',
    placeholder: 'Enter New Password',
    password: true,
    type: 'password',
    required: true
  },
  {
    name: 'confirmpassword',
    label: 'Confirm Pass',
    placeholder: 'Enter Confirm Password',
    password: true,
    type: 'password',
    required: true
  }
]

const initialData = {
  password: '',
  confirmpassword: ''
}

interface ResetPasswordProps {
  onSubmit?: (formData: object) => void
}

const ResetPassword = (props: ResetPasswordProps) => {
  const theme = useTheme()
  const router = useRouter()
  const { id, navigation } = router.query

  //#region state
  const [formData, setFormData] = useState(initialData)
  const [errors, setErrors] = useState({})

  /*
  1. Validate Form fields
  2. TODOS: we need common validation function for all forms
*/
  const validateForm = () => {
    const passwordError = validatePassword(formData?.['password'])
    const confirmPasswordError = validateConfirmPassword(formData?.['confirmpassword'], formData?.['password'])
    setErrors({
      confirmpassword: confirmPasswordError,
      password: passwordError
    })

    return !passwordError && !confirmPasswordError
  }

  /*
  1. handle submit
  */

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const newErrors = validateForm()

    if (newErrors) {
      if (props.onSubmit) {
        props.onSubmit(formData)
      } else {
        const password = formData.password
        await resetPassowrd(id as string, password)
        toast.success('Password Reset Successfully')
        router.push(navigation as string)
      }
    }
  }

  //#endregion

  return (
    <Box width='100%'>
      <Form onSubmit={handleSubmit} heading='Reset Password'>
        <CustomForm
          inputField={inputField}
          errors={errors}
          setErrors={setErrors}
          formData={formData}
          setFormData={setFormData}
        />
        <Grid container justifyContent='center' alignItems={'center'} m={2} gap={2}>
          <Button
            color='primary'
            name='Back'
            startIcon={<ArrowBack />}
            sx={{ height: '38px' }}
            onClick={() => router.back()}
          />
          <Button
            name='Change Password'
            type='submit'
            bgColor={theme.palette.primary.dark}
            color={theme.palette.common.white}
            sx={{ height: '38px' }}
          />
        </Grid>
      </Form>
    </Box>
  )
}

export default ResetPassword
