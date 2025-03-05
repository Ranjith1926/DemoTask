// useSnackbar.js
import React from 'react';
import { useState, useCallback } from 'react';
import { Snackbar, SnackbarContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const useSnackbar = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info',
  });

  const showSnackbar = useCallback((message, severity = 'info') => {
    setSnackbar({ open: true, message, severity });
  }, []);

  const handleClose = useCallback(() => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  }, []);

  const SnackbarWrapper = () => (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={6000}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center"
      }}
      onClose={handleClose}
      message={snackbar.message}
      action={
        <IconButton color="inherit" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      }
    >
      <SnackbarContent
        style={{
          backgroundColor: snackbar.severity === 'error' ? 'red' : snackbar.severity === 'success' ? 'green' : 'blue',
        }}
        message={snackbar.message}
      />
    </Snackbar>
  );

  return {
    showSnackbar,
    SnackbarWrapper,
  };
};