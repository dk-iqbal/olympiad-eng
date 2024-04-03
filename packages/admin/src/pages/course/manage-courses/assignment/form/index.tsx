import { Box, Grid, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import CustomForm from '../../../../../layouts/components/common/CommonForm'
import Form from 'src/layouts/components/common/Form'
import SaveButton from 'src/layouts/components/common/SaveButton'
import Button from 'src/layouts/components/common/Button'
import { validateFiled } from 'src/utils/util'
import moment from 'moment'
import { createNewAssignment, updatedNewAssignment } from 'src/utils/functions/commonFunctions'
import { isString } from 'lodash'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '100%', sm: '80%' },
  bgcolor: 'background.paper',
  boxShadow: 24
}

const initialData = {
  assignmentName: '',
  totalMarks: '',
  deadLine: '',
  answerFile: '',
  assignmentFile: '',
  note: ''
}
const initialErrorData = {
  assignmentName: '',
  totalMarks: '',
  deadLine: '',
  assignmentFile: ''
}

interface AssignmentFormProps {
  setOpenModal: (value: boolean) => void

  assignmentId?: string | any
  selectedItem?: any
}

const AssignmentForm = (props: AssignmentFormProps) => {
  const { setOpenModal, selectedItem } = props
  const theme = useTheme()
  const assignmentId = selectedItem?.assignments[0]?._id
  const selectedAssignment = selectedItem?.assignments[0]

  //#region state
  const [formData, setFormData] = useState(initialData)
  const [errors, setErrors] = useState(initialErrorData)
  const [loading, setLoading] = useState(false)

  //#endregion

  //#region use Effect Hooks
  useEffect(() => {
    if (selectedAssignment) {
      const parsedNote = isString(selectedAssignment.info)
        ? JSON.parse(selectedAssignment.info)
        : selectedAssignment.info
      setFormData({
        assignmentName: selectedAssignment.assignmentName,
        totalMarks: selectedAssignment.totalMarks,
        deadLine: moment(selectedAssignment.deadLine).format('YYYY-MM-DD'),

        // answerFile: selectedAssignment?.answerFile,
        // assignmentFile: selectedAssignment?.assignmentFile,
        answerFile: '',
        assignmentFile: '',
        note: parsedNote?.note
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAssignment])

  //#endregion
  //#region functions
  /*
  1. Validate Form fields
*/
  const validateForm = () => {
    const titleError = validateFiled(formData?.['assignmentName'])
    const totalMarksError = validateFiled(formData?.['totalMarks'])
    const deadlineError = validateFiled(formData?.['deadLine'])
    const assignmentFileError = validateFiled(formData?.['assignmentFile'])

    setErrors({
      assignmentName: titleError,
      totalMarks: totalMarksError,
      deadLine: deadlineError,
      assignmentFile: assignmentFileError
    })

    return !titleError && !totalMarksError && !deadlineError && !assignmentFileError
  }

  const onSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    const newErrors = validateForm()
    if (newErrors) {
      const assignmentPayload = {
        assignmentName: formData?.assignmentName,
        lessonId: selectedItem.id,
        lessonName: selectedItem.name,
        totalMarks: formData?.totalMarks,
        deadLine: moment(formData?.deadLine).format('YYYY-MM-DD'),
        answerFile: formData?.answerFile,
        assignmentFile: formData?.assignmentFile,
        info: JSON.stringify({
          note: formData?.note
        })
      }
      try {
        if (assignmentId) {
          await updatedNewAssignment(assignmentPayload, assignmentId as string)
          toast.success('Assignment Updated Successfully')
        } else {
          await createNewAssignment(assignmentPayload)
          toast.success('Assignment Created Successfully')
        }
      } catch (error) {
        toast.success('Something went wrong')
      }
    }
    setLoading(false)
    setOpenModal(false)
  }

  //#endregion

  const inputField = [
    {
      name: 'assignmentName',
      label: 'Assignment Name',
      placeholder: 'Enter Assignment Title',
      inputMode: 'text',
      fieldType: 'text',
      required: true
    },
    {
      name: 'assignmentFile',
      label: 'Assignment File',
      inputMode: 'text',
      fieldType: 'text',
      type: 'file',
      required: true
    },
    {
      name: 'totalMarks',
      label: 'Total Marks',
      placeholder: 'Enter total Marks',
      fieldType: 'text',
      inputMode: 'numeric',
      required: true
    },
    {
      name: 'deadLine',
      label: 'Deadline',
      inputMode: 'text',
      placeholder: 'Enter Deadline',
      fieldType: 'text',
      type: 'date',
      required: true
    },
    {
      name: 'answerFile',
      label: 'Answer File',
      inputMode: 'text',
      fieldType: 'text',
      type: 'file',
      required: false
    },
    {
      name: 'note',
      label: 'Note',
      inputMode: 'text',
      placeholder: 'Enter Note',
      fieldType: 'textarea',
      type: 'text',
      required: false
    }
  ]

  return (
    <Box sx={style}>
      <Form onSubmit={onSubmit} heading={assignmentId ? 'Update Assignment Form' : 'Assingment Form'}>
        <CustomForm
          inputField={inputField}
          errors={errors}
          setErrors={setErrors}
          formData={formData}
          setFormData={setFormData}
        />
        <Grid container spacing={2} justifyContent={'center'} alignItems={'center'}>
          <Button
            onClick={() => setOpenModal(false)}
            name='Cancel'
            bgColor={theme.palette.primary.dark}
            color={theme.palette.common.white}
          />

          <SaveButton loading={loading} text={assignmentId ? 'Update Assignment' : 'Add Assignment'} />
        </Grid>
      </Form>
    </Box>
  )
}

export default AssignmentForm
