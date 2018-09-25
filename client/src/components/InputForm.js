import React from 'react';
import '../styles/App.css';
import '../styles/button.css';

const InputForm = ({ onSubmit, isUpdating, onChange, value }) => (
    <form className="form" onSubmit={e => onSubmit(e)}>
        <input
            className="input"
            placeholder={!isUpdating ? 'Add a todo...' : 'Update todo...'}
            type="text"
            onChange={onChange}
            value={value}
        />
        {isUpdating ? <button className="button">Update</button> : <button className="button">Add</button>}
    </form>
);

export default InputForm;
