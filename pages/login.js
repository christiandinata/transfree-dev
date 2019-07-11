import Link from 'next/link';
import AuthLayout from '../components/AuthLayout';
import { connect } from 'react-redux';
import actions from '../redux/actions';
import initialize from '../utils/initialize';

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


          <button type="submit" className="btn-primary">Log in</button>

        </form>
        <p>Don't have an account? <Link href="/signup"><a className="link">Sign up</a></Link></p>
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

          .error-container {
            width: 400px;
            height: auto;
            padding: 20px;
            margin-bottom: 30px;
            background-color: #FF3A43;
            color: #FFF;
            border-radius: 8px;
            display: none;
          }

          .error-show {
            display: block;
          }

        `}</style>
      </AuthLayout>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.authentication.errorMessage,
  }
};

export default connect(mapStateToProps,actions)(Login);
