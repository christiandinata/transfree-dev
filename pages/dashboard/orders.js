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
      key: null,
      newPaidOutRate: 0
    }
    
  }

  render() {
    let {newPaidOutRate} = this.state;
    return (
      <div>
        <div className="container-item container-header">
          <div className="column">Created At</div>
          <div className="column">Created by</div>
          <div className="column">Phone number</div>
          <div className="column currency">From</div>
          <div className="column currency">To</div>
          <div className="column currency">Payment Method</div>
          <div className="column">DTTOT Check Beneficiary</div>
          <div className="column">Paid Out Rate</div>
          <div className="column">Action</div>
          <div className="column">Transaction Details</div>
        </div>
      {this.props.orders.map((order, key) => {
          console.log(order);
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
              {order.paymentMethod == 'direct_transfer_via_mandiri' ? (<img src="../static/images/bank_logos/mandiri.png"/>) : null}
            </div>
            {order.isDttotWarningFlagRaised ?
              <div className="column dttotWarningRaised">{`${order.dttotWarningRecipient.totalMatchFound} match${order.dttotWarningRecipient.totalMatchFound>1 ? 'es' : ''} found!`}</div> :
              <div className="column">No match found!</div>
            }
            <div className="column">{order.paidOutRate}</div>
            <div className="column">
              {((order.receivedAt > 0) && (order.checkedAt == 0)) ? (<div className="status approved">payment received at {moment(order.checkedAt).format("DD MMM YYYY, HH:mm")} </div>) : null}
              {((order.checkedAt > 0) && (order.transferredAt == 0)) ? (<div className="status approved">payment checked at {moment(order.receivedAt).format("DD MMM YYYY, HH:mm")}</div>) : null}
              {((order.transferredAt > 0) && (order.completedAt == 0)) ? (<div className="status approved">transfer processed at {moment(order.transferredAt).format("DD MMM YYYY, HH:mm")}</div>) : null}
              {order.completedAt > 0 ? (<div className="status approved">transfer completed at {moment(order.completedAt).format("DD MMM YYYY, HH:mm")}</div>) : null}
              
              {order.receivedAt == 0 ? (<div onClick={() => { if (window.confirm('Are you sure want to mark this transaction as received from '+order.senderName))this.props.paymentReceived(order._id)}} className="btn-primary btn-small">Payment Received</div>) : null}
              {((order.receivedAt !== 0) && (order.checkedAt == 0)) ? (<div onClick={() => { if (window.confirm('Are you sure want to mark this payment as checked from '+order.senderName))this.props.checkPayment(order._id)}} className="btn-primary btn-small">Check Payment</div>) : null}
              {((order.receivedAt !== 0) && (order.checkedAt !== 0) && (order.transferredAt == 0)) ? (<div onClick={() => {this.props.togglePopUpPaidOut(order)}} className="btn-primary btn-small">Process Transfer</div>) : null}
              {((order.receivedAt !== 0) && (order.checkedAt !== 0) && (order.transferredAt !== 0) && (order.completedAt == 0)) ? (<div onClick={() => {if (window.confirm('Are you sure want to mark this transfer as completed for this user : '+order.senderName))this.props.transferCompleted(order._id)}} className="btn-primary btn-small">Transfer Completed</div>) : null}

            </div>
            <div className="column">
              <div className="btn-primary btn-small" onClick={() => {this.props.getDetail(order)} }>Click to see details</div>
            </div>
          </div>
              )
              
              {/*
              {order.completedAt > 0 ? (<div className="status approved">completed</div>) : null}
              {order.receivedAt == 0 ?
              order.fromCurrency == 'idr' ?
              (<Link>
                <a href={"#received_idr_to_valas"} className="btn-primary btn-small">Payment Received</a>
              </Link>) 
              :
              (<Link>
                <a href={"#received_valas_to_idr"} className="btn-primary btn-small">Payment Received</a>
              </Link>) 
              :
              null
              }
            {order.receivedAt == 0 ? 
            (<Link>
              <a href={"#received_idr_to_valas"} className="btn-primary btn-small">Payment Received</a>
            </Link>) 
            : 
            null}
            {order.completedAt == 0 ? 
            (<Link>
              <a href={"#transfer_completed"} className="btn-primary btn-small">Transfer Completed</a>
            </Link>) 
            : null}
            
            <div className="lightbox" id={"received_valas_to_idr"}>
              <div className="popup">
                <a className="close" href="#">&times;</a>
                <div className="content" >
                <h1>Phone verification</h1>
                  <form>
                  <input
                    type="tel"
                    id="code"
                    placeholder="Enter 6-digit verification code"
                    value={this.state.code}
                    onChange={e => this.setState({ code: e.target.value })}/>
                  <button type="submit" className="btn-primary">{this.props.inProgress ? (
                    <FontAwesomeIcon icon="sync-alt" spin/>
                  ) : 'Continue'}</button>
                </form>
                </div>
              </div>
            </div>
            <div className="lightbox" id={"received_idr_to_valas"}>
              <div className="popup">
                <a className="close" href="#">&times;</a>
                <div className="content" >
                <h2>ARE YOU SURE ? </h2>
                  <a href="orders" onClick={() => this.props.paymentReceived(order._id )} className="btn-primary btn-small">YES</a>
                  <a href="#"  className="btn-primary btn-small">NO</a>
                </div>
              </div>
            </div>
            <div className="lightbox" id={"transfer_completed"}>
              <div className="popup">
                <a className="close" href="#">&times;</a>
                <div className="content" >
                <h2>ARE YOU SURE ?</h2>
                  
                    <a href="orders" onClick={() => this.props.transferCompleted(order._id )} className="btn-primary btn-small">YES</a>
                    <a href="#" className="btn-primary btn-small">NO</a>
                             
                </div>
              </div>
            </div>
            </div>
          </div>
        )
        */}

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
        .btn-very-small{
          margin-bottom: 20px;
          padding: 8px;
          font-size:12px;
          margin-right: 10px;
        }
        .btn-very-small:hover{
          cursor: pointer;
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
        .dttotWarningRaised {
          color: #CC0000;
        }
      `}</style>
      </div>
    )
  }
}

class PopUp extends React.Component{
  constructor(props){
    super(props);
    console.log(props.order.senderName);
  }

  render(){
    return(
      <div className="popup">
          <div className="popupcontainer">
              <h2>{this.props.text}</h2>
              <div className="content">
                Sender Name &#9; : {this.props.order.senderName} <br></br>
                Sender Email &#9; : {this.props.order.senderEmail} <br></br>
                Sender Phone &#9; : {this.props.order.senderPhone} <br></br>
                From &#9; : {this.props.order.fromCurrency.toUpperCase()} {this.props.order.fromAmount} <br></br>
                To &#9; : {this.props.order.toCurrency.toUpperCase()} {this.props.order.toAmount} <br></br>
              </div>
              <hr></hr>
              <div className="content">
                Receiver Name &#9; : {this.props.order.name} <br></br>
                Receiver Email &#9; : {this.props.order.email} <br></br>
                Receiver Account &#9; : {this.props.order.accountNumber} <br></br>
                Receiver Bank &#9; : {this.props.order.bankAccountNumber} <br></br>
                Paid Out Rate &#9; : {this.props.order.paidOutRate} <br></br>
              </div>
              <button className="closebutton" onClick={this.props.closePopUp}>Close</button>
          </div>
      
          <style jsx>{`
              hr{
                border : 5px solid gray;
                border-radius : 0px;
              }
              .content{
                text-align : left;
              }
              .popup{
                  position: fixed;  
                  width: 100%;  
                  height: 100%;  
                  top: 0;  
                  left: 0;  
                  right: 0;  
                  bottom: 0;  
                  margin: auto;  
                  background-color: rgba(0,0,0, 0.5);  
              }
              .popupcontainer{
                  position: absolute;  
                  left: 25%;  
                  right: 25%;  
                  top: 10%;  
                  bottom: 10%;  
                  margin: auto;  
                  border-radius: 20px;  
                  background: white;
                  padding: 8px;
              }
              .closebutton{
                  border: 0px;
                  background-color: rgb(200,66,95);
                  color: white;
                  margin-top: 10px;
                  padding: 8px;
                  font-size: 12px;
              }
              .closebutton:hover{
                  cursor: pointer;
              }
              
          `}</style>
      </div>
    );
  }
}

class PopUpPaidOut extends React.Component{
  constructor(props){
    super(props);
    console.log(props);
    this.state={
      paidOutRate : 0,
      orderId : props.order._id
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name] : event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.changePaidOutRate(this.state.orderId, this.state.paidOutRate);
    this.props.closePopUpPaidOut();
  }

  render(){
    let {paidOutRate, orderId} = this.state;
    console.log(orderId + " " + paidOutRate);
    return(
      <div className="popup" >
          <div className="popupcontainer">
              <h2>{this.props.text}</h2>
              <input type="text" name="paidOutRate" onChange={this.handleChange} value={paidOutRate} />
              <button className="acceptbutton" onClick={this.handleSubmit}>Accept</button>
              <button className="closebutton" onClick={this.props.closePopUpPaidOut}>Cancel</button>
          </div>
      
          <style jsx>{`
              hr{
                border : 5px solid gray;
                border-radius : 0px;
              }
              .content{
                text-align : left;
              }
              .popup{
                  position: fixed;  
                  width: 100%;  
                  height: 100%;  
                  top: 0;  
                  left: 0;  
                  right: 0;  
                  bottom: 0;  
                  margin: auto;  
                  background-color: rgba(0,0,0, 0.5);  
              }
              .popupcontainer{
                  position: absolute;  
                  left: 25%;  
                  right: 25%;  
                  top: 10%;  
                  bottom: 10%;  
                  margin: auto;  
                  border-radius: 20px;  
                  background: white;
                  padding: 8px;
              }
              .closebutton{
                  border: 0px;
                  background-color: rgb(200,66,95);
                  color: white;
                  margin-top: 10px;
                  padding: 8px;
                  font-size: 12px;
              }
              .closebutton:hover{
                  cursor: pointer;
              }
              .acceptbutton{
                border: 0px;
                background-color: rgb(37,200,150);
                color: white;
                margin-top: 10px;
                padding: 8px;
                font-size: 12px;
            }
            .acceptbutton:hover{
                cursor: pointer;
            }
          `}</style>
      </div>
    );
  }
}

class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      showPopUp : false,
      showPopUpPaidOut : false,
      popUpOrder : null
    }

    this.checkPayment = this.checkPayment.bind(this);
    this.paymentReceived = this.paymentReceived.bind(this);
    this.transferCompleted = this.transferCompleted.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.changePaidOutRate = this.changePaidOutRate.bind(this);
    this.getDetail = this.getDetail.bind(this);
    this.togglePopUp = this.togglePopUp.bind(this);
    this.togglePopUpPaidOut = this.togglePopUpPaidOut.bind(this);
  }

  static async getInitialProps(ctx) {
    initialize(ctx);
    await ctx.store.dispatch(actions.getAllOrders(1,'getAllOrders'));
  };

  checkPayment(_id) {
    console.log(_id);
    this.props.checkPayment({_id: _id}, 'checkPayment');
  }

  paymentReceived(_id) {
    console.log(_id);
    this.props.paymentReceived({_id: _id}, 'paymentReceived');
  }

  transferCompleted(_id) {
    this.props.transferCompleted({_id: _id}, 'transferCompleted');
  }

  changePaidOutRate(_id, paidOutRate){
    console.log("SENDING " + _id + " " + paidOutRate);
    this.props.changePaidOutRate({_id: _id, paidOutRate: paidOutRate}, 'changePaidOutRate');
  }

  handlePageChange(pageNumber) {
    this.setState({activePage: pageNumber});
    this.props.getAllOrders(pageNumber, 'getAllOrders');
  }

  togglePopUp(){
    this.setState({showPopUp : !this.state.showPopUp});
  }

  togglePopUpPaidOut(order){
    this.setState({popUpOrder : order})
    this.setState({showPopUpPaidOut : !this.state.showPopUpPaidOut});
  }

  getDetail(order){
    this.setState({popUpOrder : order});
    this.togglePopUp();
  }

  render() {
    const {showPopUp, showPopUpPaidOut, popUpOrder} = this.state;
    
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
                {showPopUpPaidOut ? <PopUpPaidOut text='Set Paid Out' changePaidOutRate={this.changePaidOutRate} order={popUpOrder} closePopUpPaidOut={this.togglePopUpPaidOut} /> : null}
                {showPopUp ? <PopUp text='Transaction Details' order={popUpOrder} closePopUp={this.togglePopUp} /> : null}
                <OrderItem orders={this.props.orders} getDetail={this.getDetail} togglePopUpPaidOut={this.togglePopUpPaidOut} checkPayment={this.checkPayment} paymentReceived={this.paymentReceived} transferCompleted={this.transferCompleted}/>
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