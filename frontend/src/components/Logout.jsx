import React from 'react';
import { useHistory } from 'react-router-dom';
import lifecycle from 'react-pure-lifecycle';

const componentDidMount = () => {
    localStorage.removeItem("decisionMakerToken");
    localStorage.removeItem("decisionMakerUID");
};

const methods = {
    componentDidMount
};

function Logout () {

    const history = useHistory();

    return(
        <div>{history.push("/")}</div>
    );
};

export default lifecycle(methods)(Logout);