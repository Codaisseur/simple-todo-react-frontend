import React from 'react';
import jQuery from 'jquery';
import TodoItem from './TodoItem';

class TodoList extends React.Component {
  constructor() {
    super();

    this.state = {
      todos: []
    };
  }

  componentDidMount() {
    let component = this;

    jQuery.getJSON("https://afternoon-atoll-31464.herokuapp.com/todos", function(data) {
      console.log(data);

      component.setState({
        todos: data.todos
      });
    });
  }

  render() {
    return (
      <ul className="todo-list">
        {this.state.todos.map(function(todo, i) {
          return(
            <TodoItem key={todo.id} id={todo.id} title={todo.title} completed={todo.completed} createdAt={todo.created_at} updatedAt={todo.updated_at} />
          );
        })}
      </ul>
    );
  }
}

export default TodoList;
