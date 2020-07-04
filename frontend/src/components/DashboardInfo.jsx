// the component that renders most of the things on the dashboard details page

import React from 'react';
import { useHistory, Link } from "react-router-dom";
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

function DashboardInfo(props) {

    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const history = useHistory();

    const checkEvent = (event, date, dashboard) => {
        let daysLeft = 0;

        if (props.dashboard.eventName = "Birthdate") {
            return "Birthdate";
        } else {
            // if event is more than one day behind today,
            // update "eventName" and "eventDate" to birthday using DataService and reload the page
            // not bug tested yet
            if ((event - date)/86400000 <= -1) {

                DataService.get(localStorage.getItem("decisionMakerToken"), localStorage.getItem("decisionMakerUID"))
                    .then(response => {
                        if (response === 1) {
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
                                });
                        }
                    })
                    .catch(e => {
                        console.log(e);
                    })

            // event is ahead of today, return event name
            } else {
                return props.dashboard.eventName;
            }
        }

        return daysLeft;
    }

    
    return (
        typeof(props.dashboard) === "undefined" ?
        <div /> :
        <div>
            <Link to="/" className="btn btn-lg btn-outline-primary">Home</Link>
            <p>{checkEvent(props.dashboard.eventDate, currentDate, props.dashboard)}: {props.dashboard.eventDate.toLocaleDateString(undefined, options)}</p>
        </div> 
    )
};

export default lifecycle(methods)(DashboardInfo);