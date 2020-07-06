import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar(props) {
    const [collapsed, setCollapsed] = useState(true);
    
    const classOne = collapsed ?  'collapse navbar-collapse' : 'collapse navbar-collapse show';
    const classTwo = collapsed ? 'navbar-toggler collapsed' : 'navbar-toggler';   


    function toggleNavbar() {
        setCollapsed(!collapsed);
    }

    return (
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link to="/" className="navbar-brand">Daily Dashboard</Link>
            <button id="example" onClick={toggleNavbar} className={`${classTwo}`} type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarResponsive" aria-expanded={collapsed} aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
            </button>

            <div className={`${classOne}`} id="navbarSupportedContent">
              {props.authenticated ?
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to="/account" className="nav-link">Account</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/dashboard-details" className="nav-link">Dashboard</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/logout" className="nav-link">Logout</Link>
                  </li>
                </ul> :
                <ul className="navbar-nav ml-auto">  
                  <li className="nav-item">
                    <Link to="/sign-up" className="nav-link">Sign Up</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">Login</Link>
                  </li>
                </ul>
              }
            </div>
          </nav>
        </div>
    );
}

export default Navbar;