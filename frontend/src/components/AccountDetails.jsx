import React from 'react';
import { useHistory, Link } from "react-router-dom";

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