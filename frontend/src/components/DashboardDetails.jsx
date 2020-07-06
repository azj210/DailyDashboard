import React,  { useState } from 'react';
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
    const [originalDash, setOriginalDash] = useState();

    return (
        props.authenticated ?
        <div>
            <DashboardInfo dashboard={dashboard} setDashboard={setDashboard} originalDash={originalDash} setOriginalDash={setOriginalDash} />
        </div> :
        <LoginError />
    )
};

export default lifecycle(methods)(DashboardDetails);