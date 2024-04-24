import React, { useState, useRef, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';

interface AutoCompleteSelectProps {
  id: string;
  name: string;
  label: string;
  options: any[] | null | undefined;
  onSelect?: (selectedOption: string) => void;
  observerRef: React.MutableRefObject<any>
}

const AutoCompleteSelect: React.FC<AutoCompleteSelectProps> = ({
  options,
  onSelect,
  label
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
    const value = event.target.value;
    setInputValue(value);
    setOpen(true);
  };

  const handleMenuItemClick = (option: any) => {
    setInputValue(option);
    setOpen(false);
    onSelect && onSelect(option);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
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
        label={label}
        value={inputValue}
        onChange={handleInputChange}
        variant="standard"
        fullWidth
        InputProps={{
          onFocus: handleInputChange,
        }}
      />
      {open && (
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
          {options && options.map((option) => (
            <MenuItem
              key={option.id}
              onClick={() => handleMenuItemClick(option.name)}
            >
              {option.name}
            </MenuItem>
          ))}
        </Paper>
      )}
    </Box>
  );
};

export default AutoCompleteSelect;