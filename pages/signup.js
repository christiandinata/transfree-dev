import Link from 'next/link';
import React from 'react';
import { connect } from 'react-redux';
import AuthLayout from '../components/AuthLayout';
import actions from '../redux/actions';
import initialize from '../utils/initialize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Signup extends React.Component {

  constructor({ props }) {
    super(props);
    this.state = {
      fullname: '',
      email: '',
      password: '',
    };
  }

  static getInitialProps(ctx) {
    initialize(ctx);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.register(
      { fullname: this.state.fullname, email: this.state.email, password: this.state.password },
      'register'
    );
  }

  render() {
    return (
      <AuthLayout>
        <div className="logo">
          <img src="../static/images/transfree-logo.png"/>
        </div>
        <h1>Create an account</h1>
        <div className={"error-container "+(this.props.errorMessage != '' && this.props.errorMessage != undefined ? "error-show" : "") }>
          {this.props.errorMessage}
        </div>
        <form className="form-container" onSubmit={this.handleSubmit.bind(this)}>
          <label htmlFor="fullname">Full name</label><br/>
          <input
            type="text"
            id="fullname"
            placeholder="Enter your full name"
            value={this.state.fullname}
            onChange={e => this.setState({ fullname: e.target.value })}
          />

          <label htmlFor="email">Email address</label><br/>
          <input
            type="email"
            id="email"
            placeholder="Enter your email address"
            autoComplete="username"
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value })}
          />

          <label htmlFor="password">Password</label><br/>
          <input
            type="password"
            id="password"
            placeholder="Enter a secure password"
            autoComplete="new-password"
            value={this.state.password}
            onChange={e => this.setState({ password: e.target.value })}
          />

          <button type="submit" className="btn-primary">{this.props.inProgress ? (
            <FontAwesomeIcon icon="sync-alt" spin/>
          ) : 'Continue'}</button>
        </form>
        <p>Already have an account? <Link href="/login"><a className="link">Log in</a></Link></p>
      </AuthLayout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    inProgress: state.authentication.inProgress,
    errorMessage: state.authentication.errorMessage
  }
};

export default connect(mapStateToProps,actions)(Signup);
