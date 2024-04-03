import { Save } from '@mui/icons-material'
import { Box, Button, CircularProgress, useTheme } from '@mui/material'
import { green } from '@mui/material/colors'
import React from 'react'

const SaveButton = (props: { loading?: boolean; text?: string; onClick?: () => void }) => {
  const { loading, text, onClick } = props
  const theme = useTheme()

  return (
    <Box sx={{ position: 'relative' }}>
      <Button
        type='submit'
        size='small'
        variant='contained'
        color='inherit'
        startIcon={<Save />}
        onClick={onClick}
        sx={{
          margin: 3,
          border: 'none',
          minWidth: { xs: '105px', sm: '120px' },
          minHeight: { xs: '35px', sm: '40px' },
          fontSize: { xs: 12, sm: 15 },
          backgroundColor: '#62AD2D',
          color: '#FFFFFF',
          textTransform: 'none',
          [theme.breakpoints.up('xs')]: {
            marginRight: 0
          },
          '&:hover': {
            backgroundColor: '#62AD2D',
            color: '#FFFFFF',
            border: 'none'
          }
        }}
        disabled={loading}
      >
        {text ? text : 'Save'}
      </Button>
      {loading && (
        <CircularProgress
          size={24}
          sx={{
            color: green[500],
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: -12,
            marginLeft: -12
          }}
        />
      )}
    </Box>
  )
}

export default SaveButton
