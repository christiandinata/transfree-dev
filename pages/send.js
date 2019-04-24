import Header from '../components/header.js';
import MenuCheckout from '../components/menucheckout.js';
import Link from 'next/link';

const Send = () => (
  <div>
    <Header />
    <MenuCheckout />
    <div className="container-fluid">
      <div className="header-progress-container">
        <ol className="header-progress-list">
          <li className="header-progress-item done">Amount</li>
          <li className="header-progress-item todo">Recipient</li>
          <li className="header-progress-item todo">Review</li>
          <li className="header-progress-item todo">Pay</li>
        </ol>
      </div>
      <h1>How much do you want to send?</h1>
      <div className="converter-container">
        <div className="row exchange-container">
          <div className="source-container">
            <p>You send</p>
            <div className="currency-from">
              <span className="flag-icon flag-icon-gb flag-icon-squared"></span> GBP
            </div>
            <input id="money-from" type="text" value="1,000"/>
          </div>
          <div className="destination-container">
            <p>Recipient gets</p>
            <div className="currency-from">
              <span className="flag-icon flag-icon-id flag-icon-squared"></span> IDR
            </div>
            <input id="money-to" type="text" value="18,765,432.10"/>
          </div>
        </div>
        <div className="row rate">
          <span className="rate-desc">GBP/IDR Conversion rate</span> <span className="rate-value">18,765.43 IDR</span>
        </div>
        <div className="row note">
          <p>Your transfer will be processed in less than 24 hours.
          The recipient will get the money on <span className="received-on">5 April</span>.</p>
        </div>
        <div className="row converter-cta">
          <div className="cta-secondary">
            <Link href="">
              <a className="btn-secondary">Compare price</a>
            </Link>
          </div>
          <div className="cta-primary">
            <Link href="/recipient">
              <a className="btn-primary">Continue</a>
            </Link>
          </div>
        </div>
      </div>
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

      .converter-container {
        width: 500px;
        height: auto;
        padding: 30px;
        margin: 30px auto;
        background: #FFFFFF;
        box-shadow: 0 10px 30px 0 rgba(0,0,0,0.10);
        border-radius: 8px;
      }

      .exchange-container {
        display: flex;
      }

      .source-container {
        flex-basis: 50%;
      }

      .destination-container {
        flex-basis: 50%;
      }

      .flag-icon {
        border-radius: 50%;
        border: 1px solid #EAEAEA;
        width: 34px;
        height: 34px;
        margin-right: 10px;
      }

      .currency-from {
        display: flex;
        align-items: center;
        font-size: 20px;
        font-family: 'Campton-Bold', sans-serif;
      }

      input {
        margin-top: 20px;
        width: 100%;
        font-size: 22px;
        font-family: 'Campton-Bold', sans-serif;
        color: #15233C;
        border: none;
        padding: 12px;
        box-sizing: border-box;
        background-color: #ECECEE;
      }

      input:focus {
        outline: none;
      }

      .source-container input {
        border-radius: 4px 0 0 4px;
        border-right: 2px solid #FFF;
      }

      .destination-container input {
        border-radius: 0 4px 4px 0;
      }

      .rate {
        display: flex;
        margin: 20px 0;
      }

      .rate-desc {
        flex-basis: 50%;
      }

      .rate-value {
        flex-basis: 50%;
        text-align: right;
        font-family: 'Campton-Bold', sans-serif;
      }

      .note {
        margin-bottom: 20px;
      }

      .received-on {
        font-family: 'Campton-Bold', sans-serif;
      }

      .converter-cta {
        display: flex;
      }

      .cta-secondary,
      .cta-primary {
        flex-basis: 50%;
        padding: 5px;
      }

      .cta-secondary a,
      .cta-primary a {
        width: 100%;
      }

      .cta-secondary a {
        padding: 8px 0;
      }

      .cta-primary a {
        padding: 10px 0;
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
    `}</style>
  </div>
)

export default Send
