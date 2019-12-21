import Link from 'next/link';
import AuthLayout from '../components/AuthLayout';
import { connect } from 'react-redux';
import actions from '../redux/actions';
import initialize from '../utils/initialize';
import {InitGA, logPageView} from '../utils/analytics';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactGA from 'react-ga';

class ResetPassword extends React.Component {
  constructor({ props }) {
    super(props);
    this.state = {
      newPassword: '',
      verifyPassword: '',
      token: ''
    };
  }

  static getInitialProps(ctx) {
    return(ctx.req.query);
    initialize(ctx);
  }

  componentDidMount() {
    this.setState({token: this.props.token});
    InitGA()
    logPageView()
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.resetPassword(
      { newPassword: this.state.newPassword, verifyPassword: this.state.verifyPassword, token: this.state.token },
      'resetPassword'
    );
  }

  render() {
    return (
      <AuthLayout>
        <div className="logo">
          <img src="../static/images/transfree-logo.png"/>
        </div>
        <h1>Reset password</h1>
        <div className={"error-container "+(this.props.errorMessage != '' && this.props.errorMessage != undefined ? "error-show" : "") }>
          {this.props.errorMessage}
        </div>
        <div className={"success-container "+(this.props.successMessage != '' && this.props.successMessage != undefined ? "success-show" : "") }>
          {this.props.successMessage}
        </div>
        { this.props.successMessage != '' && this.props.successMessage != undefined ? (
            <form className="form-container">
              <Link href="/login"><a className="btn-primary">Log in to my account</a></Link>
            </form>
          ) : (
            <form className="form-container" onSubmit={this.handleSubmit.bind(this)}>
              <label htmlFor="newPassword">New password</label><br/>
              <input
                type="password"
                id="newPassword"
                placeholder="Enter new password"
                required
                value={this.state.newPassword}
                onChange={e => this.setState({ newPassword: e.target.value })}
              />

              <label htmlFor="verifyPassword">Confirm new password</label><br/>
              <input
                type="password"
                id="verifyPassword"
                placeholder="Confirm new password"
                required
                value={this.state.verifyPassword}
                onChange={e => this.setState({ verifyPassword: e.target.value })}
              />

              <button type="submit" className="btn-primary">{this.props.inProgress ? (
                <FontAwesomeIcon icon="sync-alt" spin/>
              ) : 'Submit'}</button>

            </form>
          )
        }
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

export default connect(mapStateToProps,actions)(ResetPassword);
