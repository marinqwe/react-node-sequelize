import React from 'react';
import '../styles/App.css';
import '../styles/button.css';

const ListItem = ({ value: todo, onUpdating, removeTodo }) => (
    <div className="todo">
        <div>{todo.todoName}</div>
        <div>
            <button className="todoBtn" onClick={() => onUpdating(todo.todoId)}>Change</button>
            <button className="todoBtn" onClick={() => removeTodo(todo.todoId)}>Remove</button>
        </div>
    </div>
);

export default ListItem;
