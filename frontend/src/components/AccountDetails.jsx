import React from 'react';
import { Link } from 'react-router-dom';
import LoginError from './LoginError';

function AccountDetails() {

    const authenticated = false;

    return (
        authenticated ?
        <div>
            <Link to="/">Home</Link>
        </div> :
        <LoginError />
        
    )
};

export default AccountDetails;