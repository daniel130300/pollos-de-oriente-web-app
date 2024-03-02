import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectProps } from '@mui/material/Select';
import React from 'react';
import FormHelperText from '@mui/material/FormHelperText';

interface SelectItem {
  label: string;
  value: number | string;
}

interface SelectFieldProps extends SelectProps {
  noneOption?: boolean;
  selectItems: SelectItem[]
  helperText: string | false | undefined;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  id,
  name,
  labelId,
  value,
  onChange,
  label,
  noneOption = false,
  selectItems,
  helperText,
  error,
  ...rest
}) => {
  return (
    <FormControl variant="standard" sx={{ minWidth: 120 }} error={error}>
      <InputLabel id={`${id}-label`}>{label}</InputLabel>
      <Select
        labelId={labelId}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        label={label}
        {...rest}
      >
        {noneOption && (
          <MenuItem value="">
            <em>Ninguno</em>
          </MenuItem>
        )}
        {selectItems.map((selectItem) => (
          <MenuItem key={selectItem.label} value={selectItem.value}>{selectItem.label}</MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}

export default SelectField;