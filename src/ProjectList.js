import React from 'react';
import jQuery from 'jquery';
import ProjectForm from './ProjectForm';
import ProjectItem from './ProjectItem';


class ProjectList extends React.Component {
  constructor() {
    super();

    this.state = {
      projects: []
    };
  }

  reloadProjects(event) {
    let component = this;

    jQuery.getJSON("https://afternoon-atoll-31464.herokuapp.com/projects", function(data) {
      console.log(data);

      component.setState({
        projects: data.projects
      });
    });
  }

  componentDidMount() {
    console.log("componentDidMount");
    this.reloadProjects();
  }

  render() {
    return (
      <div className="project-list">
        <h1>Project List</h1>
        <ul className="project-list">
          {this.state.projects.map(function(project, i) {
            return(
              <ProjectItem key={project.id} id={project.id} title={project.title} description={project.description} createdAt={project.created_at} updatedAt={project.updated_at} onDestroy={this.reloadProjects.bind(this)} />
            );
          }, this)}
        </ul>
        <ProjectForm onChange={this.reloadProjects.bind(this)} />
      </div>
    );
  }
}

export default ProjectList;
