import React from 'react';
import {Link } from 'react-router-dom';

function LoginError() {
    return (
        <div className="homepage-header">
            <h1>You need to login to access this page</h1>
            <Link to="/sign-up" className="btn btn-lg btn-outline-primary home-button">Sign Up</Link>
            <Link to="/login" className="btn btn-lg btn-secondary home-button">Login</Link>
        </div>
    )
}

export default LoginError;