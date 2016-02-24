import React from 'react';

class App extends React.Component {
  render() {
    return (
      <div className="container master">
        {this.props.children}
      </div>
    );
  }
}

export default App;
