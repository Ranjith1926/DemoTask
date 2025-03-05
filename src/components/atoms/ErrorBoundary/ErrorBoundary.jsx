import React from 'react';
import './styles.css'

const logErrorToMyService = (error, errorInfo) => {
    console.error('Logged Error:', error, errorInfo);
};

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            hasError: false,
            error: null 
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error }; 
    }

    componentDidCatch(error, errorInfo) {
        logErrorToMyService(error, errorInfo);
        this.setState({ error }); 
    }

    render() {
        if (this.state.hasError) {
            return (
                <div id="error-container">
                    <h1 className="error-heading">Oops! Something went wrong.</h1>
                    {this.state.error && (
                        <p className="error-details">{this.state.error.message}</p>
                    )}
                </div>
            );
        }
        return this.props.children;
    }
}
