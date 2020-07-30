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
        <div className="box-title">Account Recovery</div>
        <form className="form-container" onSubmit={this.handleSubmit.bind(this)}>
          <label htmlFor="email">Email address</label><br/>
          <input
            type="email"
            id="email"
            placeholder="Email"
            autoComplete="username"
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value })}
            />

          <button type="submit" className="btn-primary">{this.props.inProgress ? (
            <FontAwesomeIcon icon="sync-alt" spin/>
          ) : 'Send'}</button>

        </form>
        <style jsx>{`
          .form-container input{
            margin-bottom:20px;
            margin-top:50px;
          }

          @media only screen and (max-width: 414px) {
            .form-container input{
              margin-bottom:10px;
              margin-top:-10px;
            }

            .form-container label {
              font-size: 19px;
              text-transform: uppercase;
              display:flex;
              margin-top:20px;
              
            }
        `}</style>
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
