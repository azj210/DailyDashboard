import React,  { useState } from 'react';
import { Link } from "react-router-dom";
import LoginError from './LoginError';
import DashboardInfo from './DashboardInfo';
import lifecycle from 'react-pure-lifecycle';

const componentDidMount = (props) => {
    props.checkAuth();
};

const methods = {
    componentDidMount
};

function DashboardDetails(props) {

    const [dashboard, setDashboard] = useState();

    return (
        props.authenticated ?
        <div>
            <DashboardInfo dashboard={dashboard} setDashboard={setDashboard} />
        </div> :
        <LoginError />
    )
};

export default lifecycle(methods)(DashboardDetails);