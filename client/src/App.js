import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Login from './components/Login';
import Form from './components/Form';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/" component={Login} />
            <PrivateRoute exact path="/view" component={Form} />
            <Redirect to="/404" />
          </Switch>
        </div>
      </BrowserRouter>
    );
  };
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
      localStorage.getItem('jwt') !== null
          ? <Component {...props} />
          : <Redirect to={{
              pathname: '/',
              state: { from: props.location }
          }} />
  )} />
);

export default App;