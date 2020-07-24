import Link from 'next/link';
import React from 'react';
import { connect } from 'react-redux';
import AuthLayout from '../components/AuthLayout';
import actions from '../redux/actions';
import initialize from '../utils/initialize';
import PhoneInput from 'react-phone-number-input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;


class Signup extends React.Component {

  constructor({ props }) {
    super(props);
    this.state = {
      fullname: '',
      email: '',
      password: '',
      phone:'+44',
      confirmPassword:'',
      verifyPassword: true,
      hiddenPass: false,
      hiddenConfirm: false,
    };

    this.togglePassShow = this.togglePassShow.bind(this);
    this.toggleConfirmShow = this.toggleConfirmShow.bind(this);
   
  }

  togglePassShow() {
    this.setState({ hiddenPass: !this.state.hiddenPass });
  }

  toggleConfirmShow() {
    this.setState({ hiddenConfirm: !this.state.hiddenConfirm });
  }

  static getInitialProps(ctx) {
    initialize(ctx);
  }

  handlePassword = () =>{
    if (this.state.password != this.state.confirmPassword) {
      this.setState({
        verifyPassword:false
      })
    }
  }


  handleSubmit(e) {
    e.preventDefault();
    if (this.state.password != this.state.confirmPassword) {
      this.setState({
        verifyPassword:false
      })
    }else{
      e.preventDefault();
      this.props.verify({
        phone: this.state.phone,
        email: this.state.email,
        fullname: this.state.fullname,
        password:this.state.password,
      },
        'verify'
      );
      this.setState({
        verifyPassword:true
      })
    }
  }

  // handleSubmit(e) {
  //   e.preventDefault();
  //   this.props.authenticate(
  //     { email: this.state.email, password: this.state.password },
  //     'login'
  //   );
  // }

  render() {
    return (
      <AuthLayout>
        <div className="logo">
          <Link href="/"><a><img src="../static/images/transfree-logo.png"/></a></Link>
        </div>
        {/* <h1>Register</h1> */}
        <div className={"error-container "+(this.props.errorMessage != '' && this.state.email == '' && this.props.errorMessage != undefined ? "error-show" : "") }>
          {this.props.errorMessage}
        </div>
        <div className={"error-container "+(this.props.errorMessage != ' '&& this.state.verifyPassword == false ? "error-show" : "") }>
          Password and Confirm Password not match
        </div>
        
        <div className="box-title">Register</div>
        <form className="form-container" onSubmit={this.handleSubmit.bind(this)}>
        <h1 style={{marginTop:10,textAlign:"center"}}>Join us</h1>
        <p style={{marginTop:-10,fontSize:15,color:"grey"}}>Already have an Account? <a className="link" href="/login">Log In</a></p>
        <label htmlFor="email">FULL NAME</label>
        <input
            type="text"
            id="fullname"
            placeholder="Full Name"
            value={this.state.fullname}
            onChange={e => this.setState({ fullname: e.target.value })}
          />
        <label htmlFor="email">EMAIL ADDRESS</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            autoComplete="username"
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value })}
            />
        <label htmlFor="email">PASSWORD</label>
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

          <label htmlFor="email">CONFIRM PASSWORD</label>
          <div className="pass-wrapper">
            <input
                  type={this.state.hiddenConfirm ? "text" : "password"}
                  id="confirm-password"
                  placeholder="Confirm Password"
                  autoComplete="new-password"
                  value={this.state.confirmPassword}
                  onChange={e => this.setState({ confirmPassword: e.target.value })}
                />
                <i onClick={this.toggleConfirmShow}>{eye}</i>
          </div>
          <label htmlFor="email">PHONE NUMBER</label>
          <PhoneInput
              placeholder="Enter phone number"
              country="GB"
              value={ this.state.phone }
              onChange={ phone => this.setState({ phone }) }/>

          <button type="submit" className="btn-primary">{this.props.inProgress ? (
            <FontAwesomeIcon icon="sync-alt" spin style={{width:40,height:40}}/>
          ) : 'Continue'}</button>
        </form>
        <div className="bottom-container">
          <p>Already have an Account?  <a href="/login"> Log In</a></p>
        </div>
        <p><a className="link" href="/">Back to Home</a></p>
        
        <style jsx>{`
        .right .bottom-container p,h5 { 
          display:inline;
          text-align:left;
        }
        .form-container label{
          display:none;
        }
        .form-container input{
          margin-bottom:10px;
        }
        .pass-wrapper{
          margin-bottom:0px;
        }
        i {
          position: absolute;
          top: 20%;
          right: 6%;
          // width:10px;
        }
        
        p{
          margin:0px;
        }
        .bottom-container{
          display:none;
        }
        @media only screen and (max-width: 414px) {
          .logo img{
            display:none;
          }
          .box-title{
            margin-top:30px;
          }
          .form-container h1,p{
            display:none;
          }
          .bottom-container p{
            display:flex;
            font-size:20px;
            color:#FFFFFF;
          }
          .bottom-container{
            display:block;
          }
       
          .form-container label {
            font-size: 19px;
            text-transform: uppercase;
            display:flex;
            // margin-bottom:-15px;
            
          }
          // .pass-wrapper{
          //   margin-top:20px;
          // }
          .form-container input{
            // margin-bottom:60px;
            font-size:18px;
          }
          .bottom-container p > a{
            color:#FFFFFF;
            font-size:20px;
            font-family: "Open Sans", sans-serif;
             font-weight:900;    
          }
        }
    `}</style>
      </AuthLayout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    inProgress: state.authentication.inProgress,
    errorMessage: state.authentication.errorMessage
  }
};

export default connect(mapStateToProps,actions)(Signup);