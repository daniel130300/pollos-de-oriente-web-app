import React from 'react';
import TextField, { BaseTextFieldProps } from '@mui/material/TextField';
import { FormikProps } from 'formik';

interface InputFieldProps extends BaseTextFieldProps {
  id: string;
  name: string;
  formik?: FormikProps<any>;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputField: React.FC<InputFieldProps> = ({
  id,
  value,
  defaultValue,
  variant = 'standard', 
  label,
  formik,
  error = false,
  helperText,
  onChange,
  ...rest
}) => {
  const formikError = formik?.errors?.[id];
  const inputError = formik ? (formik.touched?.[id] && Boolean(formikError)) : error;
  const inputHelperText = formikError !== undefined ? String(formikError) : helperText;
  const handleChange = formik ? formik.handleChange : onChange;
  const displayValue = formik ? formik.values?.[id] : value;

  return (
    <TextField
      id={id}
      label={label}
      defaultValue={defaultValue}
      variant={variant}
      onChange={handleChange}
      value={displayValue}
      error={inputError}
      helperText={inputHelperText}
      {...rest}
    />
  );
};

export default InputField;