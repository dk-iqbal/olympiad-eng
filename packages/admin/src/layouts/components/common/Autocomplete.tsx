/* eslint-disable @typescript-eslint/no-explicit-any */
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import { useRef } from 'react'
import React from 'react'

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />
const checkedIcon = <CheckBoxIcon fontSize='small' />

type PropsType = {
  options: {
    label: string
    value: string
  }[]
  onChange: (selectedOptions: any) => void
  limitTags?: number
  multiple?: boolean
  disabled?: boolean
  loading?: boolean
  error?: string
  defaultValue?: any
  placeholder?: string
  value?: any
  size?: 'small' | 'medium'
}

const CustomAutocomplete = (props: PropsType) => {
  const ref = useRef()
  const { options, onChange, limitTags, multiple, loading, error, defaultValue, value, placeholder, size, disabled } = props

  return (
    <Autocomplete
      ref={ref}
      fullWidth
      size={size ? size : 'small'}
      loading={loading}
      disabled={disabled}
      multiple={multiple}
      limitTags={limitTags || 2}
      defaultValue={defaultValue}
      value={value ? value : { label: '', value: '' }}
      options={options}
      disableCloseOnSelect={multiple}
      onChange={(_event, value) => {
        onChange(value)
      }}
      getOptionLabel={option => String(option.label)}
      renderOption={
        multiple
          ? (data, option, { selected }) => {
              return (
                <li {...data}>
                  <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
                  {option.label}
                </li>
              )
            }
          : undefined
      }
      sx={{ width: '100%' }}
      renderInput={params => (
        <TextField
          {...params}
          placeholder={placeholder ? placeholder : 'Select'}
          {...(error && { error: true, helperText: error })}
        />
      )}
    />
  )
}

export default CustomAutocomplete
