import React, { useEffect, useState } from 'react'
import { Grid, useTheme, Paper, Box, List } from '@mui/material'
import { Autorenew } from '@mui/icons-material'
import { toast } from 'react-toastify'
import CustomAutocomplete from 'src/layouts/components/common/Autocomplete'
import InputField from 'src/layouts/components/common/InputField'
import ListItemComponent from 'src/layouts/components/common/ListItem'
import Dialog from 'src/layouts/components/common/Dialog'
import Button from 'src/layouts/components/common/Button'
import { editFeedback, getFeedbacksByCourse, getFeedbacksByStatus } from 'src/utils/functions/feedbackFunction'
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

const ApprovedComments: React.FC = () => {
  const theme = useTheme()
  const [selectedItem, setSelectedItem] = useState<Comment | null>(null)
  const [statusModalOpen, setStatusModalOpen] = useState<boolean>(false)
  const [feedbaks, setFeedbaks] = useState<Comment[]>([])
  const [courseDdl, setCourseDdl] = useState([])
  const [selectedCourse, setSelectedCourse] = useState({ label: '', value: '' })

  const handleStatusDialog = (item: Comment) => {
    setSelectedItem(item)
    setStatusModalOpen(true)
  }

  const onApprovedComment = async (item: any) => {
    try {
      const payload = {
        status: item.status === 'Approved' ? false : true
      }
      await editFeedback(item.id, payload as any)
      toast.success('Status Approved Successfully')
      getApprovedFeedbacks()
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
      default:
        break
    }
  }

  const getApprovedFeedbacks = async () => {
    const res = await getFeedbacksByStatus(USER_STATUS.ACTIVE)
    setFeedbaks(res as any)
    setCourseDdl(res?.map(item => ({ label: item?.courseName, value: item?.courseId })) as any)
  }

  useEffect(() => {
    if (selectedCourse.value) {
      getFeedbacksByCourse(selectedCourse.value).then(res =>
        setFeedbaks(res.filter(item => item?.status === true) as any)
      )
    } else {
      getApprovedFeedbacks()
    }
  }, [selectedCourse])

  return (
    <>
      <Paper sx={{ mt: { xs: 1, sm: 2 } }}>
        <Grid container spacing={1} p={1} justifyContent={'center'} alignItems={'center'}>
          {/* Olympiad Status */}
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
              placeholder='Select Olympiad'
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
                    { label: 'Olympiad', value: comment.courseName }
                  ]
                }
                const actions = [{ icon: <Autorenew color='primary' />, name: 'Pending' }]

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

export default ApprovedComments
