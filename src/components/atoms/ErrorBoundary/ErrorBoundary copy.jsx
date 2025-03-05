import React, { useEffect } from 'react';
import { useImmer } from 'use-immer';

import './styles.css'

export const ErrorBoundary = ({ children }) => {
    const [state, updateState] = useImmer({
        hasError: false,
        error: null,
        errorInfo: null,
    });

    const logErrorToMyService = (error, errorInfo) => {
        console.error('Error:', error, 'ErrorInfo:', errorInfo);
    };

    useEffect(() => {
        const handleErrors = (error, errorInfo) => {
            updateState(draft => {
                draft.hasError = true;
                draft.error = error;
                draft.errorInfo = errorInfo;
            });
            logErrorToMyService(error, errorInfo);
        };

        const errorListener = (event) => {
            handleErrors(event.error, { componentStack: event.filename });
        };

        window.addEventListener('error', errorListener);

        return () => {
            window.removeEventListener('error', errorListener);
        };
    }, [updateState]);

    if (state.hasError) {
        return (
            <div id="error-container">
                <h1 className="error-heading">Oops! Something went wrong.</h1>
                <div className="error-message">
                    <p className="error-text">{state.error?.toString()}</p>
                    <pre className="error-info">{state.errorInfo?.componentStack}</pre>
                </div>
            </div>
        );
    }

    return children;
};