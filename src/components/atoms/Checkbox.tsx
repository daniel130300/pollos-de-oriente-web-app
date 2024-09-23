import * as React from 'react';
import {
  Checkbox as MuiCheckbox,
  CheckboxProps as MuiCheckBoxProps,
  FormControlLabel,
} from '@mui/material';
import { FormikProps } from 'formik';

export interface CheckboxProps extends MuiCheckBoxProps {
  id: string;
  name: string;
  label: string;
  formik?: FormikProps<any>;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  name,
  label,
  checked = false,
  onChange,
  formik,
}) => {
  const checkedValue = formik ? formik.values?.[id] : checked;
  const handleChange = formik ? formik.handleChange : onChange;
  return (
    <FormControlLabel
      control={
        <MuiCheckbox
          id={id}
          name={name}
          checked={checkedValue}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'controlled' }}
          sx={{ pr: 1, pl: 0 }}
        />
      }
      label={label}
    />
  );
};

export default Checkbox;
