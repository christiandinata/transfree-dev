import Header from '../components/header';
import Menu from '../components/menu';
import Link from 'next/link';
import Router from 'next/router';
import { connect } from 'react-redux';
import initialize from '../utils/initialize';
import actions from '../redux/actions';
import { getCookie } from '../utils/cookie';
import PhoneInput from 'react-phone-number-input';

class Phone extends React.Component {
  constructor({ props }) {
    super(props);
    this.state = {
      phone: '+44',
    };
  }

  static async getInitialProps(ctx) {
    initialize(ctx);
    if (ctx.isServer) {
      if(ctx.req.headers.cookie) {
        await ctx.store.dispatch(actions.getUser(getCookie('_id', ctx.req),'user'));
      }
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.verify({
      phone: this.state.phone,
      email: this.props.email
    },
      'verify'
    );
  }

  handleChange = (value) => {
    this.setState({phone: value});
  }

  render() {
    return (
      <div>
        <Header />
        <Menu />
        <div className="container-fluid">
          <h1>Phone verification</h1>
          <p>We need to verify your mobile phone number. This number will be used to send important updates.</p>
          <form className="form-container" onSubmit={this.handleSubmit.bind(this)}>
            <label htmlFor="phone">Phone number</label><br/>
            <PhoneInput
              placeholder="Enter phone number"
              country="GB"
              value={ this.state.phone }
              onChange={ phone => this.setState({ phone }) }/>

            <button type="submit" className="btn-primary">Continue</button>

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
        `}</style>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const userData = JSON.parse(state.user.user_data);
  return {
    email: userData.email,
    isAuthenticated: !!state.authentication.token
  }
};

export default connect(
  mapStateToProps,
  actions
)(Phone);
