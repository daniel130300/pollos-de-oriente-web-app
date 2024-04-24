import React, { useState, useRef, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';

interface AutoCompleteSelectProps {
  options: any[] | null | undefined;
  placeholder: string;
  onSelect: (selectedOption: string) => void;
}

const AutoCompleteSelect: React.FC<AutoCompleteSelectProps> = ({
  options,
  placeholder,
  onSelect,
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
    onSelect(option); // Callback to parent component on selection
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
    <div ref={wrapperRef} style={{ position: 'relative', width: '100%' }}>
      <TextField
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        variant="outlined"
        fullWidth
        InputProps={{
          onFocus: handleInputChange,
        }}
      />
      {open && (
        <Paper
          square
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            zIndex: 999,
            maxHeight: '200px',
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
    </div>
  );
};

export default AutoCompleteSelect;