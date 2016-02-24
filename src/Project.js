import React from 'react';
import TodoList from './TodoList';
import jQuery from 'jquery';

class Project extends React.Component {
  constructor() {
    super();

    this.state = {
      project: {}
    };
  }

  componentDidMount() {
    this.findProject();
  }

  findProject() {
    console.log("getting project...");

    let projectId = this.props.params.projectId;

    let component = this;

    jQuery.getJSON("https://afternoon-atoll-31464.herokuapp.com/projects/" + projectId + ".json", function(data) {
      console.log(data);

      component.setState({
        project: data.project
      });
    });
  }

  render() {
    return (
      <div className="project">
        <h1>{this.state.project.title}</h1>
        <h2 className="text-muted">{this.state.project.description}</h2>
        <TodoList projectId={this.props.params.projectId} />
      </div>
    );
  }
}

export default Project;
