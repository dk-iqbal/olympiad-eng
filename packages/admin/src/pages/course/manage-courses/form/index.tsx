import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import {
  Grid,
  Stack,
  Typography,
  useTheme
} from '@mui/material'
import { NavigateBefore } from '@mui/icons-material'
import { toast } from 'react-toastify'
import baseAxios from 'src/services/config'
import { COURSE_API } from 'src/services/api-end-points'
import { COURSE_TYPE, USER_STATUS, validateFiled } from 'src/utils/util'
import CustomForm from 'src/layouts/components/common/CommonForm'
import InputField from 'src/layouts/components/common/InputField'
import Button from 'src/layouts/components/common/Button'
import SaveButton from 'src/layouts/components/common/SaveButton'
import Form from 'src/layouts/components/common/Form'
import { useRouter } from 'next/router'
import { isString } from 'lodash'
import Checkbox from 'src/layouts/components/common/Checkbox'
import { getCategoriesByStatus } from 'src/utils/functions/categoryFunction'

const initialValidationData = {
  name: '',
  price: '',
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
  courseType: 'MODEL_TEST',
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
  const { id, selectedItem } = router.query;
  const theme = useTheme()

  const [formData, setFormData] = useState(initialData)
  const [errors, setErrors] = useState(initialValidationData)
  const [faqFields, setFaqFields] = useState([{ question: '', answer: '' }])
  const [requirementFields, setRequirementFields] = useState([''])
  const [descriptionFields, setDescriptionFields] = useState([''])
  const [categories, setCategories] = useState([])
  const userData = JSON.parse(localStorage?.getItem('userData') as string) || ''

  const parseSelectedItem = isString(selectedItem) ? JSON.parse(selectedItem) : selectedItem

  /*
  1. Validate Form fields
  2. TODOS: we need common validation function for all forms
*/
  const validateForm = () => {
    const courseTitleError = validateFiled(formData?.['name'])
    const priceError = validateFiled(formData?.['price'])

    setErrors({
      name: courseTitleError,
      price: priceError
    })

    return !courseTitleError && !priceError
  }

  /*
1. handle change for all fields
*/

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target

    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }))

    setErrors({
      ...errors,
      [name]: undefined
    })
  }

  // const onChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string, index: number) => {
  //   const { name, value, checked, type } = e.target
  //   if (fieldName && fieldName === 'requirement') {
  //     const newFields = [...requirementFields]
  //     newFields[index] = value
  //     setRequirementFields(newFields)
  //   } else if (fieldName && fieldName === 'courseDescriptions') {
  //     const newFields = [...descriptionFields]
  //     newFields[index] = value
  //     setDescriptionFields(newFields)
  //   } else if (fieldName && fieldName !== 'requirement' && type !== 'checkbox') {
  //     const newFaqFields = [...(faqFields as any)]
  //     newFaqFields[index][fieldName] = value
  //     setFaqFields(newFaqFields)
  //   } else {
  //     setFormData(prevData => ({
  //       ...prevData,
  //       [name]: type === 'checkbox' ? checked : value
  //     }))
  //   }
  //   setErrors({
  //     ...errors,
  //     [name]: undefined
  //   })
  // }

  /*
  1. handle change for Checkbox
  */

  // const handleAddFaq = () => {
  //   setFaqFields([...faqFields, { question: '', answer: '' }])
  // }

  // const handleRemoveFaq = (index: number) => {
  //   const newFaqFields = [...faqFields]
  //   newFaqFields.splice(index, 1)
  //   setFaqFields(newFaqFields)
  // }

  // const handleAddRequirement = () => {
  //   setRequirementFields([...requirementFields, ''])
  // }

  // const handleRemoveRequirement = (index: number) => {
  //   const newRequirementFields = [...requirementFields]
  //   newRequirementFields.splice(index, 1)
  //   setRequirementFields(newRequirementFields)
  // }

  // const handleAddDescription = () => {
  //   setDescriptionFields([...descriptionFields, ''])
  // }

  // const handleRemoveDescription = (index: number) => {
  //   const newRequirementFields = [...descriptionFields]
  //   newRequirementFields.splice(index, 1)
  //   setDescriptionFields(newRequirementFields)
  // }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors = validateForm()
    if (newErrors) {
      const payload = {
        name: formData?.name,
        description: formData?.description,
        price: Number(formData?.price),
        categoryId: formData?.category?.['value'],
        categoryName: formData?.category.label,
        instructorId: userData?.id,
        instructorName: userData?.fullName,
        isDiscount: formData?.isDiscount,
        isFree: formData?.isFree,
        discount: Number(formData?.discount),
        courseProvider: formData?.courseProvider.value,
        courseOverview: formData?.courseOverview,
        status: formData?.status ? formData?.status : 'Pending',
        courseType: COURSE_TYPE.MODEL_TEST,
        organizationId: `${userData?.fullName}_org`,
        info: JSON.stringify({
          faqQuestions: faqFields,
          requirement: requirementFields,
          expiryPeriod: formData?.expiryPeriod,
          metakeywords: formData?.metakeywords,
          metaDescription: formData?.metaDescription,
          limitedMonths: formData?.limitedMonths,
          courseDescriptions: descriptionFields
        })
      }
      console.log(payload)
      try {
        if (id) {
          await updatedNewCourse(payload, id as string)
        } else {
          await createNewCourse({ ...payload })
        }
        router.push('/course/manage-courses/list')
        toast.success(`Course ${id ? 'Updated' : 'Created'} Successfully`)
      } catch (error) {
        console.log(error)
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
      name: 'name',
      label: 'Olympiad Name',
      placeholder: 'Enter Olympiad Name',
      inputMode: 'text',
      type: 'textbox',
      required: true
    },
    {
      name: 'price',
      label: 'Olympiad Price',
      placeholder: 'Enter price',
      inputMode: 'text',
      type: 'textbox',
      required: true
    }
  ]

  useEffect(() => {
    getCategoriesByStatus(USER_STATUS.ACTIVE).then((res: any) => {
      setCategories(res?.map((c: any) => ({ label: c.name, value: c._id })))
    })
  }, [])

  useEffect(() => {
    if (selectedItem) {
      const parseInfo = isString(parseSelectedItem?.info)
        ? JSON.parse(parseSelectedItem?.info)
        : parseSelectedItem?.info

      setFormData({
        ...formData,
        name: parseSelectedItem?.name || '',
        description: parseSelectedItem?.description || '',
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
        limitedMonths: parseInfo?.limitedMonths || ''
      })

      setRequirementFields(parseInfo?.requirement || [''])
      setFaqFields(parseInfo?.faqQuestions || [{ question: '', answer: '' }])
      setDescriptionFields(parseInfo?.courseDescriptions || [''])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem])

  return (
    <Grid container justifyContent='center' alignContent='center'>
      <Form onSubmit={onSubmit} heading={id ? 'Update Olympiad Form' : 'Create Olympiad Form'}>
        <>

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
            <Checkbox
              name='isDiscount'
              onChange={onChange}
              checked={formData?.isDiscount}
            />
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
                onChange={onChange}
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
              {'Is Mock Test'}
            </Typography>
            <Checkbox name='isFree' onChange={onChange} checked={formData?.isFree} />
          </Stack>


          {/* <Accordion defaultExpanded={false} TransitionProps={{ unmountOnExit: true }}>
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
                        {index === 0 ? 'Olympiad faq' : ''}
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
              </Grid>
            </AccordionDetails>
          </Accordion> */}
        </>
        <Grid container justifyContent='center' gap={2} alignItems='center'>
          <Button
            onClick={() => router.back()}
            name='Back'
            bgColor={theme.palette.primary.dark}
            color={theme.palette.common.white}
            startIcon={<NavigateBefore />}
          />

          <SaveButton text={id ? 'Update Upadate Olympiad' : 'Confirm New Olympiad'} />
        </Grid>
      </Form>
    </Grid>
  )
}

export default AddNewCourse
