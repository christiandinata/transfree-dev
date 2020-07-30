import Header from '../components/header';
import Menu from '../components/menu';
import Link from 'next/link';
import Router from 'next/router';
import { connect } from 'react-redux';
import initialize from '../utils/initialize';
import actions from '../redux/actions';
import { getCookie } from '../utils/cookie';
import PhoneInput from 'react-phone-number-input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AuthLayout from '../components/AuthLayout';

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
        await ctx.store.dispatch(actions.getUser(getCookie('_id', ctx.req),'user',ctx.req));
      }
    }
  }


  handleSubmit(e) {
    e.preventDefault();
    this.props.verify({
      phone: this.state.phone,
      email: this.props.email
    },
      'verify','register'
    );
  }

  handleChange = (value) => {
    this.setState({phone: value});
  }

  // render() {
  //   //console.log(this.props.errorMessage);
  //   return (
  //     <div>
  //       <Header />
  //       <div className="container-fluid">
  //         <div className="logo">
  //           <img src="../static/images/transfree-logo.png"/>
  //         </div>
  //         <h1>Phone verification</h1>
  //         <p>We need to verify your mobile phone number. This number will be used to send important updates.</p>
  //         <div className={"error-container "+(this.props.errorMessage != '' && this.props.errorMessage != undefined ? "error-show" : "") }>
  //           {this.props.errorMessage}
  //         </div>
  //         <form className="form-container" onSubmit={this.handleSubmit.bind(this)}>
  //           <label htmlFor="phone">Phone Number</label><br/>
  //           <PhoneInput
  //             placeholder="Enter phone number"
  //             country="GB"
  //             value={ this.state.phone }
  //             onChange={ phone => this.setState({ phone }) }/>

  //           <button type="submit" className="btn-primary">{this.props.inProgress ? (
  //             <FontAwesomeIcon icon="sync-alt" spin/>
  //           ) : 'Continue'}</button>

  //         </form>
  //       </div>
  //       <style jsx>{`
  //         .container-fluid {
  //           flex-direction: column;
  //         }
  //         `}
  //       </style>
  //     </div>
  //   )
  // }

  render() {
    return (
      <AuthLayout>
        <div className="logo">
          <Link href="/"><a><img src="../static/images/transfree-logo.png"/></a></Link>
        </div>
        <div className={"error-container "+(this.props.errorMessage != '' && this.props.errorMessage != undefined ? "error-show" : "") }>
          {this.props.errorMessage}
        </div>
        
        <div className="box-title">Phone Verification</div>
       
        <form className="form-container" onSubmit={this.handleSubmit.bind(this)}>
        <p>Enter your phone number</p>
             <label htmlFor="phone">Phone Number</label><br/>
             <PhoneInput
              placeholder="Enter phone number"
              country="GB"
              value={ this.state.phone }
              onChange={ phone => this.setState({ phone }) }/>

            <button type="submit" className="btn-primary">{this.props.inProgress ? (
              <FontAwesomeIcon icon="sync-alt" spin/>
            ) : 'Continue'}</button>

          </form>

       <div className="bottom">
          <h1 ><Link href="/forgot"><a className="link">Forgot Password? </a></Link></h1>
            <p>Don't you have an account?<Link href="/signup"><a className="link"> Sign up</a></Link></p>
       </div>
       <p><a className="link" href="/">Back to Home</a></p>
       
        <style jsx>{`
          .form-container input{
            margin-bottom:20px;
          }
          .form-container label {
            display:none;
            
          }

          .btn-primary{ 
             margin-top:70px;
          }

          .bottom{
            display:none;
          }

       
         
      
          @media only screen and (max-width: 414px) {
            .logo img{
              display:none !important;
            }
           .form-container p{
              display:none;
            }

            .bottom{
              margin-bottom:200px;
              display:block;
            }

            .bottom p{
              color:#FFFFFF;
              font-size:20px;
              font-family: "Open Sans", sans-serif;
              // font-weight:700;    
            }

            .bottom p > a{
              color:#FFFFFF;
              font-size:20px;
              font-family: "Open Sans", sans-serif;
               font-weight:700;    
            }

            .form-container{
              padding:40px 15px 40px 15px;
            }

            .form-container input{
              margin-bottom:60px;
              font-size:18px;
            }

            .form-container label {
              font-size: 19px;
              text-transform: uppercase;
              display:flex;
              margin:0px;
              
            }

            .form-container input,
            .form-container textarea {
              padding:0px;
            }

            h1{
              color:#FFFFFF;
              font-size:23px;
              font-family: "Open Sans", sans-serif;
              font-weight:700;  
              margin-bottom:40px;    
            }

            
          }

        `}</style>
      </AuthLayout>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    email: state.user.user_data.email,
    isAuthenticated: !!state.authentication.token,
    inProgress: state.verify.inProgress,
    errorMessage: state.verify.errorMessage

  }
};

export default connect(
  mapStateToProps,
  actions
)(Phone);
