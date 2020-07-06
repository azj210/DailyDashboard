import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AccountHome from './AccountHome';
import lifecycle from 'react-pure-lifecycle';

const componentDidMount = (props) => {
    props.checkAuth();
};

const methods = {
    componentDidMount
};

function Home (props) {

    const [dashboard, setDashboard] = useState();
    return(
        props.authenticated ?
        <div>
            <AccountHome dashboard={dashboard} setDashboard={setDashboard} />
        </div> :
        <div className="homepage-header">
            <h1>Daily Dashboard</h1>
            <Link to="/sign-up" className="btn btn-lg btn-outline-primary home-button">Sign Up</Link>
            <Link to="/login" className="btn btn-lg btn-secondary home-button">Login</Link>
        </div>
    );
};

export default lifecycle(methods)(Home);