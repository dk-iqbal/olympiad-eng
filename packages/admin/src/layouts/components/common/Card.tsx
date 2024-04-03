import React, { ReactNode } from 'react'
import { Card, CardContent, Typography, Grid } from '@mui/material'

interface CardWithIconProps {
  href?: string
  icon?: ReactNode
  count?: number | string
  label: string
}

const CardWithIcon: React.FC<CardWithIconProps> = ({ icon, count, label }) => {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card
        elevation={0}
        sx={{
          margin: 0,
          height: '100%',
          borderLeft: '1px solid #e0e0e0',
          borderBottom: '1px solid #e0e0e0',
          '& .css-1rnf5mj-MuiCardContent-root': {
            padding: '10px',
            textAlign: 'center'
          }
        }}
      >
        <CardContent sx={{ justifyContent: 'center', textAlign: 'center' }}>
          {icon}
          <Typography variant='h5' component='div'>
            <span>{count}</span>
          </Typography>
          <Typography variant='body2' color='text.secondary' sx={{ marginTop: 1 }}>
            {label}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default CardWithIcon
