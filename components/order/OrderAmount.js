import Link from 'next/link';
import { connect } from 'react-redux';
import rateActions from '../../redux/actions';
import NumberFormat from 'react-number-format';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import Modal from 'react-modal';
import {Converter, InputNumber, ReverseButton, RateAndFee} from '../landing-page/Hero'
import '@fortawesome/fontawesome-svg-core/styles.css';


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
  on() {
  document.getElementById("overlay").style.visibility = "visible";
  }
  render() {
    return (
      <div>
        <OrderContainer>
          <OrderTitle>How much do you want to send?</OrderTitle>
          <OrderDetails>Lorem ipsum dolor sit amet, consectetur adipiscing elit</OrderDetails>
          <div style={{marginLeft: "-20px", marginRight:"-20px"}}>
            <Converter>
                <InputNumber
                  label={"You send"}
                  amount={this.state.fromAmount}
                  currency={this.state.fromCurrency}
                  onChange={this.handleSourceChange}
                  onSelect={this.selectSource} 
                  onClick={this.toggleSource}
                  show={this.state.isSourceActive}/>
                <ReverseButton>
                  <img src="../../static/images/reverse.png" alt="rv"
                    onClick={() => this.reverse(this.state.fromCurrency, this.state.toCurrency)}/>
                </ReverseButton>
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
        
              
            <div className="row converter-cta">
              <div className="cta-primary">
		      {/*
                <Link href="/order">
                    <a className="btn-primary" onClick={this.saveAndContinue}>Continue</a>
                 </Link>
                */}
                {/* {this.state.fromCurrency == 'gbp' && this.state.toCurrency == 'idr' ? 
                this.setState({oos:true})
                  // <Link href={"#oos"}>
                  //   <a className="btn-primary" >Continue</a>
                  // </Link>
                 :
		              (this.state.fromCurrency == 'idr' && this.state.toCurrency == 'gbp' && this.props.adjustedRates.idrToGbpOos == 'true')
                  ||
                  (this.state.fromCurrency == 'gbp' && this.state.toCurrency == 'idr' && this.props.adjustedRates.gbpToIdrOos == 'true')
                  ||
                  (this.state.fromCurrency == 'idr' && this.state.toCurrency == 'eur' && this.props.adjustedRates.idrToEurOos == 'true')
                  ||
                  (this.state.fromCurrency == 'eur' && this.state.toCurrency == 'idr' && this.props.adjustedRates.eurToIdrOos == 'true')

                  ?
                  <Link href="/order">
                    <a className="btn-disabled">Out Of Stock</a>
                  </Link>
                  :
                  <Link href="/order">
                    <a className="btn-primary" onClick={this.saveAndContinue}>Continue</a>
                  </Link>  
                }
                */}

              </div>
              </div>
        <style jsx>{`
	   /** POP UP OOS MARKUP **/
          .popup {
            margin: 0 auto!important;
            margin-top: 17%!important;

            padding: 20px;
            background: #fff;
            border-radius: 5px;
            width: 30%;
            position: relative;
            transition: all 5s ease-in-out;
          }

          .popup h2 {

            margin-top: 1%;
            color: #333;

          }
          .popup h3{
            display: none;
          }
          .popup .close {
            position: absolute;
            top: 20px;
            right: 30px;
            transition: all 200ms;
            font-size: 30px;
            font-weight: bold;
            text-decoration: none;
            color: #333;

          }
          .popup .close:hover {
            color: #5a9cd8;
          }
          .popup .content {
            max-height: 30%;
            overflow: auto;
          }
          .popup .content p{
            color: GREY;
          }
          .Cpesan{
            justify-content: center;
          }
          .Pesan {
            text-align: center;
            color: #3E495E;
            font-family: 'Campton-Bold';
          }

          /** END OF POP UP OOS MARKTUP **/
	  /** LIGHTBOX MARKUP **/
	.lightbox {
	  /** Default lightbox to hidden */
	  display: none;

	  /** Position and style */
	  position: fixed;
	  z-index: 999;
	  width: 100%;
	  height: 100%;
	  text-align: center;
	  top: 0;
	  left: 0;
	  background: rgba(0,0,0,0.8);
	}

	.lightbox:target {
	  /** Remove default browser outline */
	  outline: none;

	  /** Unhide lightbox **/
	  display: block;
	}
	/** END LIGHTBOX MARKUP **/
          .container-fluid {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            align-items: center;
          }

          .logo img {
            height: 28px;
            margin: 50px auto;
          }

          p {
            max-width: 500px;
          }

          h1 {
            margin: 0 auto;
            text-align: center;
          }

          li {
            font-family: "Campton-Book", sans-serif;
          }

          .converter-container-order {
            width: 500px;
            height: auto;
            // padding: 15px;
            background: #FFFFFF;
            border-radius: 8px;
          }

          .exchange-container {
            display: flex;
            flex-direction: column;
          }

          .money-input-container {
            display: flex;
            background-color: #FFFFFF;
            border-radius: 4px;

          }

          .money-input {
            display: flex;
            flex-basis: 65%;
            flex-direction: column;
          }

          .money-input span {
            margin: 5px 0 0 10px;
          }

          .money-input-container {
            display: flex;
            background-color: #ECECEE;
            border-radius: 4px;

          }

          .currency-change {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-basis: 35%;
            width: 35%;
            background-color: #1F345A;
            border-radius: 0 4px 4px 0;
            transition: 1s auto;
            -webkit-transition: all .15s ease-in-out;
            -o-transition: all .15s ease-in-out;
            transition: all .15s ease-in-out;
          }

          .currency-change:hover {
            border: 1px solid #eaeaea;
          }

          .source-container {
            margin-bottom: 30px;
          }

          .currency-from {
            display: flex;
            align-items: center;
            font-size: 20px;
            font-family: 'Campton-Bold', sans-serif;
          }

          .rate {
            display: flex;
            margin: 20px 0;
          }

          .rate-desc {
            flex-basis: 50%;
          }

          .rate-value {
            flex-basis: 50%;
            text-align: right;
            font-family: 'Campton-Bold', sans-serif;
          }

          .note {
            margin-bottom: 20px;
          }

          .received-on {
            font-family: 'Campton-Bold', sans-serif;
          }
          .received-on-weekend {
            font-family: 'Campton-Bold', sans-serif;
            color: #e79635
          }

          .converter-cta {
            display: flex;
          }

          .cta-secondary,
          .cta-primary {
            flex-basis: 100%;
            padding: 5px;
          }

          .cta-secondary a,
          .cta-primary a {
            width: 100%;
          }

          .cta-secondary a {
            padding: 8px 0;
          }

          .cta-primary a {
            padding: 10px 0;
          }

          .dropdown-menu {
            position: absolute;
            transform: translate3d(0px, 0px, 0px);
            z-index: 1000;
            display: none;
            float: left;
            min-width: 10rem;
            padding: .5rem 0;
            margin: .125rem 0 0;
            font-size: 1rem;
            color: #212529;
            text-align: left;
            list-style: none;
            background-color: #fff;
            background-clip: padding-box;
            border: 1px solid rgba(0,0,0,.15);
            border-radius: .25rem;
          }

          .show {
            display: block;
          }

          .dropdown-menu ul {
            height: auto;
            max-height: 150px;
            overflow-y: auto;
            list-style-type: none;
            margin: 0;
            padding: 0;
          }

          .dropdown-item {
            display: flex;
            align-items: center;
            padding: 14px 20px 8px;
            color: #15233c;
          }

          .dropdown-item .flag-icon {
            border: 1px solid #eaeaea;
          }

          .dropdown-item:hover {
            background-color: #469DDD;
            cursor: pointer;
          }

          .dropdown-button {
            background: none;
            border: none;
            text-transform: uppercase;
            color: #fff;
          }

          .dropdown-button:active,
          .dropdown-button:focus {
            outline: none;
          }

          a.dropdown-item {
            transition: none;
          }

          .btn-primary {
            width: 100%;
          }


          @media only screen and (max-width: 414px) {
	        .popup h2 {
            display : none
            }
            .popup h3{
	          text-align: left !important;
            margin-top: 4%;
            font-size: 20px ;
            display: block
            }
	    .popup p{
	    font-size: 15px !important;
	    }
            .popup {
            margin-top: 40%!important;
            width: 70%;
            }
            .reverse-img{
              padding-right : 15px !important;
              width : 6% !important
            }
            .converter-container-order {
              width: 317px;
              flex-direction: column;
            }
            .container-fluid p {
              text-align: left;
            }
            .dropdown-button .flag-icon {
              display: none;
            }
            .dropdown-menu {
              position: absolute;
              left: 0;
              bottom: 0;
              height: 50vh;
              width: 100%;
            }

            .dropdown-menu ul {
              max-height: 50vh;
            }

          }
        `}</style>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  rate: state.rate.rates,
  adjustedRates: state.fx.adjustedRates
});

export default connect(mapStateToProps, rateActions)(OrderAmount);
