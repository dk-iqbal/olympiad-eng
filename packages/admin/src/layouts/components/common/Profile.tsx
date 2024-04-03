import React, { useState } from 'react'
import { Edit, ExpandLessSharp, ExpandMoreSharp, KeyboardArrowDown, KeyboardArrowUp, Phone } from '@mui/icons-material'
import {
  Avatar,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  ButtonGroup,
  Card,
  CardHeader,
  Chip,
  Collapse,
  Grid,
  IconButton,
  Link,
  Paper,
  Stack,
  Typography
} from '@mui/material'
import moment from 'moment'
import Button from './Button'
import { USER_ROLE } from '../../../utils/util'
import { useRouter } from 'next/router'

interface ActionItem {
  label: string
  value?: string
  icon: React.ReactNode
}

// interface FieldItem {
//   label: string
//   value?: string
//   flex?: boolean
// }

interface ProfileProps {
  editNavigate?: string
  activeView?: string
  setActiveView?: (action?: string) => void
  showForm?: boolean
  viewComponent?: React.ReactNode
  actionViews?: ActionItem[]
  userInfo?: any
  actionButtons?: ActionItem[]
  handleClickActions?: (action: ActionItem, index: number) => void
}

const Profile: React.FC<ProfileProps> = props => {
  const {
    editNavigate,
    activeView,
    setActiveView,
    showForm,
    viewComponent,
    actionViews,
    userInfo,
    actionButtons,
    handleClickActions
  } = props
  const router = useRouter()
  const isShowMore = actionViews && actionViews?.length > 0
  const [showMore, setShowMore] = useState(!isShowMore)
  const [showCollapse, setShowCollapse] = useState<
    | {
        item: number
        show: boolean
      }
    | undefined
  >()
  const user = {
    userInfo: {
      role: ''
    }
  }

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    if (setActiveView) {
      setActiveView(newValue)
    }
  }

  return (
    <Grid container justifyContent='center' alignContent='center' ml={-0.5}>
      <Grid item xs={12} zIndex={2} position={'sticky'} top={60}>
        <Card
          sx={{
            bgcolor: 'white',
            display: 'block'
          }}
          variant='elevation'
        >
          <CardHeader
            sx={{ fontSize: 20 }}
            action={
              <ButtonGroup>
                <Stack
                  sx={{
                    marginLeft: 'auto',
                    padding: 1,
                    display: { xs: 'none', sm: 'block', md: 'block' }
                  }}
                >
                  {user?.userInfo?.role === USER_ROLE.ADMIN ? (
                    <></>
                  ) : (
                    <Button
                      color=''
                      startIcon={<Edit color='primary' />}
                      variant='outlined'
                      name='Edit'
                      onClick={() =>
                        router.push({
                          pathname: editNavigate,
                          query: {
                            id: userInfo.selectedItem._id,
                            selectedItem: JSON.stringify(userInfo?.selectedItem)
                          }
                        })
                      }
                      sx={{ mt: 1 }}
                    />
                  )}
                </Stack>
                {/* {user?.userInfo?.role === USER_ROLE.INSTRUCTOR ? (
                  <></>
                ) : (
                  <IconButton
                    color='primary'
                    onClick={() =>
                      router.push(editNavigate ? editNavigate : '', {
                        query: {
                          selectedItem: JSON.stringify(userInfo?.selectedItem)
                        }
                      })
                    }
                    sx={{ display: { xs: 'block', sm: 'none' } }}
                  >
                    <Edit />
                  </IconButton>
                )} */}

                <IconButton
                  color='primary'
                  size='large'
                  sx={{
                    justifyContent: 'flex-end',
                    mr: -2
                  }}
                  onClick={() => setShowMore(!showMore)}
                >
                  {showMore ? <ExpandLessSharp /> : <ExpandMoreSharp />}
                </IconButton>
              </ButtonGroup>
            }
            title={
              <Grid container>
                <Grid item xs={10} md={4}>
                  <Box width='100%' sx={{ display: 'flex', mt: { xs: 0, md: 1 } }}>
                    <Avatar sx={{ fontSize: 40, ml: -1.5, mr: 1, mt: -0.7 }} />
                    <Stack direction='column' mr={-1}>
                      <Typography
                        variant='h2'
                        sx={{
                          fontSize: { xs: 13, sm: 16 },
                          color: 'black'
                        }}
                      >
                        {userInfo && userInfo?.basicInfo?.name}
                      </Typography>
                      <Typography sx={{ fontSize: { xs: 11, sm: 13, md: 14 }, mr: 1 }}>
                        updated : {moment(userInfo && userInfo?.basicInfo.updatedDate).format('MMM DD, YYYY HH:mm')}
                      </Typography>
                    </Stack>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} direction={'row'} mt={1.5}>
                  <Stack direction='row' justifyContent={'space-between'} mr={editNavigate ? -10 : -5}>
                    <Box display='flex'>
                      <Typography sx={{ pr: 1, fontSize: { xs: 12, sm: 14 } }}>{`${'Org'} : `}</Typography>
                      <Typography
                        sx={{
                          color: 'black',
                          maxWidth: '120px',
                          fontSize: { xs: 12, sm: 14 }
                        }}
                      >
                        {userInfo && userInfo?.basicInfo.id}
                      </Typography>
                    </Box>

                    <Chip
                      color='success'
                      icon={<Phone />}
                      label={
                        <Link
                          underline='none'
                          color={'white'}
                          href={`tel:${userInfo && userInfo?.basicInfo.mobile}`}
                          sx={{
                            '&:hover': {
                              color: 'whitesmoke'
                            },
                            fontSize: { xs: 11, sm: 14 }
                          }}
                        >
                          {userInfo && userInfo?.basicInfo.mobile}
                        </Link>
                      }
                      size='small'
                    />
                  </Stack>
                </Grid>
              </Grid>
            }
          />
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card
          sx={{
            bgcolor: 'white'
          }}
          variant='elevation'
        >
          <Collapse in={showMore} timeout='auto' unmountOnExit>
            <Box
              sx={{
                display: { xs: 'flex', md: 'flex' },
                flexWrap: 'wrap',
                width: '100%',
                pt: 1,
                pl: 0.5
              }}
            >
              {userInfo?.details?.map((field: any, index: number) => (
                <Grid
                  item
                  xs={12}
                  md={6}
                  lg={4}
                  key={index + 1}
                  sx={{
                    display: showCollapse?.item === index && showCollapse.show ? 'block' : 'flex',
                    p: 1,
                    pr: 1.5,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px solid #e0e0e0'
                  }}
                >
                  {field.flex ? (
                    <>
                      <Stack direction='row' alignItems={'center'}>
                        <Typography
                          sx={{
                            pr: 0.7,
                            color: '#757575',
                            minWidth: '33%',
                            fontSize: { xs: 12, sm: 14 }
                          }}
                        >{`${field.label}:  `}</Typography>
                        {Array.isArray(field.value) ? (
                          <IconButton
                            onClick={() =>
                              setShowCollapse({
                                item: index,
                                show: !showCollapse?.show
                              })
                            }
                            color='secondary'
                            sx={{ justifyContent: 'flex-end' }}
                          >
                            {showCollapse?.item === index && showCollapse.show ? (
                              <KeyboardArrowUp />
                            ) : (
                              <KeyboardArrowDown />
                            )}
                          </IconButton>
                        ) : null}
                      </Stack>

                      {showCollapse?.item === index && showCollapse.show && Array.isArray(field.value)
                        ? field.value?.map((d: any, i: number) => (
                            <Stack key={i} display={'block'}>
                              <Typography
                                sx={{
                                  textAlign: 'left',
                                  fontSize: { xs: 12, sm: 14 }
                                }}
                                key={d.label}
                              >{`${d.label} - ${d.value}`}</Typography>
                            </Stack>
                          ))
                        : null}
                    </>
                  ) : (
                    <>
                      <Typography
                        sx={{
                          pr: 0.7,
                          color: '#757575',
                          minWidth: '30%',
                          fontSize: { xs: 12, sm: 14 }
                        }}
                      >{`${field.label}:  `}</Typography>

                      <Typography
                        sx={{
                          fontWeight: 'bold',
                          textAlign: 'right',
                          fontSize: { xs: 12, sm: 14 }
                        }}
                      >
                        {field?.value}
                      </Typography>
                    </>
                  )}
                </Grid>
              ))}
            </Box>
          </Collapse>
        </Card>
      </Grid>

      {actionButtons && actionButtons?.length > 0 && (
        <Grid item xs={12} display={'flex'}>
          {actionButtons?.map((action, index) => {
            return (
              <Stack key={index} p={1}>
                <Button
                  color=''
                  startIcon={action.icon}
                  variant='outlined'
                  name={action.label}
                  onClick={() => {
                    if (handleClickActions) {
                      handleClickActions(action, index)
                    }
                  }}
                />
              </Stack>
            )
          })}
        </Grid>
      )}

      {activeView && (
        <Grid item xs={12}>
          <Card sx={{ mx: { sm: 1 }, mt: { xs: 1 } }}>
            <BottomNavigation showLabels value={activeView} onChange={handleChange}>
              {actionViews?.map((action, index) => {
                return showForm ? (
                  <BottomNavigationAction key={index} label={action.label} value={activeView} icon={action.icon} />
                ) : (
                  <BottomNavigationAction key={index} label={action.label} value={action.value} icon={action.icon} />
                )
              })}
            </BottomNavigation>

            <Paper sx={{ pl: 1, py: 1 }} elevation={3}>
              {viewComponent}
            </Paper>
          </Card>
        </Grid>
      )}
    </Grid>
  )
}

export default Profile
