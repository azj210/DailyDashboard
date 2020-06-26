import React from 'react';
import { Link, Route } from 'react-router-dom';
import { useHistory } from "react-router-dom";

function AccountDetails(props) {
    const allowed = props.checkAuth();
    
    const history = useHistory();

    return (
        allowed ? 
        <div>
            <Link to="/">Home</Link>
        </div> :
        <div>
            {history.push("/")}
        </div>

    )
};

export default AccountDetails;