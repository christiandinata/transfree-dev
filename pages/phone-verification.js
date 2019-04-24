import Header from '../components/header.js';
import Link from 'next/link';

const PhoneVerification = () => (
  <div>
    <Header />
    <div className="container-fluid">
      <div className="logo">
        <img src="../static/images/transfree-logo.png"/>
      </div>
      <h1>Phone verification</h1>
      <p>Enter 6 digits verification code that we sent to your number 0987654321.</p>
      <form className="form-container">
        <label for="code">Verification code</label><br/>
        <input type="tel" id="code" placeholder="Enter 6-digit verification code"/>

        <Link href="/id-verification">
          <a className="btn-primary">Continue</a>
        </Link>
      </form>
      <p>Haven't received the code? <Link href=""><a className="link">Resend code.</a></Link></p>
      <p>Wrong phone number? <Link href=""><a className="link">Enter again.</a></Link></p>
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

      .link {
        color: #469DDD;
        text-decoration: none;
      }
    `}</style>
  </div>
)

export default PhoneVerification
