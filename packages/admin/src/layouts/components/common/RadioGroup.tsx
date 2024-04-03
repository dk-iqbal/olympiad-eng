import React from 'react'
import { FormControl, Radio, RadioGroup as MUIRadioGroup, FormControlLabel } from '@mui/material'

interface RadioGroupProps {
  row?: boolean
  name?: string
  value?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  items: { label: string; value: string }[]
}

const RadioGroup: React.FC<RadioGroupProps> = ({ row = true, name, value, onChange, items }) => {
  return (
    <FormControl margin='dense' component='fieldset'>
      <MUIRadioGroup row={row} name={name} value={value} onChange={onChange}>
        {items.map(item => (
          <FormControlLabel
            key={item.value}
            label={item.label}
            value={item.value}
            control={<Radio color='primary' />}
          />
        ))}
      </MUIRadioGroup>
    </FormControl>
  )
}

export default RadioGroup
