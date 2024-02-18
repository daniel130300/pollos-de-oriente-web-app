import React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';

export const InputField: React.FC<TextFieldProps> = ({
  error,
  id,
  defaultValue,
  variant = 'standard', 
  label,
  ...rest
}) => {
  return (
    <TextField
      error={error}
      id={id}
      label={label}
      defaultValue={defaultValue}
      variant={variant}
      {...rest}
    />
  );
};

export default InputField;