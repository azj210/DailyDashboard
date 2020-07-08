import React, { useState } from 'react';
import DataService from '../services/UserServices';
import lifecycle from 'react-pure-lifecycle';

const componentDidMount = (props) => {
    props.checkAuth();
};

const methods = {
    componentDidMount
};

function ResetPassword (props) {
    const { token } = props.routerProps.match.params
    const [checkToken, setCheckToken] = useState(false)

    async function checkAuth() {
        const response = await DataService.checkToken(token)
        .catch(e => {
          console.log(e);
        });
        if(response.data.success === 1){
            setCheckToken(true)
        }
    }

    checkAuth()
        
    const [resetInfo, setResetInfo] = useState({
        email: "",
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
            DataService.updateUserPass(token, {password: resetInfo.password, uid: localStorage.getItem("decisionMakerUID")})
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
        checkToken === true ? 

        <div className="page-form" style={{margin: "0 15% 5%", padding: "4.0rem 0"}}>
            <header>
                <h2 style={{textAlign: 'center'}}>Reset Password</h2>
            </header>
            <div id="errorMessage" style={{color: 'red', textAlign: 'center'}}>&nbsp;{errorMessage}</div>
                <label htmlFor="pass">Email</label>
                        <input
                            id="username"
                            type="email" 
                            className="form-control" 
                            name="email" 
                            placeholder="john.smith@gmail.com" 
                            required
                            onChange={handlePassChange}
                            name="email">
                        </input>
                <label htmlFor="pass" style={{marginTop: 15}}>New Password</label>
                    <input
                        className="form-control"
                        type="password"
                        id="pass"
                        required
                        value={resetInfo.password}
                        onChange={handlePassChange}
                        name="password">
                    </input>
                    <label htmlFor="confirmedPasword" style={{marginTop: 15}}>Confirm Password</label>
                    <input
                        className="form-control"
                        type="password"
                        id="confirmedPassword"
                        required
                        value={resetInfo.confirmPassword}
                        onChange={handlePassChange}
                        name="confirmPassword">
                    </input>
                    <button type="submit" className="btn btn-lg btn-outline-primary" style={{marginTop: 15}} onClick={changePass}>Update Password</button>
        </div>
        :
        <div className="page-form" style={{margin: "0 15% 5%", padding: "4.0rem 0"}}>
            <header>
                <h2 style={{textAlign: 'center', color: 'red'}}>This link has expired! Try again.</h2>
            </header>
        </div>
    );
};

export default lifecycle(methods)(ResetPassword);