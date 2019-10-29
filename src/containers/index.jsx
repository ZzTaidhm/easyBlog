import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import routesArray from '../routes';
const history = createBrowserHistory();
class PagesIndex extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    {routesArray.map((route, index) => (
                        <Route key={`${route.path}-${index}`} exact path={route.path} component={route.component} />
                    ))}
                    <Redirect from="" to="/notFound" />
                </Switch>
            </Router>
        )
    }
}

export default PagesIndex;