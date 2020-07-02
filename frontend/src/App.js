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

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      authenticated = true
    };
  }


   changeAuth = () => {
     this.setState((prevState) => ({
        authenticated: !prevState.authenticated
      }));
  };

  checkAuth = async () => {
    const token = localStorage.getItem('decisionMakerToken');
    if (token) {
      const response = await DataService.checkToken(token)
        .catch(e => {
          console.log(e);
        });
      if (response.data.success === 1) {
        console.log("success");
        this.setState({
          authenticated: true
        });
      } else {
        console.log("failed");
        this.setState({
          authenticated: false
        });
      }
    } else {
      console.log("no token");
      this.setState({
        authenticated: false
      });
    }
  };

  render(){
    return (
      <div>
        <Navbar authenticated={this.state.authenticated} authenticate={this.changeAuth}/>
  
        <Route path="/" exact={true} component={() => <Home checkAuth={this.checkAuth} authenticated={this.state.authenticated} />} />
        <Route path="/account" exact={true} component={() => <AccountHome checkAuth={this.checkAuth} authenticated={this.state.authenticated} />} />
        <Route path="/sign-up" component={() => <SignUp authenticated={this.state.authenticated} />} />
        <Route path="/login" component={() => <Login authenticate={this.changeAuth} authenticated={this.state.authenticated} />} />
        <Route path="/logout" component={Logout} />
        <Route path="/account-details" component={() => <AccountDetails checkAuth={this.checkAuth} authenticated={this.state.authenticated} />} />
        <Route path="/dashboard-details" component={() => <DashboardDetails checkAuth={this.checkAuth} authenticated={this.state.authenticated} />} />
      </div>
    );
  }
};