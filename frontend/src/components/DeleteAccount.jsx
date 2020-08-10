import React from 'react';
import DataService from '../services/UserServices';
import { useHistory, Link } from 'react-router-dom';
import lifecycle from 'react-pure-lifecycle';
import LoginError from './LoginError';

const componentDidMount = (props) => {
    props.checkAuth();
};

const methods = {
    componentDidMount
};

function DeleteAccount(props) {

    const history = useHistory();

    const confirmedDelete = () => {
        const token = localStorage.getItem("decisionMakerToken");
        const uid = localStorage.getItem("decisionMakerUID");
        DataService.remove(token, uid)
            .then(response => {
                console.log(response);
                DataService.deleteDash(token, uid)
                    .then(response => {
                        console.log(response);
                        DataService.deleteDisplay(token, uid)
                            .then(response => {
                                console.log(response);
                                localStorage.removeItem("decisionMakerToken");
                                localStorage.removeItem("decisionMakerUID")
                                // history.push("/");
                            })
                            .catch(e => {
                                console.log(e);
                            })
                    })
                    .catch(e => {
                        console.log(e);
                    });
            })
            .catch(e => {
                console.log(e);
            });
    }

    return (
        props.authenticated ?
        <div className="homepage-header">
            <h2>Are you sure you want to delete this account?</h2>
            <button className="btn btn-lg btn-secondary" onClick={confirmedDelete}>Delete</button>
            <Link to="/" className="btn btn-lg btn-outline-primary">Home</Link>
        </div> :
        <LoginError />
    );

}

export default lifecycle(methods)(DeleteAccount);