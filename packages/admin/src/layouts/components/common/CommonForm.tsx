import { Box, Grid, Stack, Typography } from '@mui/material'
import { ChangeEvent, useState } from 'react'
import InputField from './InputField'
import CustomAutocomplete from './Autocomplete'
import Checkbox from './Checkbox'
import RadioGroup from './RadioGroup'
import { Lock } from '@mui/icons-material'
import ImageUpload from './ImageUpload'
import React from 'react'
import MultiAutocomplete from './MultiAutocomplete'

interface CustomFormProps {
  inputField: Array<{
    name: string | any
    label?: string
    placeholder?: string
    inputMode?: string | undefined
    password?: boolean
    disabled?: boolean
    type?: string
    required?: boolean
    multiple?: boolean
    fieldType?: string
    options?: Array<{
      label: string
      value: string
    }>
  }>
  errors?: object
  formData?: object
  setErrors: (item: any) => void
  setFormData: (item: any) => void
}

const CustomForm = (props: CustomFormProps) => {
  const { inputField, errors, setErrors, formData, setFormData } = props

  //#region state
  const [showPassword, setShowPassword] = useState(false)

  //#endregion

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    const regx = /^[+-]?\d*(?:[.,]\d*)?$/
    setErrors({
      ...errors,
      [name]: undefined
    })
    if (name === 'phone') {
      setFormData((prevFormData: { [x: string]: any }) => ({
        ...prevFormData,
        [name]: regx.test(value) ? value : prevFormData[name]
      }))
    } else {
      setFormData((prevFormData: any) => ({
        ...prevFormData,
        [name]: type === 'checkbox' ? checked : value
      }))
    }
  }

  const handleSelectChange = (e: { label: string; value: string }, field: { name: string }) => {
    const { name } = field
    if (e) {
      setFormData({
        ...formData,
        [name]: e
      })
    } else {
      setFormData({
        ...formData,
        [name]: undefined
      })
    }
    setErrors({
      ...errors,
      [name]: undefined
    })
  }

  return (
    <Box width='100%'>
      <Grid container spacing={2}>
        {inputField.map((field, index) => (
          <Grid item xs={12} key={index}>
            <Grid item xs={12} key={index}>
              {field?.fieldType === 'select' ? (
                <Stack direction={'row'} alignItems={'center'}>
                  <Typography
                    sx={{
                      minWidth: { xs: '120px', sm: '180px' },
                      fontWeight: 'bold',
                      fontSize: { xs: 12, sm: 15 }
                    }}
                  >
                    {field.label} {field.required && <span style={{ color: 'red' }}>*</span>}
                  </Typography>

                  <CustomAutocomplete
                    onChange={option => {
                      handleSelectChange(option, field)
                    }}
                    options={field.options!}
                    error={(errors as any)[field.name]}
                    multiple={field.multiple}
                    disabled={field.disabled}
                    value={(formData as any)[field.name] || null}
                  />
                </Stack>
              ) : field?.fieldType === 'multiSelect' ? (
                <Stack direction={'row'} alignItems={'center'}>
                  <Typography
                    sx={{
                      minWidth: { xs: '120px', sm: '180px' },
                      fontWeight: 'bold',
                      fontSize: { xs: 12, sm: 15 }
                    }}
                  >
                    {field.label} {field.required && <span style={{ color: 'red' }}>*</span>}
                  </Typography>

                  <MultiAutocomplete
                    onChange={option => {
                      handleSelectChange(option as any, field)
                    }}
                    options={field.options!}
                    error={(errors as any)[field.name]}
                    multiple={true}
                    disabled={field.disabled}
                    value={(formData as any)[field.name]}
                  />
                </Stack>
              ) : field?.fieldType === 'checkbox' ? (
                <Stack direction={'row'} alignItems='center'>
                  <Typography
                    sx={{
                      minWidth: { xs: '120px', sm: '180px' },

                      fontWeight: 'bold',
                      fontSize: { xs: 12, sm: 15 }
                    }}
                  >
                    {field.label} {field.required && <span style={{ color: 'red' }}>*</span>}
                  </Typography>
                  <Checkbox name={field.name} onChange={() => onChange} checked={(formData as any)[field.name]}/>
                  {/* <CheckboxGroup items={field.options!} onChange={() => onChange} /> */}
                </Stack>
              ) : field?.fieldType === 'radioGroup' ? (
                <Stack direction={'row'} alignItems='center'>
                  <Typography
                    sx={{
                      minWidth: { xs: '120px', sm: '180px' },

                      fontWeight: 'bold',
                      fontSize: { xs: 12, sm: 15 }
                    }}
                  >
                    {field.label} {field.required && <span style={{ color: 'red' }}>*</span>}
                  </Typography>
                  <RadioGroup items={field.options!} name={field.name} onChange={onChange} />
                </Stack>
              ) : field?.fieldType === 'imagePrivew' ? (
                <ImageUpload formData={formData} setFormData={setFormData} />
              ) : (
                <Stack direction={'row'} alignItems='center'>
                  <Typography
                    sx={{
                      minWidth: { xs: '120px', sm: '180px' },
                      fontWeight: 'bold',
                      fontSize: { xs: 13, sm: 15 }
                    }}
                  >
                    {field.label}
                    {field.required && <span style={{ color: 'red' }}>*</span>}
                  </Typography>
                  <InputField
                    name={field.name}
                    value={(formData as any)[field.name]}
                    type={field.type}
                    onChange={onChange}
                    placeholder={field.placeholder}
                    password={field.password}
                    showPassword={field.password ? showPassword : false}
                    onClick={() => setShowPassword(!showPassword)}
                    startIcon={field.password && <Lock />}
                    inputMode={field.inputMode as any}
                    error={(errors as any)[field.name]}
                    disabled={field?.['disabled']}
                  />
                </Stack>
              )}
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default CustomForm
