import Header from '../components/header.js';
import MenuCheckout from '../components/menucheckout.js';
import Link from 'next/link';

const Review = () => (
  <div>
    <Header />
    <MenuCheckout />
    <div className="container-fluid">
      <div className="header-progress-container">
        <ol className="header-progress-list">
          <li className="header-progress-item done">Amount</li>
          <li className="header-progress-item done">Recipient</li>
          <li className="header-progress-item done">Review</li>
          <li className="header-progress-item todo">Pay</li>
        </ol>
      </div>
      <h1>Please review these details</h1>
      <form className="form-container">
        <div className="list-header">
          <span className="left">Transfer Details</span>
          <span className="right"><Link href="/send"><a className="link">Change</a></Link></span>
        </div>

        <div className="list-item">
          <span className="left">You send</span>
          <span className="right bold">1,000 GBP</span>
        </div>

        <div className="list-item">
          <span className="left">Conversion rates</span>
          <span className="right">19,876.54</span>
        </div>

        <div className="list-item">
          <span className="left">Recipient gets</span>
          <span className="right bold">19,876,543,20 IDR</span>
        </div>

        <div className="list-item">
          <span className="left">Arrive in</span>
          <span className="right">20 minutes</span>
        </div>

        <hr/>

        <div className="list-header">
          <span className="left">Recipient</span>
          <span className="right"><Link href="/recipient"><a className="link">Change</a></Link></span>
        </div>

        <div className="list-item">
          <span className="left">Email address</span>
          <span className="right">johndoe@example.com</span>
        </div>

        <div className="list-item">
          <span className="left">Full name</span>
          <span className="right">John Doe</span>
        </div>

        <div className="list-item">
          <span className="left">Bank name</span>
          <span className="right">Bank Mandiri</span>
        </div>

        <div className="list-item">
          <span className="left">Account number</span>
          <span className="right">908976525271</span>
        </div>

        <Link href="/pay">
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

      .list-header {
        display: flex;
        width: 100%;
        font-size: 14px;
        margin-bottom: 30px;
      }

      .list-header span {
        flex-basis: 50%;
      }

      .list-header .left {
        text-transform: uppercase;
      }

      .list-header .right {
        text-align: right;
      }

      .list-header a {
        text-decoration: none;
        color: #469DDD;
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

    `}</style>
  </div>
)

export default Review
