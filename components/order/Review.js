import Link from 'next/link';
import NumberFormat from 'react-number-format';
import { connect } from 'react-redux';
import orderActions from '../../redux/actions';

class Review extends React.Component {
  saveAndContinue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  }

  render() {
    return (
      <div>
        <h1>Please review these details</h1>
        <form className="form-container">
          <div className="list-header">
            <span className="left">Transfer Details</span>
            <span className="right"><Link href="/order"><a className="link">Change</a></Link></span>
          </div>

          <div className="list-item">
            <span className="left">You send</span>
            <span className="right bold"><NumberFormat displayType={'text'} thousandSeparator={true} decimalScale={2} value={this.props.data.fromAmount} /> {this.props.data.fromCurrency.toUpperCase()}</span>
          </div>

          <div className="list-item">
            <span className="left">{this.props.data.fromCurrency.toUpperCase()}/{this.props.data.toCurrency.toUpperCase()} Conversion rates</span>
            <span className="right"><NumberFormat displayType={'text'} thousandSeparator={true} decimalScale={8} value={this.props.data.rate} /></span>
          </div>

          <div className="list-item">
            <span className="left">Recipient gets</span>
            <span className="right bold"><NumberFormat displayType={'text'} thousandSeparator={true} decimalScale={2} value={this.props.data.toAmount} /> {this.props.data.toCurrency.toUpperCase()}</span>
          </div>

          <div className="list-item">
            <span className="left">Arrive in</span>
            <span className="right">24 hours</span>
          </div>

          <hr/>

          <div className="list-header">
            <span className="left">Recipient</span>
            <span className="right"><Link href=""><a className="link" onClick={this.props.previousStep}>Change</a></Link></span>
          </div>

          <div className="list-item">
            <span className="left">Email address</span>
            <span className="right">{this.props.data.email}</span>
          </div>

          <div className="list-item">
            <span className="left">Full name</span>
            <span className="right">{this.props.data.name}</span>
          </div>

          <div className="list-item">
            <span className="left">Bank name</span>
            <span className="right">{this.props.data.bankName}</span>
          </div>

          <div className={this.props.data.toCurrency == 'idr' ? 'list-item' : 'div-hide'}>
            <span className="left">Account number</span>
            <span className="right">{this.props.data.bankAccountNumber}</span>
          </div>

          <div className={this.props.data.toCurrency == 'gbp' ? 'list-item' : 'div-hide'}>
            <span className="left">Sort code</span>
            <span className="right">{this.props.data.sortcode}</span>
          </div>

          <div className={this.props.data.toCurrency == 'gbp' ? 'list-item' : 'div-hide'}>
            <span className="left">Account number</span>
            <span className="right">{this.props.data.accountNumber}</span>
          </div>

          <div className={this.props.data.toCurrency == 'eur' || this.props.data.toCurrency == 'usd' || this.props.data.toCurrency == 'aud' ? 'list-item' : 'div-hide'}>
            <span className="left">IBAN</span>
            <span className="right">{this.props.data.iban}</span>
          </div>

          <div className={this.props.data.toCurrency == 'eur' || this.props.data.toCurrency == 'usd' || this.props.data.toCurrency == 'aud' ? 'list-item' : 'div-hide'}>
            <span className="left">SWIFT</span>
            <span className="right">{this.props.data.swift}</span>
          </div>

          <Link href="">
            <a className="btn-primary" onClick={this.saveAndContinue}>Continue</a>
          </Link>
        </form>
        <style jsx>{`
          .div-hide {
            display: none;
          }

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
            text-align:center;
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
            width: 500px;
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
  }
}

export default connect(
  state => state,
  orderActions
)(Review);
