import Link from 'next/link';
import Header from '../../components/header.js';
import Menu from '../../components/menu';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import initialize from '../../utils/initialize';
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
      <div>
        <Header/>
        <div className="container-fluid">
        <h1>Log in to access dashboard</h1>
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
        </div>
        <style jsx>{`
          .container-fluid {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            align-items: center;
          }

          p {
            max-width: 500px;
            text-align: center;
          }

          h1 {
            margin: 100px auto 0;
          }

          .form-container {
            width: 400px;
            height: auto;
            padding: 30px;
            margin: 30px auto;
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

          .error-container {
            width: 400px;
            height: auto;
            padding: 20px;
            background-color: #FF3A43;
            color: #FFF;
            border-radius: 8px;
            display: none;
          }

          .error-show {
            display: block;
          }

        `}</style>
      </div>
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
