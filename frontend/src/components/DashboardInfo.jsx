// the component that renders most of the things on the dashboard details page
// this will be the biggest component by far; we should seperate the functions into different typscript files later

import React from 'react';
import { useHistory, Link } from "react-router-dom";
import DataService from '../services/UserServices';
import lifecycle from 'react-pure-lifecycle';

const componentDidMount = (props) => {
    DataService.getDashByUID(localStorage.getItem("decisionMakerToken"), localStorage.getItem("decisionMakerUID"))
        .then(response => {
            if(response.data.success === 1) {
                props.setDashboard({...response.data.data, eventDateObj: new Date(response.data.data.eventDate)});
                props.setOriginalDash({...response.data.data})
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

    const handleChange = event => {
        const { name, value } = event.target;
        props.setDashboard({ ...props.dashboard, [name]: value });
    };

    const checkEvent = (event, date, dashboard) => {
        let daysLeft = 0;

        if (props.originalDash.eventName = "Birthdate") {
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
                return props.originalDash.eventName;
            }
        }

        return daysLeft;
    }

    const updateDash = () =>{
        
        for (const detail in props.dashboard) {
            if(props.dashboard[detail] === null || props.dashboard[detail] === "") {
              delete props.dashboard[detail];
            }
        }

        const updatedDash = Object.assign(props.originalDash, props.dashboard);

        DataService.updateDash(localStorage.getItem("decisionMakerToken"), updatedDash)
            .then(response =>{
                console.log(response);
                console.log(updatedDash);
                history.go();
            })
            .catch(e => {
                console.log(e);
            })
    }

    return (
        typeof(props.dashboard) === "undefined" || typeof(props.originalDash) === "undefined" ?
        <div /> :
        <div>
            <Link to="/" className="btn btn-lg btn-outline-primary">Home</Link>
            <div className="page-form">
                <h3>{checkEvent(props.dashboard.eventDateObj, currentDate, props.originalDash)}: {props.dashboard.eventDateObj.toLocaleDateString(undefined, options)}</h3>
                    <div className="form-group">
                        <label htmlFor="eventName">Event (if changing to birthdate, make sure to type "Birthdate" exactly)</label>
                        <input 
                            className="form-control"
                            id="eventName"
                            value={props.dashboard.eventName}
                            onChange={handleChange}
                            name="eventName">
                        </input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="EventDate">Event Date</label>
                        <input 
                            className="form-control"
                            id="eventDate"
                            type="date"
                            value={props.dashboard.eventDate.substr(0, 10)}
                            onChange={handleChange}
                            name="eventDate">
                        </input>
                    </div>
<<<<<<< HEAD
                <h3>Songs</h3>
                    <select name="songEnergy" value={props.dashboard.songEnergy} onChange={handleChange}>
                        <option value="">Energy</option>
                        <option>low</option>
                        <option>medium</option>
                        <option>high</option>
                    </select>

                    <select name="songDecade" value={props.dashboard.songDecade} onChange={handleChange}>
                        <option value="">Decade</option>
                        <option>1980</option>
                        <option>1990</option>
                        <option>2000</option>
                        <option>2010</option>
                    </select>
                <h3>Cocktail</h3>
                    <select name="cocktailPref" value={props.dashboard.cocktailPref} onChange={handleChange}>
                        <option value="">Preference</option>
                        <option>Cocktail Classics</option>
                        <option>Cordials And Liquers</option>
                        <option>Whiskies</option>
                        <option>Brandy</option>
                        <option>Vodka</option>
                        <option>Non-Alcoholic Drinks</option>
                        <option>Rum - Daiquiris</option>
                        <option>Rum</option>
                        <option>Tequila</option>
                        <option>Shooters</option>
                        <option>Gin</option>
                    </select>
                <h3>Movie</h3>
                    <select name="movieGenre" value={props.dashboard.movieGenre} onChange={handleChange}>
                        <option value="">Genre</option>
                        <option>Drama</option>
                        <option>Comedy</option>
                        <option>Horror</option>
                        <option>Action</option>
                        <option>Romance</option>
                    </select>
                <h3>Food</h3>
                    <select name="foodPref" value={props.dashboard.foodPref} onChange={handleChange}>
                        <option value="">Preference</option>
                        <option>High Protein</option>
                    </select>
                <br />

                <button type="submit" className="btn btn-lg btn-outline-primary" onClick={updateDash}>Update Dashboard</button>
            </div>
=======
                </div>
            <h3>Songs</h3>
                <select name="songEnergy" value={props.dashboard.songEnergy} onChange={handleChange}>
                    <option value="">Energy</option>
                    <option>low</option>
                    <option>medium</option>
                    <option>high</option>
                </select>

                <select name="songDecade" value={props.dashboard.songDecade} onChange={handleChange}>
                    <option value="">Decade</option>
                    <option>1980</option>
                    <option>1990</option>
                    <option>2000</option>
                    <option>2010</option>
                </select>
            <h3>Cocktail</h3>
                <select name="cocktailPref" value={props.dashboard.cocktailPref} onChange={handleChange}>
                    <option value="">Preference</option>
                    <option>Cocktail Classics</option>
                    <option>Cordials And Liquers</option>
                    <option>Whiskies</option>
                    <option>Brandy</option>
                    <option>Vodka</option>
                    <option>Non-Alcoholic Drinks</option>
                    <option>Rum - Daiquiris</option>
                    <option>Rum</option>
                    <option>Tequila</option>
                    <option>Shooters</option>
                    <option>Gin</option>
                </select>
            <h3>Movie</h3>
                <select name="movieGenre" value={props.dashboard.movieGenre} onChange={handleChange}>
                    <option value="">Genre</option>
                    <option>Drama</option>
                    <option>Comedy</option>
                    <option>Horror</option>
                    <option>Action</option>
                    <option>Romance</option>
                </select>
            <h3>Food</h3>
                <select name="foodPref" value={props.dashboard.foodPref} onChange={handleChange}>
                    <option value="">Preference</option>
                    <option>No Preference</option>
                    <option>Low Calorie</option>
                    <option>Low Fat</option>
                    <option>Low Sugar</option>
                    <option>High Protein</option>
                </select>
            <br />

            <button type="submit" className="btn btn-lg btn-outline-primary" onClick={updateDash}>Update Dashboard</button>
>>>>>>> allow dashboard category selection to be stored in mysql
        </div> 

    )
};

export default lifecycle(methods)(DashboardInfo);