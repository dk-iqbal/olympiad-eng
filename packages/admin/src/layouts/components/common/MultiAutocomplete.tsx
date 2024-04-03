/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

export type OptionType = {
  label: string;
  value: string;
};

type PropsType = {
  options: OptionType[];
  onChange: (selectedOptions: OptionType[]) => void;
  limitTags?: number;
  multiple?: boolean;
  disabled?: boolean;
  loading?: boolean;
  error?: string;
  defaultValue?: OptionType | null;
  placeholder?: string;
  value?: OptionType[] | null;
  size?: 'small' | 'medium';
};

const MultiAutocomplete = (props: PropsType) => {
  const { options, onChange, limitTags, multiple, loading, error, defaultValue, value, placeholder, size, disabled } = props;
  const ref = useRef<typeof Autocomplete<OptionType, boolean, false, true>>();

  return (
    <Autocomplete
      ref={ref}
      fullWidth
      size={size || 'small'}
      loading={loading}
      disabled={disabled}
      multiple={multiple}
      limitTags={limitTags || 2}
      defaultValue={defaultValue}
      value={value || []}
      options={options}
      disableCloseOnSelect={multiple}
      onChange={(_event, selectedOptions) => {
        onChange(selectedOptions as OptionType[]);
      }}
      getOptionLabel={(option) => String(option.label)}
      renderOption={(data, option, { selected }) => {
        return (
          <li {...data}>
            {multiple && (
              <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
            )}
            {option.label}
          </li>
        );
      }}
      sx={{ width: '100%' }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder || 'Select'}
          {...(error && { error: true, helperText: error })}
        />
      )}
    />
  );
};

export default MultiAutocomplete;
