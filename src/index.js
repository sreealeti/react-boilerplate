import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from "history";
import registerServiceWorker from './registerServiceWorker';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import './styles/index.css';

import Layout from './components/Layout';
import store from './config/store';
import indexRoutes from "./routes/index";
import jwt_decode from 'jwt-decode';
import setAuthToken from './utilities/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authentication';

if(localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login'
  }
}

var hist = createBrowserHistory();

ReactDOM.render(
  <Provider store = { store }>
    <Layout>
    <Router history={hist}>
      <Switch>
        {indexRoutes.map((prop, key) => {
          return <Route path={prop.path} key={key} component={prop.component} />;
        })}
      </Switch>
    </Router>
  </Layout>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
