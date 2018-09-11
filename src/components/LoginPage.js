import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';
import CookieBanner from 'react-cookie-banner';

export const LoginPage = ({ startLogin }) => (
    <div className="box-layout">
      <div className="box-layout__box">
        <h1 className="box-layout__title">Budget Control</h1>
        <p>It's time to get your Expenses under control</p>
        <button className="button button--login" onClick={startLogin} >Login with Google</button>
      </div>
      <CookieBanner
      styles={{
        banner: { backgroundColor: 'rgba(60, 60, 60, 0.8)', position: 'fixed', top: 0, left: 0 },
        message: { fontWeight: 400 }
      }}
        message="We use cookies to give you the best online experience.
        Please let us know if you agree."
        onAccept={() => {}}
        cookie="user-has-accepted-cookies" />
    </div>
);


const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);