import React, { useEffect, useState } from 'react'
import { RemoveCircle, AddBox } from '@mui/icons-material'
import { Box, useTheme, Stack, Typography, IconButton, Grid } from '@mui/material'
import Form from 'src/layouts/components/common/Form'
import SaveButton from 'src/layouts/components/common/SaveButton'
import Button from 'src/layouts/components/common/Button'
import InputField from 'src/layouts/components/common/InputField'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import Checkbox from 'src/layouts/components/common/Checkbox'
import { validateFiled } from 'src/utils/util'
import { createCourseRoutine, editCourseRoutine, getCourseRoutineById } from 'src/utils/functions/courseRoutineFunction'


const RoutineForm = () => {
  const router = useRouter()
  const theme = useTheme()
  const { id, courseId, courseName } = router.query

  const [routines, setRoutines] = useState({
    name: '',
    isActive: true,
    routines: [{ title: '', remarks: '', dateTime: '' }]
  })

  const [errors, setErrors] = useState({
    name: '',
    isActive: true,
    routines: [{ title: '', remarks: '', dateTime: '' }]
  })

  const getRoutineById = async (id: string) => {
    const res = await getCourseRoutineById(id)
    const data = {
      ...res,
      routines: JSON.parse(res?.routines)
    }
    setRoutines(data)
  }

  useEffect(() => {
    if (id) {
      getRoutineById(id as string)
    }
  }, [id])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string, index?: number) => {
    const { name, value, type, checked } = e.target
    setRoutines(prevRoutines => {
      const updatedSections = [...prevRoutines.routines]
      if (index !== undefined) {
        if (updatedSections.length > index) {
         ( updatedSections[index] as any)[fieldName] = value;
        }
      } else {
        return {
          ...prevRoutines,
          [name]: type === 'checkbox' ? checked : value,
          routines: updatedSections
        }
      }

      return { ...prevRoutines, routines: updatedSections }
    })
  }

  const handleRemoveSection = (index: number) => {
    const updatedSections = [...routines.routines]
    updatedSections.splice(index, 1)
    setRoutines({ ...routines, routines: updatedSections })
  }

  const handleAddSection = () => {
    setRoutines({
      ...routines,
      routines: [...routines.routines, { title: '', remarks: '', dateTime: '' }]
    })
  }

  const validateForm = () => {
    const errors: any = {}

    const validateRoutine = (field: string, value: string, index: number) => {
      const error = validateFiled(value)
      if (error) {
        errors.routines = {
          ...errors.routines,
          [index]: { ...errors.routines?.[index], [field]: error }
        }
      }
    }

    // Validate routine name
    validateRoutine('name', routines.name, 0)

    routines.routines.forEach((sec, index) => {
      validateRoutine('title', sec.title, index)
      validateRoutine('remarks', sec.remarks, index)
      validateRoutine('dateTime', sec.dateTime as any, index)
    })

    return Object.keys(errors).length > 0 ? errors : null
  }

  const onSubmit = async (e: any) => {
    e.preventDefault()
    const newErrors = validateForm()
    if (routines.routines.length > 1 && !newErrors) {
      const updatedPayloads = {
        routines: JSON.stringify(
          routines.routines.map(sec => ({
            title: sec.title,
            remarks: sec.remarks,
            dateTime: sec.dateTime
          }))
        ),
        isActive: routines.isActive,
        name: routines.name,
        courseId: courseId,
        courseName: courseName
      }
      if (id) {
        await editCourseRoutine(id as string, updatedPayloads)
        toast.success('Routine Updated successfully')
      } else {
        await createCourseRoutine(updatedPayloads)
        toast.success('Routine created successfully')
      }
      router.push('/course/manage-courses/list')
    } else {
      setErrors(newErrors)
    }
  }

  return (
    <Form heading='Routine Form' onSubmit={onSubmit}>
      <Stack direction={'row'} alignItems='center'>
        <Typography
          sx={{
            minWidth: { xs: '130px', sm: '180px' },
            fontSize: { xs: 13, sm: 15 }
          }}
        >
          {'Routine Name'}
        </Typography>
        <InputField
          name={'name'}
          value={routines.name}
          type={'text'}
          onChange={e => onChange(e, 'name')}
          placeholder={'Enter Routine Name'}
          error={(errors as any).routines?.name}
        />
      </Stack>

      {routines?.routines?.map((sec, secIndex) => (
        <Box key={secIndex}>
          <Stack direction={'row'} alignItems='center' gap={1}>
            <InputField
              name={`title`}
              value={sec.title}
              label='Title'
              type={'text'}
              onChange={e => onChange(e, 'title', secIndex)}
              error={(errors as any).routines?.[secIndex]?.title}
            />
            <InputField
              name={`remarks`}
              label='Remarks'
              value={sec.remarks}
              type={'text'}
              onChange={e => onChange(e, 'remarks', secIndex)}
              error={(errors as any).routines?.[secIndex]?.remarks}
            />

            <InputField
              name={`dateTime`}
              value={sec.dateTime}

              // label='Date Time'
              type={'date'}
              onChange={e => onChange(e, 'dateTime', secIndex)}
              error={(errors as any).routines?.[secIndex]?.remarks}
            />
          </Stack>
          {secIndex !== 0 ? (
            <IconButton onClick={() => handleRemoveSection(secIndex)}>
              <RemoveCircle color='error' />
            </IconButton>
          ) : (
            <IconButton onClick={handleAddSection}>
              <AddBox color='success' />
            </IconButton>
          )}
        </Box>
      ))}

      <Stack direction={'row'} alignItems='center'>
        <Typography
          sx={{
            minWidth: { xs: '120px', sm: '180px' },
            fontWeight: 'bold',
            fontSize: { xs: 12, sm: 15 }
          }}
        >
          {'Is Active'}
        </Typography>
        <Checkbox name='isActive' onChange={e => onChange(e, 'isActive')} checked={routines?.isActive} />
      </Stack>
      <Grid container spacing={2} justifyContent={'center'} alignItems={'center'}>
        <Button
          onClick={() => router.back()}
          name='Cancel'
          bgColor={theme.palette.primary.dark}
          color={theme.palette.common.white}
        />

        <SaveButton text={`${id ? 'Update Routine' : 'Confirm Routine'}`} />
      </Grid>
    </Form>
  )
}

export default RoutineForm
