import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, InputAdornment, SxProps, TextField, Theme } from '@mui/material'
import { ChangeEvent, ReactNode } from 'react'
import React from 'react'

type InputModeType = 'text' | 'none' | 'search' | 'numeric' | 'tel' | 'url' | 'email' | 'decimal' | undefined
interface InputFieldProps {
  className?: string
  inputMode?: InputModeType
  label?: string
  placeholder?: string
  name: string
  value?: string | number | any
  error?: string
  size?: 'small' | 'medium'
  showPassword?: boolean
  password?: boolean
  type?: string
  disabled?: boolean
  multiline?: boolean
  minValue?: number
  rows?: number
  maxValue?: number
  startIcon?: ReactNode | undefined
  sx?: SxProps<Theme>
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  onClick?: () => void
}

const InputField = ({
  label,
  placeholder,
  name,
  value,
  disabled,
  showPassword,
  inputMode,
  className,
  startIcon,
  error,
  multiline,
  type,
  minValue,
  rows,
  maxValue,
  password,
  sx,
  size,
  onChange,
  onClick,
  ...rest
}: InputFieldProps) => {
  return (
    <TextField
      variant='outlined'
      size={size ? size : 'small'}
      margin='dense'
      autoComplete='off'
      fullWidth
      disabled={disabled}
      multiline={multiline}
      className={className}
      type={showPassword ? 'text' : type}
      placeholder={placeholder}
      label={label}
      name={name}
      rows={rows}
      value={value}
      onChange={onChange}
      sx={sx}
      InputProps={{
        inputMode: inputMode ? inputMode : 'text',
        inputProps: { min: minValue ? minValue : 0, max: maxValue ? maxValue : 100 },
        endAdornment: password && (
          <InputAdornment position='end'>
            <IconButton aria-label='toggle password visibility' onClick={onClick} edge='end'>
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
        startAdornment: startIcon ? (
          <InputAdornment sx={{ ml: -1, mr: 0.5 }} position='start'>
            {startIcon}
          </InputAdornment>
        ) : undefined
      }}
      onFocus={e => e.target.select()}
      {...rest}
      {...(error && { error: true, helperText: error })}
    />
  )
}
export default InputField
