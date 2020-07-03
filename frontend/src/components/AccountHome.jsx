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

    const history = useHistory();

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
    
    const checkEvent = (event, date, dashboard) => {
        let daysLeft = 0;

        if (props.dashboard.eventName = "Birthdate") {
            // create new birthdate object and modify date to be this year
            let currentBirthdate = new Date(JSON.parse(JSON.stringify(event)));
            currentBirthdate.setFullYear(date.getFullYear());
            // check if new birthdate is behind or after current year and change its year accordingly
            if ((currentBirthdate - date)/86400000 <= -1) {
                currentBirthdate.setFullYear(date.getFullYear() + 1);
            }
            daysLeft = Math.ceil((currentBirthdate - date)/86400000);
        } else {
            if ((event - date)/86400000 <= -1) {
            // update "eventName" and "eventDate" to birthday using DataService and reload the page
            // not bug tested yet

                DataService.get(localStorage.getItem("decisionMakerUID"))
                    .then(response => {

                        const newDash = {
                            ... dashboard,
                            eventName: "Birthdate",
                            eventDate: response.data.data.birthdate
                        }

                        DataService.updateDash(localStorage.getItem("decisionMakerToken"), newDash)
                            .then(response => {
                                console.log(response);
                                history.go();
                            })
                            .catch(e => {
                                console.log(e);
                            })

                    })
                    .catch(e => {
                        console.log(e);
                    })

            } else {
                daysLeft = Math.ceil((event - date)/86400000);
            }
        }

        return daysLeft;
    }

    return(
        typeof(props.dashboard) === "undefined" ? 
        <div /> :
        <div className="homepage-header">
            <div id="dashboard">
                <h1>Welcome!</h1>
                <h3>{weekday + " " + currentDate.toLocaleDateString(options)}</h3>
                <p>Weather</p>
                {checkEvent(props.dashboard.eventDate, currentDate, props.dashboard) != 0 ? <p>Days until {props.dashboard.eventName}: {checkEvent(props.dashboard.eventDate, currentDate, props.dashboard)}</p> : <p>Your {props.dashboard.eventName} is today!</p>}
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