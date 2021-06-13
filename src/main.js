import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Map from "./components/Map/Map"
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

function App() {

    return (
        <Router>
            <Navbar />
            <Switch>
                <Route path='/' exact component={Map} />
                <Redirect to="/" />
            </Switch>
        </Router>
    );
}

export default App;
