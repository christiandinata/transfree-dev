import styled from "styled-components";
import Header from '../components/header';
import OrderAmount from '../components/order/OrderAmount';
import Recipient from '../components/order/Recipient';
import Review from '../components/order/Review';
import Pay from '../components/order/Pay';
import Status from '../components/order/Status';
import { connect } from 'react-redux';
import actions from '../redux/actions';
import initialize from '../utils/initialize';
import { getCookie } from '../utils/cookie';
import { AwaitingConfirmation } from '../components/order/Pending';
import { NavBarBlue } from '../components/MenuComponents';
import Footer from '../components/footer';
import shortid from 'shortid';

const ContainerFluid = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
  margin-top: -20px;
  margin-bottom: 40px;
  padding-bottom: 20px;
  width: 100%;
`;

const ContentContainer = styled.div`
  margin-top: 140px;
`;

const ProgressContainer = styled.div`
  width: 100%;
  height: 82px;
  margin: 20px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  box-shadow: 0px 5px 20px rgba(98, 107, 121, 0.15);
  position: fixed;
  z-index: 1;


  @media only screen and (max-width: 500px) {
    margin: 16px 0 10px;
  }
`;

const ProgressList = styled.ol`
  align-items: center;
  padding: 0;
  list-style-type: none;

`;

const ProgressItem = styled.li`
  position: relative;
  display: inline-block;
  text-align: center;
  line-height: 50px;
  font-size: 16px;
  color: #626B79;

  >.step-box{
    display: inline-block;
    margin-right: 10px;
    border: 0.613102px solid #626B79;
    color: #626B79;
    border-radius: 2.45px;
    width: 50px;
    font-family: 'Avenir LT Pro Bold', sans-serif;
    font-size: 24px;
    font-weight: 700;
  }

  >.step-line{
    display: inline-block;
    height: 1px;
    width: 76px;
    background-color: #B4B4B4;
    margin-bottom: 3.5px;
    margin-left: 10px;
    margin-right: 10px;
  }

  ${({ active }) => active && `
    color: #009FE3;

    >.step-box{
      color: white;
      background: #009FE3;
      border-color: #009FE3;
    }
  `}
`;

/* Order page layout */
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
    this.saveValues = this.saveValues.bind(this);
    this.generateVA = this.generateVA.bind(this);
    this.addOrder = this.addOrder.bind(this);
  }

  static async getInitialProps(ctx) {
    initialize(ctx);
    await ctx.store.dispatch(actions.getAdjustedRates('IDR','getAdjustedRates'));
    await ctx.store.dispatch(actions.getRates('GBP','IDR'));
    await ctx.store.dispatch(actions.getUser(getCookie('_id', ctx.req),'user',ctx.req));
    await ctx.store.dispatch(actions.getOrderByUid(getCookie('_id', ctx.req),'getOrderByUid',ctx.req));
    return {};
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

  /* Render order page content based on current step */
  renderContent(step) {
    switch(step) {
      case 1:
        return <OrderAmount
                  nextStep={this.nextStep}
                  saveValues={this.saveValues}
                  data={this.state}/>
      case 2:
        return <Recipient
                  nextStep={this.nextStep}
                  previousStep={this.previousStep}
                  saveValues={this.saveValues}
                  data={this.state}/>
      case 3:
        return <Review
                  nextStep={this.nextStep}
                  previousStep={this.previousStep}
                  saveValues={this.saveValues}
                  data={this.state} />
      case 4:
        return <Pay
                  addOrder={this.addOrder}
                  nextStep={this.nextStep}
                  previousStep={this.previousStep}
                  saveValues={this.saveValues}
                  data={this.state}
                  generateVA={this.generateVA}/>
      case 5:
        return <Status
                  data={this.state}/>
    }
  }

  /* Move to next step (increment step) */
  nextStep() {
    window.scrollTo(0, 0);
    this.setState((state) => {
      return {step: state.step + 1}
    })
  }

  /* Move to previous step (decrement step) */
  previousStep() {
    window.scrollTo(0, 0);
    this.setState((state) => {
      return {step: state.step - 1}
    })
  }

  async saveValues(data) {
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

  /* Progress bar on the top of order page to show current step */
  progressBar(){
    return(
      <ProgressContainer>
        <ProgressList>
          <ProgressItem active={this.state.step>=1? true : false}><div className="step-box">1</div>Amount</ProgressItem>
          <ProgressItem active={this.state.step>=2? true : false}><div className="step-line"></div><div className="step-box">2</div>Recipient</ProgressItem>
          <ProgressItem active={this.state.step>=3? true : false}><div className="step-line"></div><div className="step-box">3</div>Review</ProgressItem>
          <ProgressItem active={this.state.step>=4? true : false}><div className="step-line"></div><div className="step-box">4</div>Pay</ProgressItem>
        </ProgressList>
      </ProgressContainer>
    )
  }

  render() {
    if (this.props.isApproved){
    return (
      <div>
        <Header />
        <NavBarBlue 
          navChildColor = {"white"}
          navText = {"Homepage"} 
          endpoint={"/home"}
        />
        <ContainerFluid>
          {this.progressBar()}
          <ContentContainer>
            {this.renderContent(this.state.step)}
          </ContentContainer>
        </ContainerFluid>
        <Footer/>
      </div>
    )} 
    else {
      return (
        <div>
          <Header />
          <NavBarBlue 
            navChildColor = {"white"}
            navText = {"Homepage"} 
            endpoint={"/home"}
          />
          <ContainerFluid>
            {this.progressBar()}
            <div style={{marginTop: "30px"}}>
              <AwaitingConfirmation/>
            </div>
          </ContainerFluid>
          <Footer/>
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
    adjustedRates: state.fx.adjustedRates,
    orderArray: state.order.orders
  }
}

export default connect(mapStateToProps, actions)(Order);
