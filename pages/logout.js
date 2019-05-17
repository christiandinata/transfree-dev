import { connect } from 'react-redux';
import authActions from '../redux/actions';
import React from 'react';

class Logout extends React.Component {
  componentDidMount() {
    // Session is ended
    this.props.deauthenticate();
    return {};
  } render() {
    return null;
  }
}

export default connect(
  state => state,
  authActions
)(Logout);