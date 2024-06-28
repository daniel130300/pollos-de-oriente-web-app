import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Loader from '../atoms/Loader';
import { FormHelperText } from '@mui/material';

interface AutoCompleteSelectProps {
  id: string;
  name: string;
  label: string;
  items: any[] | null | undefined;
  selectValue?: string;
  onSelectChange?: (selectedOption: any) => void;
  inputValue: string;
  setInputValue: React.Dispatch<string>;
  loading?: boolean;
  error?: boolean;
  errorMessage?: string;
}

const AutoCompleteSelect: React.FC<AutoCompleteSelectProps> = ({
  id,
  name,
  items,
  inputValue,
  setInputValue,
  onSelectChange,
  label,
  loading = false,
  error = false,
  errorMessage = '',
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    setOpen(true);
  };

  const handleMenuItemClick = (option: any) => {
    setInputValue(option.label);
    setOpen(false);
    onSelectChange && onSelectChange(option);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <Box ref={wrapperRef} sx={{ position: 'relative' }}>
      <TextField
        id={`autocomplete-inputfield-${id}`}
        name={`autocomplete-inputfield-${name}`}
        label={label}
        value={inputValue}
        onChange={handleInputChange}
        variant="standard"
        fullWidth
        error={error}
        onFocus={() => setOpen(true)}
      />
      {open && (
        <>
          {loading ? (
            <Loader />
          ) : (
            <Paper
              square
              sx={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                zIndex: 999,
                maxHeight: '300px',
                overflowY: 'auto',
              }}
            >
              {items &&
                items.map(selectItem => (
                  <MenuItem
                    key={selectItem.label}
                    value={selectItem.value}
                    onClick={() => handleMenuItemClick(selectItem)}
                  >
                    {selectItem.label}
                  </MenuItem>
                ))}
            </Paper>
          )}
        </>
      )}
      {error && <FormHelperText error={error}>{errorMessage}</FormHelperText>}
    </Box>
  );
};

export default AutoCompleteSelect;
