import Header from '../components/header.js';
import Link from 'next/link';

const PhoneNumber = () => (
  <div>
    <Header />
    <div className="container-fluid">
      <div className="logo">
        <img src="../static/images/transfree-logo.png"/>
      </div>
      <h1>Phone verification</h1>
      <p>We need to verify your mobile phone number. This number will be used to send important updates.</p>
      <form className="form-container">
        <label for="phone">Phone number</label><br/>
        <input type="tel" id="phone" placeholder="Enter your phone number"/>

        <Link href="/phone-verification">
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
      }
    `}</style>
  </div>
)

export default PhoneNumber
