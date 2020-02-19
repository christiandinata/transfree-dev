import Link from 'next/link';
import AuthLayout from '../components/AuthLayout';
import { connect } from 'react-redux';
import actions from '../redux/actions';
import initialize from '../utils/initialize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Login extends React.Component {
  constructor({ props }) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }


  static getInitialProps(ctx) {
    initialize(ctx);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.authenticate(
      { email: this.state.email, password: this.state.password },
      'login'
    );
  }



  render() {
    return (
      <AuthLayout>
        <div className="logo">
          <Link href="/"><a><img src="../static/images/transfree-logo.png"/></a></Link>
        </div>
        <h1>Log in</h1>
        <div className={"error-container "+(this.props.errorMessage != '' && this.props.errorMessage != undefined ? "error-show" : "") }>
          {this.props.errorMessage}
        </div>
        <form className="form-container" onSubmit={this.handleSubmit.bind(this)}>
          <label htmlFor="email">Email address</label><br/>
          <input
            type="email"
            id="email"
            placeholder="Enter your email address"
            required
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value })}
          />

          <label htmlFor="password">Password</label><br/>
          <input
            type="password"
            id="password"
            placeholder="Enter a secure password"
            required
            value={this.state.password}
            onChange={e => this.setState({ password: e.target.value })}
          />


          <button type="submit" className="btn-primary">{this.props.inProgress ? (
            <FontAwesomeIcon icon="sync-alt" spin/>
          ) : 'Log in'}</button>

        </form>
        <p><Link href="/forgot"><a className="link">Forgot password?</a></Link></p>
        <p>Don't have an account? <Link href="/signup"><a className="link">Sign up</a></Link></p>
      </AuthLayout>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    inProgress: state.authentication.inProgress,
    errorMessage: state.authentication.errorMessage
  }
};

export default connect(mapStateToProps,actions)(Login);
