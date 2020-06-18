import React, { useState } from 'react';

function Login () {
    const [loginInfo, setLoginInfo] = useState({
        email: "", 
        password: "",
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
    
    return(
        <div>
            <header>
                <h2>Login</h2>
                <form action="/login" method="post">
                    <label for="username">Email</label>
                    <input id="username" name="email" type="email" placeholder="john.smith@gmail.com" value={loginInfo.email} onChange={handleChange} />

                    <label for="loginPW">Password</label>
                    <input id="loginPW" name="password" type="password" placeholder="Password" value={loginInfo.pw} onChange={handleChange} />
                </form>
            </header>
        </div>
    );
};

export default Login;