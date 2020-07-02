import React from 'react';
import { useHistory, Link } from 'react-router-dom';

function AccountHome (props) {

    const currentDate = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    let weekday;
    switch (currentDate.getDay()) {
        case 0:
           weekday = "Sunday"; 
            break;
        case 1:
            weekday = "Monday";
            break;
        case 2:
            weekday = "Tuesday";
            break;
        case 3:
            weekday = "Wednesday";
            break;
        case 4:
            weekday = "Thursday";
            break;
        case 5:
            weekday = "Friday";
            break;
        case 6:
            weekday = "Saturday";
            break;
        default:
            weekday = "";
    }

    const history = useHistory();
    
    return(
        props.authenticated ?
        <div className="homepage-header">
            <div id="dashboard">
                <h1>Welcome!</h1>
                <h3>{weekday + " " + currentDate.toLocaleDateString(options)}</h3>
                <h3>Weather</h3>
                <h3>Days until event</h3>
            </div>

            <Link to="/account-details" className="btn btn-lg btn-outline-primary home-button">Account Details</Link>
            <Link to="/dashboard-details" className="btn btn-lg btn-outline-primary home-button">Customize Dashboard</Link>
            <br></br>
            <Link to="/logout" className="btn btn-lg btn-secondary home-button">Logout</Link>
        </div> :
        <div>
            {/* {history.push("/")} */}
        </div>
    );
};

export default AccountHome;