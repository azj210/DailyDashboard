import React, { useState } from 'react';
import { Link, Route } from 'react-router-dom';

import Home from './components/Home';
import AccountHome from './components/AccountHome';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Logout from './components/Logout';
import Navbar from './components/Navbar';

export default class App extends React.Component {
  
  // const [authenticated, setAuthenticated] = useState(false);

  constructor(props){
    super(props)
    this.state = { authenticated: false }
  }

  authenticate = () => {
    this.setState({ authenticated: true })
  }

  render(){
  return (
    <div>
      <Navbar authenticated={this.state.authenticated} />
    
      {this.state.authenticated ? <Route path="/" exact={true} component={AccountHome} /> : <Route path="/" exact={true} component={Home} />}
      <Route path="/sign-up" component={SignUp} />
      <Route path="/login" component={Login} component={() => <Login authenticate={this.authenticate} />}/>
      <Route path="/logout" component={Logout} />
    </div>
  );}
};



