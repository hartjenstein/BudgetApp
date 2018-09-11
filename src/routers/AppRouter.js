import React from 'react';
import { BrowserRouter, Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import Datenschutzerklaerung from '../components/Datenschutzerklaerung';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

// we added the npm history module which react is already implementing but which can only be accessed from components
// reason is we want to access the browser history here in app.js in order to redirect the user after login authentication

export const history = createHistory();

const AppRouter = () => (
   // switch goes through routes until it finds a match, then stops
    //<BrowserRouter>
    <Router history={history}>
      <div>
        <Switch>
          <PublicRoute path="/" component={LoginPage} exact={true} />
          <PrivateRoute path="/dashboard" component={ExpenseDashboardPage} />
          <PrivateRoute path="/create" component={AddExpensePage} />
          <PrivateRoute path="/edit/:id" component={EditExpensePage} />
          <Route path="/dsgvo" component={Datenschutzerklaerung} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </Router>
   // </BrowserRouter>
);

export default AppRouter;