import React from "react";
import logo from "./logo.svg";
import { Route, Switch, Redirect, Router } from "react-router-dom";
import { createBrowserHistory } from 'history'
import Home from "./views/Home/HomeContainer";
import Dashboard from "./views/Dashboard/Dashboard";
import "./App.css";

const history = createBrowserHistory()

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/dashboard" component={Dashboard} />
          <Route exact path="/" component={Home} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
