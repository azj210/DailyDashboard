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
    const [display, setDisplay] = useState();

    return (
        props.authenticated ?
        <div>
            <DashboardInfo display={display} setDisplay={setDisplay} dashboard={dashboard} setDashboard={setDashboard} originalDash={originalDash} setOriginalDash={setOriginalDash} />
        </div> :
        <LoginError />
    )
};

export default lifecycle(methods)(DashboardDetails);