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
      loading: !!!this.props.id
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
      url: `https://afternoon-atoll-31464.herokuapp.com/projects/${this.props.projectId}/todos/${this.props.id}.json`,
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
        component.props.onChange();
      });
  }

  getClassName() {
    let _classNames = ["todo"];
    if (this.state.loading) { _classNames.push("loading"); }
    if (this.state.completed) { _classNames.push("completed"); }
    return _classNames.join(" ");
  }

  destroyMe(event) {
    event.preventDefault();
    console.log("Destroy clicked!");

    let component = this;

    jQuery.ajax({
      type: "DELETE",
      url: `https://afternoon-atoll-31464.herokuapp.com/projects/${this.props.projectId}/todos/${this.props.id}.json`,
      contentType: "application/json",
      dataType: "json"
    })
      .done(function(data) {
        console.log(data);
        console.log("Deleted! :)");
      })

      .fail(function(error) {
        console.log(error);
      })

      .always(function() {
        component.props.onDestroy();
      });
  }

  render() {
    return(
      <li className={this.getClassName()}>
        <a href="#" className="destroy pull-right" onClick={this.destroyMe.bind(this)}>x</a>
        <input className="toggle" id={this.state.id} type="checkbox" ref="completed" checked={this.state.completed ? "checked" : ""} onChange={this.toggleChecked.bind(this)} />
        <label for={this.state.id}>
          <EditableTextField value={this.state.title} onChange={this.updateTitle.bind(this)} isEditable={!this.state.completed} />
        </label>
      </li>
    );
  }
}

export default TodoItem;
