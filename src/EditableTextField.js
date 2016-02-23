import React from 'react';

class EditableTextField extends React.Component {
  constructor() {
    super();

    this.props = {
      isEditable: true
    };

    this.state = {
      editing: false,
      value: ""
    };
  }

  textChanged(event) {
    console.log(this.refs.input.value);

    this.props.onChange(this.refs.input.value);

    this.setState({
      editing: false
    });
  }

  handleKeyPress(event) {
    if (event.key === "Enter") {
      event.target.blur();
    }
  }

  setEditable(event) {
    if (!this.props.isEditable) {
      return;
    }

    this.setState({
      editing: true
    });
  }

  render() {
    if (this.state.editing) {
      return (
        <input type="text" ref="input" onBlur={this.textChanged.bind(this)} onKeyPress={this.handleKeyPress.bind(this)} defaultValue={this.props.value} />
      );
    } else {
      return(
        <span onClick={this.setEditable.bind(this)}>{this.props.value}</span>
      );
    }
  }
}

export default EditableTextField;
