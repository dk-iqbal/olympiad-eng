import { Box, CircularProgress, Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ArrowBack } from '@mui/icons-material'
import { toast } from 'react-toastify'
import {
  USER_ROLE,
  sleep,
  validateConfirmPassword,
  validateEmail,
  validateFiled,
  validatePassword,
  validatePhone
} from 'src/utils/util'
import { createUser, editUser } from 'src/services/CommonFunction'
import Form from 'src/layouts/components/common/Form'
import CustomForm from 'src/layouts/components/common/CommonForm'
import Button from 'src/layouts/components/common/Button'
import SaveButton from 'src/layouts/components/common/SaveButton'
import { User } from 'src/utils/interface/commonInterface'

const initialData: User = {
  name: '',
  phone: '01719197175',
  username: '',
  email: 'kamrul@gmail.com',
  password: 'Demo@12345',
  confirmpassword: 'Demo@12345'
}

const initialErrorData: User = {
  name: '',
  phone: '',
  username: '',
  email: '',
  password: '',
  confirmpassword: ''
}

const AddNewAdmin = () => {
  const router = useRouter()
  const { id, selectedItem } = router.query
  const selectedItemObject = selectedItem ? JSON.parse(selectedItem as string) : null

  //#region state
  const [formData, setFormData] = useState<User>(initialData)
  const [errors, setErrors] = useState<User>(initialErrorData)
  const [loading, setLoading] = useState(false)

  //#endregion

  //#region use Effect Hooks
  useEffect(() => {
    if (selectedItemObject) {
      setFormData({
        name: selectedItemObject?.name,
        username: selectedItemObject?.username,
        phone: selectedItemObject?.phone,
        email: selectedItemObject?.email,
        organizationId: selectedItemObject?.organizationId,
        password: selectedItemObject?.password,
        confirmpassword: selectedItemObject?.password
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //#endregion

  //#region functions
  /*
  1. Validate Form fields
*/
  const validateForm = (): boolean => {
    const nameError = validateFiled(formData?.name)
    const phoneError = validatePhone(formData?.phone)
    const emailError = validateEmail(formData?.email)
    const usernameError = validateFiled(formData?.username)
    if (!id) {
      const passwordError = validatePassword(formData?.password)
      const confirmPasswordError = validateConfirmPassword(formData?.confirmpassword, formData?.password || '')
      setErrors({
        name: nameError,
        phone: phoneError,
        email: emailError,
        username: usernameError,
        password: passwordError,
        confirmpassword: confirmPasswordError
      })

      return !nameError && !phoneError && !emailError && !passwordError && !confirmPasswordError && !usernameError
    } else {
      setErrors({
        name: nameError,
        phone: phoneError,
        username: usernameError,
        email: emailError
      })

      return !nameError && !phoneError && !emailError && !usernameError
    }
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
    },
    {
      name: 'phone',
      label: 'Phone',
      placeholder: 'Enter Phone Number',
      inputMode: 'numeric',
      fieldType: 'text',
      required: true
    },
    {
      name: 'email',
      label: 'Email',
      placeholder: 'Enter Email',
      inputMode: 'text',
      fieldType: 'text',
      required: true,
      disabled: id ? true : false
    },
    {
      name: 'username',
      label: 'Username',
      placeholder: 'Enter username',
      inputMode: 'text',
      fieldType: 'text',
      required: true,
      disabled: id ? true : false
    },
    {
      name: 'password',
      label: 'Password',
      placeholder: 'Enter Password',
      password: true,
      type: 'password',
      inputMode: 'text',
      fieldType: 'text',
      required: id ? false : true,
      disabled: id ? true : false
    },
    {
      name: 'confirmpassword',
      label: 'Confirm Pass',
      placeholder: 'Enter Confirm Password',
      password: true,
      type: 'password',
      inputMode: 'text',
      fieldType: 'text',
      required: id ? false : true,
      disabled: id ? true : false
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
        username: formData.username,
        name: formData.name,
        email: formData.email,
        phone: formData?.phone && formData?.phone.startsWith('+88') ? formData.phone : `+88${formData.phone}`,
        info: formData?.['info'] ? formData?.['info'] : '',
        status: true,
        role: USER_ROLE.ADMIN,
        organizationId: `${formData.username}_org`
      }
      try {
        if (id) {
          await editUser(id as string, payload)
        } else {
          await createUser({ ...payload, password: formData.password })
        }
        sleep(1000)
        router.push('list' as string)
        toast.success(`User ${id ? 'Updated' : 'Created'} Successfully`)
      } catch (error) {
        console.error(error)
        toast.error('User already exists!!')
      }
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
        <Form onSubmit={onSubmit} heading={`${id ? 'Update' : 'Create'} Admin Form`}>
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
            <SaveButton loading={loading} text={id ? 'Update New Account' : 'Confirm New Account'} />
          </Grid>
        </Form>
      )}
    </Box>
  )
}

export default AddNewAdmin
