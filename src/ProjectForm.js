import React from 'react';
import jQuery from 'jquery';

class ProjectForm extends React.Component {
  constructor() {
    super();
  }

  createProject(event) {
    event.preventDefault();

    let component = this;
    let title = this.refs.newProjectInput.value;
    let description = this.refs.newProjectDescription.value;
    let newProject = {
      id: null,
      title: title,
      description: description
    };

    jQuery.ajax({
      type: "POST",
      url: "https://afternoon-atoll-31464.herokuapp.com/projects.json",
      data: JSON.stringify({
          project: newProject
      }),
      contentType: "application/json",
      dataType: "json"
    })
      .done(function(data) {
        component.props.onChange();
        component.refs.newProjectInput.value = "";
        component.refs.newProjectDescription.value = "";
      })

      .fail(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="well">
        <form onSubmit={this.createProject.bind(this)}>
          <h3>Create a new project</h3>
          <div className="row">
            <div className="form-group col-xs-9">
              <input type="text" className="form-control" ref="newProjectInput" placeholder="What will the project be named?" />
            </div>
            <div className="form-group col-xs-3">
              <button type="submit" className="btn btn-primary">Create Project</button>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-xs-9">
              <textarea className="form-control" ref="newProjectDescription" placeholder="Describe the project.."></textarea>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default ProjectForm;
