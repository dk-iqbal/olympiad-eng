import React from 'react'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'

// import './style/CustomizedSwitches.css';

interface CustomizedSwitchesProps {
  name?: string
  label?: string
  checked?: boolean
  disabled?: boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  size?: 'small' | 'medium'
}

const CustomizedSwitches: React.FC<CustomizedSwitchesProps> = ({
  name,
  label,
  checked,
  disabled = false,
  onChange,
  size
}) => {
  return (
    <FormControlLabel
      style={{ marginLeft: 0, marginRight: 0 }}
      control={
        <Switch
          className='custom-switch'
          disabled={disabled}
          name={name}
          checked={checked}
          onChange={onChange}
          size={size ? size : 'medium'}
        />
      }
      label={label}
    />
  )
}

export default CustomizedSwitches
