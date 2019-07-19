import Header from '../components/header';
import Menu from '../components/menu';
import Link from 'next/link';
import { connect } from 'react-redux';
import actions from '../redux/actions';

class PhoneVerification extends React.Component {
  constructor({ props }) {
    super(props);
    this.state = {
      service_sid: '',
      code: ''
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.check({
        serviceSid: this.props.serviceSid,
        phone: this.props.phone,
        code: this.state.code,
        email: this.props.email
      },
      'check'
    );
  }

  render() {
    return (
      <div>
        <Header />
        <Menu />
        <div className="container-fluid">
          <h1>Phone verification</h1>
          <p>Enter 6 digits verification code that we sent to your number {this.props.phone}.</p>
          <form className="form-container" onSubmit={this.handleSubmit.bind(this)}>
            <label htmlFor="code">Verification code</label><br/>
            <input
              type="tel"
              id="code"
              placeholder="Enter 6-digit verification code"
              value={this.state.code}
              onChange={e => this.setState({ code: e.target.value })}/>

            <button type="submit" className="btn-primary" >Continue</button>
          </form>
          {// <p>Haven't received the code? <Link href=""><a className="link">Resend code.</a></Link></p>
          }
          <p>Wrong phone number? <Link href="/phone"><a className="link">Enter again.</a></Link></p>
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

          .link {
            color: #469DDD;
            text-decoration: none;
          }
        `}</style>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const userData = JSON.parse(state.user.user_data);
  return {
    serviceSid: state.verify.serviceSid,
    phone: userData.phone,
    email: userData.email
  }
};

export default connect(
  mapStateToProps,
  actions
)(PhoneVerification);
