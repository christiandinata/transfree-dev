import Link from 'next/link';
import Header from '../components/header.js';

const Signup = () => (
  <div>
    <Header />
    <div className="container-fluid">
      <div className="left">
        <img src="../static/images/transfree-logo.png"/>
      </div>
      <div className="right">
        <h1>Create an account</h1>
        <form className="form-container">
          <label for="fullname">Full name</label><br/>
          <input type="text" id="fullname" placeholder="Enter your full name"/>

          <label for="email">Email address</label><br/>
          <input type="email" id="email" placeholder="Enter your email address"/>

          <label for="password">Password</label><br/>
          <input type="password" id="password" placeholder="Enter a secure password"/>

          <Link href="/phone">
            <a className="btn-primary">Continue</a>
          </Link>
        </form>
        <p>Already have an account? <Link href="/login"><a className="link">Log in</a></Link></p>
      </div>
    </div>
    <style jsx>{`
      .container-fluid {
        display: flex;
        min-height: 100vh;
      }

      .left,
      .right {
        flex-basis: 50%;
      }

      .left {
        background-image: url('../static/images/people.png');
        background-size: cover;
        text-align: center;
      }

      .left img {
        height: 37px;
        margin: 50px auto;
      }

      .right {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      .form-container {
        width: 400px;
        height: auto;
        padding: 30px;
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

      .right p {
        margin: 30px 0;
      }

      .right .link {
        color: #469DDD;
        text-decoration: none;
      }
    `}</style>
  </div>
)

export default Signup
