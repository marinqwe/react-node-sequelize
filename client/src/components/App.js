import React, { Component } from 'react';
import { getData, removeData, createData, updateData } from './Axios';
import './App.css';
import Form from './InputForm';

class App extends Component {
    state = {
        todos: [],
        inputValue: '',
        updating: false,
        idToUpdate: 0
    };

    onValueChange = e => {
        let value = e.target.value;
        this.setState(() => ({
            inputValue: value
        }));
    };
    componentDidMount() {
        const url = 'todos';
        getData(url)
            .then(res => {
                this.setState(() => ({
                    todos: res
                }));
            })
            .catch(err => {
                if (err) throw err;
            });
    }
    addTodo = e => {
        e.preventDefault();
        const url = 'todos/add';
        let inputValue = this.state.inputValue;
        createData(url, inputValue)
            .then(() => getData('todos'))
            .then(res => {
                this.setState(() => ({
                    todos: res,
                    inputValue: ''
                }));
            });
    };
    removeTodo = id => {
        const url = `todos/delete/${id}`;
        const todoId = id;
        removeData(url, todoId)
            .then(() => getData('todos'))
            .then(res => {
                this.setState(() => ({
                    todos: res
                }));
            });
    };
    updateTodo = () => {
        const url = 'todos/update';
        const { inputValue, idToUpdate } = this.state;
        updateData(url, inputValue, idToUpdate)
            .then(res => {
                console.log('updateData: ', res);
                return getData('todos');
            })
            .then(res => {
                this.setState(() => ({
                    todos: res
                }));
            })
            .catch(err => {
                if (err) throw err;
            });
    };

    render() {
        const { todos, inputValue, updating } = this.state;
        return (
            <div className="App">
                <h1 className="header">Title 123</h1>
                {!updating ? (
                    <div>
                        <Form
                            onSubmit={this.addTodo}
                            value={inputValue}
                            onChange={this.onValueChange}
                            updating={updating}
                        />
                        {todos.map(todo => (
                            <div className="todo" key={todo.todoId}>
                                <div>{todo.todoName}</div>
                                <div>
                                    <button
                                        onClick={() => {
                                            this.setState(() => ({
                                                updating: true,
                                                idToUpdate: todo.todoId
                                            }));
                                        }}
                                    >
                                        Change
                                    </button>
                                    <button onClick={() => this.removeTodo(todo.todoId)}>Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <Form
                        onSubmit={this.updateTodo}
                        value={inputValue}
                        onChange={this.onValueChange}
                        updating={updating}
                    />
                )}
            </div>
        );
    }
}

export default App;
