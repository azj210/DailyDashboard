import React from 'react';
import {Link } from 'react-router-dom';

function LogoutError() {
    return (
        <div className="homepage-header">
            <h1>You need to logout to access this page</h1>
            <Link to="/logout" className="btn btn-lg btn-secondary home-button">Logout</Link>
        </div>
    )
}

export default LogoutError;