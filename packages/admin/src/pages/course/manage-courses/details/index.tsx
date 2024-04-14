import React, { useEffect, useState } from 'react'
import {
  Add,
  Delete,
  Edit,
  MoreVert as Action,
  SmartDisplay,
  Close,
  AddCircle,
  RemoveCircle,
  AddBox,
  BookOnline
} from '@mui/icons-material'
import {
  Box,
  List,
  useTheme,
  useMediaQuery,
  SpeedDial,
  SpeedDialAction,
  Stack,
  Typography,
  Modal,
  IconButton,
  Grid
} from '@mui/material'
import BaseLayout from '../../../../layouts/components/common/BaseLayout'
import Form from 'src/layouts/components/common/Form'
import SaveButton from 'src/layouts/components/common/SaveButton'
import Button from 'src/layouts/components/common/Button'
import Dialog from 'src/layouts/components/common/Dialog'
import InputField from 'src/layouts/components/common/InputField'
import { useRouter } from 'next/router'
import CommonListDetails from '../../../../layouts/components/common/CommonListDetails'
import { validateFiled } from 'src/utils/util'
import { toast } from 'react-toastify'
import CustomCircular from 'src/layouts/components/common/CustomCirlcle'
import {
  createNewSection,
  fetchCourseDetailsByCourseId,
  deleteLessonDetailsById
} from 'src/utils/functions/commonFunctions'
import { getCourseRoutinesByCourseId } from 'src/utils/functions/courseRoutineFunction'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '100%', sm: '60%' },
  bgcolor: 'background.paper',

  // border: "2px solid #000",
  boxShadow: 24
}

const CourseDetails = () => {
  const router = useRouter()
  const theme = useTheme()
  const { id, courseName } = router.query

  const [openItemIndex, setOpenItemIndex] = useState(-1)
  const [openSectionModal, setOpenSectionModal] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState({})
  const [sectionNames, setSectionNames] = useState([{ id: '', sectionName: '' }])
  const [sections, setSections] = useState({ courseName: '', sections: [] })
  const [errors, setErrors] = useState({ sectionName: '' })
  const isSmallDevice = useMediaQuery(theme.breakpoints.down('md'));
  const [routineId, setRoutineId] = useState('')

  const handleSpeedDialClick = (event: any, index: number) => {
    event.stopPropagation()
    setOpenItemIndex(index)
  }

  //#region define functions
  // Function to handle changes in the section name
  const onSectionChange = (index: number, value: string) => {
    const updatedSections = [...sectionNames]
    updatedSections[index].sectionName = value || ''
    setSectionNames(updatedSections)
  }

  // Function to handle removal of a section
  const handleRemoveSection = (index: number) => {
    const updatedSections = [...sectionNames]
    updatedSections.splice(index, 1)
    setSectionNames(updatedSections)
  }

  // Function to handle addition of a new section
  const handleAddSection = () => {
    setSectionNames([...sectionNames, { id: '', sectionName: '' }])
  }

  const validateForm = () => {
    const errors: any = {}
    sectionNames.forEach((sec, index) => {
      const sectionNameError = validateFiled(sec.sectionName)
      if (sectionNameError) {
        errors[`sectionNames[${index}].sectionName`] = sectionNameError
      }
    })
    if (Object.keys(errors).length > 0) {
      return errors
    }

    return null
  }

  /*
  1. On delete function for delete Lesson
*/
  const onDeletelessonDetails = async (item: any) => {
    try {
      const res = await deleteLessonDetailsById(item.id)
      toast.success(res?.message)
      setDeleteModalOpen(false)
    } catch (error) {
      toast.error('Something went wrong!!')
    }
  }

  /*
  1. On Section Save
*/
  const onSectionSave = async (e: React.FormEvent) => {
    e.preventDefault()
    let updatedPayloads: any[] = []
    const newErrors = validateForm()

    if (sectionNames.length > 0 && !newErrors) {
      updatedPayloads = sectionNames.map(sec => ({
        name: sec.sectionName,
        isActive: true,
        courseId: id,
        courseName: courseName
      }))
    }

    if (!newErrors) {
      await createNewSection(updatedPayloads)
      toast.success('Section created successfully')
      setOpenSectionModal(false)
    } else {
      setErrors(newErrors)
    }
  }

  /*
  1. handle clice for all actions
  2. actions is array
*/
  const handleClickActions = (item: any, i: number, actions: any) => {
    if (actions.length > 0) {
      switch (i) {
        case 2: {
          setSelectedItem(item?.selectedItem)
          break
        }
        case 1: {
          setDeleteModalOpen(true)
          setSelectedItem(item?.selectedItem)
          break
        }
        case 0: {
          router.push({
            pathname: 'lesson/form',
            query: {
              id: item?.selectedItem?.sectionId,
              lessonId: item?.id,
              selectedItem: JSON.stringify(item?.selectedItem)
            }
          })
          break
        }
        default:
          break
      }
    }
  }

  const getRoutinesByCourseId = async (courseId: string): Promise<any> => {
    try {
      const response = await getCourseRoutinesByCourseId(courseId);
      setRoutineId(response?._id);
    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    setLoading(false)
    fetchCourseDetailsByCourseId(id as string).then(res => {
      setSections(res)
      setLoading(true)
    })
    getRoutinesByCourseId(id as string)
  }, [id, openSectionModal])

  return (
    <BaseLayout
      heading='Olympiad Details'
      isActionButton={
        <Stack direction={'row'} gap={1}>
          <Button
            name='Routine'
            endIcon={<BookOnline />}
            onClick={() => {
              router.push({
                pathname: `/course/manage-courses/course-routine/form`,
                query: { id: routineId || '', courseId: id, courseName: courseName }
              })
            }}
            bgColor={theme.palette.success.dark}
            color={theme.palette.common.white}
          />
        </Stack>
      }
    >
      {!loading ? (
        <CustomCircular />
      ) : (
        sections &&
        sections?.['sections']?.map((sec: any, secIdx: number) => (
          <>
            <Stack width={'100%'} mt={2} direction={'row'} justifyContent={'flex-end'} alignItems={'center'}>
              {isSmallDevice ? (
                <SpeedDial
                  onClose={event => {
                    event.stopPropagation()
                    setOpenItemIndex(-1)
                  }}
                  onClick={event => {
                    event.stopPropagation()
                    handleSpeedDialClick(event, secIdx)
                  }}
                  open={openItemIndex === secIdx}
                  FabProps={{
                    color: 'inherit',
                    sx: {
                      marginRight: -2,
                      float: 'right',
                      color: 'inherit',
                      backgroundColor: 'inherit',
                      boxShadow: 'none',
                      zIndex: 999
                    }
                  }}
                  ariaLabel=''
                  icon={<Action />}
                  openIcon={<Close />}
                  direction='left'
                >
                  <SpeedDialAction
                    icon={<AddCircle color='success' />}
                    sx={{
                      width: 34,
                      height: 5,
                      marginRight: { xs: 0, sm: 1 },
                      zIndex: 999
                    }}
                    tooltipTitle={'Add Quiz'}
                    onClick={e => {
                      e.stopPropagation()
                      e.preventDefault()
                      setOpenItemIndex(-1)
                      router.push({
                        pathname: '/course/manage-courses/lesson/form',
                        query: { id: sec.id }
                      })
                    }}
                  />
                </SpeedDial>
              ) : (
                <Stack
                  direction='row'
                  sx={{
                    mr: 0,
                    justifyContent: 'space-between'
                  }}
                >
                  <Button
                    name='Add Quiz'
                    startIcon={<Add />}
                    onClick={() =>
                      router.push({
                        pathname: '/course/manage-courses/lesson/form',
                        query: { id: sec.id }
                      })
                    }
                    bgColor={theme.palette.success.dark}
                    color={theme.palette.common.white}
                  />
                </Stack>
              )}
            </Stack>
            
            <List sx={{ width: '100%', mt: 1 }}>
              {sec.lessons?.length > 0 ? (
                sec.lessons?.map((item: any, index: number) => {
                  const updateItem = {
                    id: item.id,
                    listItem: [
                      {
                        label: 'name',
                        value: `Lesson ${index + 1} : ${item.name}`
                      },
                      {
                        label: 'duration',
                        value: `Duration: ${item.duration}`
                      }
                    ],
                    selectedItem: item,

                    avatar: <SmartDisplay />
                  }
                  const actions = [
                    { icon: <Edit color='warning' />, name: 'Edit' },
                    { icon: <Delete color='error' />, name: 'Delete' }
                  ]

                  return (
                    <CommonListDetails
                      key={item.id}
                      item={updateItem}
                      notShowDetails={true}
                      navigatePath='/course/manage-courses/lesson/details'
                      index={index}
                      handleClickActions={handleClickActions}
                      actions={actions}
                    />
                  )
                })
              ) : (
                <Box
                  sx={{
                    textAlign: 'center',
                    p: 2,
                    color: 'red',
                    fontWeight: 'bold',
                    fontSize: 18
                  }}
                >
                  Data Not Found
                </Box>
              )}
            </List>
          </>
        ))
      )}

      <Dialog
        open={deleteModalOpen}
        setOpen={setDeleteModalOpen}
        headertext='Delete Lesson'
        actionButtonName='Confirm'
        bodyText={`Are you sure? You want to Delete this Lesson.`}
        handleChange={() => onDeletelessonDetails(selectedItem)}
      />

      <Modal
        open={openSectionModal}
        onClose={() => setOpenSectionModal(false)}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Form heading='Section Form' onSubmit={onSectionSave}>
            {sectionNames?.map((sec, secIndex) => (
              <Stack direction={'row'} alignItems='center' key={secIndex}>
                <Typography
                  sx={{
                    minWidth: { xs: '130px', sm: '180px' },
                    fontSize: { xs: 13, sm: 15 }
                  }}
                >
                  {'Section Name'}
                </Typography>
                <InputField
                  name={'sectionName'}
                  value={sec.sectionName}
                  type={'text'}
                  onChange={e => onSectionChange(secIndex, e.target.value)}
                  placeholder={'Enter Section Name'}
                  error={(errors as any)[`sectionNames[${secIndex}].sectionName`]}
                />
                {secIndex !== 0 ? (
                  <IconButton onClick={() => handleRemoveSection(secIndex)}>
                    <RemoveCircle color='error' />
                  </IconButton>
                ) : (
                  <IconButton onClick={() => handleAddSection()}>
                    <AddBox color='success' />
                  </IconButton>
                )}
              </Stack>
            ))}
            <Grid container spacing={2} justifyContent={'center'} alignItems={'center'}>
              <Button
                onClick={() => setOpenSectionModal(false)}
                name='Cancel'
                bgColor={theme.palette.primary.dark}
                color={theme.palette.common.white}
              />

              <SaveButton text={'New Section'} />
            </Grid>
          </Form>
        </Box>
      </Modal>
    </BaseLayout>
  )
}

export default CourseDetails
