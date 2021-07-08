import { connect } from 'react-redux';
import rateActions from '../../redux/actions';
import styled from 'styled-components';
import Modal from 'react-modal';
import {Converter, InputNumber, RateAndFee} from '../landing-page/Hero'

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

const ButtonLink = styled.a`
  border: 1px solid #009FE3;
  border-radius: 4px;

  width: 100%;
  height: 50px;
  font-size: 16px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  transition: 0.2s;

  text-decoration: none;

  background-color: #009FE3;
  color: white;
`;

const PopUpModal = styled(Modal)`
  position: fixed;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;

  border: 1px solid #ccc;
  background: #fff;
  overflow: auto;
  border-radius: 4px;
  outline: none;
  padding: 10px;
  max-width: 500px;
  text-align: center;

  @media only screen and (max-width: 800px) {
    min-width: 500px;
  }

  @media only screen and (max-width: 540px) {
    min-width: 280px;
  }
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
      oos: false
    };

    this.receiveOn = React.createRef();

    this.toggleSource = this.toggleSource.bind(this);
    this.selectSource = this.selectSource.bind(this);
    this.hideSource = this.hideSource.bind(this);
    this.toggleDestination = this.toggleDestination.bind(this);
    this.hideDestination = this.hideDestination.bind(this);
    this.selectDestination = this.selectDestination.bind(this);
    this.handleSourceChange = this.handleSourceChange.bind(this);
    this.handleDestinationChange = this.handleDestinationChange.bind(this);
    this.reverse = this.reverse.bind(this);
    this.checkDuration = this.checkDuration.bind(this);
  }
  
  reverse(country,country2) {
	this.setState({
            
    fromCurrency: country2,
    toCurrency: country,
    });
    if (country == 'idr') {
      this.props.getRates(country2, country).then(() => {
        if (this.state.fromCurrency == 'idr') {
          this.setState({
            rate: 1,
            
          });
        } else {
          this.setState({
            rate: this.props.rate - (this.props.rate * this.props.adjustedRates.lowerMargin / 100),
            toAmount: this.state.fromAmount * (this.props.rate - (this.props.rate * this.props.adjustedRates.lowerMargin / 100))
          });
        }
      });
    } else {
      if (country2 == 'idr') {
        this.props.getRates(country, country2).then(() => {
          this.setState({
            rate: this.props.rate + (this.props.rate * this.props.adjustedRates.upperMargin / 100),
            toAmount: this.state.fromAmount / (this.props.rate + (this.props.rate * this.props.adjustedRates.upperMargin / 100))
          });
        });
      } else {
        this.props.getRates(country2,country).then(() => {
          this.setState({
            rate: this.props.rate,
            toAmount: this.state.fromAmount * this.props.rate
          });
        });
      }
    }
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
      if (fromAmount < 100000) {
        this.setState({
          fromAmount: fromAmount,
          toAmount: 0
        })
      } else {
        this.setState({
          fromAmount: fromAmount,
          toAmount: fromAmount / this.state.rate
        })
      }
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
    else if(this.state.fromCurrency == 'idr' && (this.state.toAmount == 0 || this.state.fromAmount <100000)){
      alert("Plase send minimum 100,000 IDR")
    }
    else if(this.state.fromAmount == 0){
      alert("Plase enter amount of money you want to send ")
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
                  amount={this.state.fromAmount}
                  currency={this.state.fromCurrency}
                  onChange={this.handleSourceChange}
                  onSelect={this.selectSource} 
                  onClick={this.toggleSource}
                  show={this.state.isSourceActive}/>
                <InputNumber
                  label={"Recipient gets"}
                  amount={this.state.toAmount}
                  currency={this.state.toCurrency}
                  onChange={this.handleDestinationChange}
                  onSelect={this.selectDestination} 
                  onClick={this.toggleDestination}
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
        <PopUpModal isOpen={this.state.oos}>
          <h2>WE ARE OUT OF STOCK</h2>
          <div className="content" >
            <p> But don't worry, we got you. If you still want your GBP to IDR transfer,
              <b> we will happily buy your GBP </b> with our IDR , of course <b> with Special Price </b>   .
                <br/> <br/>
              Click the button below to Sell Your GBP
            </p>
            <ButtonContainer style = {{paddingTop: '10px'}}>
              <ButtonLink target="_blank" href="https://www.transfree.co.uk/currency-seller-to-idr">Sell My GBP</ButtonLink>
              <Button secondary onClick={() => this.setState({oos:false})}>
                Close
              </Button>
            </ButtonContainer>
          </div>
        </PopUpModal>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  rate: state.rate.rates,
  adjustedRates: state.fx.adjustedRates
});

export default connect(mapStateToProps, rateActions)(OrderAmount);
