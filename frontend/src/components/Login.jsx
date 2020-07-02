import React, { useState, useEffect } from 'react';
import DataService from '../services/UserServices';
import { useHistory } from 'react-router-dom';
import lifecycle from 'react-pure-lifecycle';
import LogoutError from './LogoutError';

const componentDidMount = (props) => {
    props.checkAuth();
};

const methods = {
    componentDidMount
};

function Login (props) {
        
    const [loginInfo, setLoginInfo] = useState({
        email: "", 
        password: ""
    });

    const [errorMessage, setErrorMessage] = useState("");

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

    const logUserIn = () => {
        DataService.login(loginInfo)
            .then (response => {
                if(response.data.success === 1) {
                    console.log(response);
                    history.push("/");
                    localStorage.setItem('decisionMakerToken', response.data.token);
                    props.checkAuth();
                } else {
                    setErrorMessage(response.data.data);
                };
            })
            .catch(e => {
                console.log(e);
            });
    };

    return(
        props.authenticated ? 

        <div>
            <LogoutError />
        </div> :

        <div className="page-form">
            <header>
                <h2>Login</h2>
            </header>
            <div id="errorMessage" style={{color: 'red', textAlign: 'center'}}>&nbsp;{errorMessage}</div>
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

export default lifecycle(methods)(Login);