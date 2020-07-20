import Header from '../components/header';
import Menu from '../components/menu';
import Link from 'next/link';
import { connect } from 'react-redux';
import actions from '../redux/actions';
import initialize from '../utils/initialize';
import { getCookie } from '../utils/cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AuthLayout from '../components/AuthLayout';

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
      'check','register'
    );
  }

  render() {
    return (
      <AuthLayout>
        <div className="logo">
          <Link href="/"><a><img src="../static/images/transfree-logo.png"/></a></Link>
        </div>
        <div className={"error-container "+(this.props.errorMessage != '' && this.props.errorMessage != undefined ? "error-show" : "") }>
          {this.props.errorMessage}
        </div>
        
        <div className="box-title">Code Verification</div>
        
        <form className="form-container" onSubmit={this.handleSubmit.bind(this)}>
        <h1>Join us</h1>
        <p>We have succesfully sent the code</p>
        <p>Your code valid for 60 seconds</p>
            <label htmlFor="code">Verification Code</label><br/>
            <input
              type="tel"
              id="code"
              // placeholder="Enter 6-digit verification code"
              value={this.state.code}
              onChange={e => this.setState({ code: e.target.value })}/>
              <h2>Enter 6- Digit Code</h2>
              <p style={{fontSize:13}}>No code showing on your phone? <Link href="/"><a className="link">Resend Code</a></Link></p>


            <button type="submit" className="btn-primary">{this.props.inProgress ? (
              <FontAwesomeIcon icon="sync-alt" spin/>
            ) : 'Continue'}</button>
          </form>

       <div className="bottom">
          <h1 ><Link href="/forgot"><a className="link">Forgot Password? </a></Link></h1>
            <p>Don't you have an account?<Link href="/signup"><a className="link"> Sign up</a></Link></p>
       </div>
       
        <style jsx>{`
          .form-container input{
            // margin-bottom:20px;
            text-align:center;
          }
          .form-container label {
            display:none;
            
          }

          .btn-primary{ 
             margin-top:20px;
          }

          .bottom{
            display:none;
          }

          p{
            font-size:10px;
            color:grey;
          
          }

          h2{
            color:#707070;
            font-size:15px;
            margin-bottom:20%;
          }

         

       
         
      
          @media only screen and (max-width: 414px) {
            .form-container{
              display:none;
            }
          }

        `}</style>
      </AuthLayout>
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
