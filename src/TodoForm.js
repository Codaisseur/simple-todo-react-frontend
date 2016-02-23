import React from 'react';
import jQuery from 'jquery';

class TodoForm extends React.Component {
  constructor() {
    super();
  }

  createTodo(event) {
    event.preventDefault();

    let component = this;
    let title = this.refs.newTodoInput.value;
    let newTodo = {
      id: null,
      title: title,
      completed: false
    };

    jQuery.ajax({
      type: "POST",
      url: "https://afternoon-atoll-31464.herokuapp.com/todos.json",
      data: JSON.stringify({
          todo: newTodo
      }),
      contentType: "application/json",
      dataType: "json"
    })
      .done(function(data) {
        component.props.onChange();
        component.refs.newTodoInput.value = "";
      })

      .fail(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <form onSubmit={this.createTodo.bind(this)}>
        <div className="form-group col-xs-10">
          <input type="text" className="form-control" ref="newTodoInput" placeholder="What needs to be done?" />
        </div>
        <div className="form-group col-xs-2">
          <button type="submit" className="btn btn-primary">Save</button>
        </div>
      </form>
    );
  }
}

export default TodoForm;
