import React from 'react'
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel } from '@mui/material'

interface CheckboxItem {
  value: string
  label?: string
  checked?: boolean
  disabled?: boolean
}

interface CheckboxGroupProps {
  groupName?: string
  items: CheckboxItem[]
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    item: { label?: string; value?: string; checked?: boolean }
  ) => void
  className?: string
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ groupName, items, onChange }) => {
  return (
    <FormControl component='fieldset' margin='dense'>
      <FormLabel component='legend'>{groupName}</FormLabel>
      <FormGroup row>
        {items.map(item => (
          <FormControlLabel
            disabled={item.disabled}
            key={item.value}
            control={<Checkbox color='primary' checked={item.checked} onChange={e => onChange(e, item)} />}
            label={item.label}
          />
        ))}
      </FormGroup>
    </FormControl>
  )
}

export default CheckboxGroup
