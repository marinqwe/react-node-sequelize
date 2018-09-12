import React, { Component } from 'react';
import {getData} from './Axios';

class App extends Component {
  state = {
    todos: [],
    inputValue: ''
  };

  componentDidMount() {
    const url = 'todos';
    getData(url).then(res => {
      this.setState(() => ({
        todos: res
      }));
    })
    .catch(err => {
      if(err) throw err;
    })
  }

  render() {
    const {todos} = this.state;
    console.log(todos)
    return (
      <div className="App">
        <header>
          <h1>Yesterday u said tomorrow</h1>
        </header>
        {todos.map(todo => <p>todo</p>)}
      </div>
    );
  }
}

export default App;
