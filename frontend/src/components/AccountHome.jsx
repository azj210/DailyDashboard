import React from 'react';
import { useHistory, Link } from 'react-router-dom';

function AccountHome (props) {

    props.checkAuth();

    const currentDate = Date();

    const history = useHistory();
    
    return(
        props.authenticated ?
        <div className="homepage-header">
            <div id="dashboard">
                <h1>Welcome!</h1>
                <h3>Date</h3>
                <h3>Weather</h3>
                <h3>Days until event</h3>
            </div>

            <Link to="/account-details" className="btn btn-lg btn-outline-primary home-button">Account Details</Link>
            <Link to="/dashboard-details" className="btn btn-lg btn-outline-primary home-button">Customize Dashboard</Link>
            <br></br>
            <Link to="/logout" className="btn btn-lg btn-secondary home-button">Logout</Link>
        </div> :
        <div>
            {history.push("/")}
        </div>
    );
};

export default AccountHome;