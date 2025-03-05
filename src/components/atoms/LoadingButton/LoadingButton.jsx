import React from 'react';
import { CircularProgress } from '@mui/material';
import {useLoading} from '../../hooks';
import './styles.css';

export const LoadingButton = ({ onClick, className, children, btnType, ...props }) => {
  const { loading, setLoadingTrue, setLoadingFalse } = useLoading();

  const buttonClass = `load-btn button`;

  const handleClick = async (event) => {
    setLoadingTrue();
    try {
      await onClick(event);
    } finally {
      setLoadingFalse();
    }
  };

  return (
    <button
      className={`${buttonClass} ${className || ''}`}
      onClick={handleClick}
      disabled={loading}
      {...props}
    >
      {loading ?  <CircularProgress color='inherit' size={20} /> : children}
    </button>
  );
};
