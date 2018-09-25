import React from 'react';
import '../styles/App.css';


const ErrorPage = ({ error, message }) => (
    <div className="background">
        <div className="content-container">
            <div className="errorMsg">{message}</div>
            <div className="error">{error.toString()}</div>
        </div>
    </div>
);

export default ErrorPage;
