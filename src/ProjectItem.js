import React from 'react';
import jQuery from 'jquery';
import Project from './Project';
import { Router, Route, Link, browserHistory } from 'react-router';

class ProjectItem extends React.Component {
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
      description: this.props.description,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
      loading: false
    });
  }

  updateTitle(newTitle) {
    console.log(newTitle);
    this.syncState({title: newTitle});
  }

  updateDescription(newDescription) {
    console.log(newDescription);
    this.syncState({description: newDescription});
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
      description: this.state.completed
    }, updatedState);

    this.setState(newState);

    console.log(newState);

    jQuery.ajax({
      type: "PUT",
      url: "https://afternoon-atoll-31464.herokuapp.com/projects/" +  this.props.id + ".json",
      data: JSON.stringify({
          project: newState
      }),
      contentType: "application/json",
      dataType: "json"
    })
      .done(function(data) {
        console.log(data);

        component.setState({
          id: data.project.id,
          title: data.project.title,
          completed: data.project.completed,
          createdAt: data.project.created_at,
          updatedAt: data.project.updated_at
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
    let _classNames = ["project-item"];
    if (this.state.loading) { _classNames.push("loading"); }
    return _classNames.join(" ");
  }

  destroyMe(event) {
    event.preventDefault();
    console.log("Destroy clicked!");

    let component = this;

    jQuery.ajax({
      type: "DELETE",
      url: "https://afternoon-atoll-31464.herokuapp.com/projects/" +  this.props.id + ".json",
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
        <h4><Link to={`/projects/${this.state.id}`}>{this.state.title}</Link></h4>
        <p className="text-muted">{this.state.description}</p>
      </li>
    );
  }
}

export default ProjectItem;
