import { RemoveCircle, AddBox, NavigateBefore } from '@mui/icons-material'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  useTheme,
  Stack,
  Typography,
  IconButton,
  Grid
} from '@mui/material'
import React, { useState, useEffect } from 'react'
import BaseLayout from 'src/layouts/components/common/BaseLayout'
import Checkbox from 'src/layouts/components/common/Checkbox'
import InputField from 'src/layouts/components/common/InputField'
import SaveButton from 'src/layouts/components/common/SaveButton'
import Button from 'src/layouts/components/common/Button'
import { useRouter } from 'next/router'
import { validateFiled } from 'src/utils/util'
import { toast } from 'react-toastify'
import Form from 'src/layouts/components/common/Form'
import Dialog from 'src/layouts/components/common/Dialog'
import { isString } from 'lodash'
import {
  createNewLesson,
  createNewQuestions,
  updatedNewLesson,
  updatedNewQuestions
} from 'src/utils/functions/commonFunctions'

const initialValidationData = {
  name: ''
}

const initialData = {
  name: '',
  description: '',
  questions: [
    {
      questionName: '',
      answerOptions: [{ isAnswer: false, answer: '' }],
      correctAnswer: ''
    }
  ],
  status: true,
  info: '',
  isFree: false,
  isActive: true,
  isNegativeMarks: false,
  negativeMarks: 0.5,
  passingMarks: 0
}

const AddNewLesson = () => {
  const theme = useTheme()
  const router = useRouter()
  const { id, lessonId, selectedItem } = router.query
  const parsedSelectedItem = isString(selectedItem) ? JSON.parse(selectedItem) : selectedItem
  const [formData, setFormData] = useState(initialData)
  const [errors, setErrors] = useState(initialValidationData)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)

  const handleAddQuestion = () => {
    setFormData({
      ...formData,
      questions: [
        ...formData.questions,
        {
          questionName: '',
          answerOptions: [{ isAnswer: false, answer: '' }],
          correctAnswer: ''
        }
      ]
    })
  }

  const handleRemoveQuestion = (index: number) => {
    const newFaqFields = { ...formData }
    newFaqFields.questions.splice(index, 1)
    setFormData(newFaqFields)
  }

  const handleAddClue = (questionIndex: number) => {
    const updatedQuestions = [...formData.questions]
    const currentQuestion = updatedQuestions[questionIndex]
    currentQuestion.answerOptions = [...currentQuestion.answerOptions, { isAnswer: false, answer: '' }]
    setFormData({
      ...formData,
      questions: updatedQuestions
    })
  }

  const handleRemoveClue = (questionIndex: number, answerIndex: number) => {
    const updatedQuestions = [...formData.questions]
    const currentQuestion = updatedQuestions[questionIndex]

    currentQuestion.answerOptions.splice(answerIndex, 1)
    setFormData({
      ...formData,
      questions: updatedQuestions
    })
  }

  const onChange = (e: any, questionIndex?: number, answerIndex?: number, isAnswerCheckbox?: boolean) => {
    const { name, value, checked, type } = e.target

    if (questionIndex !== undefined && answerIndex !== undefined) {
      // Handle changes in answers
      const updatedQuestions = [...formData.questions as any]
      if (isAnswerCheckbox) {
        updatedQuestions[questionIndex].answerOptions[answerIndex].isAnswer = checked
      } else {
        updatedQuestions[questionIndex].answerOptions[answerIndex][name] = value
      }

      setFormData({
        ...formData,
        questions: updatedQuestions
      })
    } else if (questionIndex !== undefined && answerIndex === undefined) {
      const updatedQuestions = [...formData.questions as any]
      updatedQuestions[questionIndex][name] = value
      setFormData({
        ...formData,
        questions: updatedQuestions
      })
    } else {
      // Handle changes in other fields
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      })
    }

    setErrors({
      ...errors,
      [name]: undefined
    })
  }

  const validateForm = () => {
    const lessonNameError = validateFiled(formData?.['name'])

    setErrors({
      name: lessonNameError
    })

    return !lessonNameError
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors = validateForm()
    if (newErrors) {
      const payload = {
        sectionId: id,
        name: formData?.name,
        isFree: formData?.isFree,
        isActive: formData?.isActive,
        isNegativeMarks: formData?.isNegativeMarks,
        negativeMarks: formData?.isNegativeMarks ? formData?.negativeMarks : 0,
        passingMarks: formData?.passingMarks,
        info: JSON.stringify({
          description: formData?.description
        })
      }

      try {
        if (lessonId) {
          const result = await updatedNewLesson(payload, lessonId as string)
          if (result) {
            const questionPayload = formData?.questions?.map(ques => ({
              questionId: (ques as any)._id || (ques as any).id,
              updatedQuestion: {
                questionName: ques.questionName,
                correctAnswer: ques.correctAnswer,
                answerOptions: JSON.stringify(ques.answerOptions),
                lessonId: result._id || result.id,
                lessonName: result.name
              }
            }))
            updatedNewQuestions(questionPayload)
          }
        } else {
          const result = await createNewLesson({ ...payload })
          if (result) {
            const questionPayload = formData?.questions?.map(ques => ({
              questionName: ques.questionName,
              correctAnswer: ques.correctAnswer,
              answerOptions: JSON.stringify(ques.answerOptions),
              lessonId: result._id || result.id,
              lessonName: result.name
            }))
            await createNewQuestions(questionPayload)
          }
        }
        toast.success(`Lesson ${lessonId ? 'Updated' : 'Created'} Successfully`)
        router.back()
      } catch (error) {
        console.log(error)
      }
    } else {
      setErrors(initialValidationData)
    }
  }

  useEffect(() => {
    if (parsedSelectedItem) {
      const parsedQuestions = isString(parsedSelectedItem.questions)
        ? JSON.parse(parsedSelectedItem.questions)
        : parsedSelectedItem.questions
      const parsedInfo = isString(parsedSelectedItem.info)
        ? JSON.parse(parsedSelectedItem.info)
        : parsedSelectedItem.info
      setFormData({
        name: parsedSelectedItem.name,
        description: parsedInfo.description,
        questions: parsedQuestions?.map((i: any) => ({
          ...i,
          answerOptions: isString(i.answerOptions) ? JSON.parse(i.answerOptions) : i.answerOptions
        })),
        status: parsedSelectedItem.status,
        info: parsedInfo,
        isFree: parsedSelectedItem.isFree,
        isActive: parsedSelectedItem.isActive,
        isNegativeMarks: parsedSelectedItem.isNegativeMarks,
        negativeMarks: parsedSelectedItem.negativeMarks,
        passingMarks: parsedSelectedItem.passingMarks
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem])

  return (
    <BaseLayout
      heading='Add New Lesson'
    >
      <Form onSubmit={onSubmit}>
        {/* <Paper sx={{ p: 2 }}> */}
        <Stack direction={'row'} alignItems='center'>
          <Typography
            sx={{
              minWidth: { xs: '130px', sm: '180px' },
              fontWeight: 'bold',
              fontSize: { xs: 13, sm: 15 }
            }}
          >
            {'Lesson Name'}
            {<span style={{ color: 'red' }}>*</span>}
          </Typography>
          <InputField
            name={'name'}
            value={formData.name}
            type={'text'}
            onChange={onChange}
            placeholder={'Enter Lesson Name'}
            error={errors.name}
          />
        </Stack>

        <Stack direction={'row'} alignItems='center'>
          <Typography
            sx={{
              minWidth: { xs: '130px', sm: '180px' },
              fontSize: { xs: 13, sm: 15 },
              fontWeight: 'bold'
            }}
          >
            {'Description'}
          </Typography>
          <InputField
            name={'description'}
            value={formData.description}
            type={'text'}
            rows={3}
            multiline
            onChange={onChange}
            placeholder={'Enter description'}
          />
        </Stack>

        <Stack direction={'row'} alignItems='center'>
          <Typography
            sx={{
              minWidth: { xs: '120px', sm: '180px' },
              fontWeight: 'bold',
              fontSize: { xs: 12, sm: 15 }
            }}
          >
            {'Is Free'}
          </Typography>
          <Checkbox name='isFree' onChange={(e: any) => onChange(e)} checked={formData?.isFree} />
        </Stack>
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
          <Checkbox name='isActive' onChange={(e: any) => onChange(e)} checked={formData?.isActive} />
        </Stack>

        <Stack direction={'row'} alignItems='center'>
          <Typography
            sx={{
              minWidth: { xs: '120px', sm: '180px' },
              fontWeight: 'bold',
              fontSize: { xs: 12, sm: 15 }
            }}
          >
            {'Is Negative Marks'}
          </Typography>
          <Checkbox name='isNegativeMarks' onChange={(e: any) => onChange(e)} checked={formData?.isNegativeMarks} />
        </Stack>

        {formData?.isNegativeMarks && (
          <Stack direction={'row'} alignItems='center'>
            <Typography
              sx={{
                minWidth: { xs: '130px', sm: '180px' },
                fontSize: { xs: 13, sm: 15 },
                fontWeight: 'bold'
              }}
            >
              {'Negative Marks'}
            </Typography>
            <InputField
              name={'negativeMarks'}
              value={formData.negativeMarks}
              type={'decimal'}
              onChange={onChange}
              placeholder={'Enter Negative Marks'}
            />
          </Stack>
        )}

        <Stack direction={'row'} alignItems='center'>
          <Typography
            sx={{
              minWidth: { xs: '130px', sm: '180px' },
              fontSize: { xs: 13, sm: 15 },
              fontWeight: 'bold'
            }}
          >
            {'Pass Marks'}
          </Typography>
          <InputField
            name={'passingMarks'}
            value={formData.passingMarks}
            type={'text'}
            onChange={onChange}
            placeholder={'Enter Pass Marks'}
          />
        </Stack>
        {formData.questions?.map((ques, questionIndex) => (
          <Accordion key={questionIndex} defaultExpanded={true} TransitionProps={{ unmountOnExit: true }}>
            <AccordionSummary
              sx={{
                color: 'steelblue',
                bgcolor: '#ededed'
              }}
            >
              <Stack direction={'row'} alignItems='center' width='100%'>
                <InputField
                  name={'questionName'}
                  value={ques.questionName}
                  type={'text'}
                  onChange={e => onChange(e, questionIndex)}
                  startIcon={`Q-${questionIndex + 1} : `}
                  placeholder={'Enter Question'}

                  // error={ques.question}
                />

                {questionIndex !== 0 ? (
                  <IconButton onClick={() => handleRemoveQuestion(questionIndex)}>
                    <RemoveCircle color='error' />
                  </IconButton>
                ) : (
                  <IconButton onClick={handleAddQuestion}>
                    <AddBox color='success' />
                  </IconButton>
                )}
              </Stack>
            </AccordionSummary>
            <AccordionDetails>
              {ques?.answerOptions?.map((answer, answerIndex) => (
                <Stack direction='row' alignItems={'center'} key={answerIndex}>
                  <Checkbox
                    name='isAnswer'
                    checked={answer.isAnswer}
                    onChange={e => onChange(e, questionIndex, answerIndex, true)}
                  />
                  <InputField
                    name={'answer'}
                    value={answer.answer}
                    type={'text'}
                    onChange={e => onChange(e, questionIndex, answerIndex)}
                    placeholder={'Enter Clue'}
                  />
                  {answerIndex !== 0 ? (
                    <IconButton onClick={() => handleRemoveClue(questionIndex, answerIndex)}>
                      <RemoveCircle color='error' />
                    </IconButton>
                  ) : (
                    <IconButton onClick={() => handleAddClue(questionIndex)}>
                      <AddBox color='success' />
                    </IconButton>
                  )}
                </Stack>
              ))}
              <Stack direction={'row'} alignItems='center'>
                <Typography
                  sx={{
                    minWidth: { xs: '130px', sm: '180px' },
                    fontSize: { xs: 13, sm: 15 },
                    fontWeight: 'bold'
                  }}
                >
                  {'Correct Answer'}
                  {/* {<span style={{ color: 'red' }}>*</span>} */}
                </Typography>
                <InputField
                  name={'correctAnswer'}
                  value={ques.correctAnswer}
                  type={'text'}
                  onChange={e => onChange(e, questionIndex)}
                  placeholder={'Enter Correct Answer'}
                />
              </Stack>
            </AccordionDetails>
          </Accordion>
        ))}

        <Grid container alignItems={'center'} justifyContent='center'>
          <Button
            onClick={() => router.back()}
            name='Back'
            bgColor={theme.palette.primary.dark}
            color={theme.palette.common.white}
            startIcon={<NavigateBefore />}
          />

          <SaveButton text={lessonId ? 'Update Lesson Form' : 'Confirm New Lesson'} />
        </Grid>
        {/* </Paper> */}
      </Form>

      <Dialog
        open={deleteModalOpen}
        setOpen={setDeleteModalOpen}
        headertext='Confirmation Dialog'
        actionButtonName='Confirm'
        bodyText={`Are you sure? You want to Delete `}
      />
    </BaseLayout>
  )
}

export default AddNewLesson
