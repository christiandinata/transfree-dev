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
import Pagination from "react-js-pagination";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
          <div className="column">Created by</div>
          <div className="column">Phone number</div>
          <div className="column currency">From</div>
          <div className="column currency">To</div>
          <div className="column currency">Payment Method</div>
          <div className="column">Action</div>
        </div>
      {this.props.orders.map((order, key) => {
        return (
          <div key={key} className="container-item">
            <div className="column">{moment(order.createdAt).format("DD MMM YYYY, HH:mm")}</div>
            <div className="column">{order.senderName}</div>
            <div className="column">{order.senderPhone}</div>
            <div className="column currency"><strong><NumberFormat value={order.fromAmount} displayType={'text'} thousandSeparator={true} decimalScale={2}/> {order.fromCurrency.toUpperCase()}</strong></div>
            <div className="column currency"><NumberFormat value={order.toAmount} displayType={'text'} thousandSeparator={true} decimalScale={2}/> {order.toCurrency.toUpperCase()}</div>
            <div className="column payment">
              {order.paymentMethod == 'direct_transfer_via_bni' ? (<img src="../static/images/bank_logos/bni.png"/>) : null}
              {order.paymentMethod == 'direct_transfer_via_bca' ? (<img src="../static/images/bank_logos/bca.png"/>) : null}
            </div>
            <div className="column">
              {order.completedAt > 0 ? (<div className="status approved">completed</div>) : null}
              {order.receivedAt == 0 ? (<div onClick={() => this.props.paymentReceived(order._id )} className="btn-primary btn-small">Payment Received</div>) : null}
              {order.completedAt == 0 ? (<div onClick={() => this.props.transferCompleted(order._id )} className="btn-primary btn-small">Transfer Completed</div>) : null}
            </div>
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
          padding: 10px;
          overflow-wrap: break-word;
        }

        .column img {
          margin: 0 auto;
          height: 30px;
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
          margin-bottom: 20px;
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
    this.state = {
      activePage: 1
    }

    this.paymentReceived = this.paymentReceived.bind(this);
    this.transferCompleted = this.transferCompleted.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  static async getInitialProps(ctx) {
    initialize(ctx);
    await ctx.store.dispatch(actions.getAllOrders(1,'getAllOrders'));
  };

  paymentReceived(_id) {
    console.log(_id);
    this.props.paymentReceived({_id: _id}, 'paymentReceived');
  }

  transferCompleted(_id) {
    this.props.transferCompleted({_id: _id}, 'transferCompleted');
  }

  handlePageChange(pageNumber) {
    this.setState({activePage: pageNumber});
    this.props.getAllOrders(pageNumber, 'getAllOrders');
  }

  render() {
    console.log(this.props.orders);
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
            { this.props.inProgress ? (
              <div className="overlay">
                <div className="overlay-content">
                  <FontAwesomeIcon icon="sync-alt" color="white" size="4x" spin/>
                  <p>Getting list of orders from database...</p>
                </div>
              </div>
            ) : (
              <form className="form-container">
                <OrderItem orders={this.props.orders} paymentReceived={this.paymentReceived} transferCompleted={this.transferCompleted}/>
                <div className="pagination-container">
                  <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={10}
                    totalItemsCount={this.props.totalDocs}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange}
                  />
                </div>
              </form>
            )}
          </div>
        </div>
        <style jsx>{`
          .overlay {
            display: block;
            height: 100%;
            width: 100%;
            position: fixed;
            z-index: 1;
            top: 0;
            left: 0;
            background-color: rgb(0,0,0);
            background-color: rgba(0,0,0, 0.9);
            transition: 0.3s;
            color: #fff;
          }

          .overlay-content {
            position: relative;
            top: 30%;
            width: 100%;
            text-align: center;
            margin-top: 30px;
          }

          .overlay-content p {
            margin: 30px auto;
          }

          .pagination-container {
            padding: 30px 0;
          }

          .container-fluid {
            align-items: flex-start;
            height; auto;
          }
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
  if (state.order.orders != null) {
    return {
      orders: state.order.orders.docs,
      totalDocs: state.order.orders.totalDocs
    }
  } else {
    return {
      inProgress: state.order.inProgress
    }
  }
}

export default connect(mapStateToProps, actions)(Orders);
