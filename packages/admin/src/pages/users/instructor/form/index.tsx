import { Accordion, AccordionDetails, AccordionSummary, Box, CircularProgress, Grid, Stack, Typography } from '@mui/material'
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
import dynamic from 'next/dynamic'

const initialData: User = {
  name: '',
  phone: '01813148110',
  username: '',
  degree: '',
  socialLink: '',
  description: '',
  email: 'alam@gmail.com',
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

const AddNewInstructor = () => {
  const router = useRouter()
  const { id, selectedItem } = router.query
  const selectedItemObject = selectedItem ? JSON.parse(selectedItem as string) : null
  const userData = JSON.parse(localStorage?.getItem('userData') as string) || ''
  const Editor = dynamic(() => import("src/layouts/components/common/Editor"), { ssr: false });

  //#region state
  const [formData, setFormData] = useState<User>(initialData)
  const [errors, setErrors] = useState<User>(initialErrorData)
  const [loading, setLoading] = useState(false)

  //#endregion

  //#region use Effect Hooks
  useEffect(() => {
    if (selectedItemObject) {
      const parsedInfo =
        typeof selectedItemObject?.info === 'string' ? JSON.parse(selectedItemObject?.info) : selectedItemObject?.info
      setFormData({
        name: selectedItemObject?.name,
        username: selectedItemObject?.username,
        phone: selectedItemObject?.phone,
        email: selectedItemObject?.email,
        organizationId: selectedItemObject?.organizationId,
        degree: parsedInfo?.degree,
        socialLink: parsedInfo?.socialLink,
        description: parsedInfo?.description
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
      name: 'degree',
      label: 'Degree',
      placeholder: 'Enter Instructor Degree',
      inputMode: 'text',
      fieldType: 'text',
      required: false
    },
    {
      name: 'socialLink',
      label: 'Social Link',
      placeholder: 'Enter Social Link',
      inputMode: 'text',
      fieldType: 'text',
      required: false
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
      const parseInfo = typeof formData?.info === 'string' ? JSON.parse(formData?.info) : formData?.info
      const payload = {
        username: formData.username,
        name: formData.name,
        email: formData.email,
        phone: formData?.phone && formData?.phone.startsWith('+88') ? formData.phone : `+88${formData.phone}`,
        info: JSON.stringify({
          ...parseInfo,
          degree: formData.degree,
          socialLink: formData.socialLink,
          description: formData.description
        }),
        status: true,
        role: USER_ROLE.INSTRUCTOR,
        organizationId: `${userData.username}_org`
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
        console.log(error)
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
        <Form onSubmit={onSubmit} heading={`${id ? 'Update' : 'Create'} Instructor Form`}>
          <CustomForm
            inputField={inputField}
            errors={errors}
            setErrors={setErrors}
            formData={formData}
            setFormData={setFormData}
          />
          <Accordion defaultExpanded={false} TransitionProps={{ unmountOnExit: true }}>
            <AccordionSummary
              sx={{
                fontSize: 18,
                color: 'steelblue',
                bgcolor: '#ededed'
              }}
            >
              Others Info
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12}>

              <Typography
                sx={{
                  minWidth: { xs: '120px', sm: '180px' },
                  fontWeight: 'bold',
                  fontSize: { xs: 12, sm: 15 }
                }}
              >
                {'Description : '}
              </Typography>
              <Stack direction={'row'} alignItems='center'>
                <Editor formData={formData} setFormData={setFormData} />
              </Stack>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
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

export default AddNewInstructor
