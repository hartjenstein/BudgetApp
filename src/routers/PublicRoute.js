import React from 'react';
import { connect } from 'react-redux';
import LoginPage from '../components/LoginPage';
import { Route, Redirect } from 'react-router-dom';
// PrivateRoute is just a wrapper for Route which we use to determine with if the user should see certain routes or 
// if he should be redirected
// we destructure component, which we passed as a prop into PrivateRoute (on AppRouter Component)
// and we rename it to Component (ES6 stuff) so we can dynamically render all components which were passed in via the prop component into Route 
export const PublicRoute = ({ isAuthenticated, component: Component, ...rest }) => (
 // ...rest and ...props are the same - all remaining props (except detructured ones) are getting passed down
  <Route {...rest}  component={(props) => ( //with the prop parameter we get all the props that were passed into Route
    !isAuthenticated ? (
      <Component {...props} />
    ) : (
      <Redirect to='/dashboard' />
    )
  )}/>
);

const mapStateToProps = (state) => ({
  // boolean true if we are authenticated
  isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PublicRoute);