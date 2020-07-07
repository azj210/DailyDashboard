import React, { useState } from 'react';
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

function ForgotPassword (props) {
        
    const [loginInfo, setLoginInfo] = useState({
        email: ""
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

    const forgotPassword = () => {
        DataService.getByEmail(loginInfo)
            .then(response => {
                if(response.data.success === 1) {
                    console.log(response);
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

            {/* <button type="submit" className="btn btn-info form-control" style={{marginBottom: 10}} onClick={logUserIn}>Login</button> */}
            <button type="submit" className="btn btn-info form-control" onClick={forgotPassword}>Send Password Reset Email</button>
        </div>
    );
};

export default lifecycle(methods)(ForgotPassword);