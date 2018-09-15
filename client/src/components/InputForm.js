import React from 'react';
import './App.css';

const InputForm = props => (
    <form className="form" onSubmit={e => props.onSubmit(e)}>
        <input
            className="input"
            placeholder={!props.updating ? "Add a todo..." : "Update todo..."}
            type="text"
            onChange={props.onChange}
            value={props.value}
        />
        {props.updating ? <button>Update</button> : <button>Add</button>}
    </form>
);

export default InputForm;
