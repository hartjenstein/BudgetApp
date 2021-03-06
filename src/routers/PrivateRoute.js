import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { Route, Redirect } from 'react-router-dom';
// PrivateRoute is just a wrapper for Route which we use to determine with if the user should see certain routes or 
// if he should be redirected
// we destructure component, which we passed as a prop into PrivateRoute (on AppRouter Component)
// and we rename it to Component (ES6 stuff) so we can dynamically render all components which were passed in via the prop component into Route 
export const PrivateRoute = ({ isAuthenticated, component: Component, ...rest }) => ( //with the rest parameter we get all remaining props that were passed into Route
  // conditionally rendering the passed in component depending on authentication status
  // passing all available props down, first to route then via the props arguement into the function and to the rendered Component
  <Route {...rest}  component={(props) => ( 
    isAuthenticated ? (
      <div>
      <Header />
        <Component {...props} />
      </div> 
    ) : (
      <Redirect to='/' />
    )
  )}/>
);

const mapStateToProps = (state) => ({
  // boolean true if we are authenticated
  isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PrivateRoute);