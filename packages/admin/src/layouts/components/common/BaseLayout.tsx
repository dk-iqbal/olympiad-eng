import { Box, Grid, Paper, Typography } from '@mui/material'
import React from 'react'

type LayoutProps = {
  heading?: string
  isActionButton?: JSX.Element | undefined
  children: React.ReactNode
}

const BaseLayout = (props: LayoutProps) => {
  const { children, heading, isActionButton } = props

  return (
    <Box sx={{ ml: -1, mt: -2 }}>
      <Grid container sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Paper
          square
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            minWidth: '100%',
            top: 80,
            minHeight: { xs: 35, sm: 50 },
            zIndex: 1,
            pl: 2
          }}
        >
          <Typography variant='h6' fontSize={{ md: 20, sm: 18, xs: 16 }} textAlign='left' fontWeight='bold' textTransform={'uppercase'}>
            {heading}
          </Typography>
          {isActionButton}
        </Paper>

        {children}
      </Grid>
    </Box>
  )
}

export default BaseLayout
