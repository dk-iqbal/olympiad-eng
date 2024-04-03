import React, { useEffect, useState } from 'react'
import { Grid, useTheme, Paper, Box, List } from '@mui/material'
import { CheckBox, Delete } from '@mui/icons-material'
import { toast } from 'react-toastify'
import CustomAutocomplete from 'src/layouts/components/common/Autocomplete'
import InputField from 'src/layouts/components/common/InputField'
import ListItemComponent from 'src/layouts/components/common/ListItem'
import Dialog from 'src/layouts/components/common/Dialog'
import Button from 'src/layouts/components/common/Button'
import {
  deleteFeedback,
  editFeedback,
  getFeedbacksByCourse,
  getFeedbacksByStatus
} from 'src/utils/functions/feedbackFunction'
import { USER_STATUS } from 'src/utils/util'

interface Comment {
  _id: number
  feedbackText: string
  userId: string
  userName: string
  courseId: string
  courseName: string
  status: boolean | string
  rate: number
}

const PendingComments: React.FC = () => {
  const theme = useTheme()
  const [selectedItem, setSelectedItem] = useState<Comment | null>(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)
  const [statusModalOpen, setStatusModalOpen] = useState<boolean>(false)
  const [feedbaks, setFeedbaks] = useState<Comment[]>([])
  const [courseDdl, setCourseDdl] = useState([])
  const [selectedCourse, setSelectedCourse] = useState({ label: '', value: '' })

  const handleOpenDialog = (item: Comment) => {
    setSelectedItem(item)
    setDeleteModalOpen(true)
  }

  const handleStatusDialog = (item: Comment) => {
    setSelectedItem(item)
    setStatusModalOpen(true)
  }

  const onDeleteComment = async (item: any) => {
    try {
      await deleteFeedback(item.id)
      toast.success('Comment Delete Successfully')
      getPendingFeedbacks()
    } catch (error) {
      toast.success('Something went wrong')
    }
    setDeleteModalOpen(false)
  }

  const onApprovedComment = async (item: any) => {
    try {
      const payload = {
        status: item.status === 'Approved' ? false : true
      }
      await editFeedback(item.id, payload as any)
      toast.success('Status Approved Successfully')
      getPendingFeedbacks()
    } catch (error) {
      toast.success('Something went wrong')
    }
    setStatusModalOpen(false)
  }

  const handleClickActions = (index: number, actions: any, item: any) => {
    switch (index) {
      case 0:
        handleStatusDialog(item)
        break
      case 1:
        handleOpenDialog(item)
        break
      default:
        break
    }
  }

  const getPendingFeedbacks = async () => {
    const res = await getFeedbacksByStatus(USER_STATUS.INACTIVE)
    setFeedbaks(res as any)
    setCourseDdl(res?.map(item => ({ label: item?.courseName, value: item?.courseId })) as any)
  }

  useEffect(() => {
    if (selectedCourse.value) {
      getFeedbacksByCourse(selectedCourse.value).then(res =>
        setFeedbaks(res.filter(item => item?.status === false) as any)
      )
    } else {
      getPendingFeedbacks()
    }
  }, [selectedCourse])

  return (
    <>
      <Paper sx={{ mt: { xs: 1, sm: 2 } }}>
        <Grid container spacing={1} p={1} justifyContent={'center'} alignItems={'center'}>
          {/* Course Status */}
          <Grid item xs={12} md={5}>
            <CustomAutocomplete
              onChange={e => {
                if (e?.value) {
                  setSelectedCourse(e)
                } else {
                  setSelectedCourse({ label: '', value: '' })
                }
              }}
              options={courseDdl || []}
              value={selectedCourse}
              placeholder='Select Course/Model Test'
            />
          </Grid>

          {/* Course Price */}
          <Grid item xs={8} md={5} mt={-0.5}>
            <InputField
              name={'search'}
              value={''}
              type={'text'}
              onChange={e => {
                console.log(e)
              }}
              placeholder={'Search By Name or Mobile'}
            />
          </Grid>

          <Grid item xs={4} md={2}>
            <Button
              name='Filter'
              type='submit'
              bgColor={theme.palette.primary.dark}
              color={theme.palette.common.white}
            />
          </Grid>
        </Grid>

        {feedbaks?.length > 0 ? (
          <Box
            sx={{
              maxHeight: `auto`,
              overflowX: 'hidden',
              overflowY: 'auto',
              padding: '5px'
            }}
          >
            <List
              sx={{
                bgcolor: 'inherit',
                mb: 1,
                mt: { xs: 1, md: 1 },
                '& ul': { padding: 0 }
              }}
            >
              {feedbaks?.map((comment, index) => {
                const modifyObject = {
                  id: comment._id,
                  name: comment.userName,
                  status: comment.status ? 'Approved' : 'Pending',
                  details: [
                    { label: 'Comments', value: comment.feedbackText },
                    { label: 'Course', value: comment.courseName }
                  ]
                }
                const actions = [
                  { icon: <CheckBox color='success' />, name: 'Approve' },
                  {
                    icon: <Delete color='error' />,
                    name: 'Delete'
                  }
                ]

                return (
                  <ListItemComponent
                    key={index}
                    index={index}
                    item={modifyObject}
                    notShowDetails={true}
                    actions={actions}
                    handleClickActions={handleClickActions}
                  />
                )
              })}
            </List>
          </Box>
        ) : (
          <></>
        )}
      </Paper>

      <Dialog
        open={deleteModalOpen}
        setOpen={setDeleteModalOpen}
        loading={false}
        headertext='Delete Comment'
        actionButtonName='Confirm'
        bodyText={`Are you sure? You want to Delete comment`}
        handleChange={() => onDeleteComment(selectedItem as Comment)}
      />
      <Dialog
        open={statusModalOpen}
        setOpen={setStatusModalOpen}
        loading={false}
        headertext='Comment Status'
        actionButtonName='Confirm'
        bodyText={`Are you sure? You want to approved comment`}
        handleChange={() => onApprovedComment(selectedItem as Comment)}
      />
    </>
  )
}

export default PendingComments
