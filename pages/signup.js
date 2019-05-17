import Link from 'next/link';
import React from 'react';
import { connect } from 'react-redux';
import AuthLayout from '../components/AuthLayout';
import authActions from '../redux/actions';
import initialize from '../utils/initialize';

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
        <h1>Create an account</h1>
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

          <button type="submit" className="btn-primary">Continue</button>
        </form>
        <p>Already have an account? <Link href="/login"><a className="link">Log in</a></Link></p>
        <style jsx>{`
          .form-container {
            width: 400px;
            height: auto;
            padding: 30px;
            background: #FFFFFF;
            box-shadow: 0 10px 30px 0 rgba(0,0,0,0.10);
            border-radius: 8px;
          }

          .form-container label {
            font-size: 14px;
            text-transform: uppercase;
          }

          .form-container input {
            width: 100%;
            margin-bottom: 30px;
            border: none;
            font-size: 16px;
            padding: 15px 0;
            border-bottom: 1px solid #eaeaea;
            font-family: "Campton-Book", sans-serif;
          }

          .form-container input:focus {
            outline: none;
            border-bottom: 1px solid #469DDD;
          }

          ::placeholder {
            color: #CACACA;
          }

          .btn-primary {
            width: 100%;
            padding: 15px 0;
          }

          .right p {
            margin: 30px 0;
          }

          .right .link {
            color: #469DDD;
            text-decoration: none;
          }
        `}</style>
      </AuthLayout>
    );
  }
}

export default connect(
  state => state,
  authActions
)(Signup);
