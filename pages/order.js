import Link from 'next/link';
import Header from '../components/header';
import Menu from '../components/menu';
import OrderAmount from '../components/order/OrderAmount';
import Recipient from '../components/order/Recipient';
import Review from '../components/order/Review';
import Pay from '../components/order/Pay';
import Status from '../components/order/Status';
import { connect } from 'react-redux';
import actions from '../redux/actions';
import initialize from '../utils/initialize';
import { getCookie } from '../utils/cookie';
import NumberFormat from 'react-number-format';
import orderid from 'order-id';
import shortid from 'shortid';

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
          margin-bottom: 20px;
        }
        h1 {
          margin: 0;
        }
        .content {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          align-items: center;
          justify-content: justify;
        }
      `}</style>
    </div>
  )

}

class Order extends React.Component {
  constructor({ props }) {
    super(props);
    this.state = {
      step: 1,
      uid: 0,
      senderName: '',
      senderEmail: '',
      senderPhone: '',
      rate: 0,
      fromCurrency: 'GBP',
      toCurrency: 'IDR',
      fromAmount: 0,
      toAmount: 0,
      email: '',
      name: '',
      bankName: '',
      bankAccountNumber: '',
      accountNumber: '',
      sortcode: '',
      iban: '',
      swift: '',
      routingNumber: '',
      bsbCode: '',
      isVAgenerated: false,
      vaNumber: 0,
      paymentMethod: '',
      purposeTransfer: '',
      isSaveRecipient: false
    };

    this.nextStep = this.nextStep.bind(this);
    this.previousStep = this.previousStep.bind(this);
    this.backToAmount = this.backToAmount.bind(this);
    this.saveValues = this.saveValues.bind(this);
    this.generateVA = this.generateVA.bind(this);
    this.addOrder = this.addOrder.bind(this);
  }

  static async getInitialProps(ctx) {
    initialize(ctx);
    await ctx.store.dispatch(actions.getAdjustedRates('IDR','getAdjustedRates'));
    await ctx.store.dispatch(actions.getRates('GBP','IDR'));
    await ctx.store.dispatch(actions.getUser(getCookie('_id', ctx.req),'user'));
  };

  componentDidMount() {
    this.setState({
      uid: this.props.userData._id,
      senderName: this.props.userData.fullname,
      senderEmail: this.props.userData.email,
      senderPhone: this.props.userData.phone
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.vaNumber != prevProps.vaNumber) {
      this.setState({
        isVAgenerated: true,
        vaNumber: this.props.vaNumber
      });
    }
  }

  addOrder() {
    this.props.addOrder(
      {
        uid: this.state.uid,
        senderName: this.state.senderName,
        senderEmail: this.state.senderEmail,
        senderPhone: this.state.senderPhone,
        rate: this.state.rate,
        fromCurrency: this.state.fromCurrency,
        toCurrency: this.state.toCurrency,
        fromAmount: this.state.fromAmount,
        toAmount: this.state.toAmount,
        email: this.state.email,
        name: this.state.name,
        bankName: this.state.bankName,
        bankAccountNumber: this.state.bankAccountNumber,
        accountNumber: this.state.accountNumber,
        sortcode: this.state.sortcode,
        iban: this.state.iban,
        swift: this.state.swift,
        routingNumber: this.state.routingNumber,
        bsbCode: this.state.bsbCode,
        paymentMethod: this.state.paymentMethod,
        isSaveRecipient: this.state.isSaveRecipient
      },
      'addOrder'
    );
  }

  renderContent(step) {
    switch(step) {
      case 1:
        return <OrderAmount
                  nextStep={this.nextStep}
                  saveValues={this.saveValues} />;
      case 2:
        return <Recipient
                  nextStep={this.nextStep}
                  saveValues={this.saveValues}
                  data={this.state} />
      case 3:
        return <Review
                  nextStep={this.nextStep}
                  previousStep={this.previousStep}
                  saveValues={this.saveValues}
                  backToAmount={this.backToAmount}
                  data={this.state} />
      case 4:
        return <Pay
                  nextStep={this.nextStep}
                  saveValues={this.saveValues}
                  data={this.state}
                  generateVA={this.generateVA}/>
      case 5:
        return <Status
                  addOrder={this.addOrder}
                  data={this.state}/>
    }
  }

  nextStep() {
    this.setState((state) => {
      return {step: state.step + 1}
    })
  }

  previousStep() {
    this.setState((state) => {
      return {step: state.step - 1}
    })
  }
  backToAmount() {
    this.setState((state) => {
      return {step: state.step - 2}
    })
  }
  saveValues(data) {
    Object.entries(data).map(([key,value])=>{
      this.setState({
        [key]: value
      })
    })
  }

  generateVA(bankName) {
    let merchantId='', merchantRefCode='', secretWord='';
    switch(bankName) {
      case 'bni': {
        merchantId='160';
        secretWord='K3vrOmpBjhqtsNr';
        break;
      }
      case 'mandiri': {
        merchantId='187';
        secretWord='lj0XEbKLtLeJZ0s';
        break;
      }
      case 'maybank': {
        merchantId='158';
        secretWord='Vua4ZUPQbJDOu7Q';
        break;
      }
      case 'permata': {
        merchantId='162';
        secretWord='R3k3mTLkzG3MNvV';
        break;
      }
      case 'sinarmas': {
        merchantId='163';
        secretWord='py1PRDAVMZ2D8hV';
        break;
      }
    }
    this.props.generateVA(merchantId, shortid.generate(), secretWord, this.state.name, this.state.email, this.state.fromAmount);
  }

  render() {
    if (this.props.isApproved){
    return (
      <div>
        <Header />
        <Menu />
        <div className="container-fluid">
          <div className="header-progress-container">
            <ol className="header-progress-list">
              <li className={"header-progress-item " + (this.state.step>=1 ? 'done' : 'todo')}>Amount</li>
              <li className={"header-progress-item " + (this.state.step>=2 ? 'done' : 'todo')}>Recipient</li>
              <li className={"header-progress-item " + (this.state.step>=3 ? 'done' : 'todo')}>Review</li>
              <li className={"header-progress-item " + (this.state.step>=4 ? 'done' : 'todo')}>Pay</li>
            </ol>
          </div>
          {this.renderContent(this.state.step)}
        </div>
        <style jsx>{`
          .container-fluid {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            align-items: center;
          }

          // Progress Bar
          .header-progress-container {
            width: 550px;
            margin: 50px auto;
          }

          .header-progress-list {
            margin: 0 auto;
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
            transition: all 0.3s ease;
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
            transition: all 0.3s ease;
          }

          .header-progress-item:first-child:after {
            display: none;
          }

          .header-progress-item.done {
            color: #469DDD;
            transition: all 0.3s ease;
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

          @media only screen and (max-width: 414px) {
            .header-progress-container {
              width: 375px;
              font-size: 10px;
              margin: 14px 0 10px;
            }
            .header-progress-item {
              width: 80px;
              left: 20px;
            }
            .header-progress-item:before {
              left: 40px;
            }
            .header-progress-item:after {
              width: 80px;
              left: -40px;
            }
          }
        `}</style>
      </div>
    )} else {
      return (
        <div>
          <Header />
          <Menu />
          <PendingLayout />
        </div>
      )
    }
  } 
}

const mapStateToProps = (state) => {
  return {
    isApproved: !!state.user.user_data.isApproved,
    userData: state.user.user_data,
    rate: state.rate.rates,
    vaNumber: state.va.vaNumber,
    adjustedRates: state.fx.adjustedRates
  }
}

export default connect(mapStateToProps, actions)(Order);
