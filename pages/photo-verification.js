import Header from '../components/header.js';
import Link from 'next/link';

const PhotoVerification = () => (
  <div>
    <Header />
    <div className="container-fluid">
      <div className="logo">
        <img src="../static/images/transfree-logo.png"/>
      </div>
      <h1>Photo verification</h1>
      <p>Last step, upload photos according to the intruction below to verify your identity.</p>
      <form className="form-container">
        <div className="photo-file">
          <span>1) Upload or take a photo of your face</span>
          <input type="file" id="photo-face" className="inputfile"/>
          <label for="photo-face">Upload</label><br/>
        </div>

        <div className="photo-file">
          <span>2) Upload or take a photo of your ID Card</span>
          <input type="file" id="photo-face" className="inputfile"/>
          <label for="photo-face">Upload</label><br/>
        </div>

        <div className="photo-file">
          <span>3) Upload or take a photo of your face while holding the ID card</span>
          <input type="file" id="photo-face" className="inputfile"/>
          <label for="photo-face">Upload</label><br/>
        </div>


        <Link href="/pending">
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

    `}</style>
  </div>
)

export default PhotoVerification
