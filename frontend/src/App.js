import React, { useState } from 'react';
import { Link, Route } from 'react-router-dom';
import DataService from './services/UserServices';

import Navbar from './components/Navbar';

import Home from './components/Home';
import AccountHome from './components/AccountHome';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Logout from './components/Logout';

import AccountDetails from './components/AccountDetails';

function App() {

  async function checkAuth () {
    const token = localStorage.getItem('decisionMakerToken');

    if (token) {
      var response = await DataService.checkToken(token)
        .catch(e => {
          console.log(e);
        });
      if (response.data.success === 1) {
        console.log("success");
        return true;
      } else {
        console.log("failed");
        return false;
      }
    }
    console.log("no token");
    return false;
  };

  const [authenticated, setAuthenticated] = useState(checkAuth);

  const changeAuth = () => {
    setAuthenticated(!authenticated);
  };

  return (
    <div>
      <Navbar authenticated={authenticated} authenticate={changeAuth}/>
    
      {authenticated ? <Route path="/" exact={true} component={AccountHome} /> : <Route path="/" exact={true} component={Home} />}
      <Route path="/sign-up" component={() => <SignUp authenticated={authenticated} />} />
      <Route path="/login" component={() => <Login authenticate={changeAuth} authenticated={authenticated} />} />
      <Route path="/logout" component={Logout} />
      <Route path="/account" component={() => <AccountDetails checkAuth={checkAuth}/>} />
    </div>
  );
};

export default App;
