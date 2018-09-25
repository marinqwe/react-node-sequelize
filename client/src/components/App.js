import React, { Component } from 'react';
import { getData, removeData, createData, updateData } from './Axios';
import '../styles/App.css';
import Form from './InputForm';
import ListItem from './ListItem';
import Error from './Error';
import Spinner from './Spinner';

class App extends Component {
    state = {
        todos: [],
        inputValue: '',
        isUpdating: false,
        isLoading: true,
        idToUpdate: 0,
        error: '',
        dbErr: ''
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
                    todos: res,
                    isLoading: false
                }));
            })
            .catch(error => {
                this.setState(() => ({
                    error,
                    isLoading: false
                }));
            });
    }
    addTodo = e => {
        e.preventDefault();
        const url = 'todos/add';
        let inputValue = this.state.inputValue;
        if (!inputValue || inputValue.trim() === '') {
            this.setState(() => ({
                error: 'Please enter a value to add a todo...'
            }));
        } else {
            createData(url, inputValue)
                .then(() => getData('todos'))
                .then(res => {
                    this.setState(() => ({
                        todos: res,
                        inputValue: ''
                    }));
                })
                .catch(error => {
                    this.setState(() => ({
                        error
                    }));
                });
        }
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
            })
            .catch(error => {
                this.setState(() => ({
                    error
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
            .catch(error => {
                this.setState(() => ({
                    error
                }));
            });
    };
    onUpdating = id => {
        this.setState(() => ({
            isUpdating: true,
            idToUpdate: id
        }));
    };

    render() {
        const { todos, inputValue, isUpdating, isLoading, error } = this.state;
        const errMsg = 'Soemthing went wrong.';

        if (error) {
            return <Error message={errMsg} error={error} />;
        }
        if (isLoading) {
            return <Spinner />;
        }
        return (
            <div className="App">
                <h1 className="header">Title 123</h1>
                {!isUpdating ? (
                    <div>
                        <Form
                            onSubmit={this.addTodo}
                            value={inputValue}
                            onChange={this.onValueChange}
                            isUpdating={isUpdating}
                        />
                        {todos.map(todo => (
                            <ListItem
                                key={todo.todoId}
                                value={todo}
                                onUpdating={this.onUpdating}
                                removeTodo={this.removeTodo}
                            />
                        ))}
                    </div>
                ) : (
                    <Form
                        onSubmit={this.updateTodo}
                        value={inputValue}
                        onChange={this.onValueChange}
                        isUpdating={isUpdating}
                    />
                )}
            </div>
        );
    }
}

export default App;
