import React from 'react';
import { Link } from 'react-router-dom';

function ErrorPage() {
    return (
        <div>
            <h2>There was an error loading the page or performing the action.</h2>
            <Link to="/" className="btn btn-lg btn-secondary">Back to home</Link>
        </div>
    );
}

export default ErrorPage;