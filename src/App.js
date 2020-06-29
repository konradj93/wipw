import React, {useEffect, useState} from 'react';
import { Switch, Route } from 'react-router';
import Login from './pages/login/login';
import Confirm from "./pages/confirm/Confirm";
import Dashboard from "./pages/dashboard/dashboard";
import PrivateRoute from './components/router/privateRoute';
import NotFound from './pages/404';
import './App.scss';
import AWS from 'aws-sdk/global';

import {AuthorizationService} from './lib/security/authorization.service';
import {authCfg, defaultRegion} from './env'

import { UserContextProvider } from './context/userContext';
import SignUp from "./pages/signup/SignUp";

AWS.config.region = defaultRegion;

const auth = new AuthorizationService(authCfg, AWS.config);

const App = _ => {
  const [isAuth, setAuthorization] = useState(false);
  const setAuth = (auth) => {
    setAuthorization(auth)
  }
  useEffect(() => {
      auth.refreshSession()
        .then(user => {setAuthorization(true)})
        .catch()

  }, [])
  return <UserContextProvider value={{
    isAuth,
    setAuth
  }}>
    <Switch>
      <Route path='/login' component={Login} />
      <Route path='/signup' component={SignUp} />
      <Route path='/confirm' component={Confirm} />
      <Route
        path='/dashboard'
        component={Dashboard}
      />
      <PrivateRoute
        path='/dashboard'
        component={Dashboard}
      />
      <Route component={NotFound}/>
    </Switch>
  </UserContextProvider>;

};

export default App;
