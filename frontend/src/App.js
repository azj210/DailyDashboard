import React, { useState } from 'react';
import { Link, Route, useHistory } from 'react-router-dom';
import DataService from './services/UserServices';

import Navbar from './components/Navbar';
import HomeRedirect from './components/HomeRedirect'

import Home from './components/Home';
import SignUp from './components/SignUp';
import Login from './components/Login';

import AccountHome from './components/AccountHome';
import Logout from './components/Logout';
import AccountDetails from './components/AccountDetails';
import DashboardDetails from './components/DashboardDetails';

function App() {
  
  const history = useHistory();

  const [authenticated, setAuthenticated] = useState();

  const changeAuth = () => {
    setAuthenticated(!authenticated);
  };

  async function checkAuth() {
    const token = localStorage.getItem('decisionMakerToken');
    if (token) {
      const response = await DataService.checkToken(token)
        .catch(e => {
          console.log(e);
        });
      if (response.data.success === 1) {
        console.log("success");
        setAuthenticated(true);
      } else {
        console.log("failed");
        setAuthenticated(false);
      }
    } else {
      console.log("no token");
      setAuthenticated(false);
    }
  };

  return (
    <div>
      <Navbar authenticated={authenticated} authenticate={changeAuth}/>

      <Route path="/" exact={true} component={() => <Home checkAuth={checkAuth} authenticated={authenticated} />} />
      <Route path="/account" exact={true} component={() => <AccountHome checkAuth={checkAuth} authenticated={authenticated} />} />
      <Route path="/sign-up" component={() => <SignUp authenticated={authenticated} />} />
      <Route path="/login" component={() => <Login authenticate={changeAuth} authenticated={authenticated} />} />
      <Route path="/logout" component={Logout} />
      <Route path="/account-details" component={() => <AccountDetails checkAuth={checkAuth} authenticated={authenticated} />} />
      <Route path="/dashboard-details" component={() => <DashboardDetails checkAuth={checkAuth} authenticated={authenticated} />} />
    </div>
  );
};

export default App;
