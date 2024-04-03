import React from 'react'
import Box from '@mui/material/Box'
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress'

interface CustomCircularIndeterminateProps extends CircularProgressProps {
  color?: 'primary' | 'inherit' | 'secondary' | 'error' | 'info' | 'success' | 'warning'
}

const CustomCircular: React.FC<CustomCircularIndeterminateProps> = ({ color = 'primary', ...props }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress color={color} {...props} />
    </Box>
  )
}

export default CustomCircular
