import React, { useState } from 'react';
import DataService from '../services/UserServices';
import lifecycle from 'react-pure-lifecycle';
import LogoutError from './LogoutError';

const componentDidMount = (props) => {
    props.checkAuth();
};

const methods = {
    componentDidMount
};

function ResetPassword (props) {
    const { token } = props.routerProps.match.params
        
    const [resetInfo, setResetInfo] = useState({
        password: "",
        confirmPassword: ""
    });

    const [errorMessage, setErrorMessage] = useState("");
    
    function handlePassChange(event) {
        const { value, name } = event.target;
        setResetInfo(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        });
    };

    const changePass = () => {
        if (resetInfo.password === resetInfo.confirmPassword) {
            DataService.updateUserPass(localStorage.getItem("decisionMakerToken"), {password: resetInfo.password, uid: localStorage.getItem("decisionMakerUID")})
                .then (response => {
                    console.log(response);
                    if (response.data.success === 1) {
                        document.getElementById("errorMessage").style.color = "green"
                        setErrorMessage("Success! Your password has been changed.")
                    } else {
                        document.getElementById("errorMessage").style.color = "red"
                        setErrorMessage("Error, please try again later");
                    }
                })
                .catch (e => {
                    console.log(e);
                    document.getElementById("errorMessage").style.color = "red"
                    setErrorMessage("Error, please try again later");
                })
        } else {
            document.getElementById("errorMessage").style.color = "red"
            setErrorMessage("Passwords aren't the same");
        }
    }

    return(
        props.authenticated ? 

        <div>
            <LogoutError />
        </div> :

        <div className="page-form" style={{margin: "0 15% 5%", padding: "4.0rem 0"}}>
            <header>
                <h2 style={{textAlign: 'center'}}>Reset Password</h2>
            </header>
            <div id="errorMessage" style={{color: 'red', textAlign: 'center'}}>&nbsp;{token}</div>
                <label htmlFor="pass">New Password</label>
                    <input
                        className="form-control"
                        type="password"
                        id="pass"
                        required
                        value={resetInfo.password}
                        onChange={handlePassChange}
                        name="pass">
                    </input>
                    <label htmlFor="confirmedPasword" style={{marginTop: 15}}>Confirm Password</label>
                    <input
                        className="form-control"
                        type="password"
                        id="confirmedPassword"
                        required
                        value={resetInfo.confirmPassword}
                        onChange={handlePassChange}
                        name="confirmedPass">
                    </input>
                    <button type="submit" className="btn btn-lg btn-outline-primary" style={{marginTop: 15}} onClick={changePass}>Update Password</button>
        </div>
    );
};

export default lifecycle(methods)(ResetPassword);