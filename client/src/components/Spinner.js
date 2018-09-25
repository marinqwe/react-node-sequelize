import React from 'react';
import '../styles/loader.css';

const Spinner = () => (
    <div className="loader">
        <div>Loading...</div>
        <div className="lds-circle" />
    </div>
);

export default Spinner;
