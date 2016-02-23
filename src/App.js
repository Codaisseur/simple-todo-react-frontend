import React from 'react';
import TodoList from './Todolist';

class App extends React.Component {
    render() {
        return (
            <div className="container">
              <h1>Todo List</h1>
              <TodoList />
            </div>
        );
    }
}

export default App;
