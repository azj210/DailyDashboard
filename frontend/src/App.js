import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import AccountHome from './components/AccountHome';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Logout from './components/Logout';

function App() {
  
  let authenticated = true;
  
  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <Link to="/" className="navbar-brand">Decision Maker</Link>
        <button className="navbar-toggler" type="button" dataToggle="collapse" dataTarget="#navbarSupportedContent">
          <span className="navbar-toggler-icon"></span>
        </button>

        {authenticated ? 
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link">Account</Link>
              </li>
              <li className="nav-item">
                <Link to="/logout" className="nav-link">Logout</Link>
              </li>
            </ul>
          </div> :

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to="/sign-up" className="nav-link">Sign Up</Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-link">Login</Link>
              </li>
            </ul>
          </div>
        }
      </nav>

      {authenticated ? <Route path="/" exact={true} component={AccountHome} /> : <Route path="/" exact={true} component={Home} />}
      <Route path="/sign-up" component={SignUp} />
      <Route path="/login" component={Login} />
      <Route path="/logout" component={Logout} />
    </div>
  );
}

export default App;
