import { Box, Card, Grid, Paper, Typography } from '@mui/material'
import React from 'react'

type FormProps = {
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void
  className?: string
  heading?: string
  children: React.ReactNode
}
const Form = (props: FormProps) => {
  const { onSubmit, children, heading, className, ...rest } = props

  return (
    <Box width={'100%'} ml={-0.5}>
      <Grid container justifyContent='center' alignContent='center'>
        <Card
          sx={{
            maxWidth: { md: '60%', sm: '80%', xs: 'auto' },
            flexGrow: 1,
            marginTop: { sm: 1, md: 2 }
          }}
          elevation={10}
          variant='elevation'
        >
          <Paper
            square
            sx={{
              display: 'flex',
              alignItems: 'center',
              textAlign: 'center',
              justifyContent: 'center',
              height: 50,
              pl: 2
            }}
          >
            <Typography variant='h6' fontSize={{ md: 20, sm: 18, xs: 16 }} textAlign='center' fontWeight='bold'>
              {heading}
            </Typography>
          </Paper>
          <form style={{ padding: 10 }} autoComplete='off' onSubmit={onSubmit} className={className} {...rest}>
            {children}
          </form>
        </Card>
      </Grid>
    </Box>
  )
}

export default Form
