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

          <div className={this.props.data.toCurrency == 'idr'
                            || this.props.data.toCurrency == 'myr'
                            || this.props.data.toCurrency == 'krw'
                            || this.props.data.toCurrency == 'hkd'? 'list-item' : 'div-hide'}>
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

          <div className={this.props.data.toCurrency == 'eur'
                            || this.props.data.toCurrency == 'usd'
                            || this.props.data.toCurrency == 'aud' ? 'list-item' : 'div-hide'}>
            <span className="left">IBAN</span>
            <span className="right">{this.props.data.iban}</span>
          </div>

          <div className={this.props.data.toCurrency == 'eur'
                            || this.props.data.toCurrency == 'usd'
                            || this.props.data.toCurrency == 'aud' ? 'list-item' : 'div-hide'}>
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

          h1 {
            margin: 0;
            text-align:center;
          }

          li {
            font-family: "Campton-Book", sans-serif;
          }

          .btn-primary {
            width: 100%;
            padding: 15px 0;
            margin-top: 30px;
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
