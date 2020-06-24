import React, { useState } from 'react';
import SignUpDataService from '../services/UserServices';

function Login () {
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
    
    const logUserIn = (event) => {
        event.preventDefault();
        SignUpDataService.login(loginInfo)
            .then (response => {
                setLoginInfo({
                email: response.data.email,
                password: response.data.password,
                message: response.data.message || response.data.data
                })
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

            <div>{loginInfo.message}</div>
            <button type="submit" className="btn btn-info form-control" onClick={logUserIn}>Login</button>
        </div>
    );
};

export default Login;