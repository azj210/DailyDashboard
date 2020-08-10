import React, { useState } from 'react';
import { Route, useHistory } from 'react-router-dom';
import DataService from './services/UserServices';

import Navbar from './components/Navbar';
import HomeRedirect from './components/HomeRedirect'

import Home from './components/Home';
import SignUp from './components/SignUp';
import Login from './components/Login';

import Logout from './components/Logout';
import AccountDetails from './components/AccountDetails';
import DashboardDetails from './components/DashboardDetails';
import DeleteAccount from './components/DeleteAccount';
import ErrorPage from './components/ErrorPage';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';

function App() {
  
  const history = useHistory();

  const [authenticated, setAuthenticated] = useState("loading");

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
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
        localStorage.removeItem("decisionMakerToken");
        localStorage.removeItem("decisionMakerUID");
        history.go();
      }
    } else {
      setAuthenticated(false);
    }
  };

  return (
    <div>
      <Navbar authenticated={authenticated} authenticate={changeAuth}/>

      {authenticated === "loading" ?
      <Route path="/" exact={true} component={() => <HomeRedirect checkAuth={checkAuth}/>} /> :
      <Route path="/" exact={true} component={() => <Home checkAuth={checkAuth} authenticated={authenticated} />} />}

      <Route path="/sign-up" component={() => <SignUp checkAuth={checkAuth} authenticated={authenticated} />} />
      <Route path="/login" component={() => <Login checkAuth={checkAuth} authenticated={authenticated} />} />
      <Route path="/logout" component={Logout} />
      <Route path="/account" component={() => <AccountDetails checkAuth={checkAuth} authenticated={authenticated} />} />
      <Route path="/dashboard-details" component={() => <DashboardDetails checkAuth={checkAuth} authenticated={authenticated} />} />
      <Route path="/delete" component={() => <DeleteAccount checkAuth={checkAuth} authenticated={authenticated} />} />
      <Route path="/error" component={ErrorPage} />
      <Route path="/forgot-password" component={() => <ForgotPassword checkAuth={checkAuth} authenticated={authenticated} />} />
      <Route path="/reset/:token" component={(routerProps) => <ResetPassword routerProps={routerProps} checkAuth={checkAuth} authenticated={authenticated} />} />
    </div>
  );
};

export default App;