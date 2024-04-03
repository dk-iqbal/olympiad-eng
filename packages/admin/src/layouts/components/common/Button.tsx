import { Box, Button as MUIButton, useTheme } from '@mui/material'
import { ReactNode } from 'react'
import React from 'react'

const Button = (props: {
  loading?: boolean
  name?: string
  type?: 'button' | 'submit' | 'reset'
  startIcon?: ReactNode
  endIcon?: ReactNode
  onClick?: (e: React.MouseEvent) => void
  bgColor?: string
  color?: string
  sx?: object
  disabled?: boolean
  variant?: 'contained' | 'outlined'
}) => {
  const { loading, disabled, name, type, startIcon, endIcon, onClick, color, bgColor, variant, sx } = props
  const theme = useTheme()

  return (
    <Box sx={{ position: 'relative' }}>
      <MUIButton
        type={type ? type : 'button'}
        size='small'
        variant={variant ? variant : 'contained'}
        startIcon={startIcon}
        endIcon={endIcon}
        onClick={onClick}
        sx={{
          ...sx,
          minWidth: 'max-content',
          width: '100%',

          // minHeight: '-webkit-fill-available',
          fontSize: { xs: 12, sm: 15 },
          backgroundColor: bgColor,
          color: color ? color : theme.palette.text.primary,
          textTransform: 'none',
          [theme.breakpoints.up('xs')]: {
            marginRight: 1
          },
          '&:hover': {
            backgroundColor: bgColor,
            color: color
          }
        }}
        disabled={disabled || loading}
      >
        {name}
      </MUIButton>
    </Box>
  )
}

export default Button
