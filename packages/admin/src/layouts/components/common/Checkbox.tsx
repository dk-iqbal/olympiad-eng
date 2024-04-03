import React from 'react'
import { Checkbox as MuiCheckbox, FormControlLabel } from '@mui/material'

interface CheckboxProps {
  name: string
  label?: string
  checked?: boolean
  disabled?: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Checkbox: React.FC<CheckboxProps> = ({ name, label = '', checked, disabled = false, onChange, ...rest }) => {
  return (
    <>
      <FormControlLabel
        control={<MuiCheckbox color='primary' disabled={disabled} checked={checked} onChange={onChange} name={name} />}
        label={label}
        {...rest}
      />
    </>
  )
}

export default Checkbox
