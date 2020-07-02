import React from 'react';
import { useHistory, Link, Route } from 'react-router-dom';
import AccountHome from './AccountHome';

function Home (props) {
    
    props.checkAuth();

    return(
        props.authenticated ?
        <div>
            <AccountHome />
        </div> :
        <div className="homepage-header">
            <h1>Decision Maker</h1>
            <Link to="/sign-up" className="btn btn-lg btn-outline-primary home-button">Sign Up</Link>
            <Link to="/login" className="btn btn-lg btn-secondary home-button">Login</Link>
        </div>
    );
};

export default Home;