//the component that renders most of the things on the account details page

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DataService from '../services/UserServices';
import lifecycle from 'react-pure-lifecycle';

const componentDidMount = (props) => {
    DataService.get(localStorage.getItem("decisionMakerToken"), localStorage.getItem("decisionMakerUID"))
        .then(response => {
            console.log(response.data.data);
            props.setUserInfo(
                response.data.data
            );
        })
        .catch(e => {
            console.log(e);
        });
};

const methods = {
    componentDidMount
};

function AccountInfo(props) {

    const [submitted, setSubmitted] = useState(false);

    const handleChange = event => {
        const { name, value } = event.target;
        props.setUserInfo({ ...props.userInfo, [name]: value });
    };

    const changeInfo = () => {
        DataService.updateUserInfo(localStorage.getItem("decisionMakerToken"), props.userInfo)
            .then(response => {
                console.log(response);
                if (response.data.success === 1) {
                    setSubmitted(true);
                }

                //implement something that shows up on screen if not succesful
            })
            .catch(e => {
                console.log(e);
            });
    }

    return (
        typeof(props.userInfo) === "undefined" ?
        <div /> :

            submitted ?
            <div className="homepage-header">
                <h1>Succesfully Changed</h1>
                <Link to="/" className="btn btn-lg btn-secondary home-button">Back to Dashboard</Link>
            </div> :
            
            <div className="page-form">
                {/* <Link to="/" className="btn btn-lg btn-outline-primary">Home</Link> */}
                <header><h3>Update Account Information</h3></header>
                <div className="form-group">
                    <label htmlFor="first">First Name</label>
                    <input 
                        className="form-control"
                        id="first"
                        required
                        value={props.userInfo.fName}
                        onChange={handleChange}
                        name="fName">
                    </input>
                </div>
                <div className="form-group">
                    <label htmlFor="last">Last Name</label>
                    <input 
                        className="form-control"
                        id="last"
                        required
                        value={props.userInfo.lName}
                        onChange={handleChange}
                        name="lName">
                    </input>
                </div>
                <div className="form-group">
                    <label htmlFor="City">City</label>
                    <input 
                        className="form-control"
                        id="City"
                        required
                        value={props.userInfo.city}
                        onChange={handleChange}
                        name="city">
                    </input>
                </div>
                <div className="form-group">
                    <label htmlFor="State">State</label>
                    <input 
                        className="form-control"
                        id="State"
                        required
                        value={props.userInfo.state}
                        onChange={handleChange}
                        name="state">
                    </input>
                </div>

                <button type="submit" className="btn btn-lg btn-outline-primary" onClick={changeInfo}>Update Account</button>

                <Link to="/delete" style={{marginLeft: 15}} className="btn btn-lg btn-secondary">Delete Account</Link>
            </div> 
    )
};

export default lifecycle(methods)(AccountInfo);