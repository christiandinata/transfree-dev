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
    const{email,fullname,password,phone}=this.props.data;
    this.props.register({
        fullname:fullname,
        email:email,
        password:password,
        phone:phone,
        code: this.state.code,
        serviceSid: this.props.serviceSid,
      },
      'register'
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
        <p>Your code valid for <span>60 seconds</span></p>
            <label htmlFor="code">Verification Code</label><br/>
            <input
              type="tel"
              id="partitioned"
              maxLength="6"
              // placeholder="Enter 6-digit verification code"
              value={this.state.code}
              onChange={e => this.setState({ code: e.target.value })}/>
              <div>
                <h2>Enter 6- Digit Code</h2>
                <p style={{fontSize:13}}>No code showing on your phone? <Link href="/"><a className="link">Resend Code</a></Link></p>
              </div>


            <button type="submit" className="btn-primary">{this.props.inProgress ? (
              <FontAwesomeIcon icon="sync-alt" spin style={{width:40,height:40}}/>
            ) : 'Verification Code'}</button>

            <div className="bottom-mobile">
                 
                  <Link href="/"><a><span>Resend Code</span><img src="../static/images/features/resend code_icon.png"/></a></Link>
                  {/* <img src="../static/images/features/resend code_icon.png"/> */}
            </div>
       
          </form>

       <div className="bottom">
          <h1 ><Link href="/forgot"><a className="link">Forgot Password? </a></Link></h1>
            <p>Don't you have an account?<Link href="/signup"><a className="link"> Sign up</a></Link></p>
       </div>

       <div className = "bottom-container-web">
        <div className="left">
          <a href  = "/signup"><img src="../static/images/Sign Up ASSET WEB/Component 2 – 12.png"></img></a>
          <a href></a><img src="../static/images/Sign Up ASSET WEB/Component 2 – 11.png"></img>
          
             
          </div>
          <div className="right">
           {/* <p style={{fontSize:13}}><a className="link" href="/">&lt; Back to Home</a></p> */}
          </div>
        </div>

      
        <style jsx>{`
         h1{
          font-size:20px;
          font-family: "Open Sans", sans-serif;
           font-weight:500;    
        }
            #partitioned {
              padding-left: 9px;
              letter-spacing: 32px;
              border: 0;
              background-image: linear-gradient(to left, black 70%, rgba(255, 255, 255, 0) 0%);
              background-position: bottom;
              background-size: 50px 1px;
              background-repeat: repeat-x;
              background-position-x: 35px;
              width: 280px;
              min-width: 250px;
              font-size:30px;
            }
          .form-container input{
            font-weight:700;
            
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
            font-weight:640;
          }
          .form-container span{
            font-weight:900;
            color:#000000;
          }
          .bottom-mobile{
            display:none;
          }
          .bottom-mobile img{
            height:15%;
            width:15%;
            margin-left:5%;
            // margin-top:6%;
          }

          .bottom-container-web{
            display:flex;
            flex-direction:row;
            // background:blue;
            margin:0 auto;
            width:100%;
            align-items: flex-start;
            justify-content: flex-start;
            align-self: flex-start;
          }
      
          .bottom-container-web .left{
            flex-basis:26%;
            // background:red; 
            display:flex;
            margin-top:1%;
            justify-content: flex-end;
            align-self: flex-start;
          }
      
          .bottom-container-web .right{
            flex-basis:60%;
            // background:yellow;
            text-align:left;
            margin-top:1%;
            align-items: flex-start;
            justify-content: flex-start;
            align-self: flex-start;
            margin-top:-1%;
          }
      
          .bottom-container-web img{
            height:25px;
            width:25px;
            tex-align:center;
          }
          
          a{
            margin:0px;
            padding:0px;
          }
          @media only screen and (max-width: 414px) {
            #partitioned {
              min-width: 210px;
              font-size:30px;
            }
            .form-container h1{
              display:none;
            }
            .form-container p{
              font-size:15px;
              margin:0px;
            }
            .form-container > div  p{
              display:none;
              font-size:90px;
            }
            .btn-primary{
              margin-top:0%;
            }
           .form-container{
            // padding-bottom:30%;
           }
           .bottom-mobile{
             margin-top:40%;
             display:inline-block;
             text-align:right;
            //  background:red;
             vertical-align: middle;
           }
           a{
             text-decoration:none;
            
           }
           .bottom-container-web{
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
    inProgress: state.verify.inProgress,
    data : state.initialDataUser.data_user,
    errorMessage: state.authentication.errorMessage
  }
};

export default connect(
  mapStateToProps,
  actions
)(PhoneVerification);