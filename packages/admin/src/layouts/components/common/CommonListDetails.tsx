import React, { useState, MouseEvent } from 'react'
import { MoreVert as Action, Call, Close, Person } from '@mui/icons-material'
import {
  Avatar,
  Backdrop,
  Button,
  Chip,
  Grid,
  Link,
  ListItem,
  ListItemAvatar,
  SpeedDial,
  SpeedDialAction,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'
import { useRouter } from 'next/router'

interface ActionItem {
  name: string
  icon: React.ReactNode
  disabled?: boolean
}

interface ListItemComponentProps {
  item: {
    id?: string | number
    avatar?: React.ReactNode
    listItem?: { label: string; value: string }[]
    selectedItem?: any
  }
  index: number
  navigatePath?: string
  actions?: ActionItem[]
  handleClickActions: (item: ListItemComponentProps['item'], actionIndex: number, actions: ActionItem[]) => void
  notShowDetails?: boolean
}

const CommonListDetails: React.FC<ListItemComponentProps> = props => {
  const { item, index, actions, handleClickActions, notShowDetails, navigatePath } = props

  const router = useRouter()
  const theme = useTheme()
  const [openItemIndex, setOpenItemIndex] = useState(-1)
  const isSmallDevice = useMediaQuery(theme.breakpoints.down('md'))

  const handleSpeedDialClick = (event: MouseEvent, index: number) => {
    event.stopPropagation()
    setOpenItemIndex(index)
  }

  return (
    <ListItem
      id={`component-${item.id}`}
      key={item.id}
      onClick={() => {
        !notShowDetails
          ? router.push({
              pathname: navigatePath,
              query: {
                id: item.id,
                selectedItem: JSON.stringify(item?.selectedItem)
              }
            })
          : ''
      }}
      sx={{
        marginTop: 0.5,
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: '#D4E2EF',
          color: 'black'
        }
      }}
      secondaryAction={
        actions && (
          <>
            {isSmallDevice ? (
              <SpeedDial
                onClose={event => {
                  event.stopPropagation()
                  setOpenItemIndex(-1)
                }}
                onClick={event => {
                  event.stopPropagation()
                  handleSpeedDialClick(event, index)
                }}
                open={openItemIndex === index}
                FabProps={{
                  color: 'inherit',
                  sx: {
                    marginRight: -2,
                    float: 'right',
                    color: 'inherit',
                    backgroundColor: 'inherit',
                    boxShadow: 'none'
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
                {actions?.map((action, i) => (
                  <SpeedDialAction
                    key={i + 1}
                    icon={action.icon}
                    sx={{
                      width: 34,
                      height: 5,
                      marginRight: { xs: 0, sm: 1 }
                    }}
                    tooltipTitle={action.name}
                    onClick={e => {
                      e.stopPropagation()
                      e.preventDefault()
                      handleClickActions(item, i, actions)
                      setOpenItemIndex(-1)
                    }}
                    FabProps={{
                      disabled: action.disabled
                    }}
                  />
                ))}
              </SpeedDial>
            ) : (
              <Stack
                direction='row'
                sx={{
                  mr: -2,
                  justifyContent: 'space-between'
                }}
              >
                {actions.map((act, i) => (
                  <Tooltip key={act.name} title={act.name}>
                    <Button
                      disabled={act.disabled}
                      sx={{ minWidth: { md: '30px', lg: '64px' } }}
                      key={i}
                      onClick={e => {
                        e.stopPropagation()
                        e.preventDefault()
                        handleClickActions(item, i, actions)
                      }}
                    >
                      {act.icon}
                    </Button>
                  </Tooltip>
                ))}
              </Stack>
            )}
          </>
        )
      }
      divider
      selected
    >
      <ListItemAvatar>
        {item.avatar ? item.avatar : <Avatar sizes='small' sx={{ width: 30, height: 30, mr: { xs: -1, sm: 0 } }} />}
      </ListItemAvatar>

      <Grid container>
        <Grid container item xs={12} md={12}>
          {item?.listItem?.map((d, i) => (
            <Grid item xs={6} md={6} key={i} paddingBottom={{ xs: 0.5, sm: 0 }} paddingLeft={{ xs: 1, sm: 0 }} mr={-1}>
              {d.label === 'name' ? (
                <Typography
                  sx={{
                    fontSize: { xs: 12, md: 15 },
                    mr: 1,
                    ml: { xs: -3, sm: 0 }
                  }}
                >
                  {d.value}
                </Typography>
              ) : d.label === 'phone' ? (
                <Chip
                  color='success'
                  sx={{
                    fontSize: { xs: 10, sm: 15 },
                    minWidth: 100
                  }}
                  icon={<Call color='success' sx={{ fontSize: { xs: '14px !important', sm: '18px' } }} />}
                  variant='filled'
                  label={
                    <Link
                      underline='none'
                      color={'white'}
                      href={`tel:${d.value}`}
                      sx={{
                        '&:hover': {
                          color: 'whitesmoke'
                        }
                      }}
                    >
                      {d.value}
                    </Link>
                  }
                  size='small'
                  clickable
                />
              ) : d.label === 'userName' ? (
                <Chip
                  color='primary'
                  sx={{
                    ml: { xs: -3, sm: 0 },
                    fontSize: { xs: 11, md: 14 },
                    minWidth: 160
                  }}
                  icon={<Person color='success' />}
                  variant='outlined'
                  label={d.value}
                  size='small'
                  clickable
                />
              ) : (
                <Typography
                  sx={{
                    fontSize: { xs: 11, md: 14 },
                    mr: 1,
                    ml: { xs: -3, sm: 0 }
                  }}
                >
                  {d.value}
                </Typography>
              )}
            </Grid>
          ))}
        </Grid>
      </Grid>
    </ListItem>
  )
}

export default CommonListDetails
