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

class Order extends React.Component {


  constructor({ props }) {
    super(props);
    this.state = {
      step: 1,
      uid: 0,
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
      isVAgenerated: false,
      vaNumber: 12345678
    };

    this.nextStep = this.nextStep.bind(this);
    this.previousStep = this.previousStep.bind(this);
    this.saveValues = this.saveValues.bind(this);
    this.generateVA = this.generateVA.bind(this);
  }

  static async getInitialProps(ctx) {
    initialize(ctx);
    await ctx.store.dispatch(actions.getRates('GBP','IDR'));
    await ctx.store.dispatch(actions.getUser(getCookie('_id', ctx.req),'user'));
  };

  componentDidMount() {
    this.setState({
      uid: this.props.userData._id
    })
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
                  data={this.state} />
      case 4:
        return <Pay
                  nextStep={this.nextStep}
                  data={this.state}
                  generateVA={this.generateVA} />
      case 5:
        return <Status
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
        `}</style>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const userData = JSON.parse(state.user.user_data);
  return {
    userData: userData,
    rate: state.rate.rates,
  }
}

export default connect(
  mapStateToProps,
  actions
)(Order);
