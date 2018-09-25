import React from 'react';
import '../styles/App.css';

const ListItem = ({ value: todo, onUpdating, removeTodo }) => (
    <div className="todo">
        <div>{todo.todoName}</div>
        <div>
            <button onClick={() => onUpdating(todo.todoId)}>Change</button>
            <button onClick={() => removeTodo(todo.todoId)}>Remove</button>
        </div>
    </div>
);

export default ListItem;
