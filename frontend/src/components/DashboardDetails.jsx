import React from 'react';
import { Link } from "react-router-dom";
import LoginError from './LoginError';

function DashboardDetails(props) {
    props.checkAuth();

    return (
        props.authenticated ?
        <div>
            <Link to="/">Home</Link>
        </div> :
        <LoginError />
        
    )
};

export default DashboardDetails;