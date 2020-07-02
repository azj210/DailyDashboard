import React from 'react';
import lifecycle from 'react-pure-lifecycle';

// const componentDidMount = (props) => {
//     props.checkAuth();
// };

// const methods = {
//     componentDidMount
// };

function HomeRedirect (props) {

    props.checkAuth();

    return(
        <div>
        </div>
    );
};

export default HomeRedirect;