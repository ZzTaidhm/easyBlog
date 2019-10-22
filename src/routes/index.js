import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import App from '../App';
import UserList from '../containers/UserList';
const history = createBrowserHistory();

class RootRouter extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={App} />
                    <Route path="/user" component={UserList} />
                    <Redirect from="" to="/notFound" />
                </Switch>
            </Router>
        );
    }
}

export default RootRouter;