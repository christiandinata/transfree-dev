import Link from 'next/link';
import { connect } from 'react-redux';
import Header from '../components/header';
import actions from '../redux/actions';
import initialize from '../utils/initialize';
import NumberFormat from 'react-number-format';

//Menampilkan tulisan-tulisan dibawah dengan style
const ReceiptLayout = (props) => {
  return (
    <div>
      <Header />
      <div className="container">
        <div className="logo">
          <Link href="/"><a><img src="../static/images/transfree-logo.png" alt="Logo"/></a></Link>
        </div>

        <h2>Transfer Confirmation</h2>
        <div className="divider"></div>
        <div className="list-item">
          <div className="caption">Amount paid by {props.order.senderName}</div>
          <div className="content"><NumberFormat displayType={'text'} thousandSeparator={true} decimalScale={2} value={props.order.fromAmount} /> {props.order.fromCurrency.toUpperCase()}</div>
        </div>
        <div className="list-item">
          <div className="caption">Amount converted</div>
          <div className="content"><NumberFormat displayType={'text'} thousandSeparator={true} decimalScale={2} value={props.order.fromAmount} /> {props.order.fromCurrency.toUpperCase()}</div>
        </div>
        <div className="list-item">
          <div className="caption">Converted and sent to {props.order.name}</div>
          <div className="content"><NumberFormat displayType={'text'} thousandSeparator={true} decimalScale={2} value={props.order.toAmount} /> {props.order.toCurrency.toUpperCase()}</div>
        </div>

        <h2>Sent to</h2>
        <div className="divider"></div>
        <div className="list-item">
          <div className="caption">Name</div>
          <div className="content">{props.order.name}</div>
        </div>
        {props.order.email != '' ? (
          <div className="list-item">
            <div className="caption">Email</div>
            <div className="content">{props.order.email}</div>
          </div>
        ) : ''}
        <div className="list-item">
          <div className="caption">Account details</div>
          {props.order.toCurrency == 'idr' || props.order.toCurrency == 'myr' || props.order.toCurrency == 'krw' || props.order.toCurrency == 'hkd'? (<div className="content">{props.order.bankName}<br/>{props.order.bankAccountNumber}</div>) : ''}
          {props.order.toCurrency == 'gbp' ? (<div className="content">{props.order.bankName}<br/>{props.order.sortcode}<br/>{props.order.accountNumber}</div>) : ''}
          {props.order.toCurrency == 'eur' || props.order.toCurrency == 'usd' || props.order.toCurrency == 'aud'? (<div className="content">{props.order.bankName}<br/>{props.order.swift}<br/>{props.order.iban}</div>) : ''}
        </div>
        <button className="btn-primary" onClick={() => window.print()}>PRINT</button>
      </div>
    <style jsx>{`
      .container {
        display: flex;
        flex-direction: column;
        padding: 20px;
      }

      .logo {
        align-self: center;
      }

      .logo img {
        margin: 10px auto;
      }

      h2 {
        margin-bottom: 0;
      }

      .divider {
        border-bottom: 1px solid #ccc;
        margin-bottom: 10px;
      }

      .list-item {
        margin-bottom: 20px;
      }

      .list-item .caption {
        font-size: 14px;
      }

      .list-item .content {
        font-size: 18px;
        color: #15233C;
      }

      @media print {
          button {
            display: none;
          }
      }



    `}</style>
    </div>
  )

}
//Menerima argumen dari luar
class Receipt extends React.Component {
  constructor({ props }) {
    super(props);
  }

  static async getInitialProps(ctx) {
    initialize(ctx);
    await ctx.store.dispatch(actions.getOrderById(ctx.req.query.oid,'getOrderById',ctx.req));
  }

  render() {
    return (
      <ReceiptLayout order={this.props.order}/>
    )
  }

}


const mapStateToProps = (state) => {
  return {
    order: state.order.order
  }
};

//Mengirimkan reciept
export default connect(mapStateToProps,actions)(Receipt);
