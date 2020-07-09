import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import DataService from '../services/UserServices';
import DashboardItems from './DashboardItems';
import lifecycle from 'react-pure-lifecycle';

const componentDidMount = (props) => {
    const token = localStorage.getItem("decisionMakerToken");
    const uid = localStorage.getItem("decisionMakerUID");
    DataService.get(token, uid)
        .then(response => {
            props.setUser(response.data.data);
            DataService.getWeather({city: response.data.data.city})
                    .then(response => {
                        // if response.cod exists, the response is invalid
                        if(response.cod) {
                            props.setWeather("Your city's weather cannot be found");
                        }

                        const checkDayOrNight = (iconName) => {
                            if (iconName[2] === "d") {
                                return true;
                            } else {
                                return false;
                            }
                        }

                        const temp = response.data.main.temp;
                        const description = response.data.weather[0].description;
                        const mainDisplay = response.data.weather[0].main;
                        const icon = response.data.weather[0].icon;

                        const dayOrNight = checkDayOrNight(icon);
                        const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`

                        props.setWeather({text: `Today's weather: ${temp}° farenheight and ${description}`, descriptions: {mainDisplay: mainDisplay, dayOrNight: dayOrNight, icon: iconURL}});
                    })
                    .catch(e => {
                        props.setWeather({text: "Your city's weather cannot be found"});
                    })
        })
        .catch(e => {
            console.log(e);
        })
    DataService.getDashByUID(token, uid)
        .then(response => {
            if(response.data.success === 1) {
                // console.log(response);
                props.setDashboard({...response.data.data, eventDateObj: new Date(response.data.data.eventDate)});
            } else {
                console.log("failed to fetch dashboard data");
            }
        })
        .catch(e => {
            console.log(e);
        })
    DataService.getDisplayByUID(token, uid)
        .then(response => {
            if (response.data.success === 1) {
                props.setDisplay({...response.data.data, lastUpdateObj: new Date(response.data.data.lastUpdate)})
            } else {
                console.log("failed to fetch display data");
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
    const [categories, setCategories] = useState();

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
    
    //set the background image
    const setBackground = () => {
        const imgsNight = {
            "Thunderstorm":"../images/thunderstormNight.jpg",
            "Drizzle":"../images/drizzleNight.jpg",
            "Rain":"../images/rainNight.jpg",
            "Snow":"../images/snowNight.jpg",
            "Mist":"../images/mist.jpg",
            "Smoke":"../images/smoke.jpg",
            "Haze":"../images/haze.jpg",
            "Dust":"../images/dust.jpg",
            "Fog":"../images/fog.jpg",
            "Sand":"../images/sand.jpg",
            "Ash":"../images/ash.jpg",
            "Squall":"../images/squall.jpg",
            "Tornado":"../images/tornado.jpg",
            "Clear":"../images/clearNight.jpg",
            "Clouds":"../images/cloudsNight.jpg"
        };
        const imgsDay = {
            "Thunderstorm":"../images/thunderstormDay.jpg",
            "Drizzle":"../images/drizzleDay.jpg",
            "Rain":"../images/rainDay.jpg",
            "Snow":"../images/snowDay.jpg",
            "Mist":"../images/mist.jpg",
            "Smoke":"../images/smoke.jpg",
            "Haze":"../images/haze.jpg",
            "Dust":"../images/dust.jpg",
            "Fog":"../images/fog.jpg",
            "Sand":"../images/sand.jpg",
            "Ash":"../images/ash.jpg",
            "Squall":"../images/squall.jpg",
            "Tornado":"../images/tornado.jpg",
            "Clear":"../images/clearDay.jpg",
            "Clouds":"../images/cloudsDay.jpg"
        };

        //if the local time is between 6am and 7pm then access imgsDay
        //else access imgsNight
        props.weather.descriptions.mainDisplay
        props.weather.descriptions.dayOrNight

        //return the image by passing in the main from prop to the respective dictionary
    }

    // this function can definitely be moved to a typescript doc
    const checkEvent = (event, date, dashboard) => {
        let daysLeft = 0;

        if (props.dashboard.eventName === "Birthdate") {
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

                    DataService.get(localStorage.getItem("decisionMakerToken"), localStorage.getItem("decisionMakerUID"))
                        .then(response => {
                            if (response.data.success === 1) {
                                const newDash = {
                                    ...dashboard,
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

            } else {
                daysLeft = Math.ceil((event - date)/86400000);
            }
        }

        return daysLeft;
    }

    let event;

    if (typeof(props.dashboard) !== "undefined") {
        event = checkEvent(props.dashboard.eventDateObj, currentDate, props.dashboard);
    }

    return(
        typeof(props.dashboard) === "undefined" || typeof(props.weather) === "undefined" ? 
        <div /> :
        <div className="homepage-header">
            <div id="dashboard">
                <h1>Welcome {props.user.fName}!</h1>
                <h3>{weekday + " " + currentDate.toLocaleDateString(options)}</h3>
                <h4>{props.weather.text}</h4>
                {props.weather.descriptions ? 
                    <img src={props.weather.descriptions.icon} /> :
                    <div />
                }
                {event !== 0 ? 
                <p>Days until {props.dashboard.eventName}: {event}</p> : 
                <p>Your {props.dashboard.eventName} is today!</p>}
            </div>

            <DashboardItems currentDate={currentDate} dashboard={props.dashboard} display={props.display} setDisplay={props.setDisplay} categories={categories} setCategories={setCategories} />

            <Link to="/account" className="btn btn-lg btn-outline-primary home-button">Account Details</Link>
            <Link to="/dashboard-details" className="btn btn-lg btn-outline-primary home-button">Customize Dashboard</Link>
            <br></br>
            <Link to="/logout" className="btn btn-lg btn-secondary home-button">Logout</Link>
        </div>
    );
};

export default lifecycle(methods)(AccountHome);