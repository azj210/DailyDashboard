import React from 'react';
import { useHistory, Link, Route } from 'react-router-dom';
import AccountHome from './AccountHome';
import lifecycle from 'react-pure-lifecycle';

const componentDidMount = (props) => {
    props.checkAuth();
};

const methods = {
    componentDidMount
};

function Home (props) {
    
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

export default lifecycle(methods)(Home);