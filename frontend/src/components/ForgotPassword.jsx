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

    const selectStyle = {
        marginBottom:"2%", 
        marginLeft:"25%",
        width:"50%",
    };

    const buttonStyle = {
        marginTop:"2%",
        marginLeft:"25%",
        width:"50%",
    };
        
    const [loginInfo, setLoginInfo] = useState({
        email: ""
    });

    const [message, setMessage] = useState("");
    
    function handleChange(event) {
        const { value, name } = event.target;
        setLoginInfo(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        });
    };

    const forgotPassword = () => {
        DataService.sendForgotPasswordEmail(loginInfo)
            .then(response => {
                if(response.data.success === 1) {
                    document.getElementById("message").style.color = "green";
                    setMessage("Password Reset Email Successfully Sent!")
                    console.log(response);
                }
                else{
                    document.getElementById("message").style.color = "red";
                    setMessage(response.data.message)
                }
            })
    }

    return(
        props.authenticated ? 

        <div>
            <LogoutError />
        </div> :

        <div className="page-form">
            <header>
                <h2>Forgot Password</h2>
            </header>
            <div id="message" style={{textAlign: 'center'}}>&nbsp;{message}</div>
            <div className="form-group" style={selectStyle}>
                <label for="username">Email</label>
                <input 
                    id="username"
                    type="email" 
                    className="form-control" 
                    name="email" 
                    placeholder="john.smith@gmail.com" 
                    required
                    value={loginInfo.email} 
                    onChange={handleChange}         
                />
            </div>

            {/* <button type="submit" className="btn btn-info form-control" style={{marginBottom: 10}} onClick={logUserIn}>Login</button> */}
            <button type="submit" className="btn btn-info form-control" style={buttonStyle} onClick={forgotPassword}>Send Password Reset Email</button>
        </div>
    );
};

export default lifecycle(methods)(ForgotPassword);