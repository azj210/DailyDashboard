import React, { useState } from 'react';
import { Link, Route } from 'react-router-dom';
import DataService from './services/UserServices';
import { useHistory } from "react-router-dom";

import Navbar from './components/Navbar';

import Home from './components/Home';
import AccountHome from './components/AccountHome';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Logout from './components/Logout';

import AccountDetails from './components/AccountDetails';



function App() {
  
  const history = useHistory();

  const checkAuth = () => {
    const token = localStorage.getItem('decisionMakerToken');
    if (token) {
      DataService.checkToken(token)
        .then(response => {
          if(response.data.success === 1) {
            console.log("success!");
            return true;
          } else {
            console.log("failed");
            if (typeof authenticated !== "undefined") {
              setAuthenticated(false);
              history.push("/");
            }
            return false;
          }
        })
        .catch(e => {
          console.log(e);
        })
    };
    return false;
  };

  //when token is completely implemented, change the boolean in the line below to checkAuth
  const [authenticated, setAuthenticated] = useState(false);

  const changeAuth = () => {
    setAuthenticated(!authenticated);
  };

  return (
    <div>
      <Navbar authenticated={authenticated} authenticate={changeAuth}/>
    
      {authenticated ? <Route path="/" exact={true} component={AccountHome} /> : <Route path="/" exact={true} component={Home} />}
      <Route path="/sign-up" component={SignUp} />
      <Route path="/login" component={() => <Login authenticate={changeAuth} />}/>
      <Route path="/logout" component={Logout} />
      <Route path="/account" component={() => <AccountDetails checkAuth={checkAuth}/>} />
    </div>
  );
};

export default App;
