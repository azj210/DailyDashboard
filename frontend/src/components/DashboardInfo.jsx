// the component that renders most of the things on the dashboard details page
// this will be the biggest component by far; we should seperate the functions into different typscript files later

import React from 'react';
import { useHistory } from "react-router-dom";
import DataService from '../services/UserServices';
import lifecycle from 'react-pure-lifecycle';
import retrieveCategoryData from './AppFunctions/retrieveCategoryData';

const componentDidMount = (props) => {

    const token = localStorage.getItem("decisionMakerToken"); 
    const uid = localStorage.getItem("decisionMakerUID");

    DataService.getDashByUID(token, uid)
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
    DataService.getDisplayByUID(token, uid)
        .then(response => {
            if (response.data.success === 1) {
                props.setDisplay(response.data.data);
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

    const selectStyle = {
        marginBottom: 15, 
        width: 'auto',
        marginTop: 5
    };

    const inputStyle = {
        width: '200px'
    }

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
        const token = localStorage.getItem("decisionMakerToken");
        let displayUpdateData = [];
        const prefsToNames = {
            cocktailPref: "cocktail",
            songEnergy: "song",
            songDecade: "song",
            movieGenre: "movie",
            foodPref: "food"
        };

        function getKeyByValue(object, value) {
            return Object.keys(object).find(key => object[key] === value);
        }

        for (const detail in props.dashboard) {
            const key = getKeyByValue(props.dashboard, props.dashboard[detail]);
            if (props.dashboard[detail] === null || props.dashboard[detail] === "") {
                delete props.dashboard[detail];
            } else if ((props.dashboard[detail] !== props.originalDash[detail]) && Object.keys(prefsToNames).includes(key)) {
                const name = prefsToNames[`${key}`];
                displayUpdateData.push({categoryName: name, abbreviatedCategory: `${name.charAt(0)}Name`});
            }
        };

        const updatedDash = Object.assign(props.originalDash, props.dashboard);

        //check to see if user's input is a birthdate
        if (updatedDash.eventName.lower() === "birthdate" || updateDash.eventName.lower() === "birthday" || updateDash.eventName.lower() === "bday") {
            updatedDash.eventName = "Birthdate";
        }

        DataService.updateDash(token, updatedDash)
            .then(response =>{
                if (displayUpdateData.length > 0) {
                    retrieveCategoryData(props.display, updatedDash, token, currentDate, displayUpdateData)
                } else {
                   history.go();
                }
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
                            name="eventName"
                            style={inputStyle}>
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
                            name="eventDate"
                            style={inputStyle}>
                        </input>
                    </div>
                <h3>Songs</h3>
                    <h10>Energy</h10>
                    <div className="form-group">
                    <select className="form-control" style={selectStyle} name="songEnergy" value={props.dashboard.songEnergy} onChange={handleChange}>
                        <option value=""></option>    
                        <option>low</option>
                        <option>medium</option>
                        <option>high</option>
                    </select>
                    </div>

                    <h10>Decade</h10>
                    <div className="form-group">
                    <select className="form-control" style={selectStyle} name="songDecade" value={props.dashboard.songDecade} onChange={handleChange}>
                        <option value=""></option>
                        <option>1980</option>
                        <option>1990</option>
                        <option>2000</option>
                        <option>2010</option>
                    </select>
                    </div>

                <h3>Cocktail</h3>
                <h10>Preference</h10>
                <div className="form-group"> 
                    <select className="form-control" style={selectStyle} name="cocktailPref" value={props.dashboard.cocktailPref} onChange={handleChange}>
                        <option value=""></option>    
                        <option>Cocktail Classics</option>
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
                <h10>Genre</h10>
                <div className="form-group">
                    <select className="form-control" style={selectStyle} name="movieGenre" value={props.dashboard.movieGenre} onChange={handleChange}>
                        <option value=""></option>    
                        <option>Drama</option>
                        <option>Comedy</option>
                        <option>Horror</option>
                        <option>Action</option>
                        <option>Romance</option>
                    </select>
                </div>

                <h3>Food</h3>
                <h10>Preference</h10>
                <div className="form-group">
                    <select className="form-control" style={selectStyle} name="foodPref" value={props.dashboard.foodPref} onChange={handleChange}>
                        <option value=""></option>    
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