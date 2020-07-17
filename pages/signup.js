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
      // alert("oke pas");
       this.props.register(
        { fullname: this.state.fullname, email: this.state.email, password: this.state.password },
        'register'
      );
      this.setState({
        verifyPassword:true
      })
    }
  }

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
        
        <div className="box-title"><h1>Register</h1></div>
        <form className="form-container" onSubmit={this.handleSubmit.bind(this)}>
        <h1 style={{textAlign:"center"}}>join us</h1>
        <p style={{marginTop:-10,color:"grey"}}>Already have an Account? <a href="">Log In</a></p>
        <input
            type="text"
            id="fullname"
            placeholder="Full Name"
            value={this.state.fullname}
            onChange={e => this.setState({ fullname: e.target.value })}
          />
          <input
            type="email"
            id="email"
            placeholder="Email"
            autoComplete="username"
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value })}
            />
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
        </div>
        <style jsx>{`
        .right .bottom-container p,h5 { 
          display:inline;
          text-align:left;
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
