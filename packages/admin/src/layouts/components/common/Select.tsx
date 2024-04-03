import React, { ChangeEvent } from 'react'
import { MenuItem, TextField } from '@mui/material'

interface DropdownProps {
  items: { label: string; value: string }[]
  label?: string
  name?: string
  value?: string | number
  error?: string
  defaultValue?: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const Select: React.FC<DropdownProps> = ({ items, label, name = 'Dropdown', value, error, defaultValue, onChange }) => {
  return (
    <TextField
      select
      fullWidth
      size='small'
      label={label}
      name={name}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      error={!!error}
      sx={{
        minWidth: '130px',
        fontSize: 12,
        ml: { xs: 0.5, sm: 1 },
        '& .css-jedpe8-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input': {
          fontSize: { xs: 13, md: 15 },
          padding: 0.8
        }
      }}
      helperText={error}
    >
      {items.map(item => (
        <MenuItem
          sx={{
            // borderRight: index === items.length - 1 ? 'none' : '1px solid grey',
            padding: '7px auto !important',
            direction: { xs: 'column', md: 'row' },
            fontSize: { xs: 13, sm: 15 },
            mt: { xs: -1.5, sm: 0 },
            mb: { xs: -1.5, sm: 0 }
          }}
          key={item.value}
          value={item?.value}
        >
          {item.label}
        </MenuItem>
      ))}
    </TextField>
  )
}

export default Select
