import Link from 'next/link';
import AuthLayout from '../components/AuthLayout';
import { connect } from 'react-redux';
import actions from '../redux/actions';
import initialize from '../utils/initialize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;

class Login extends React.Component {
  constructor({ props }) {
    super(props);
    this.state = {
      email: '',
      password: '',
      hiddenPass: false,
    };

    this.togglePassShow = this.togglePassShow.bind(this);
  }

  togglePassShow() {
    this.setState({ hiddenPass: !this.state.hiddenPass });
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
        <div className="logo">
          <Link href="/"><a><img src="../static/images/transfree-logo.png"/></a></Link>
        </div>
        <div className={"error-container "+(this.props.errorMessage != '' && this.props.errorMessage != undefined ? "error-show" : "") }>
          {this.props.errorMessage}
        </div>
        
        <div className="box-title">Login</div>
        <form className="form-container" onSubmit={this.handleSubmit.bind(this)}>
        <p style={{marginBottom:"15%",color:"grey"}}>Don't you have an account?  <Link href="/signup"><a className="link">Sign up</a></Link></p>
          <label htmlFor="email">Email address</label><br/>
          <input
            type="email"
            id="email"
            placeholder="Enter your email address"
            required
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value })}
          />

        <label htmlFor="email">PASSWORD</label><br/>
        <div className="pass-wrapper">
            <input
                  type={this.state.hiddenPass ? "text" : "password"}
                  id="password"
                  placeholder="Password"
                  autoComplete="new-password"
                  value={this.state.password}
                  onChange={e => this.setState({ password: e.target.value })}
                />
               <i onClick={this.togglePassShow}>{eye}</i>
          </div>
           <p style={{textAlign:"end",marginBottom:"10%"}}><Link href="/forgot"><a className="link">Forgot password ?</a></Link></p>


          <button type="submit" className="btn-primary">{this.props.inProgress ? (
            <FontAwesomeIcon icon="sync-alt" spin style={{width:40,height:40}}/>
          ) : 'Log in'}</button>

        </form>

       <div className="bottom">
          <h1 ><Link href="/forgot"><a className="link">Forgot Password? </a></Link></h1>
          <p>Don't you have an account?  <Link href="/signup"><a className="link">Sign up</a></Link></p>
       </div>
       <p><a className="link" href="/">Back to Home</a></p>
       
        <style jsx>{`
          .form-container input{
            margin-bottom:20px;
          }
         

          .btn-primary{ 
             margin-top:70px;
          }

          .bottom{
            display:none;
          }

          p{
            margin:0px;
          }

          .form-container > label {
            display:none;
            
          }
      
          @media only screen and (max-width: 414px) {
            .logo > a > img{
              display:none;
            }

            
            i {
              position: absolute;
              top: 0%;
              right: 6%;
              // width:10px;
            }

           .form-container p{
              display:none;
            }

            .bottom{
              // margin-bottom:200px;
              display:flex;
              flex-direction:column;
            }

           

            .bottom p{
              color:#FFFFFF;
              font-size:20px;
              font-family: "Open Sans", sans-serif;
              display:flex;
              margin-top:25px;
              // font-weight:700;    
            }

            .bottom h1 > a{
              color:#FFFFFF;
              font-size:23px;
              font-family: "Open Sans", sans-serif;
               font-weight:900;  
               text-decoration:none; 
            }

            .form-container{
              padding:40px 15px 40px 15px;
            }

            .form-container input{
              // margin-bottom:60px;
              font-size:18px;
            }

            .form-container label {
              font-size: 19px;
              text-transform: uppercase;
              display:flex;
              margin-bottom:-10px;
              
            }

            .form-container input,
            .form-container textarea {
              margin-bottom:17px;
            }

            h1{
              color:#000000;
              font-size:23px;
              font-family: "Open Sans", sans-serif;
              font-weight:700;  
              margin-bottom:0px;    
            }

            p{
              display:none;
            }

            .link{
              text-decoration:none;
              color:#FFFFFF;
              font-weight:700;
              font-size:20px;
            }

            
          }

        `}</style>
      </AuthLayout>
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
