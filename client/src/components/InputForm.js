import React from 'react';
import './App.css';

const InputForm = ({ onSubmit, updating, onChange, value}) => (
    <form className="form" onSubmit={e => onSubmit(e)}>
        <input
            className="input"
            placeholder={!updating ? "Add a todo..." : "Update todo..."}
            type="text"
            onChange={onChange}
            value={value}
        />
        {updating ? <button>Update</button> : <button>Add</button>}
    </form>
);

export default InputForm;
