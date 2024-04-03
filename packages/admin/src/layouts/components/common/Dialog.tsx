import {
  Box,
  Button,
  CircularProgress,
  Dialog as DialogComponent,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material'
import React from 'react'

interface CommonDialogProps {
  handleChange?: () => void
  headertext?: string
  actionButtonName?: string
  bodyText: string
  loading?: boolean
  open: boolean
  setOpen: (boolean: boolean) => void
}
function Dialog(props: CommonDialogProps) {
  const { handleChange, headertext, actionButtonName, bodyText, loading, open, setOpen } = props

  return (
    <Box>
      <DialogComponent
        open={open}
        onClose={() => setOpen(false)}
        style={{ maxWidth: '100%', maxHeight: '100%' }}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        {headertext && <DialogTitle id='alert-dialog-title'>{headertext}</DialogTitle>}

        <DialogContent>
          <DialogContentText id='alert-dialog-description'>{bodyText}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: 'white' }} color='error' variant='contained' onClick={() => setOpen(false)}>
            Cancel
          </Button>
          {actionButtonName && (
            <Button color='success' variant='contained' onClick={handleChange} autoFocus>
              {loading ? <CircularProgress size={20} /> : actionButtonName ? actionButtonName : 'Proceed'}
            </Button>
          )}
        </DialogActions>
      </DialogComponent>
    </Box>
  )
}

export default Dialog
