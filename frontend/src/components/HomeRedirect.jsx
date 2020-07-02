import React from 'react';
import { useHistory } from 'react-router-dom';

function HomeRedirect (props) {

    props.checkAuth();

    return(
        <div>
        </div>
    );
};

export default HomeRedirect;