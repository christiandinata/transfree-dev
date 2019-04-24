import Header from '../components/header.js';
import MenuCheckout from '../components/menucheckout.js';
import Link from 'next/link';

const Pay = () => (
  <div>
    <Header />
    <MenuCheckout />
    <div className="container-fluid">
      <div className="header-progress-container">
        <ol className="header-progress-list">
          <li className="header-progress-item done">Amount</li>
          <li className="header-progress-item done">Recipient</li>
          <li className="header-progress-item done">Review</li>
          <li className="header-progress-item done">Pay</li>
        </ol>
      </div>
      <h1>Payment</h1>
      <form className="form-container">
        <p className="instruction">Please make a payment of the following amount</p>
        <h2>1,000.34 GBP</h2>
        <p className="instruction">Transfer to this account:</p>
        <div className="payment-details">
          <div className="list-item">
            <span className="left">Bank name</span>
            <span className="right">Lloyds Bank</span>
          </div>

          <div className="list-item">
            <span className="left">Sort code</span>
            <span className="right">12-34-56</span>
          </div>

          <div className="list-item">
            <span className="left">Account number</span>
            <span className="right">987654321</span>
          </div>

          <div className="list-item">
            <span className="left">Account name</span>
            <span className="right">Transfree</span>
          </div>
        </div>

        <p>Please check all of the details above are correct to speed up the process.
        Once you have made a payment, please confirm by clicking the button below.
        We will notify you via email and WhatsApp once your payment has been confirmed.</p>

        <Link href="/payment-pending">
          <a className="btn-primary">I have made a transfer</a>
        </Link>
        <Link href="/">
          <a className="btn-danger">Cancel this transaction</a>
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
      }

      h1 {
        margin: 0;
      }

      li {
        font-family: "Campton-Book", sans-serif;
      }

      // Progress Bar
      .header-progress-container {
        width: 550px;
        padding: 30px 10px 0;
        margin: 50px auto;
      }

      .header-progress-list {
        margin: 0;
        padding: 0;
        list-style-type: none;
      }

      .header-progress-item {
        position: relative;
        display: inline-block;
        width: 135px;
        text-align: center;
        line-height: 3em;
      }
        //Lines
      .header-progress-item:after {
        position: absolute;
        display: block;
        z-index: 1;
        top: -2px;
        left: -65px;
        height: 2px;
        width: 135px;
        content: "";
        background-color: #469DDD;
      }

      // Bullets/Balls
      .header-progress-item:before {
        position: absolute;
        z-index: 2;
        top: -6px;
        left: 65px;
        height: 10px;
        width: 10px;
        border-radius: 1.2em;
        border: none;
        line-height: 1.2em;
        content: " ";
        background-color: #469DDD;
      }

      .header-progress-item:first-child:after {
        display: none;
      }

      .header-progress-item.done {
        color: #469DDD;
      }

      .header-progress-item.todo {
        color: #DDDADD;
      }

      //Lines
      .header-progress-item.todo:after {
        background: #F1F1F1;
      }

      // Bullets/Balls
      .header-progress-item.todo:before {
        background-color: #DADADA;
      }

      .btn-primary {
        width: 100%;
        padding: 15px 0;
        margin-top: 30px;
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

      .list-item {
        display: flex;
        width: 100%;
        margin: 10px 0;
      }

      .list-item span {
        flex-basis: 50%;
      }

      .list-item .right {
        text-align: right;
        color: #15233C;
      }

      .bold {
        font-family: "Campton-Bold", sans-serif;
      }

      hr {
        display: block;
        height: 1px;
        border: 0;
        border-top: 1px solid #eaeaea;
        margin: 30px 0;
        padding: 0;
      }

      .list-item .left {
        opacity: 0.7;
      }

      .instruction {
        text-align: center;
        max-width: 60%;
        margin: 0 auto;
      }

      h2 {
        width: 100%;
        text-align: center;
      }

      .payment-details {
        background-color: #EBF6FB;
        padding: 10px 20px;
        margin: 30px 0;
        border-radius: 8px;
      }

      .btn-danger {
        background: transparent;
        border: 2px solid #DC2020;
        color: #DC2020;
        padding: 8px 18px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        border-radius: 4px;
        transition: 0.2s;
        width: 100%;
        padding: 15px 0;
        margin-top: 15px;
      }

      .btn-danger:hover {
        transform: translateY(-1px);
      }


    `}</style>
  </div>
)

export default Pay
