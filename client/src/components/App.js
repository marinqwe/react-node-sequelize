import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { getData, removeData, createData, updateData } from '../API';
import '../styles/App.css';
import Form from './InputForm';
import ListItem from './ListItem';
import Error from './Error';
import Spinner from './Spinner';
import Modal from 'react-responsive-modal';

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
        getData()
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
        let inputValue = this.state.inputValue;
        if (!inputValue || inputValue.trim() === '') {
            this.setState(() => ({
                error: 'Please enter a value to add a todo...'
            }));
        } else {
            createData(inputValue)
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
        const todoId = id;
        removeData(todoId)
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
    updateTodo = e => {
        e.preventDefault();
        const { inputValue, idToUpdate } = this.state;
        if (!inputValue || inputValue.trim() === '') {
            this.setState(() => ({
                error: 'Please enter a value to update a todo...'
            }));
        } else {
            updateData(inputValue, idToUpdate)
                .then(res => {
                    this.setState(() => ({
                        todos: res,
                        inputValue: '',
                        isUpdating: false
                    }));
                })
                .catch(error => {
                    this.setState(() => ({
                        error
                    }));
                });
        }
    };
    onUpdating = id => {
        this.setState(() => ({
            isUpdating: true,
            idToUpdate: id
        }));
    };
    closeModal = () => {
        this.setState(() => ({
            isUpdating: false,
            idToUpdate: 0
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
                <Modal open={isUpdating} onClose={this.closeModal}>
                    <h2>Simple modal hey</h2>
                </Modal>
                <h1 className="header">Title 123</h1>
                <div>
                    <Form
                        onSubmit={this.addTodo}
                        value={inputValue}
                        onChange={this.onValueChange}
                        isUpdating={isUpdating}
                    />
                    {todos.map(todo => (
                        <ListItem
                            key={todo.id}
                            value={todo}
                            onUpdating={this.onUpdating}
                            removeTodo={this.removeTodo}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default App;
