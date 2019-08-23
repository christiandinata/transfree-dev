import Link from 'next/link';
import { connect } from 'react-redux';
import rateActions from '../../redux/actions';
import NumberFormat from 'react-number-format';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';

class OrderAmount extends React.Component {
  constructor({ props }) {
    super(props);
    this.state = {
      isSourceActive: false,
      isDestinationActive: false,
      fromCurrency: 'gbp',
      toCurrency: 'idr',
      fromAmount: 1000.00,
      toAmount: 0
    };

    this.toggleSource = this.toggleSource.bind(this);
    this.hideSource = this.hideSource.bind(this);
    this.toggleDestination = this.toggleDestination.bind(this);
    this.hideDestination = this.hideDestination.bind(this);
    this.handleSourceChange = this.handleSourceChange.bind(this);
    this.handleDestinationChange = this.handleDestinationChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      rate: this.props.rate - (this.props.rate * this.props.adjustedRates.lowerMargin / 100),
      toAmount: this.state.fromAmount * (this.props.rate - (this.props.rate * this.props.adjustedRates.lowerMargin / 100 ))
    })
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
            toAmount: this.state.fromAmount / (this.props.rate - (this.props.rate * this.props.adjustedRates.lowerMargin / 100))
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

  saveAndContinue = (e) => {
    e.preventDefault();
    var data = {
      rate: this.state.rate,
      fromCurrency: this.state.fromCurrency,
      toCurrency: this.state.toCurrency,
      fromAmount: this.state.fromAmount,
      toAmount: this.state.toAmount
    }

    this.props.saveValues(data);
    this.props.nextStep();
  }

  render() {
    return (
      <div>
          <h1>How much do you want to send?</h1>
          <div className="converter-container-order">
            <div className="row exchange-container">
              <div className="source-container">
                <div className="money-input-container">
                  <div className="money-input">
                    <span>You send</span>
                    <NumberFormat
                      id="money-from"
                      type="text"
                      thousandSeparator={true}
                      decimalScale={2}
                      value={this.state.fromAmount}
                      onKeyUp={this.handleSourceChange}/>
                  </div>
                  <div className="currency-change">
                    <button className="currency-from dropdown-button" onClick={this.toggleSource}>
                      <span className={'flag-icon flag-icon-'+this.state.fromCurrency.substring(0,2)+' flag-icon-squared'}></span> {this.state.fromCurrency}
                      <FontAwesomeIcon className="caret" icon="caret-down"/>
                    </button>
                    <div className={this.state.isSourceActive ? 'dropdown-menu show' : 'dropdown-menu'}>
                      <ul>
                        <li onClick={this.selectSource.bind(this,'idr')}>
                          <a className="dropdown-item">
                            <span className="flag-icon flag-icon-id flag-icon-squared"></span> IDR (Indonesian Rupiah)
                          </a>
                        </li>
                        <li onClick={this.selectSource.bind(this,'gbp')}>
                          <a className="dropdown-item">
                            <span className="flag-icon flag-icon-gb flag-icon-squared"></span> GBP (British Poundsterling)
                          </a>
                        </li>
                        <li onClick={this.selectSource.bind(this,'usd')}>
                          <a className="dropdown-item">
                            <span className="flag-icon flag-icon-us flag-icon-squared"></span> USD (US Dollar)
                          </a>
                        </li>
                        <li onClick={this.selectSource.bind(this,'aud')}>
                          <a className="dropdown-item">
                            <span className="flag-icon flag-icon-au flag-icon-squared"></span> AUD (Australian Dollar)
                          </a>
                        </li>
                        <li onClick={this.selectSource.bind(this,'eur')}>
                          <a className="dropdown-item">
                            <span className="flag-icon flag-icon-eu flag-icon-squared"></span> EUR (European Euro)
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="destination-container">
                <div className="money-input-container">
                  <div className="money-input">
                    <span>Recipient gets</span>
                    <NumberFormat
                      id="money-to"
                      type="text"
                      thousandSeparator={true}
                      decimalScale={2}
                      value={this.state.toAmount}
                      onKeyUp={this.handleDestinationChange}/>
                  </div>
                  <div className="currency-change">
                    <button className="currency-from dropdown-button" onClick={this.toggleDestination}>
                      <span className={'flag-icon flag-icon-'+this.state.toCurrency.substring(0,2)+' flag-icon-squared'}></span> {this.state.toCurrency}
                      <FontAwesomeIcon className="caret" icon="caret-down"/>
                    </button>
                    <div className={this.state.isDestinationActive ? 'dropdown-menu show' : 'dropdown-menu'}>
                      <ul>
                        <li onClick={this.selectDestination.bind(this,'idr')}>
                          <a className="dropdown-item">
                            <span className="flag-icon flag-icon-id flag-icon-squared"></span> IDR (Indonesian Rupiah)
                          </a>
                        </li>
                        <li onClick={this.selectDestination.bind(this,'myr')}>
                          <a className="dropdown-item">
                            <span className="flag-icon flag-icon-my flag-icon-squared"></span> MYR (Malaysian Ringgit)
                          </a>
                        </li>
                        <li onClick={this.selectDestination.bind(this,'krw')}>
                          <a className="dropdown-item">
                            <span className="flag-icon flag-icon-kr flag-icon-squared"></span> KRW (Korean Won)
                          </a>
                        </li>
                        <li onClick={this.selectDestination.bind(this,'gbp')}>
                          <a className="dropdown-item">
                            <span className="flag-icon flag-icon-gb flag-icon-squared"></span> GBP (British Poundsterling)
                          </a>
                        </li>
                        <li onClick={this.selectDestination.bind(this,'usd')}>
                          <a className="dropdown-item">
                            <span className="flag-icon flag-icon-us flag-icon-squared"></span> USD (US Dollar)
                          </a>
                        </li>
                        <li onClick={this.selectDestination.bind(this,'aud')}>
                          <a className="dropdown-item">
                            <span className="flag-icon flag-icon-au flag-icon-squared"></span> AUD (Australian Dollar)
                          </a>
                        </li>
                        <li onClick={this.selectDestination.bind(this,'eur')}>
                          <a className="dropdown-item">
                            <span className="flag-icon flag-icon-eu flag-icon-squared"></span> EUR (European Euro)
                          </a>
                        </li>
                        <li onClick={this.selectDestination.bind(this,'hkd')}>
                          <a className="dropdown-item">
                            <span className="flag-icon flag-icon-hk flag-icon-squared"></span> HKD (Hongkong Dollar)
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row rate">
              <span className="rate-desc">Conversion rate</span> <span className="rate-value"><span className="live-rate"><NumberFormat displayType={'text'} thousandSeparator={true} decimalScale={4} value={this.state.rate} /></span></span>
            </div>
            <div className="row note">
              <p style={{maxWidth: "100%", marginBottom: "0"}}>Your transfer will be processed immediately.
              The recipient will get the money in less than <span className="received-on">24 hours.</span>.</p>
            </div>
            <div className="row converter-cta">
              <div className="cta-primary">
                <Link href="/order">
                    <a className="btn-primary" onClick={this.saveAndContinue}>Continue</a>
                 </Link>
                {/*
                {this.state.fromCurrency == 'idr' && this.state.toCurrency == 'gbp' ? 
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
          </div>
        <style jsx>{`
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
            padding: 30px;
            margin: 30px auto;
            background: #FFFFFF;
            box-shadow: 0 10px 30px 0 rgba(0,0,0,0.10);
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
            .converter-container-order {
              width: 305px;
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
