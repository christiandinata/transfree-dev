import Link from 'next/link';
import AuthLayout from '../components/AuthLayout';
import { connect } from 'react-redux';
import actions from '../redux/actions';
import initialize from '../utils/initialize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Forgot extends React.Component {
  constructor({ props }) {
    super(props);
    this.state = {
      email: ''
    };
  }
  
  static getInitialProps(ctx) {
    initialize(ctx);
  }


  handleSubmit(e) {
    e.preventDefault();
    this.props.forgot(
      { email: this.state.email },
      'forgot'
    );
  }

  render() {
    return (
      <AuthLayout>
        <div className="logo">
          <Link href="/"><a><img src="../static/images/transfree-logo.png"/></a></Link>
        </div>
        <h1>Forgot password</h1>
        <p>Enter your email. We will send password reset instruction to your email.</p>
        <div className={"error-container "+(this.props.errorMessage != '' && this.props.errorMessage != undefined ? "error-show" : "") }>
          {this.props.errorMessage}
        </div>
        <div className={"success-container "+(this.props.successMessage != '' && this.props.successMessage != undefined ? "success-show" : "") }>
          {this.props.successMessage}
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

          <button type="submit" className="btn-primary">{this.props.inProgress ? (
            <FontAwesomeIcon icon="sync-alt" spin/>
          ) : 'Send instruction'}</button>

        </form>
      </AuthLayout>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    inProgress: state.authentication.inProgress,
    errorMessage: state.authentication.errorMessage,
    successMessage: state.authentication.successMessage
  }
};

export default connect(mapStateToProps,actions)(Forgot);
