import React from 'react';
import { useHistory } from 'react-router-dom';

function HomeRedirect (props) {

    const history = useHistory();

    props.checkAuth();

    return(
        props.authenticated ?
        <div>
            {history.push("/account-home")}
        </div> :
        <div>
            {history.push("/home")}
        </div>
    );
};

export default HomeRedirect;