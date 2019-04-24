import Header from '../components/header.js';
import Link from 'next/link';

const IdVerification = () => (
  <div>
    <Header />
    <div className="container-fluid">
      <div className="logo">
        <img src="../static/images/transfree-logo.png"/>
      </div>
      <h1>ID verification</h1>
      <p>According to the regulation from Bank Indonesia, we have to verify your indentity.</p>
      <form className="form-container">
        <label for="id-type">ID Type</label><br/>
        <select id="id-type" className="select-css">
          <option value="0">KTP</option>
          <option value="1">Passport</option>
          <option value="2">SIM</option>
        </select>

        <label for="id-number">ID Number (No. KTP/Passport/SIM)</label><br/>
        <input type="tel" id="id-number" placeholder="Enter ID number"/>

        <label for="fullname">Full name</label><br/>
        <input type="tel" id="fullname" placeholder="Enter your full name (should match your ID)"/>

        <label for="dob">Date of birth</label><br/>
        <input type="tel" id="dob" placeholder="DD/MM/YYYY"/>

        <label for="address">Address</label><br/>
        <textarea id="address" placeholder="Enter your full address"/>

        <Link href="/photo-verification">
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

      .form-container input,
      .form-container textarea {
        width: 100%;
        margin-bottom: 30px;
        border: none;
        font-size: 16px;
        padding: 15px 0;
        border-bottom: 1px solid #eaeaea;
        font-family: "Campton-Book", sans-serif;
      }

      .form-container input:focus,
      .form-container textarea:focus {
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

      .select-css {
        width: 100%;
        margin-bottom: 30px;
        border: none;
        border-radius: 0;
        font-size: 16px;
        padding: 15px 0;
        border-bottom: 1px solid #eaeaea;
        font-family: "Campton-Book", sans-serif;
        display: block;
        box-sizing: border-box;
        -moz-appearance: none;
        -webkit-appearance: none;
        appearance: none;
        background-color: #fff;
        background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');
        background-repeat: no-repeat, repeat;
        background-position: right .7em top 50%, 0 0;
        background-size: .65em auto, 100%;
      }
      .select-css::-ms-expand {
        display: none;
      }
      .select-css:hover {
        border-color: #469DDD;
      }
      .select-css:focus {
        border-color: #469DDD;
        outline: none;
      }
      .select-css option {
        font-weight:normal;
      }
      .
    `}</style>
  </div>
)

export default IdVerification
