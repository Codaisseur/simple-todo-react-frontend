import React from 'react';
import jQuery from 'jquery';
import EditableTextField from './EditableTextField';

class TodoItem extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    this.setState({
      id: this.props.id,
      title: this.props.title,
      completed: this.props.completed,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
      loading: false
    });
  }

  updateTitle(newTitle) {
    console.log(newTitle);
    this.syncState({title: newTitle});
  }

  toggleChecked(event) {
    this.syncState({
      completed: this.refs.completed.checked
    });
  }

  syncState(updatedState) {
    console.log("Syncing state!");

    this.setState({
      loading: true
    });

    let component = this;

    let newState = jQuery.extend({
      id: this.state.id,
      title: this.state.title,
      completed: this.state.completed
    }, updatedState);

    this.setState(newState);

    console.log(newState);

    jQuery.ajax({
      type: "PUT",
      url: "https://afternoon-atoll-31464.herokuapp.com/todos/" +  this.props.id + ".json",
      data: JSON.stringify({
          todo: newState
      }),
      contentType: "application/json",
      dataType: "json"
    })
      .done(function(data) {
        console.log(data);

        component.setState({
          id: data.todo.id,
          title: data.todo.title,
          completed: data.todo.completed,
          createdAt: data.todo.created_at,
          updatedAt: data.todo.updated_at
        });
      })

      .fail(function(error) {
        console.log(error);
      })

      .always(function() {
        component.setState({
          loading: false
        });
      });
  }

  getClassName() {
    let _classNames = ["todo"];
    if (this.state.loading) { _classNames.push("loading"); }
    if (this.state.completed) { _classNames.push("completed"); }
    return _classNames.join(" ");
  }

  render() {
    return(
      <li className={this.getClassName()}>
        <input className="toggle" id={this.state.id} type="checkbox" ref="completed" checked={this.state.completed ? "checked" : ""} onChange={this.toggleChecked.bind(this)} />
        <label for={this.state.id}>
          <EditableTextField value={this.state.title} onChange={this.updateTitle.bind(this)} isEditable={!this.state.completed} />
        </label>
      </li>
    );
  }
}

export default TodoItem;
