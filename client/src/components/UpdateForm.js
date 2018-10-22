import React from 'react';
import '../styles/button.css';

const UpdateForm = ({ onSubmit, onChange, value }) => (
    <form className="form" onSubmit={e => onSubmit(e)}>
        <input 
            className="input" 
            name="todoName"
            placeholder="Name update..." 
            type="text" 
            onChange={onChange} 
            value={value.todoName} 
        />
        <input
            className="input"
            name="todoDesc"
            placeholder="Description update..."
            type="text"
            onChange={onChange}
            value={value.todoDesc}
        />
        <button className="button">Update</button>
    </form>
);

export default UpdateForm;
