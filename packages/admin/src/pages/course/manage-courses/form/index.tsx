import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  IconButton,
  Stack,
  Typography,
  useTheme
} from '@mui/material'
import { AddBox, NavigateBefore, RemoveCircle } from '@mui/icons-material'
import { toast } from 'react-toastify'
import baseAxios from 'src/services/config'
import { COURSE_API } from 'src/services/api-end-points'
import { COURSE_TYPE, USER_ROLE, USER_STATUS, validateFiled } from 'src/utils/util'
import { fetchUsers } from 'src/services/CommonFunction'
import CustomForm from 'src/layouts/components/common/CommonForm'
import InputField from 'src/layouts/components/common/InputField'
import RadioGroup from 'src/layouts/components/common/RadioGroup'
import Button from 'src/layouts/components/common/Button'
import SaveButton from 'src/layouts/components/common/SaveButton'
import Form from 'src/layouts/components/common/Form'
import { useRouter } from 'next/router'
import { isString } from 'lodash'
import Checkbox from 'src/layouts/components/common/Checkbox'
import { getCategoriesByStatus } from 'src/utils/functions/categoryFunction'
import dynamic from "next/dynamic";

const initialValidationData = {
  name: '',
  description: '',
  price: '',
  category: '',
  courseProvider: '',
  courseOverview: '',
  instructor: ''
}

const initialData = {
  name: '',
  description: '',
  price: '',
  category: { label: '', value: '' },
  discount: '',
  courseProvider: { label: '', value: '' },
  courseOverview: '',
  status: 'Pending',
  isDiscount: false,
  isFree: false,
  instructor: { label: '', value: '' },
  info: '',
  organizationId: '',
  courseType: 'COURSE',
  faqQuestions: [{ question: '', answer: '' }],
  requirement: [''],
  expiryPeriod: '',
  metakeywords: '',
  metaDescription: '',
  thumbnail: '',
  limitedMonths: '',
  courseDescriptions: '',
  multiInstructorIds: [],
  image: ''
}

const createNewCourse = async (course: any) => {
  try {
    const response = await baseAxios.post(COURSE_API.course_create, course)

    return response.data
  } catch (error) {
    console.error('Error creating course:', error)
    throw error
  }
}

const updatedNewCourse = async (updatedCourse: any, id: string) => {
  try {
    const response = await baseAxios.put(`${COURSE_API.edit_course}/${id}`, updatedCourse)

    return response.data
  } catch (error) {
    console.error('Error editing course:', error)
    throw error
  }
}

const AddNewCourse: NextPage = () => {
  const router = useRouter()
  const { id, selectedItem } = router.query
  const theme = useTheme()

  const [formData, setFormData] = useState(initialData)
  const [errors, setErrors] = useState(initialValidationData)
  const [faqFields, setFaqFields] = useState([{ question: '', answer: '' }])
  const [requirementFields, setRequirementFields] = useState([''])
  const [descriptionFields, setDescriptionFields] = useState([''])
  const [categories, setCategories] = useState([])
  const [instractors, setInstractors] = useState([])
  const userData = JSON.parse(localStorage?.getItem('userData') as string) || ''

  const parseSelectedItem = isString(selectedItem) ? JSON.parse(selectedItem) : selectedItem
  const Editor = dynamic(() => import("src/layouts/components/common/Editor"), { ssr: false });

  /*
  1. Validate Form fields
  2. TODOS: we need common validation function for all forms
*/
  const validateForm = () => {
    const courseTitleError = validateFiled(formData?.['name'])
    const shortDescError = validateFiled(formData?.['description'])
    const priceError = validateFiled(formData?.['price'])
    const courseOverviewError = validateFiled(formData?.['courseOverview'])
    const courseCategoryError = validateFiled(formData?.['category']?.value)
    const courseProviderError = validateFiled(formData?.['courseProvider']?.value)
    const instructorError = validateFiled(formData?.['instructor']?.value)

    setErrors({
      name: courseTitleError,
      description: shortDescError,
      price: priceError,
      courseOverview: courseOverviewError,
      category: courseCategoryError,
      courseProvider: courseProviderError,
      instructor: instructorError
    })

    return (
      !courseTitleError &&
      !shortDescError &&
      !priceError &&
      !courseOverviewError &&
      !courseCategoryError &&
      !courseProviderError &&
      !instructorError
    )
  }

  /*
1. handle change for all fields
*/

  const onChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string, index: number) => {
    const { name, value, checked, type } = e.target
    if (fieldName && fieldName === 'requirement') {
      const newFields = [...requirementFields]
      newFields[index] = value
      setRequirementFields(newFields)
    } else if (fieldName && fieldName === 'courseDescriptions') {
      const newFields = [...descriptionFields]
      newFields[index] = value
      setDescriptionFields(newFields)
    } else if (fieldName && fieldName !== 'requirement') {
      const newFaqFields = [...faqFields as any]
      newFaqFields[index][fieldName] = value
      setFaqFields(newFaqFields)
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: type === 'checkbox' ? checked : value
      }))
    }
    setErrors({
      ...errors,
      [name]: undefined
    })
  }

  /*
  1. handle change for Checkbox
  */

  const handleAddFaq = () => {
    setFaqFields([...faqFields, { question: '', answer: '' }])
  }

  const handleRemoveFaq = (index: number) => {
    const newFaqFields = [...faqFields]
    newFaqFields.splice(index, 1)
    setFaqFields(newFaqFields)
  }

  const handleAddRequirement = () => {
    setRequirementFields([...requirementFields, ''])
  }

  const handleRemoveRequirement = (index: number) => {
    const newRequirementFields = [...requirementFields]
    newRequirementFields.splice(index, 1)
    setRequirementFields(newRequirementFields)
  }

  const handleAddDescription = () => {
    setDescriptionFields([...descriptionFields, ''])
  }

  const handleRemoveDescription = (index: number) => {
    const newRequirementFields = [...descriptionFields]
    newRequirementFields.splice(index, 1)
    setDescriptionFields(newRequirementFields)
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors = validateForm()
    if (!newErrors) {
      const payload = {
        name: formData?.name,
        description: formData?.description,
        price: Number(formData?.price),
        categoryId: formData?.category?.['value'],
        categoryName: formData?.category.label,
        instructorId: formData?.instructor.value,
        instructorName: formData?.instructor.label,
        isDiscount: formData?.isDiscount,
        isFree: formData?.isFree,
        discount: Number(formData?.discount),
        courseProvider: formData?.courseProvider.value,
        courseOverview: formData?.courseOverview,
        multiInstructorIds: JSON.stringify(formData?.multiInstructorIds),
        thumbnail: formData?.thumbnail || formData?.image.split(',')[1],
        status: formData?.status ? formData?.status : 'Pending',
        info: JSON.stringify({
          faqQuestions: faqFields,
          requirement: requirementFields,
          expiryPeriod: formData?.expiryPeriod,
          metakeywords: formData?.metakeywords,
          metaDescription: formData?.metaDescription,
          limitedMonths: formData?.limitedMonths,
          courseDescriptions: descriptionFields
        }),
        organizationId: `${userData.organizationId}` || 'demo',
        courseType: COURSE_TYPE.COURSE
      }

      try {
        if (id) {
          await updatedNewCourse(payload, id as string)
        } else {
          await createNewCourse({ ...payload })
        }
        router.push('/course/manage-courses/list')
        toast.success(`Course ${id ? 'Updated' : 'Created'} Successfully`)
      } catch (error) {
        toast.error('Something Went Wrong!!')
      }
    }
  }

  const inputField = [
    {
      name: 'category',
      label: 'Category',
      placeholder: 'Select Category',
      fieldType: 'select',
      options: categories || [],
      required: true
    },
    {
      name: 'instructor',
      label: 'Instructor',
      placeholder: 'Select Instructor',
      fieldType: 'select',
      options: instractors || [],
      required: true
    },
    {
      name: 'multiInstructorIds',
      label: 'Multi Instructor',
      placeholder: 'Select Multiple Instructor',
      fieldType: 'multiSelect',
      options: instractors || [],
      required: false
    },
    {
      name: 'name',
      label: 'Course Name',
      placeholder: 'Enter Course Name',
      inputMode: 'text',
      type: 'textbox',
      required: true
    },

    // {
    //   name: 'description',
    //   label: 'Short Description',
    //   placeholder: 'Enter Short Description',
    //   inputMode: 'test',
    //   type: 'textbox',
    //   fieldType: 'textarea'
    // },
    {
      name: 'price',
      label: 'Course Price',
      placeholder: 'Enter course price',
      inputMode: 'text',
      type: 'textbox',
      required: true
    },
    {
      name: 'courseProvider',
      label: 'Course Provider',
      placeholder: 'Select Provider',
      fieldType: 'select',
      options: [{ label: 'Youtube', value: 'Youtube' }],
      required: true
    },
    {
      name: 'courseOverview',
      label: 'Course Overview',
      fieldType: 'text',
      placeholder: 'E.g: https://www.youtube.com/watch',
      required: true
    },
    {
      name: 'thumbnail',
      label: 'Thumbnail',
      fieldType: 'imagePrivew',
      src: '',
      icon: '',
      required: false
    }
  ]

  useEffect(() => {
    getCategoriesByStatus(USER_STATUS.ACTIVE).then((res: any) => {
      setCategories(res?.map((c: any) => ({ label: c.name, value: c._id })))
    })

    fetchUsers(USER_ROLE.INSTRUCTOR, USER_STATUS.ACTIVE).then((res: any) => {
      setInstractors(res?.map((c: any) => ({ label: c.name, value: c._id })))
    })
  }, [])

  useEffect(() => {
    if (selectedItem) {
      const parseInfo = isString(parseSelectedItem?.info)
        ? JSON.parse(parseSelectedItem?.info)
        : parseSelectedItem?.info

      setFormData({
        name: parseSelectedItem?.name || '',
        description: parseSelectedItem?.description || '',
        multiInstructorIds: isString(parseSelectedItem?.multiInstructorIds)
          ? JSON.parse(parseSelectedItem?.multiInstructorIds) : parseSelectedItem?.multiInstructorIds || [],
        courseDescriptions: parseInfo?.courseDescriptions || '',
        price: parseSelectedItem?.price || '',
        category: {
          label: parseSelectedItem.categoryName || '',
          value: parseSelectedItem.categoryId || ''
        },
        instructor: {
          label: parseSelectedItem.instructorName || '',
          value: parseSelectedItem.instructorId || ''
        },
        isDiscount: parseSelectedItem?.isDiscount || false,
        isFree: parseSelectedItem?.isFree || false,
        discount: parseSelectedItem?.discount || '',
        courseProvider: {
          label: parseSelectedItem?.courseProvider || '',
          value: parseSelectedItem?.courseProvider || ''
        },
        courseOverview: parseSelectedItem?.courseOverview || '',
        thumbnail: parseSelectedItem?.thumbnail || '',
        status: parseSelectedItem?.status || '',
        organizationId: parseSelectedItem?.organizationId || '',
        courseType: parseSelectedItem?.courseType || '',
        expiryPeriod: parseInfo?.expiryPeriod || '',
        metakeywords: parseInfo?.metakeywords || '',
        metaDescription: parseInfo?.metaDescription || '',
        info: parseInfo?.info || '',
        faqQuestions: parseInfo?.faqQuestions || [],
        requirement: parseInfo?.requirement || [],
        limitedMonths: parseInfo?.limitedMonths || '',
        image: parseSelectedItem?.thumbnail
      })

      setRequirementFields(parseInfo?.requirement || [''])
      setFaqFields(parseInfo?.faqQuestions || [{ question: '', answer: '' }])
      setDescriptionFields(parseInfo?.courseDescriptions || [''])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem])

  return (
    <Grid container justifyContent='center' alignContent='center'>
      <Form onSubmit={onSubmit} heading={id ? 'Update Course Form' : 'Create Course Form'}>
        <>
          <Accordion defaultExpanded={true} TransitionProps={{ unmountOnExit: true }}>
            <AccordionSummary
              sx={{
                fontSize: 18,
                color: 'steelblue',
                bgcolor: '#ededed'
              }}
            >
              Basic Info
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2} p={1} mr={0.2} mt={1}>
                <CustomForm
                  inputField={inputField}
                  errors={errors}
                  setErrors={setErrors}
                  formData={formData}
                  setFormData={setFormData}
                />
              </Grid>

              <Stack direction={'row'} alignItems='center'>
                <Typography
                  sx={{
                    minWidth: { xs: '120px', sm: '180px' },
                    fontWeight: 'bold',
                    fontSize: { xs: 12, sm: 15 }
                  }}
                >
                  {'Is Discount'}
                </Typography>
                <Checkbox name='isDiscount' onChange={(e: any) => onChange(e, 'isDiscount', -1)} checked={formData?.isDiscount} />
              </Stack>


              {formData.isDiscount === true ? (
                <Stack direction={'row'} alignItems='center'>
                  <Typography
                    sx={{
                      minWidth: { xs: '130px', sm: '180px' },
                      fontSize: { xs: 12, sm: 15 },
                      fontWeight: 'bold'
                    }}
                  >
                    {'Discount (%)'}
                  </Typography>
                  <InputField
                    name='discount'
                    value={formData?.discount}
                    type='textBox'
                    placeholder={'Enter Discount Percentage'}
                    onChange={(e: any) => onChange(e, 'discount', -1)}
                  />
                </Stack>
              ) : undefined}

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
                <Checkbox name='isFree' onChange={(e: any) => onChange(e, 'isFree', -1)} checked={formData?.isFree} />
              </Stack>

              <Typography
                sx={{
                  minWidth: { xs: '120px', sm: '180px' },
                  fontWeight: 'bold',
                  fontSize: { xs: 12, sm: 15 }
                }}
              >
                {'Description : '} <span style={{ color: 'red' }}>*</span>
              </Typography>
              <Stack direction={'row'} alignItems='center'>
                <Editor formData={formData} setFormData={setFormData} />
              </Stack>

            </AccordionDetails>
          </Accordion>

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
                  {faqFields?.map((faq, index) => (
                    <Stack width='100%' key={index + 1} direction='row' alignItems='center'>
                      <Typography
                        sx={{
                          minWidth: { xs: '130px', sm: '180px' },
                          fontSize: { xs: 13, sm: 15 },
                          fontWeight: 'bold'
                        }}
                      >
                        {index === 0 ? 'Course faq' : ''}
                      </Typography>
                      <Stack width='100%'>
                        <InputField
                          name={'question'}
                          value={faq.question}
                          onChange={(e: any) => onChange(e, 'question', index)}
                          placeholder={'Enter Question'}
                        />
                        <InputField
                          name={'answer'}
                          value={faq.answer}
                          onChange={(e: any) => onChange(e, 'answer', index)}
                          placeholder={'Enter Answer'}
                          multiline
                        />
                      </Stack>
                      {index !== 0 ? (
                        <IconButton onClick={() => handleRemoveFaq(index)}>
                          <RemoveCircle color='error' />
                        </IconButton>
                      ) : (
                        <IconButton onClick={handleAddFaq}>
                          <AddBox color='success' />
                        </IconButton>
                      )}
                    </Stack>
                  ))}
                </Grid>
                <Grid item xs={12}>
                  {requirementFields?.map((req, index) => (
                    <Stack width='100%' key={index + 1} direction='row' alignItems='center'>
                      <Typography
                        sx={{
                          minWidth: { xs: '130px', sm: '180px' },
                          fontSize: { xs: 13, sm: 15 },
                          fontWeight: 'bold'
                        }}
                      >
                        {index === 0 ? 'Requirement' : ''}
                      </Typography>
                      <Stack width='100%'>
                        <InputField
                          name={'requirement'}
                          value={req}
                          onChange={(e: any) => onChange(e, 'requirement', index)}
                          placeholder={'Enter Requirement'}
                        />
                      </Stack>
                      {index !== 0 ? (
                        <IconButton onClick={() => handleRemoveRequirement(index)}>
                          <RemoveCircle color='error' />
                        </IconButton>
                      ) : (
                        <IconButton onClick={handleAddRequirement}>
                          <AddBox color='success' />
                        </IconButton>
                      )}
                    </Stack>
                  ))}
                </Grid>
                <Grid item xs={12}>
                  {descriptionFields?.map((req, index) => (
                    <Stack width='100%' key={index + 1} direction='row' alignItems='center'>
                      <Typography
                        sx={{
                          minWidth: { xs: '130px', sm: '180px' },
                          fontSize: { xs: 13, sm: 15 },
                          fontWeight: 'bold'
                        }}
                      >
                        {index === 0 ? 'Short Description' : ''}
                      </Typography>
                      <Stack width='100%'>
                        <InputField
                          name={'courseDescriptions'}
                          value={req}
                          onChange={(e: any) => onChange(e, 'courseDescriptions', index)}
                          placeholder={'Enter Description'}
                        />
                      </Stack>
                      {index !== 0 ? (
                        <IconButton onClick={() => handleRemoveDescription(index)}>
                          <RemoveCircle color='error' />
                        </IconButton>
                      ) : (
                        <IconButton onClick={handleAddDescription}>
                          <AddBox color='success' />
                        </IconButton>
                      )}
                    </Stack>
                  ))}
                </Grid>
                <Grid item xs={12}>
                  <Stack direction={'row'} alignItems='center'>
                    <Typography
                      sx={{
                        minWidth: { xs: '130px', sm: '180px' },
                        fontSize: { xs: 12, sm: 15 },
                        fontWeight: 'bold'
                      }}
                    >
                      {'Expiry period'}
                    </Typography>
                    <RadioGroup
                      items={[
                        { label: 'Life Time', value: 'Life Time' },
                        { label: 'Limited Time', value: 'Limited Time' }
                      ]}
                      name={'expiryPeriod'}
                      value={formData?.expiryPeriod}
                      onChange={e => onChange(e, 'expiryPeriod', -1)}
                    />
                  </Stack>
                </Grid>
                {formData?.expiryPeriod === 'Limited Time' ? (
                  <Grid item xs={12}>
                    <Stack direction={'row'} alignItems='center'>
                      <Typography
                        sx={{
                          minWidth: { xs: '130px', sm: '180px' },
                          fontSize: { xs: 12, sm: 15 },
                          fontWeight: 'bold'
                        }}
                      >
                        {'Limited Months'}
                      </Typography>
                      <InputField
                        name='limitedMonths'
                        value={formData?.limitedMonths}
                        type='textBox'
                        placeholder={'Enter Limited Months'}
                        onChange={e => onChange(e, 'limitedMonths', -1)}
                      />
                    </Stack>
                  </Grid>
                ) : undefined}
                <Grid item xs={12}>
                  <Stack direction={'row'} alignItems='center'>
                    <Typography
                      sx={{
                        minWidth: { xs: '130px', sm: '180px' },
                        fontSize: { xs: 12, sm: 15 },
                        fontWeight: 'bold'
                      }}
                    >
                      {'Meta keywords'}
                    </Typography>
                    <InputField
                      name='metakeywords'
                      value={formData?.metakeywords}
                      type='textBox'
                      placeholder={'Enter Meta keywords'}
                      onChange={(e: any) => onChange(e, 'metakeywords', -1)}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack direction={'row'} alignItems='center'>
                    <Typography
                      sx={{
                        minWidth: { xs: '130px', sm: '180px' },
                        fontSize: { xs: 12, sm: 15 },
                        fontWeight: 'bold'
                      }}
                    >
                      {'Meta description'}
                    </Typography>
                    <InputField
                      name='metaDescription'
                      value={formData?.metaDescription}
                      type='textBox'
                      placeholder={'Enter Meta Description'}
                      onChange={(e: any) => onChange(e, 'metaDescription', -1)}
                    />
                  </Stack>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </>
        <Grid container justifyContent='center' gap={2} alignItems='center'>
          <Button
            onClick={() => router.back()}
            name='Back'
            bgColor={theme.palette.primary.dark}
            color={theme.palette.common.white}
            startIcon={<NavigateBefore />}
          />

          <SaveButton text={id ? 'Update New Account' : 'Confirm New Account'} />
        </Grid>
      </Form>
    </Grid>
  )
}

export default AddNewCourse
