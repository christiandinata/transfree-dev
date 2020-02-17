import Header from '../components/header.js';
import Link from 'next/link';

const AccountPending = () => (
  <div>
    <Header />
    <div className="logo">
      <img src="../static/images/transfree-logo.png"/>
    </div>
    <div className="container-fluid">
      <div className="content">
        <div className="big-icon">
          <img src="../static/images/document.svg"/>
        </div>
        <h1>Awaiting confirmation</h1>
        <p>We are now reviewing your account details. We will send you an email & WhatsApp message once the verification process is completed.</p>

        <Link href="/">
          <a className="btn-primary">Back to home</a>
        </Link>
      </div>
    </div>
    <style jsx>{`
      .container-fluid {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        align-items: center;
        justify-content: center;
      }

      .logo {
        width: 100%;
        text-align: center;
      }
      .logo img {
        height: 28px;
        margin: 50px auto;
      }

      p {
        max-width: 600px;
        text-align: center;
        margin-bottom: 50px;
      }

      h1 {
        margin: 0;
      }

      .content {
        margin-top: -135px;
        text-align: center;
      }
    `}</style>
  </div>
)

export default AccountPending
