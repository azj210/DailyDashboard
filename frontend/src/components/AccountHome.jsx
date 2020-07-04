import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import DataService from '../services/UserServices';
import lifecycle from 'react-pure-lifecycle';

const componentDidMount = (props) => {
    DataService.getDashByUID(localStorage.getItem("decisionMakerToken"), localStorage.getItem("decisionMakerUID"))
        .then(response => {
            if(response.data.success === 1) {
                props.setDashboard({...response.data.data, eventDate: new Date(response.data.data.eventDate)});
            } else {
                console.log("failed to fetch dashboard data");
            }
        })
        .catch(e => {
            console.log(e);
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
            // modify birthdate to be this year
            const firstBirthdate = event.getFullYear();
            event.setFullYear(date.getFullYear());
            // check if birthdate is behind or after current year and change its year accordingly
            if ((event - date)/86400000 <= -1) {
                event.setFullYear(date.getFullYear() + 1);
            }
            daysLeft = Math.ceil((event - date)/86400000);
            event.setFullYear(firstBirthdate);
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
                {checkEvent(props.dashboard.eventDate, currentDate, props.dashboard) !== 0 ? <p>Days until {props.dashboard.eventName}: {checkEvent(props.dashboard.eventDate, currentDate, props.dashboard)}</p> : <p>Your {props.dashboard.eventName} is today!</p>}
            </div>

            <div>
                Your Daily Cocktail:
            </div>

            <div>
                Your Daily Song:
            </div>

            <Link to="/account" className="btn btn-lg btn-outline-primary home-button">Account Details</Link>
            <Link to="/dashboard-details" className="btn btn-lg btn-outline-primary home-button">Customize Dashboard</Link>
            <br></br>
            <Link to="/logout" className="btn btn-lg btn-secondary home-button">Logout</Link>
        </div>
    );
};

export default lifecycle(methods)(AccountHome);