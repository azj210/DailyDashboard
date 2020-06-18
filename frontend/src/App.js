import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div>
      <Link to="/" className="nav-link">Home</Link>

      { authenticated ? <Route path="/" exact={true} component={AccountHome} /> : <Route path="/" exact={true} component={Home} />}
    </div>
  );
}

export default App;
