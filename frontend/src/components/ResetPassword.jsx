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

function ForgotPassword (props) {
        
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
        if (newPass.pass === newPass.confirmedPass) {
            DataService.updateUserPass(localStorage.getItem("decisionMakerToken"), {password: newPass.pass, uid: localStorage.getItem("decisionMakerUID")})
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

        <div className="page-form">
            <div id="errorMessage" style={{color: 'red', textAlign: 'center'}}>&nbsp;{errorMessage}</div>
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

export default lifecycle(methods)(ForgotPassword);