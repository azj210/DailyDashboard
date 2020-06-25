import React, { useState } from 'react';
import SignUpDataService from '../services/UserServices';
import { useHistory } from "react-router-dom";

function Login (props) {
    const [loginInfo, setLoginInfo] = useState({
        email: "", 
        password: "",
        message: ""
    });

    function handleChange(event) {
        const { value, name } = event.target;
        setLoginInfo(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        });
    };
    
    const history = useHistory();

    const logUserIn = (event) => {
        event.preventDefault();
        SignUpDataService.login(loginInfo)
            .then (response => {
                setLoginInfo({
                email: response.data.email,
                password: response.data.password,
                message: response.data.data
                })
                return response.data.message
            }).then(response => {
                if(response=="logged in successfully"){
                    props.authenticate();
                    history.push('./')
                }
                    
            })
            .catch(e => {
                console.log(e);
            });
    }

    return(
        <div className="page-form">
            <header>
                <h2>Login</h2>
            </header>
            <div id="errorMessage" style={{color: 'red', textAlign: 'center'}}>&nbsp;{loginInfo.message}</div>
            <div className="form-group">
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
            <div className="form-group">    
                <label for="loginPW">Password</label>
                <input 
                    id="loginPW"
                    type="password" 
                    className="form-control"
                    name="password" 
                    placeholder="Password" 
                    required
                    value={loginInfo.password} 
                    onChange={handleChange} 
                />
            </div>

            <button type="submit" className="btn btn-info form-control" onClick={logUserIn}>Login</button>
        </div>
    );
};

export default Login;