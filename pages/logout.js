import { connect } from 'react-redux';
import actions from '../redux/actions';
import React from 'react';
import ReactGA from 'react-ga';

export const InitGA = ( ) => {
  console.log('GA init')
  ReactGA.initialize('UA-152856412-1');
}

export const logPageView = () => {
  ReactGA.set({page: window.location.pathname})
  ReactGA.pageview(window.location.pathname)
}

class Logout extends React.Component {
  componentDidMount() {
    InitGA()
    logPageView()
    // Session is ended
    this.props.deauthenticate();
    return {};
  } render() {
    return null;
  }
}

export default connect(
  state => state,
  actions
)(Logout);
