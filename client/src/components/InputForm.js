import React from 'react';
import '../styles/App.css';
import '../styles/button.css';

const InputForm = ({ onSubmit, onChange, value, isUpdating }) => (
    <div className="form-container">
        <form className="form" onSubmit={e => onSubmit(e)}>
            <input
                className="input"
                name="todoName"
                placeholder="Add a todo..."
                type="text"
                onChange={onChange}
                value={!isUpdating ? value.todoName : ''}
            />
            <input
                className="input"
                name="todoDesc"
                placeholder="Add a description..."
                type="text"
                onChange={onChange}
                value={!isUpdating ? value.todoDesc : ''}
            />
            <button className="button">Add</button>
        </form>
    </div>
);

export default InputForm;
