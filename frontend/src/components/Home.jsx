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

    const [user, setUser] = useState();
    const [dashboard, setDashboard] = useState();
    const [display, setDisplay] = useState();
    const [weather, setWeather] = useState();

    return(
        props.authenticated ?
        <div>
            <AccountHome user={user} setUser={setUser} dashboard={dashboard} setDashboard={setDashboard} display={display} setDisplay={setDisplay} weather={weather} setWeather={setWeather} />
        </div> :
        <div className="homepage-header">
            <h1>Daily Dashboard</h1>
            <Link to="/sign-up" className="btn btn-lg btn-outline-primary home-button">Sign Up</Link>
            <Link to="/login" className="btn btn-lg btn-secondary home-button">Login</Link>
        </div>
    );
};

export default lifecycle(methods)(Home);