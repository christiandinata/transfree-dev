import { connect } from 'react-redux';
import styled from 'styled-components';
import rateActions from '../../redux/actions';
import {Converter, InputNumber, RateAndFee} from '../order/Converter';
import { ModalPopUp } from './PopUp';


const OrderContainer = styled.div`
  background: #FFFFFF;
  border: 0.5px solid #B4B4B4;
  box-sizing: border-box;
  border-radius: 16px;
  padding: 10px 30px 30px 30px;
  max-width: 586px;
  margin: 0px 15px 0px 15px;

  @media only screen and (max-width: 800px) {
    padding: 10px 20px 30px 20px;
  }
`;

const OrderTitle = styled.h3 `
  font-size: 20px;
  margin-bottom: -10px;
`;

const OrderDetails = styled.p`
  color: #626B79;
`;

const ButtonContainer = styled.div`
  padding-top: 40px;
`;

const Button = styled.button`
  border: 1px solid #009FE3;
  border-radius: 4px;

  width: 100%;
  height: 50px;
  font-size: 16px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 24px;
  margin-bottom: 10px;
  transition: 0.2s;

  background-color: ${props => props.secondary ? 'white' : '#009FE3'};
  color: ${props => props.secondary ? '#009FE3' : 'white'};

  ${({ disabled }) => disabled && `
    opacity: 0.8;
    background: grey;
    border-color: grey;
  `}
`;

class OrderAmount extends React.Component {
  constructor({ props }) {
    super(props);
    this.state = {
      isSourceActive: false,
      isDestinationActive: false,
      fromCurrency: 'gbp',
      toCurrency: 'idr',
      fromAmount: 1000,
      toAmount: 0,
      currentDay: new Date(),
      duration: '',
      oos: false,
      errorTransaction: false,
      errorMessage: '',
      activeElement: ''
    };

    this.receiveOn = React.createRef();

    this.updateActiveElement = this.updateActiveElement.bind(this);
    this.updateDeactiveElement = this.updateDeactiveElement.bind(this);
    this.toggleSource = this.toggleSource.bind(this);
    this.toggleModalOOS = this.toggleModalOOS.bind(this);
    this.toggleModalError = this.toggleModalError.bind(this);
    this.selectSource = this.selectSource.bind(this);
    this.hideSource = this.hideSource.bind(this);
    this.toggleDestination = this.toggleDestination.bind(this);
    this.hideDestination = this.hideDestination.bind(this);
    this.selectDestination = this.selectDestination.bind(this);
    this.handleSourceChange = this.handleSourceChange.bind(this);
    this.handleDestinationChange = this.handleDestinationChange.bind(this);
    this.checkDuration = this.checkDuration.bind(this);
  }
  
  componentDidMount() {
    if(this.props.data.fromAmount != 0){
      this.setState({
        fromCurrency: this.props.data.fromCurrency,
        toCurrency: this.props.data.toCurrency,
        fromAmount: this.props.data.fromAmount,
        toAmount: this.props.data.toAmount,
        rate: this.props.rate - (this.props.rate * this.props.adjustedRates.lowerMargin / 100),
        currentDay : this.state.currentDay
      })
    }
    else{
      this.setState({
        rate: this.props.rate - (this.props.rate * this.props.adjustedRates.lowerMargin / 100),
        toAmount: this.state.fromAmount * (this.props.rate - (this.props.rate * this.props.adjustedRates.lowerMargin / 100 )),
        currentDay : this.state.currentDay
      })
    }
  }

  toggleModalOOS() {
    this.setState({ oos: !this.state.oos })
  }

  toggleModalError() {
    this.setState({ errorTransaction: !this.state.errorTransaction })
  }

  updateActiveElement = () => {
    this.setState({activeElement : document.activeElement.id});
  }

  updateDeactiveElement = () => {
    this.setState({activeElement : ''});
  }

  toggleSource() {
    this.setState({
      isSourceActive: !this.state.isSourceActive
    });
    if(this.state.isDestinationActive)
      this.hideDestination();
  }

  hideSource() {
    this.setState({
      isSourceActive: false
    });
  }

  toggleDestination() {
    this.setState({
      isDestinationActive: !this.state.isDestinationActive
    });
    if(this.state.isSourceActive)
      this.hideSource();
  }

  hideDestination() {
    this.setState({
      isDestinationActive: false
    });
  }

  selectSource(country) {
    if (country == 'idr') {
      this.props.getRates(this.state.toCurrency, country).then(() => {
        if (this.state.toCurrency == 'idr') {
          this.setState({
            rate: 1,
            fromCurrency: country,
            toAmount: this.state.fromAmount
          });
        } else {
          this.setState({
            rate: this.props.rate + (this.props.rate * this.props.adjustedRates.upperMargin / 100),
            fromCurrency: country,
            toAmount: this.state.fromAmount / (this.props.rate + (this.props.rate * this.props.adjustedRates.upperMargin / 100))
          });
        }
      });
    } else {
      this.props.getRates(country, this.state.toCurrency).then(() => {
        if (this.state.toCurrency == 'idr') {
          this.setState({
            rate: this.props.rate - (this.props.rate * this.props.adjustedRates.lowerMargin / 100),
            fromCurrency: country,
            toAmount: this.state.fromAmount * (this.props.rate - (this.props.rate * this.props.adjustedRates.lowerMargin / 100))
          })
        } else {
          this.setState({
            rate: this.props.rate,
            fromCurrency: country,
            toAmount: this.state.fromAmount / this.props.rate
          });
        }
      });
    }
    this.hideSource();
  }

  selectDestination(country) {
    if (country == 'idr') {
      this.props.getRates(this.state.fromCurrency, country).then(() => {
        if (this.state.fromCurrency == 'idr') {
          this.setState({
            rate: 1,
            toCurrency: country,
            toAmount: this.state.fromAmount
          });
        } else {
          this.setState({
            rate: this.props.rate - (this.props.rate * this.props.adjustedRates.lowerMargin / 100),
            toCurrency: country,
            toAmount: this.state.fromAmount * (this.props.rate - (this.props.rate * this.props.adjustedRates.lowerMargin / 100))
          });
        }
      });
    } else {
      if (this.state.fromCurrency == 'idr') {
        this.props.getRates(country, this.state.fromCurrency).then(() => {
          this.setState({
            rate: this.props.rate + (this.props.rate * this.props.adjustedRates.upperMargin / 100),
            toCurrency: country,
            toAmount: this.state.fromAmount / (this.props.rate + (this.props.rate * this.props.adjustedRates.upperMargin / 100))
          });
        });
      } else {
        this.props.getRates(this.state.fromCurrency, country).then(() => {
          this.setState({
            rate: this.props.rate,
            toCurrency: country,
            toAmount: this.state.fromAmount * this.props.rate
          });
        });
      }
    }
    this.hideDestination();
  }

  handleSourceChange(e) {
    const fromAmount = e.target.value.replace(/,/g, '');
    if (this.state.fromCurrency == 'idr') {
        this.setState({
          fromAmount: fromAmount,
          toAmount: fromAmount / this.state.rate
        })
    } else {
      this.setState({
        fromAmount: fromAmount,
        toAmount: fromAmount * this.state.rate
      })
    }
  }

  handleDestinationChange(e) {
    const toAmount = e.target.value.replace(/,/g, '');
    if (this.state.fromCurrency == 'idr') {
      this.setState({
        fromAmount: toAmount * this.state.rate,
        toAmount: toAmount
      })
    } else {
      this.setState({
        fromAmount: toAmount / this.state.rate,
        toAmount: toAmount
      })
    }
  }

  checkDuration(){
    if((this.state.fromCurrency == 'idr' && this.state.toCurrency == 'eur' &&
        this.state.currentDay.getDay() == '5' &&
        this.state.currentDay.getHours() >= '12') || 
      ( this.state.fromCurrency == 'eur' && this.state.toCurrency == 'idr' && 
        this.state.currentDay.getDay() == '5' &&
        this.state.currentDay.getHours() >= '12') || 
      ( this.state.fromCurrency == 'idr' && this.state.toCurrency == 'gbp' && 
        this.state.currentDay.getDay() == '5' &&
        this.state.currentDay.getHours() >= '12') ||
      ( this.state.fromCurrency == 'eur' && this.state.toCurrency == 'idr' && 
        this.state.currentDay.getDay() == '6') || 
      ( this.state.fromCurrency == 'idr' && this.state.toCurrency == 'eur' && 
        this.state.currentDay.getDay() == '6') || 
      ( this.state.fromCurrency == 'idr' && this.state.toCurrency == 'gbp' && 
        this.state.currentDay.getDay() == '6') || 
      ( this.state.fromCurrency == 'eur' && this.state.toCurrency == 'idr' && 
        this.state.currentDay.getDay() == '7') || 
      ( this.state.fromCurrency == 'idr' && this.state.toCurrency == 'eur' && 
        this.state.currentDay.getDay() == '7') || 
      ( this.state.fromCurrency == 'idr' && this.state.toCurrency == 'gbp' && 
        this.state.currentDay.getDay() == '7'))
      {
        return 1;
      }

    else if
      ( (this.state.fromCurrency == 'eur' && this.state.toCurrency == 'idr' )||
        (this.state.fromCurrency == 'idr' && this.state.toCurrency == 'eur' ))
      {
        return 2;
      }
    else{
      return 3;
    }
  }

  saveAndContinue = (e) => {
    e.preventDefault();
    if(this.state.fromCurrency == 'gbp' && this.state.toCurrency == 'idr'){
      this.setState({oos:true});
    }
    else if(this.state.fromCurrency == 'idr' && (this.state.fromAmount <100000)){
      this.setState({ errorTransaction:true,
                      errorMessage: "Please send minimum 100,000 IDR" });
    }
    else if(this.state.fromAmount == 0){
      this.setState({ errorTransaction:true,
        errorMessage: "Please enter amount of money you want to send" });
    }
    else{
      var data = {
        rate: this.state.rate,
        fromCurrency: this.state.fromCurrency,
        toCurrency: this.state.toCurrency,
        fromAmount: this.state.fromAmount,
        toAmount: this.state.toAmount,
        duration: this.checkDuration()
      }

      this.props.saveValues(data);
      this.props.nextStep();
    }
  }

  render() {
    return (
      <div>
        <OrderContainer>
          <OrderTitle>How much do you want to send?</OrderTitle>
          <OrderDetails>Lorem ipsum dolor sit amet, consectetur adipiscing elit</OrderDetails>
          <div style={{margin: "0px -20px -10px -20px"}}>
            <Converter>
                <InputNumber
                  label={"You send"}
                  id={"send"}
                  activeCondition={this.state.activeElement == 'send'}
                  amount={this.state.fromAmount}
                  currency={this.state.fromCurrency}
                  onChange={this.handleSourceChange}
                  onSelect={this.selectSource} 
                  onClick={this.toggleSource}
                  onFocus={this.updateActiveElement}
                  onBlur={this.updateDeactiveElement}
                  show={this.state.isSourceActive}/>
                <InputNumber
                  label={"Recipient gets"}
                  id={"receive"}
                  activeCondition={this.state.activeElement == 'receive'}
                  amount={this.state.toAmount}
                  currency={this.state.toCurrency}
                  onChange={this.handleDestinationChange}
                  onSelect={this.selectDestination} 
                  onClick={this.toggleDestination}
                  onFocus={this.updateActiveElement}
                  onBlur={this.updateDeactiveElement}
                  show={this.state.isDestinationActive}/>
              <div style={{marginLeft: "20px", marginRight:"20px"}}>
                <RateAndFee
                  rate={this.state.rate}
                  fee={0}/>
              </div>
              </Converter>
            </div>

            {             
                this.checkDuration() == 1 ?
                 <p style={{maxWidth: "100%", marginBottom: "0"}}><span style={{color: '#FF9800'}}>*</span> Your transfer will be processed immediately.
                 The recipient will get the money on the <span ref = {this.receiveOn} className="received-on-weekend">next Working Day</span></p>  
                 :
                 (this.checkDuration() == 2) ?
                 <p style={{maxWidth: "100%", marginBottom: "0"}}><span style={{color: '#FF9800'}}>*</span> Your transfer will be processed immediately.
                 The recipient will get the money in less than <span ref = {this.receiveOn} className="received-on" value = "2">24 hours</span>, 
                 but kindly note, there is a chance that the money will arrive in more than <span id="exception" className="received-on">36 hours</span>.</p>
                 :
                 <p style={{maxWidth: "100%", marginBottom: "0"}}><span style={{color: '#FF9800'}}>*</span> Your transfer will be processed immediately.
                 The recipient will get the money in less than <span ref = {this.receiveOn} className="received-on" value = "3">24 hours.</span></p> 
              }
            
            <ButtonContainer>
		          {(this.state.fromCurrency == 'idr' && this.state.toCurrency == 'gbp' && this.props.adjustedRates.idrToGbpOos == 'true')
                  ||
                  (this.state.fromCurrency == 'gbp' && this.state.toCurrency == 'idr' && this.props.adjustedRates.gbpToIdrOos == 'true')
                  ||
                  (this.state.fromCurrency == 'idr' && this.state.toCurrency == 'eur' && this.props.adjustedRates.idrToEurOos == 'true')
                  ||
                  (this.state.fromCurrency == 'eur' && this.state.toCurrency == 'idr' && this.props.adjustedRates.eurToIdrOos == 'true')
                  ?
                  <Button disabled={true}>Out Of Stock</Button>
                  :
                  <Button onClick={this.saveAndContinue}>Continue</Button>
              }
            </ButtonContainer>           
        </OrderContainer>
        <ModalPopUp
          open={this.state.oos}
          toggleModal={this.toggleModalOOS}
          icon={'../static/images/Asset Web/send money/ic-error.svg'}
          title={"We are out of stock"}
          content={
            <p> But don't worry, we got you. If you still want your GBP to IDR transfer,
            <span className="bold"> we will happily buy your GBP </span> with our IDR , of course <span className="bold"> with Special Price </span>   .
              <br/>
              Click the button below to Sell Your GBP
            </p>
          }
          buttonText={"Sell My GPB"}
          buttonLink={"https://api.whatsapp.com/send?phone=447490090659&text=Hello%20Transfree"}
        />

        <ModalPopUp
          open={this.state.errorTransaction}
          toggleModal={this.toggleModalError}
          icon={'../static/images/Asset Web/send money/ic-error.svg'}
          title={"Transaction Error"}
          content={
            <p> {this.state.errorMessage} </p>
          }
          buttonText={"Change Transaction"}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  rate: state.rate.rates,
  adjustedRates: state.fx.adjustedRates
});

export default connect(mapStateToProps, rateActions)(OrderAmount);
