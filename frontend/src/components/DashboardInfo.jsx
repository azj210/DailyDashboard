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

    const categories = ["song", "cocktail", "movie", "food"];
    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const history = useHistory();

    const handleChange = event => {
        const { name, value } = event.target;
        props.setDashboard({ ...props.dashboard, [name]: value });
    };

    const makeRadioButtons = (categoryName, num, indexKey) => {
        const identifier = categoryName + num
        return (
            <div className="form-check form-check-inline" key={indexKey}>
                <label className="form-check-label" htmlFor={identifier}>
                <input className="form-check-input" type="radio" name={`category${num}`} id={identifier} value={categoryName} checked={
                    props.dashboard[`category${num}`] === categoryName ? "checked" : null} onChange={handleChange} />{categoryName}
                    </label>
            </div>
        );
    }

    const checkEvent = (event, date, dashboard) => {

        if (props.originalDash.eventName === "Birthdate") {
            return "Birthdate";
        } else {
            // if event is more than one day behind today,
            // update "eventName" and "eventDate" to birthday using DataService and reload the page
            if ((event - date)/86400000 <= -1) {
                DataService.get(localStorage.getItem("decisionMakerToken"), localStorage.getItem("decisionMakerUID"))
                    .then(response => {
                        console.log(response);
                        if (response.data.success === 1) {
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
    }

    let event;

    if (typeof(props.dashboard) !== "undefined" && typeof(props.originalDash) !== "undefined") {
        event = checkEvent(props.dashboard.eventDateObj, currentDate, props.originalDash);
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
            {/* <Link to="/" className="btn btn-lg btn-outline-primary">Home</Link> */}
            <div className="page-form">
                <header><h3>{event}: {props.dashboard.eventDateObj.toLocaleDateString(undefined, options)}</h3></header>
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
                <h3>Songs</h3>
                    <div className="form-group">
                    <select className="form-control" style={{marginBottom: 15}} name="songEnergy" value={props.dashboard.songEnergy} onChange={handleChange}>
                        <option value="">Energy</option>
                        <option>low</option>
                        <option>medium</option>
                        <option>high</option>
                    </select>
                    </div>

                    <div className="form-group">
                    <select className="form-control" style={{marginBottom: 15}} name="songDecade" value={props.dashboard.songDecade} onChange={handleChange}>
                        <option value="">Decade</option>
                        <option>1980</option>
                        <option>1990</option>
                        <option>2000</option>
                        <option>2010</option>
                    </select>
                    </div>
                <h3>Cocktail</h3>
                <div className="form-group"> 
                    <select className="form-control" style={{marginBottom: 15}} name="cocktailPref" value={props.dashboard.cocktailPref} onChange={handleChange}>
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
                </div>
                <h3>Movie</h3>
                <div className="form-group">
                    <select className="form-control" style={{marginBottom: 15}} name="movieGenre" value={props.dashboard.movieGenre} onChange={handleChange}>
                        <option value="">Genre</option>
                        <option>Drama</option>
                        <option>Comedy</option>
                        <option>Horror</option>
                        <option>Action</option>
                        <option>Romance</option>
                    </select>
                </div>
                <h3>Food</h3>
                <div className="form-group">
                    <select className="form-control" style={{marginBottom: 15}} name="foodPref" value={props.dashboard.foodPref} onChange={handleChange}>
                        <option value="">Preference</option>
                        <option>High Protein</option>
                        <option>Low Calorie</option>
                        <option>Low Fat</option>
                        <option>Low Sugar</option>
                        <option>No Preference</option>
                    </select>
                </div>
                <h3>Categories to show on dashboard:</h3>
                    <h4 style={{marginTop: 15}}>Category 1</h4>
                        {categories.map((category, index) => {
                            const key = "1" + index 
                            return makeRadioButtons(category, 1, key);
                        })}
                    <h4 style={{marginTop: 15}}>Category 2</h4>
                        {categories.map((category, index) => {
                            const key = "2" + index;
                            return makeRadioButtons(category, 2, key);
                        })}
                <br />

                <button type="submit" style={{marginTop: 15}} className="btn btn-lg btn-outline-primary" onClick={updateDash}>Update Dashboard</button>
            </div>
        </div> 

    )
};

export default lifecycle(methods)(DashboardInfo);