import Header from '../components/header';
import Menu from '../components/menu';
import Link from 'next/link';
import { connect } from 'react-redux';
import actions from '../redux/actions';
import initialize from '../utils/initialize';
import { getCookie } from '../utils/cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//Componenet untuk verifikasi nomor handphone
class PhoneVerification extends React.Component {
  constructor({ props }) {
    super(props);
    this.state = {
      service_sid: '',
      code: ''
    };
  }


  static async getInitialProps(ctx) {
    initialize(ctx);
    if (ctx.isServer) {
      if(ctx.req.headers.cookie) {
        await ctx.store.dispatch(actions.getUser(getCookie('_id', ctx.req),'user',ctx.req));
      }
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.check({
        serviceSid: this.props.serviceSid,
        phone: this.props.phone,
        code: this.state.code,
        email: this.props.email
      },
      'check','edit'
    );
  }

  render() {
    return (
      <div>
        <Header />
        <div className="container-fluid">
          <div className="logo">
            <img src="../static/images/transfree-logo.png"/>
          </div>
          <h1>Code Verification</h1>
          <p>Enter 6 digits verification code that we sent to your number {this.props.phone}.</p>
          <form className="form-container" onSubmit={this.handleSubmit.bind(this)}>
            <label htmlFor="code">Verification Code</label><br/>
            <input
              type="tel"
              id="code"
              placeholder="Enter 6-digit verification code"
              value={this.state.code}
              onChange={e => this.setState({ code: e.target.value })}/>

            <button type="submit" className="btn-primary">{this.props.inProgress ? (
              <FontAwesomeIcon icon="sync-alt" spin/>
            ) : 'Continue'}</button>
          </form>
          {// <p>Haven't received the code? <Link href=""><a className="link">Resend code.</a></Link></p>
          }
          <p>Wrong phone number? <Link href="/phone-edit"><a className="link">Enter again.</a></Link></p>
        </div>
        <style jsx>{`
          .container-fluid {
            flex-direction: column;
          }
          `}
        </style>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    serviceSid: state.verify.serviceSid,
    phone: state.user.user_data.phone,
    email: state.user.user_data.email,
    inProgress: state.verify.inProgress,
  }
};

export default connect(
  mapStateToProps,
  actions
)(PhoneVerification);
