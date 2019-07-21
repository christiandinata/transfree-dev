import Link from 'next/link';
import Header from '../../components/header.js';
import MenuAdmin from '../../components/menuAdmin.js';
import Router from 'next/router';
import { connect } from 'react-redux';
import initialize from '../../utils/initialize';
import actions from '../../redux/actions';
import { getCookie } from '../../utils/cookie';
import moment from 'moment';
import NumberFormat from 'react-number-format';

class OrderItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: null
    }
  }

  render() {
    return (
      <div>
        <div className="container-item container-header">
          <div className="column">Created At</div>
          <div className="column currency">From</div>
          <div className="column currency">To</div>
          <div className="column currency">Payment Method</div>
        </div>
      {this.props.orders.map((order, key) => {
        return (
          <div key={key} className="container-item">
            <div className="column">{moment(order.createdAt).format("DD MMM YYYY, HH:mm")}</div>
            <div className="column currency"><NumberFormat value={order.fromAmount} displayType={'text'} thousandSeparator={true} decimalScale={2}/> {order.fromCurrency.toUpperCase()}</div>
            <div className="column currency"><NumberFormat value={order.toAmount} displayType={'text'} thousandSeparator={true} decimalScale={2}/> {order.toCurrency.toUpperCase()}</div>
            <div className="column">{order.paymentMethod}</div>
          </div>
        )

      })}
      <style jsx>{`
        .container-item {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #eaeaea;
          padding: 10px;
          text-align: left;
          font-size: 14px;
        }

        .container-header {
          text-transform: uppercase;
          background-color: #F6F8FB;
          font-size: 12px;
          color: #666;
          border-radius: 4px 4px 0 0;
        }

        .column {
          width: 160px;
          overflow-wrap: break-word;
        }

        .thumbnail {
          max-width: 40%;
          margin: 0 auto;
        }

        .status {
          text-transform: uppercase;
          font-size: 12px;
        }

        .approved {
          color: #32B44B;
        }

        .pending {
          color: #CC0000;
        }

        .btn-small {
          margin-left: 20px;
          padding: 8px;
          font-size: 12px;
        }

        .btn-small:hover {
          cursor: pointer;
        }

        .currency {
          text-align: right;
        }


      `}</style>
      </div>
    )
  }
}

class Orders extends React.Component {
  constructor(props) {
    super(props);

  }

  static async getInitialProps(ctx) {
    initialize(ctx);
    await ctx.store.dispatch(actions.getAllOrders('getAllOrders'));
  };

  render() {
    return (
      <div>
        <Header />
        <MenuAdmin/>
        <div className="container-fluid">
          <div className="container-fixed">
            <div className="list-header">
              <div className="left"><h2>Orders</h2></div>
              <div className="right">
                <input type="text" placeholder="Search user"/>
              </div>
            </div>
            <form className="form-container">
              <OrderItem orders={this.props.orders}/>
            </form>
          </div>
        </div>
        <style jsx>{`
          .container-fixed {
            max-width: 1280px;
            margin: 50px auto;
          }

          .form-container {
            width: 1280px;
            height: auto;
            margin: 30px auto;
            background: #FFFFFF;
            box-shadow: 0 10px 30px 0 rgba(0,0,0,0.10);
            border-radius: 8px;
            text-align: center;
          }

          h2 {
            margin: 0;
          }

          .list-header {
            display: flex;
            width: 100%;
            font-size: 14px;
            margin-bottom: 30px;
          }

          .list-header div {
            flex-basis: 50%;
          }

          .list-header .right {
            text-align: right;
            align-self: flex-end;
          }

          .list-header a {
            text-decoration: none;
            color: #469DDD;
          }

          input[type=text] {
            border: 1px solid #EAEDF2;
            font-size: 14px;
            padding: 8px 8px 8px 30px;
            border-bottom: 1px solid #eaeaea;
            background-color: #EAEDF2;
            border-radius: 8px;
            transition: all 0.4s ease-in-out;
            width: 200px;
            background-image: url('../static/images/ic-search.svg');
            background-position: 8px 8px;
            background-repeat: no-repeat;
          }

          input[type=text]:focus {
            outline: none;
            border: 1px solid #469DDD;
            background-color: #ECF3FA;
            width: 300px;
          }

          ::placeholder {
            color: #CACACA;
          }

          .btn-tertiary {
            margin: 20px auto;
          }

        `}</style>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const orderArray = JSON.parse(state.order.orders);
  return {
    orders: orderArray
  }
}

export default connect(mapStateToProps, actions)(Orders);
