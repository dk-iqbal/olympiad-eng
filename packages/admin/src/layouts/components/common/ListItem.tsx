import React, { useState, MouseEvent } from 'react'
import { AccessTime, MoreVert as Action, Close, PendingActions, Person } from '@mui/icons-material'
import {
  Backdrop,
  Box,
  Chip,
  Grid,
  ListItem,
  ListItemText,
  SpeedDial,
  SpeedDialAction,
  Stack,
  Tooltip,
  Typography
} from '@mui/material'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'

interface ActionItem {
  name: string
  icon: React.ReactNode
}

interface ListItemComponentProps {
  actions?: ActionItem[]
  item: {
    id: number | string
    name: string
    course?: string
    section?: string | number
    lesson?: string | number
    status?: string | boolean
    details?: { label: string; value: string }[]
  };
  index: number
  handleClickActions: (index: number, actions: ActionItem[], item: ListItemComponentProps['item']) => void
  navigationPage?: string
  notShowDetails?: boolean
}

const ListItemComponent: React.FC<ListItemComponentProps> = props => {
  const { actions, item, index, handleClickActions, navigationPage, notShowDetails } = props
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const onListItemClick = () => {
    !notShowDetails &&
      router.push({
        pathname: navigationPage ? navigationPage : `/course/manage-courses/details`,
        query: { id: item.id, courseName: item.name }
      })
  }

  const handleSpeedDialClick = (event: MouseEvent) => {
    event.stopPropagation()
    setOpen(!open)
  }

  const handleSpeedDialClose = () => {
    setOpen(false)
  }

  return (
    <Box key={1} sx={{ maxWidth: '100%', zIndex: -1 }}>
      <ListItem
        onClick={() => onListItemClick()}
        id={`Course-${index}`}
        sx={{
          backgroundColor: 'white',
          '&:hover': {
            backgroundColor: '#D4E2EF',
            color: 'black'
          }
        }}
        secondaryAction={
          actions &&
          actions?.length > 0 && (
            <>
              <SpeedDial
                onClose={handleSpeedDialClose}
                onClick={handleSpeedDialClick}
                open={open}
                FabProps={{
                  color: 'inherit',
                  sx: {
                    marginRight: -2,
                    float: 'right',
                    color: 'inherit',
                    backgroundColor: 'inherit',
                    boxShadow: 'none',
                    display: { xs: 'block', md: 'none', sm: 'block' }
                  }
                }}
                ariaLabel=''
                icon={<Action />}
                openIcon={<Close />}
                direction='left'
              >
                <Backdrop
                  open={true}
                  sx={{
                    background: 'background.paper',
                    borderRadius: 10,
                    backgroundColor: 'whitesmoke',
                    zIndex: 999
                  }}
                />
                {actions?.length > 0 &&
                  actions?.map((action, i) => (
                    <SpeedDialAction
                      key={i + 1}
                      icon={action.icon}
                      sx={{
                        width: { xs: 30, sm: 35 },
                        height: 10,
                        marginRight: { xs: 0, sm: 1 }
                      }}
                      tooltipTitle={action.name}
                      onClick={e => {
                        e.stopPropagation()
                        e.preventDefault()
                        handleClickActions(i, actions, item)
                        setOpen(false)
                      }}
                    />
                  ))}
              </SpeedDial>

              <Stack
                direction='row'
                sx={{
                  mb: 6,
                  mr: -2,
                  justifyContent: 'space-between',
                  display: { xs: 'none', md: 'block', sm: 'none' }
                }}
              >
                {actions?.length > 0 &&
                  actions?.map((act, i) => (
                    <Tooltip key={act.name} title={act.name} placement='top-end' sx={{ mb: 2 }}>
                      <Button
                        key={i}
                        onClick={e => {
                          e.stopPropagation()
                          e.preventDefault()
                          handleClickActions(i, actions, item)
                        }}
                      >
                        {act.icon}
                      </Button>
                    </Tooltip>
                  ))}
              </Stack>
            </>
          )
        }
        divider
        selected
      >
        <ListItemText sx={{ cursor: 'pointer' }}>
          <Grid container direction='row' justifyContent='center' alignItems='center' sx={{ ml: -1 }}>
            <Grid container direction='row' item xs={12}>
              <Typography
                sx={{
                  fontSize: { xs: 12, sm: 13 },
                  fontWeight: 'bold',
                  mr: 1
                }}
              >
                <span>{index + 1}.</span> {item.name}
              </Typography>
              <Stack direction='row' gap={{ xs: 0, sm: 1, md: 1 }}>
                {item.course && (
                  <Typography
                    sx={{
                      fontSize: { xs: 12, sm: 13 },
                      mr: 1
                    }}
                  >
                    Course: <b>{item.course}</b>
                  </Typography>
                )}
              </Stack>
              <Stack direction='row' gap={{ xs: 0, sm: 1, md: 1 }}>
                {item.section && (
                  <Chip
                    color='primary'
                    icon={<Person />}
                    variant='filled'
                    label={`Section: ${item.section}`}
                    size='small'
                  />
                )}
                {item.lesson && (
                  <Chip
                    icon={<PendingActions />}
                    variant='filled'
                    label={`Lesson: ${item.lesson}`}
                    size='small'
                    color='secondary'
                  />
                )}
                {item?.status && (
                  <Chip
                    color={item?.status === 'Active' || item.status === 'Approved' ? 'success' : 'info'}
                    icon={<AccessTime />}
                    label={item?.status}
                    size='small'
                  />
                )}
              </Stack>
            </Grid>
            <Grid direction='row' item xs={12}>
              <Stack
                direction='row'
                mt={1}
                gap={{ xs: 0.8, sm: 2 }}
                justifyContent={'flex-start'}
                sx={{ flexWrap: 'wrap'}}
              >
                {item?.details &&
                  item?.details?.length > 0 &&
                  item?.details?.map((detail, i) => (
                    <Typography sx={{ fontSize: { xs: 10, sm: 12 } }} key={i}>
                      {detail?.label}: <b> {detail?.value}</b>
                    </Typography>
                  ))}
              </Stack>
            </Grid>
          </Grid>
        </ListItemText>
      </ListItem>
    </Box>
  )
}

export default ListItemComponent
