import React, { useState } from 'react';
import { Link, Route } from 'react-router-dom';

import Home from './components/Home';
import AccountHome from './components/AccountHome';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Logout from './components/Logout';
import Navbar from './components/Navbar';

function App() {
  
  const [authenticated, setAuthenticated] = useState(false);

  const auth = () => {
    setAuthenticated(!authenticated);
  }

  return (
    <div>
      <Navbar authenticated={authenticated} authenticate={auth}/>
    
      {authenticated ? <Route path="/" exact={true} component={AccountHome} /> : <Route path="/" exact={true} component={Home} />}
      <Route path="/sign-up" component={SignUp} />
      <Route path="/login" component={Login} component={() => <Login authenticate={auth} />}/>
      <Route path="/logout" component={Logout} />
    </div>
  );
};

export default App;
