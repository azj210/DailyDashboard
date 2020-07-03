import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import DataService from '../services/UserServices';
import lifecycle from 'react-pure-lifecycle';

const componentDidMount = (props) => {
    DataService.getDashByUID(localStorage.getItem("decisionMakerToken"), localStorage.getItem("decisionMakerUID"))
        .then(response => {
            console.log(response.data.data)
            props.setDashboard({...response.data.data, eventDate: new Date(response.data.data.eventDate)});
        })
};

const methods = {
    componentDidMount
};


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
    
    return(
        typeof(props.dashboard) === "undefined" ? 
        <div></div> :
        <div className="homepage-header">
            <div id="dashboard">
                <h1>Welcome!</h1>
                <h3>{weekday + " " + currentDate.toLocaleDateString(options)}</h3>
                <p>Weather</p>
                <p>Days until {props.dashboard.eventName}:</p>
                <p>{Math.floor(Math.abs(props.dashboard.eventDate - currentDate)/86400000)}</p>
                <p>^for now, only shows day difference between today and when they were born</p>
            </div>

            <div>
                
            </div>

            <Link to="/account" className="btn btn-lg btn-outline-primary home-button">Account Details</Link>
            <Link to="/dashboard-details" className="btn btn-lg btn-outline-primary home-button">Customize Dashboard</Link>
            <br></br>
            <Link to="/logout" className="btn btn-lg btn-secondary home-button">Logout</Link>
        </div>
    );
};

export default lifecycle(methods)(AccountHome);