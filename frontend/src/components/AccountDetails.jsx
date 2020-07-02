import React from 'react';
import { Link } from 'react-router-dom';
import LoginError from './LoginError';
import lifecycle from 'react-pure-lifecycle'

const componentDidMount = (props) => {
    props.checkAuth();
};

const methods = {
    componentDidMount
};

function AccountDetails(props) {

    return (
        props.authenticated ?
        <div>
            <Link to="/">Home</Link>
        </div> :
        <LoginError />
        
    )
};

export default lifecycle(methods)(AccountDetails);