import Header from '../components/header.js';
import React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import actions from '../redux/actions';
import initialize from '../utils/initialize';

class PhotoVerification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPhotoIdFile: null,
      selectedPhotoFacedFile: null
    }
  }

  onPhotoIdChangeHandler= (e) =>{
    console.log(e.target.files[0]);
    this.setState({
      selectedPhotoIdFile: e.target.files[0],
      loaded: 0,
    })
  }

  onPhotoFaceChangeHandler = (e) =>{
    console.log(e.target.files[0]);
    this.setState({
      selectedPhotoFacedFile: e.target.files[0],
      loaded: 0,
    })
  }

  render() {
    return (
      <div>
        <Header />
        <div className="container-fluid">
          <div className="logo">
            <img src="../static/images/transfree-logo.png"/>
          </div>
          <h1>Photo verification</h1>
          <p>Last step, upload photos according to the intruction below to verify your identity.</p>
          <form className="form-container">
            <div className="form-group files">
              <label>Upload Your File </label>
              <input type="file" className="form-control" multiple=""/>
            </div>
            {
            // <div className="photo-file">
            //   <span>1) Upload or take a photo of your ID Card</span>
            //   <input type="file" onChange={this.onPhotoIdChangeHandler} className="inputfile"/>
            //   <label htmlFor="photo-face">Upload</label><br/>
            // </div>
            //
            // <div className="photo-file">
            //   <span>3) Upload or take a photo of your face while holding the ID card</span>
            //   <input type="file" onChange={this.onPhotoFaceChangeHandler} className="inputfile"/>
            //   <label htmlFor="photo-face">Upload</label><br/>
            // </div>
            }

            <Link href="/account">
              <a className="btn-primary">Continue</a>
            </Link>
          </form>
        </div>
        <style jsx>{`
          .container-fluid {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            align-items: center;
          }

          .logo img {
            height: 28px;
            margin: 50px auto;
          }

          p {
            max-width: 500px;
            text-align: center;
          }

          h1 {
            margin: 0;
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
            margin-top: 30px;
          }

          .photo-file {
            display: flex;
            justify-content: space-around;
            align-items: center;
            margin-bottom: 40px;
          }

          .inputfile {
          	width: 0.1px;
          	height: 0.1px;
          	opacity: 0;
          	overflow: hidden;
          	position: absolute;
          	z-index: -1;
          }

          .inputfile + label {
            font-size: 14px;;
            color: white;
            background-color: #469DDD;
            display: inline-block;
            border-radius: 4px;
            padding: 10px 20px;
            text-transform: none;
            cursor: pointer;
          }

          .inputfile:focus + label,
          .inputfile + label:hover {
            background-color: #5FB4F3;
          }

          .photo-file span {
            flex-basis: 70%;
          }

          .photo-face {
            align-self: flex-end;
          }

          .files input {
              outline: 2px dashed #92b0b3;
              outline-offset: -10px;
              -webkit-transition: outline-offset .15s ease-in-out, background-color .15s linear;
              transition: outline-offset .15s ease-in-out, background-color .15s linear;
              padding: 120px 0px 85px 35%;
              text-align: center !important;
              margin: 0;
              width: 100% !important;
          }
          .files input:focus{     outline: 2px dashed #92b0b3;  outline-offset: -10px;
              -webkit-transition: outline-offset .15s ease-in-out, background-color .15s linear;
              transition: outline-offset .15s ease-in-out, background-color .15s linear; border:1px solid #92b0b3;
           }
          .files{ position:relative}
          .files:after {  pointer-events: none;
              position: absolute;
              top: 60px;
              left: 0;
              width: 50px;
              right: 0;
              height: 56px;
              content: "";
              background-image: url(https://image.flaticon.com/icons/png/128/109/109612.png);
              display: block;
              margin: 0 auto;
              background-size: 100%;
              background-repeat: no-repeat;
          }
          .color input{ background-color:#f1f1f1;}
          .files:before {
              position: absolute;
              bottom: 10px;
              left: 0;  pointer-events: none;
              width: 100%;
              right: 0;
              height: 57px;
              content: " or drag it here. ";
              display: block;
              margin: 0 auto;
              color: #2ea591;
              font-weight: 600;
              text-transform: capitalize;
              text-align: center;
          }

        `}</style>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.authentication.errorMessage,
  }
};

export default connect(
  mapStateToProps,
  actions
)(PhotoVerification);
