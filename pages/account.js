import Header from '../components/header.js';
import Menu from '../components/menu.js';
import Link from 'next/link';
import AccountLayout from '../components/AccountLayout';
import NumberFormat from 'react-number-format';
import { connect } from 'react-redux';
import initialize from '../utils/initialize';
import actions from '../redux/actions';
import { getCookie } from '../utils/cookie';
import moment from 'moment';

const ApprovedLayout = () => {
  return (
    <div className="content">
      <div className="big-icon">
        <img src="../static/images/happy.svg"/>
      </div>
      <h1>No transactions</h1>
      <p>You haven’t sent money using Transfree. Get started now and enjoy fast and cheap international money transfer. </p>

      <Link href="/order">
        <a className="btn-primary">Send money now</a>
      </Link>
      <style jsx>{`
        .logo {
          width: 100%;
          text-align: center;
        }
        .big-icon img {
          height: 300px;
          margin: -80px auto 50px;
        }

        p {
          max-width: 600px;
          text-align: center;
          margin-bottom: 50px;
        }

        h1 {
          margin: 0;
        }

        .content {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          align-items: center;
          justify-content: center;
          margin-top:30px;
        }
      `}</style>
    </div>
  )

}

const PendingLayout = () => {
  return (
    <div className="content">
      <div className="big-icon">
        <img src="../static/images/document.svg"/>
      </div>
      <h1>Awaiting confirmation</h1>
      <p>We are now reviewing your account details. We will send you an email & WhatsApp message once the verification process is completed.</p>
      <p>Please contact us by email (admin@transfree.id) or WhatsApp (+44 7490 090659) for faster process.</p>
      <style jsx>{`
        .logo {
          width: 100%;
          text-align: center;
        }
        .big-icon img {
          margin: 50px auto;
        }
        p {
          max-width: 600px;
          text-align: justify;
          margin-bottom: 10px;
        }
        h1 {
          margin: 0;
        }
        .content {
          display: flex;
          flex-direction: column;
          min-height: 70vh;
          align-items: center;
          justify-content: center;
          margin-top:30px;
        }
      `}</style>
    </div>
  )

}

class OrderItem extends React.Component {
  constructor({props}) {
    super(props);
    this.state = {
      key: null
    }

    this.toggleDetail = this.toggleDetail.bind(this);
  }

  toggleDetail(key) {
    if(this.state.key == key) {
      this.setState({
        key: null
      });
    } else {
      this.setState({
        key: key
      });
    }

  }


  render() {
    return (
      this.props.ordersList.map((order, key) => {
        return (
          <div key={key} >
            <div className={'list-item '+ (this.state.key == key ? 'open' : '')} onClick={() => this.toggleDetail(key)} >
              <div className="left">
                <div className="date">{order.completedAt == 0.0 ? 'Processing' : 'Completed on '+moment(order.completedAt).format("DD/MM/YYYY HH:mm")}</div>
                <div className="recipient">Transfer to <b>{order.name}</b></div>
              </div>
              <div className="right">
                <div className="source"><NumberFormat displayType={'text'} thousandSeparator={true} decimalScale={2} value={order.fromAmount} /> {order.fromCurrency.toUpperCase()}</div>
                <div className="destination bold"><NumberFormat displayType={'text'} thousandSeparator={true} decimalScale={2} value={order.toAmount} /> {order.toCurrency.toUpperCase()}</div>
              </div>
            </div>

            <div className={'detail '+ (this.state.key == key ? 'open' : '')}>
            <ul className="progress">
              <li><div className="node blue"></div><p>Created on {moment(order.createdAt).format("DD/MM/YYYY HH:mm")}</p></li>
              <li><div className={'divider '+ ((moment(moment().format("DD/MM/YYYY HH:mm")).isAfter(moment(order.createdAt).add('hours', 1).format("DD/MM/YYYY HH:mm"))) || order.receivedAt != 0.0 ? 'blue' : 'grey')}></div></li>
              <li>
              <div className={'node '+ (moment(moment().format("DD/MM/YYYY HH:mm")).isAfter(moment(order.createdAt).add('hours', 1).format("DD/MM/YYYY HH:mm")) || order.receivedAt != 0.0 ? 'blue' : 'grey')}>
              </div>
              <p style={{lineHeight:"25px"}}>
              {(moment(moment().format("DD/MM/YYYY HH:mm"))
              .isAfter
              (moment(order.createdAt).add('hours', 1).format("DD/MM/YYYY HH:mm")) )
              ||
              (order.receivedAt != 0.0)
              ?
              ('We are processing your ' + order.toCurrency.toUpperCase() +' booking')
               :
               ('We are waiting to process your ') }
              </p>
              <br/>
              <p style={{marginLeft:"35px",marginTop:"4px"}}>
              {(moment(moment().format("DD/MM/YYYY HH:mm"))
               .isAfter
               (moment(order.createdAt).add('hours', 1).format("DD/MM/YYYY HH:mm")) )
               ||
               (order.receivedAt != 0.0)
               ?
               ('')
               :
               (order.toCurrency.toUpperCase() +' booking') }
              </p>
              </li>
              {/*
              <li><div className={'divider '+ (order.transferredAt == 0.0 ? 'grey' : 'blue')}></div></li>
              <li><div className={'node '+ (order.transferredAt == 0.0 ? 'grey' : 'blue')}></div><p>{order.transferredAt == 0.0 ? ('We will transfer your '+order.toCurrency.toUpperCase()) :  ('Transferred on '+moment(order.transferredAt).format("DD/MM/YYYY HH:mm"))}</p></li>
              */}
              <li><div className={'divider '+ (order.completedAt == 0.0 ? 'grey' : 'blue')}></div></li>
              <li><div className={'node '+ (order.completedAt == 0.0 ? 'grey' : 'blue')}></div><p>{order.completedAt == 0.0 ? ('We will complete your transfer') :  ('Completed on '+moment(order.completedAt).format("DD/MM/YYYY HH:mm"))}</p></li>
            </ul>
            </div>
            <style jsx>{`
              .detail {
                height: 0;
                overflow: hidden;
                background-color: #F6F8FB;
                text-align: left;
                transition: all 0.2s ease;
              }

              .progress {
                font-size: 13px;
                margin: 50px;
              }

              .detail.open {
                opacity: 1;
                height: 300px;
              }

              .timeline {
                display: absolute;
                text-align: right;
                margin-left: -100px;
              }

              .node {
                height: 10px;
                width: 10px;
                border-radius: 50%;
                display: inline-block;
                transition: all 1000ms ease;
              }

              .activated {
                box-shadow: 0px 0px 3px 2px rgba(194, 255, 194, 0.8);
              }

              .divider {
                height: 40px;
                width: 2px;
                margin-left: 4px;
                transition: all 800ms ease;
              }

              li p {
                display: inline-block;
                margin: 0 25px;
              }

              li {
                list-style: none;
                line-height: 1px;
              }

              .blue {
                background-color: rgba(82, 165, 255, 1);
              }
              .grey {
                background-color: rgba(201, 201, 201, 1);
              }

              .list-item {
                display: flex;
                width: 100%;
                border-bottom: 1px solid #EAEAEA;
                transition: all 0.2s ease;
              }

              .list-item.open {
                background-color: #F6F8FB;
              }

              .list-item:hover {
                cursor: pointer;
                background-color: #F6F8FB;
                transform: translateY(-1px);
                box-shadow: 0 5px 30px 0 rgba(0,0,0,0.20);

              }

              .list-item div {
                flex-basis: 50%;
                margin: 10px 0;
              }

              .list-item .left {
                text-align: left;
                margin-left: 20px;
              }

              .list-item .right {
                text-align: right;
                margin-right: 20px;
              }

              .bold {
                font-weight: 700;
              }

              hr {
                display: block;
                height: 1px;
                border: 0;
                border-top: 1px solid #eaeaea;
                margin: 30px 0;
                padding: 0;
              }

              .list-item .date {
                opacity: 0.7;
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

              @media only screen and (max-width: 414px) {
                .progress {
                  margin: 30px 0;
                }
              }
            `}</style>
          </div>
        )

      })
    )
  }
}

const OrderLayout = ({ordersList}) => {
  return (
    <div>
      <div className="container-fixed">
        <div className="list-header">
          <div className="left"><h2>Recent transactions</h2></div>
          <div className="right">
            <input type="text" placeholder="Search transactions"/>
          </div>
        </div>
        <form className="form-container">
          <OrderItem ordersList={ordersList} />
        </form>
        <Link href="/order">
          <a className="btn-primary">Send money</a>
        </Link>
      </div>
      <style jsx>{`
        .container-fixed {
          max-width: 768px;
          margin: 60px auto;
        }

        .form-container {
          width: 708px;
          height: auto;
          margin: 30px auto;
          padding: 0;
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

        @media only screen and (max-width: 414px) {
          .container-fixed {
            max-width: 355px;
          }

          .form-container {
            width: 345px;
            padding: 0;
          }
          .list-header {
            flex-direction: column;
          }
          .list-header .right {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}

class Account extends React.Component {
  constructor({props}) {
    super(props);
  }

  static async getInitialProps(ctx) {
    initialize(ctx);
    await ctx.store.dispatch(actions.getUser(getCookie('_id', ctx.req),'user',ctx.req));
    await ctx.store.dispatch(actions.getOrderByUid(getCookie('_id', ctx.req),'getOrderByUid',ctx.req));
  };

  renderContent() {
    if(this.props.isApproved) {
      if(this.props.orderArray.length > 0) {
        return <OrderLayout ordersList={this.props.orderArray}/>
      } else {
        return <ApprovedLayout />
      }
    } else {
      return <PendingLayout />
    }
  }

  render() {
    return (
      <AccountLayout isApproved={this.props.isApproved}>
        {this.renderContent()}
      </AccountLayout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isApproved: !!state.user.user_data.isApproved,
    userData: state.user.user_data,
    orderArray: state.order.orders
  }
}

export default connect(mapStateToProps, actions)(Account);
