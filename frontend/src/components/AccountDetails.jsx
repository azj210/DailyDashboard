import React from 'react';
import { useHistory } from "react-router-dom";

function AccountDetails(props) {
    const allowed = props.checkAuth();
    
    const history = useHistory();

    return (
        allowed ? 
        <div>
            <Link to="/">Home</Link>
        </div> :
        history.push("/")

    )
};

export default AccountDetails;