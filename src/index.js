import './stylesheets/components.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';
import App from './App';
import Project from './Project';
import ProjectList from './ProjectList';
import PageNotFound from './PageNotFound';

// Declarative route configuration (could also load this config lazily
// instead, all you really need is a single root route, you don't need to
// colocate the entire config).
ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={ProjectList} />
      <Route path="/projects/:projectId" component={Project}/>
      {/*<Route path="about" component={About}/>
        <Route path="users" component={Users}>
        <Route path="/user/:userId" component={User}/>
        </Route>
      */}
      <Route path="*" component={PageNotFound}/>
    </Route>
  </Router>
), document.getElementById('root'));
