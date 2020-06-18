import Menu from '../components/menu.js';
import Header from '../components/header.js';
import Footer from '../components/footer.js';
import Link from 'next/link';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../redux/actions';
import initialize from '../utils/initialize';
import { getCookie } from '../utils/cookie';
import NumberFormat from 'react-number-format';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';


class Index extends React.Component {
  constructor({ props }) {
    super(props);
    this.state = {
      isSourceActive: false,
      isDestinationActive: false,
      fromCurrency: 'gbp',
      toCurrency: 'idr',
      fromAmount: 1000,
      toAmount: 0
    };

    this.toggleSource = this.toggleSource.bind(this);
    this.hideSource = this.hideSource.bind(this);
    this.toggleDestination = this.toggleDestination.bind(this);
    this.hideDestination = this.hideDestination.bind(this);
    this.handleSourceChange = this.handleSourceChange.bind(this);
    this.handleDestinationChange = this.handleDestinationChange.bind(this);
    this.reverse = this.reverse.bind(this);
  }
  static async getInitialProps(ctx) {
    initialize(ctx);
    await ctx.store.dispatch(actions.getAdjustedRates('IDR','getAdjustedRates'));
    await ctx.store.dispatch(actions.getRates('GBP','IDR'));
  };

  componentDidMount() {
    this.setState({
      rate: this.props.rate - (this.props.rate * this.props.adjustedRates.lowerMargin / 100),
      toAmount: this.state.fromAmount * (this.props.rate - (this.props.rate * this.props.adjustedRates.lowerMargin / 100 ))
    })
  }
  reverse(country,country2) {
	this.setState({

    fromCurrency: country2,
    toCurrency: country,
    toAmount :0,
    fromAmount :0

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
        });
      }
    });
  } else {
    if (country2 == 'idr') {
      this.props.getRates(country, country2).then(() => {
        this.setState({
          rate: this.props.rate + (this.props.rate * this.props.adjustedRates.upperMargin / 100),
        });
      });
    } else {
      this.props.getRates(country2,country).then(() => {
        this.setState({
          rate: this.props.rate,

        });
      });
    }
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

  render() {
    return (
      <div>
        <Header/>
        <Menu isApproved={this.props.isApproved}/>
        <div className="row hero">
          <div className="container">
            <div className="left-container">
              <div className="logo">
                <img src="../static/images/transfree-logo.png"/>
                </div>
              <h1>International money transfer feels</h1>
              <h1 className="h1-bawah">like local</h1>
              <div className="desktop">
                <div className="fixed-btn">
                  <a href="https://api.whatsapp.com/send?phone=447490090659&text=Hello%20Transfree" target="_blank">

                  <img style={{width: "50%", marginTop: "25%"}} src="../static/images/wa-logo.png"/></a>
                </div>
                <div className="external-link">
                  <div className="external-link-left">
                    <a href={"#video-transfree"} className="btn-secondary">See how it works</a>
                    <a href="#_" className="lightbox" id={"video-transfree"}>
                    <iframe src="https://www.youtube.com/embed/8RzCs_sQ8Ak" frameBorder="0" allow="accelerometer;
                    autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </a>
                  </div>

                  <div className="external-link-right">
                        <a style={{paddingRight: "35px",paddingLeft: "35px",paddingTop: "9.5px",paddingBottom: "9.5px"}} className="btn-primary-3"  href="/send">Send for Living</a>
                  </div>

                </div>

                <div className="benefits">
                  <div className="benefit-item">
                    <img src="../static/images/benefit-1.svg"/>
                    <p>Official partner Persatuan pelajar Indonesia</p>
                  </div>
                  <div className="benefit-item">
                    <img src="../static/images/benefit-2.svg"/>
                    <p>Winner Entrepreneur Summit LPDP 2018</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="right-container">
              <div className="converter-container">
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
                            {/* <li onClick={this.selectSource.bind(this,'usd')}>
                              <a className="dropdown-item">
                                <span className="flag-icon flag-icon-us flag-icon-squared"></span> USD (US Dollar)
                              </a>
                            </li>
                  	    <li onClick={this.selectSource.bind(this,'aud')}>
                  	      <a className="dropdown-item">
                  		<span className="flag-icon flag-icon-au flag-icon-squared"></span> AUD (Australian Dollar)
                  	      </a>
                  	    </li> */}
                            <li onClick={this.selectSource.bind(this,'eur')}>
                              <a className="dropdown-item">
                                <span className="flag-icon flag-icon-eu flag-icon-squared"></span> EUR (European Euro)
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* <input id="money-from" type="text" value={this.toCurrency(this.state.fromAmount)} onChange={this.handleSourceChange}/> */}


                  </div>

                  <div style={{textAlign:"right"}}>
                    <img onClick={

                    	(this.state.fromCurrency == 'gbp' && this.state.toCurrency == 'idr' ) ?
						this.reverse.bind(this,'gbp' , 'idr')
                    	:
                    	(this.state.fromCurrency == 'idr' && this.state.toCurrency == 'gbp' ) ?
						this.reverse.bind(this,'idr' , 'gbp')
						:
						(this.state.fromCurrency == 'idr' && this.state.toCurrency == 'eur' ) ?
						this.reverse.bind(this,'idr' , 'eur')
						:
						(this.state.fromCurrency == 'eur' && this.state.toCurrency == 'idr' ) ?
						this.reverse.bind(this,'eur' , 'idr')
						:
						(this.state.fromCurrency == 'idr' && this.state.toCurrency == 'myr' ) ?
						this.reverse.bind(this,'idr' , 'myr')
						:
						(this.state.fromCurrency == 'myr' && this.state.toCurrency == 'idr' ) ?
						this.reverse.bind(this,'myr' , 'idr')
						:
						/**(this.state.fromCurrency == 'idr' && this.state.toCurrency == 'krw' ) ?
						this.reverse.bind(this,'idr' , 'krw')
						:
						(this.state.fromCurrency == 'krw' && this.state.toCurrency == 'idr' ) ?
						this.reverse.bind(this,'krw' , 'idr')
						:*/
						(this.state.fromCurrency == 'idr' && this.state.toCurrency == 'usd' ) ?
						this.reverse.bind(this,'idr' , 'usd')
						:
						// (this.state.fromCurrency == 'usd' && this.state.toCurrency == 'idr' ) ?
						// this.reverse.bind(this,'usd' , 'idr')
						// :
						(this.state.fromCurrency == 'idr' && this.state.toCurrency == 'aud' ) ?
						this.reverse.bind(this,'idr' , 'aud')
						:
						// (this.state.fromCurrency == 'aud' && this.state.toCurrency == 'idr' ) ?
						// this.reverse.bind(this,'aud' , 'idr')
						// :
						(this.state.fromCurrency == 'idr' && this.state.toCurrency == 'hkd' ) ?
						this.reverse.bind(this,'idr' , 'hkd')
						:
						(this.state.fromCurrency == 'hkd' && this.state.toCurrency == 'idr' ) ?
						this.reverse.bind(this,'hkd' , 'idr')
						:
						(this.state.fromCurrency == 'gbp' && this.state.toCurrency == 'myr' ) ?
						this.reverse.bind(this,'gbp' , 'myr')
						:
						(this.state.fromCurrency == 'myr' && this.state.toCurrency == 'gbp' ) ?
						this.reverse.bind(this,'myr' , 'gbp')
						:
					/**	(this.state.fromCurrency == 'gbp' && this.state.toCurrency == 'krw' ) ?
						this.reverse.bind(this,'gbp' , 'krw')
						:
						(this.state.fromCurrency == 'krw' && this.state.toCurrency == 'gbp' ) ?
						this.reverse.bind(this,'krw' , 'gbp')
            :
            */
						(this.state.fromCurrency == 'gbp' && this.state.toCurrency == 'usd' ) ?
						this.reverse.bind(this,'gbp' , 'usd')
						:
						(this.state.fromCurrency == 'usd' && this.state.toCurrency == 'gbp' ) ?
						this.reverse.bind(this,'usd' , 'gbp')
						:
						(this.state.fromCurrency == 'gbp' && this.state.toCurrency == 'eur' ) ?
						this.reverse.bind(this,'gbp' , 'eur')
						:
						(this.state.fromCurrency == 'eur' && this.state.toCurrency == 'gbp' ) ?
						this.reverse.bind(this,'eur' , 'gbp')
						:
						(this.state.fromCurrency == 'gbp' && this.state.toCurrency == 'aud' ) ?
						this.reverse.bind(this,'gbp' , 'aud')
						:
						(this.state.fromCurrency == 'aud' && this.state.toCurrency == 'gbp' ) ?
						this.reverse.bind(this,'aud' , 'gbp')
						:
						(this.state.fromCurrency == 'gbp' && this.state.toCurrency == 'hkd' ) ?
						this.reverse.bind(this,'gbk' , 'hkd')
						:
						(this.state.fromCurrency == 'hkd' && this.state.toCurrency == 'gbp' ) ?
						this.reverse.bind(this,'hkd' , 'gbp')
						:

						(this.state.fromCurrency == 'usd' && this.state.toCurrency == 'myr' ) ?
						this.reverse.bind(this,'usd' , 'myr')
						:
						(this.state.fromCurrency == 'myr' && this.state.toCurrency == 'usd' ) ?
						this.reverse.bind(this,'myr' , 'usd')
						:
					/** 	(this.state.fromCurrency == 'usd' && this.state.toCurrency == 'krw' ) ?
						this.reverse.bind(this,'usd' , 'krw')
						:
						(this.state.fromCurrency == 'krw' && this.state.toCurrency == 'usd' ) ?
						this.reverse.bind(this,'krw' , 'usd')
            :
            */
						(this.state.fromCurrency == 'usd' && this.state.toCurrency == 'eur' ) ?
						this.reverse.bind(this,'usd' , 'eur')
						:
						(this.state.fromCurrency == 'eur' && this.state.toCurrency == 'usd' ) ?
						this.reverse.bind(this,'eur' , 'usd')
						:
						(this.state.fromCurrency == 'usd' && this.state.toCurrency == 'aud' ) ?
						this.reverse.bind(this,'usd' , 'aud')
						:
						(this.state.fromCurrency == 'aud' && this.state.toCurrency == 'usd' ) ?
						this.reverse.bind(this,'aud' , 'usd')
						:
						(this.state.fromCurrency == 'usd' && this.state.toCurrency == 'hkd' ) ?
						this.reverse.bind(this,'usd' , 'hkd')
						:
						(this.state.fromCurrency == 'hkd' && this.state.toCurrency == 'usd' ) ?
						this.reverse.bind(this,'hkd' , 'usd')
						:

						(this.state.fromCurrency == 'aud' && this.state.toCurrency == 'myr' ) ?
						this.reverse.bind(this,'aud' , 'myr')
						:
						(this.state.fromCurrency == 'myr' && this.state.toCurrency == 'aud' ) ?
						this.reverse.bind(this,'myr' , 'aud')
						:
						/**
            (this.state.fromCurrency == 'aud' && this.state.toCurrency == 'krw' ) ?
						this.reverse.bind(this,'aud' , 'krw')
						:
						(this.state.fromCurrency == 'krw' && this.state.toCurrency == 'aud' ) ?
						this.reverse.bind(this,'krw' , 'aud')
            :
            */
						(this.state.fromCurrency == 'aud' && this.state.toCurrency == 'eur' ) ?
						this.reverse.bind(this,'aud' , 'eur')
						:
						(this.state.fromCurrency == 'eur' && this.state.toCurrency == 'aud' ) ?
						this.reverse.bind(this,'eur' , 'aud')
						:
						(this.state.fromCurrency == 'aud' && this.state.toCurrency == 'hkd' ) ?
						this.reverse.bind(this,'aud' , 'hkd')
						:
						(this.state.fromCurrency == 'hkd' && this.state.toCurrency == 'aud' ) ?
						this.reverse.bind(this,'hkd' , 'aud')
						:

						(this.state.fromCurrency == 'eur' && this.state.toCurrency == 'myr' ) ?
						this.reverse.bind(this,'eur' , 'myr')
						:
						(this.state.fromCurrency == 'myr' && this.state.toCurrency == 'eur' ) ?
						this.reverse.bind(this,'myr' , 'eur')
						:
						/**
            (this.state.fromCurrency == 'eur' && this.state.toCurrency == 'krw' ) ?
						this.reverse.bind(this,'eur' , 'krw')
						:
						(this.state.fromCurrency == 'krw' && this.state.toCurrency == 'eur' ) ?
						this.reverse.bind(this,'krw' , 'eur')
						:
            */
            (this.state.fromCurrency == 'eur' && this.state.toCurrency == 'hkd' ) ?
						this.reverse.bind(this,'eur' , 'hkd')
						:
						(this.state.fromCurrency == 'hkd' && this.state.toCurrency == 'eur' ) ?
						this.reverse.bind(this,'hkd' , 'eur')
						:
						null
                    }

            className="reverse-img" style={{width: "4.5%",paddingBottom:"10px",marginTop:"-15px",paddingRight:"17px"}} src="../static/images/reverse.png"/>
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
                            {/**<li onClick={this.selectDestination.bind(this,'krw')}>
                              <a className="dropdown-item">
                                <span className="flag-icon flag-icon-kr flag-icon-squared"></span> KRW (Korean Won)
                              </a>
                            </li>
                            */}
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
                    {/* <input id="money-to" type="text" value={this.toCurrency(this.state.toAmount)} onChange={this.handleDestinationChange}/> */}
                  </div>

                </div>
                <div className="row rate">
                  <span className="rate-desc">Conversion rate</span> <span className="rate-value"><span className="live-rate"><NumberFormat displayType={'text'} thousandSeparator={true} decimalScale={5} value={this.state.rate} /></span></span>
                </div>
                <div className="row rate"style={{marginTop:"-20px"}} >
                  <span className="rate-desc" >Transfer fee </span> <span className="rate-value" style={{textAlign:"right",marginLeft:"5px"}}><span ><NumberFormat displayType={'text'} thousandSeparator={true} decimalScale={2} value="0" /></span></span>
                </div>

                {/*{this.state.fromCurrency == 'idr' && this.state.toCurrency == 'gbp' ?
                  <Link href="/">
                  <div classname="row note">
                   <p style={{maxWidth: "100%", marginBottom: "0", color: "darkgrey"}}>Your transfer will be processed immediately.
                    <span style={{maxWidth: "100%", marginBottom: "0", color: "orange"}}> But your money will arrived on Monday or in the next working day.</span>
                   </p>
                  </div>
                  </Link>
                  :
                  <Link href="/">
                  <a classname="row note">
                   <p style={{maxWidth: "100%", marginBottom: "0", color: "darkgrey"}}>Your transfer will be processed immediately.
                   The recipient will get the money in less than <span className="received-on">24 hours</span>.</p>
                  </a>
                  </Link>
                }*/}


                <div className="row note">
                  <p style={{maxWidth: "100%", marginBottom: "0"}}>Your transfer will be processed immediately.
                  The recipient will get the money in next working day. </p>
		  {/*<span className="received-on">24 hours</span>*/}
                </div>


                <div className="row converter-cta">
                {
                  // <div className="cta-secondary">
                  //   <Link href="">
                  //     <a className="btn-secondary">Compare price</a>
                  //   </Link>
                  // </div>
                }

                  <div className="cta-primary">

                  <Link href="/order">
                    <a className="btn-primary">Get started</a>
                  </Link>
                  <Link href="/fxroom">
                    <a className="btn-primary-2">FX Room</a>
                  </Link>
                  <div className="store">
                    <a href="https://play.google.com/store/apps/details?id=com.transfree.id" target="_blank">
                    <img style={{width: "47%", paddingRight:"9px"}} src="../static/images/playstore.png"/></a>
                    <a href="https://apps.apple.com/us/app/transfree/id1493107400?ls=1" target="_blank">
                    <img style={{width:"47%", paddingLeft:"9px"}} src="../static/images/appstore.svg"/></a>
                  </div>

		  {/*
                  {this.state.fromCurrency == 'gbp' && this.state.toCurrency == 'idr' ?
                     <Link href="/">
                      <a className="btn-disabled">Out Of Stock</a>
                     </Link>
                     :
                     <Link href="/order">
                      <a className="btn-primary">Get started</a>
                     </Link>
                    }*/}

                  </div>
                </div>
              </div>
            <div className="right-bottom-container">
              <div className="fixed-btn">
                <a href="https://api.whatsapp.com/send?phone=447490090659&text=Hello%20Transfree" target="_blank">
                <img style={{width: "50%", marginTop: "25%"}} src="../static/images/wa-logo.png"/></a>
              </div>
              <h1>International money transfer feels like local</h1>
              <center>
                <Link>
                  <a href="https://www.youtube.com/watch?v=8RzCs_sQ8Ak" target="_blank" className="btn-secondary">See how it works</a>
                </Link>
                <Link>
                  <a style={{marginTop: "20px"}} href="/send" className="btn-secondary sell-buy">Send for Living</a>
                </Link>
              </center>
            </div>
              {
              // <div className="promo">
              //   <div className="promo-desc">
              //   Let's lighten their burden: <b>Banjir Bandang Papua</b>
              //   </div>
              //   <div className="promo-cta">
              //     <Link href="">
              //       <a className="btn-primary">Donate now</a>
              //     </Link>
              //   </div>
              // </div>
              }

            </div>
          </div>

        </div>
        <div className="row">
          <img className="curve" src="../static/images/curve-bg.svg"/>
        </div>
{/*
        <div className="row partners">
          <h1>Our partners</h1>
          <div className="container partners-wrapper">
            <div className="row partners-container">
              <div className="partner-item">
                <img src="../static/images/partners/ppi-mib.png"/>
              </div>
              <div className="partner-item">
                <img src="../static/images/partners/ppi-london.png"/>
              </div>
              <div className="partner-item">
                <img src="../static/images/partners/ppi-denhaag.png"/>
              </div>
              <div className="partner-item">
                <img src="../static/images/partners/ppi-liverpool.png"/>
              </div>
              <div className="partner-item-small">
                <img src="../static/images/partners/ppi-rotterdam.png"/>
              </div>
            </div>

            <div className="row partners-container">
              <div className="partner-item-small">
                <img src="../static/images/partners/ppi-delft.png"/>
              </div>
              <div className="partner-item-small">
                <img src="../static/images/partners/ppi-gm.png"/>
              </div>
              <div className="partner-item-small">
                <img src="../static/images/partners/ppi-newcastle.png"/>
              </div>
              <div className="partner-item">
                <img src="../static/images/partners/ppi-amsterdam.png"/>
              </div>
            </div>
          </div>
        </div>
	*/}

        <div className="row features">
          <div className="container">
            <div className="feature">
              {/* <div className="left-feature-container"><img src="../static/images/artboard_1.svg"/></div> */}
              <div className="right-feature-container">
                <h2>Better rate for transfer</h2>
                <p>Have you ever thought that the cost of international money
                transfers is so big but gives you a smaller amount? Get more from
                your money by using our services so you can use it for other needs with little effort.</p>
              </div>
            </div>
            <div className="feature">
              <div className="left-feature-container">
                <h2>Tired of waiting for your money to arrive? </h2>
                <p>Does your family need it for an emergency? And when you use a cheaper
                 option, it sometimes takes longer for your money to arrive. Don't worry, we are here now.</p>
              </div>
              {/* <div className="right-feature-container">
                <img src="../static/images/artboard_2.svg"/>
              </div> */}
            </div>
            <div className="feature">
              {/* <div className="left-feature-container"><img src="../static/images/artboard_3.svg"/></div> */}
              <div className="right-feature-container">
                <h2>We don't charge any fees for your transfer</h2>
                <p>Too good to be true? But this is happening now.
                Yes, we do not charge you any fees. And we have competitive rates as
                compared to other services. So why not try using our services?</p>
              </div>
            </div>
          </div>
        </div>

        <div className="row features-mobile">
          <div className="container-mobile">
            <div className="feature-mobile">
              <div className="left-feature-container-mobile"><img src="../static/images/artboard_1.svg"/></div>
              <div className="right-feature-container-mobile">
                <h2>Better rate for transfer</h2>
                <p>Have you ever thought that the cost of international money
                transfers is so big but gives you a smaller amount? Get more from
                your money by using our services so you can use it for other needs with little effort.</p>
              </div>
            </div>

            <div className="feature-mobile">
              <div className="left-feature-container-mobile"><img src="../static/images/artboard_2.svg"/></div>
              <div className="right-feature-container-mobile">
                <h2>Tired of waiting for your money to arrive?</h2>
                <p>Does your family need it for an emergency? And when you use a cheaper
                 option, it sometimes takes longer for your money to arrive. Don't worry, we are here now.</p>
              </div>
            </div>

            <div className="feature-mobile">
              <div className="left-feature-container-mobile"><img src="../static/images/artboard_3.svg"/></div>
              <div className="right-feature-container-mobile">
                <h2>We don't charge any fees for your transfer</h2>
                <p>Too good to be true? But this is happening now.
                Yes, we do not charge you any fees. And we have competitive rates as
                compared to other services. So why not try using our services?</p>
              </div>
            </div>
          </div>
		{/*
          <div className="row partners-mobile">
            <h1>Our partners</h1>
            <div className="container partners-wrapper-mobile">
              <div className="row partners-container-mobile">
                <div className="partner-item-mobile">
                  <img src="../static/images/partners/ppi-mib.png"/>
                </div>
                <div className="partner-item-mobile">
                  <img src="../static/images/partners/ppi-london.png"/>
                </div>
                <div className="partner-item-mobile">
                  <img src="../static/images/partners/ppi-denhaag.png"/>
                </div>
            </div>

            <div className="row partners-container-mobile">
              <div className="partner-item-mobile">
                <img src="../static/images/partners/ppi-liverpool.png"/>
              </div>
              <div className="partner-item-mobile">
                <img src="../static/images/partners/ppi-rotterdam.png"/>
              </div>
              <div className="partner-item-mobile">
                <img src="../static/images/partners/ppi-amsterdam.png"/>
              </div>
            </div>

             <div className="row partners-container-mobile">
              <div className="partner-item-mobile-small">
                <img src="../static/images/partners/ppi-delft.png"/>
              </div>
              <div className="partner-item-mobile-small">
                <img src="../static/images/partners/ppi-newcastle.png"/>
              </div>
              <div className="partner-item-mobile-small">
                <img src="../static/images/partners/ppi-gm.png"/>
              </div>
            </div>
          </div>
        </div>
	*/}
        </div>

        <div className="row testimonials">
          <div className="container">
            {/* <h1>Why using Transfree?</h1> */}
            <div className="features-container">
              {/* <div className="feature-item">
                <img src="../static/images/benefit-3.svg"/>
                <h2>Cheaper & faster</h2>
                <p>The future is today. Send and Receive currency at the real exchange rate.
                5x cheaper and 3x faster than a banks. Make international money transfer
                feels like local transfer.</p>
              </div>
              <div className="feature-item">
                <img src="../static/images/benefit-4.svg"/>
                <h2>Rp 18 Billion+ transactions</h2>
                <p>Through our convenient services, Over Rp. 18 billion
                worth of transaction has been safely handled by Transfree.</p>
              </div>
              <div className="feature-item">
                <img src="../static/images/benefit-5.svg"/>
                <h2>1000+ customers</h2>
                <p>Trust is build with consistency. More than 1000 customers
                have saved their money. Trust their international transactions
                by using our services.</p>
              </div> */}
            </div>
            <div className="testimonials-wrapper">
              <h1>What our customers say</h1>
              <div className="testimonials-items">
                <div className="message">
                  “It is very difficult to send money from IDR to GBP and Transfree
                  come out with the best solution ever. First time I use it when
                  I was in Indonesia to pay for my flat deposit and rent.
                  And now I'm still use Transfree to transfer money from the UK to Indonesia.
                  It gives me a fair rate ”
                </div>
                <div className="user">
                  <img src="../static/images/dummy-photo.png"/>
                  <div className="user-details">
                    <h3 className="user-name">Yolanda</h3>
                    <div className="user-affiliation">Imperial College London</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="testimoni">
              <Link>
              <i><ins><a href="/testimoni" >more testimoni</a></ins></i>
              </Link>
            </div>
          </div>
        </div>
        <style jsx>{`
        .btn-primary-3{
          background-color: #d2222f;
          border: none;
          color: white;
          padding: 10px 20px;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          font-size: 16px;
          border-radius: 4px;
          transition: all 0.2s ease-in-out;
          box-shadow: 0 1px 3px 0 rgba(0,0,0,0.08), 0 4px 6px 0 rgba(21,35,60,0.15);
          width:222px;
        }
        .btn-primary-2 {
          background-color: #32cd32d4;
          border: none;
          color: white;
          padding: 10px 20px;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          font-size: 16px;
          border-radius: 4px;
          transition: all 0.2s ease-in-out;
          box-shadow: 0 1px 3px 0 rgba(0,0,0,0.08), 0 4px 6px 0 rgba(21,35,60,0.15);
        }
        .testimoni{
          margin-left: 590px;
          margin-top: 0px;
          font-size: 15px;

        }
         .fixed-btn{
           position: fixed;
           background: #00a82d;

           width: 65px;
           height: 65px;
           line-height: 45px;

           bottom: 4%;
           right: 3%;
           border-radius: 50%;
           text-align: center;

           box-shadow: 0 10px 30px 0 rgba(0,0,0,0.30);
           cursor: pointer;

        }
        .fixed-btn:active{
          box-shadow: 0 0;
        }
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

        .lightbox iframe {
          /** Pad the lightbox image */
          min-width: 55%;
          min-height: 60%;
          margin-top: 10%;
        }

        .lightbox:target {
          /** Remove default browser outline */
          outline: none;

          /** Unhide lightbox **/
          display: block;
        }

          .desktop {
            margin-top:40px;
            display: block;
          }
          .sell-buy {
            color: white;
            background-color: #d2222f; //none
            border-color: #d2222f
          }
          .external-link{
            display: flex;
            margin-top: 30px;
          }
          .external-link-right {
            lex-basis: 40%;
            margin-left : 20px;
            margin-top: 0px;
          }
          .mobile-sell-buy{
            background-color: none;
            border-color: #5a9cd8;
            display: block;
          }
          .h1-bawah{
            margin-top:0px !important;
          }
          .left-container h1{
            margin-bottom:0px !important;
          }

          .container {
            display: flex;
          }

          .hero {
            padding-bottom: 50px; //100
          }

          .left-container {
            flex-basis: 60%;
            margin-top: 35px;
          }

          .left-container h1{

          }


          .left-container p {
            max-width: 80%;
            margin-bottom: 30px;
          }

          .right-container {
            flex-basis: 40%;
            margin-top: 55px;
            z-index: 2;
          }
          .right-bottom-container{
            margin-top:20px !important;
            display: none;
          }
          .store{
            margin-top: 15px;
            width: 50%
            height: 50%
          }
          .logo{
            display: none;
          }

          h1 {
            font-size: 2rem;
          }

          .benefits {
            display: flex;
            margin-top: 50px;
          }

          .benefit-item {
            flex-basis: 40%;
            text-align: center
          }

          .benefit-item p {
            margin: 0 auto;
          }

          .benefit-item img {
            margin-bottom: 20px;
          }

          .converter-container {
            padding: 20px;
            background: #15233C;
            box-shadow: 0 10px 30px 0 rgba(0,0,0,0.30);
            border-radius: 8px;
            color: #AAB2C0;
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
            color: #FFF;
          }

          input {
            margin-top: 20px;
            width: 100%;
            font-size: 22px;
            color: #15233C;
            border: none;
            padding: 12px;
            box-sizing: border-box;
          }

          input:focus {
            outline: none;
          }


          .rate {
            display: flex;
            margin: 20px 0;
          }

          .live-rate {
            text-transform: uppercase;
          }

          .rate-desc {
            flex-basis: 50%;
            width: 50%;
          }

          .rate-value {
            flex-basis: 50%;
            width: 50%;
            text-align: right;
            font-weight: 700;
            color: #FFF;
          }

          .note {
            margin-bottom: 20px;
          }

          .received-on {
            color: #FFF;
          }

          .converter-cta {
            display: flex;
          }

          .cta-secondary,
          .cta-primary {
            flex-basis: 50%;
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

          .promo {
            display: flex;
            align-items: center;
            padding: 20px;
            margin-top: 40px;
            background: #EBF6FB;
            color: #3E495E;
            border-radius: 8px;
          }

          .promo-desc {
            flex-basis: 60%;
          }

          .promo-cta {
            flex-basis: 40%;
            text-align: center;
          }

          .promo a {
            font-size: 14px;
          }

          .curve {
            display: flex;
            width: 100%;
            height: auto;
          }

          .partners-mobile{
            display: none;
          }

          .partners {
            margin-top: -7px;
            padding-top: 50px;
            background-color: #FFF;
            text-align: center;
          }

          .partners h1 {
            text-align: center;
            margin-bottom: 50px;
          }


          .partners-wrapper {
            flex-direction: column;
          }

          .partners-container {
            display: flex;
            justify-content: center;
          }

          .partner-item {
            flex-basis:20%;
            align-self: center;
          }

          .partner-item img {
            max-width: 60%;
          }

          .partner-item-small {
            flex-basis:20%;
            padding:0px 20px;

            align-self: center;
          }

          .partner-item-small img{
            max-width:90%;
          }

          .features {
            padding: 20px 0;
            background-color: #FFF;
          }

          .left-feature-container,
          .right-feature-container {
            flex-basis: 50%;
          }

          .features .container {
            display: flex;
            flex-direction: column;
          }

          .features .container .row {
            display: flex;
            padding: 30px 0;
          }

          .features-mobile{
            display: none;
          }

          .testimonials {
            background-image: url('../static/images/curve-gradient-bg.svg');
            background-size: contain;
            background-repeat: no-repeat;
            background-color: #FFF;
            width: 100%;
            min-height: 632px;
            margin-top: -180px;
            padding-top: 80px;
          }

          .testimonials .container {
            flex-direction: column;
          }

          .testimonials h1 {
            text-align: center;
            margin-bottom: 100px;
          }

          .features-container {
            display: flex;
            text-align: center;
          }

          .feature-item {
            flex-basis: 33.33%;
          }

          .testimonials {
            padding: 100px 0;
          }

          .testimonials-wrapper {
            padding-top: 100px;
            display: flex;
            flex-direction: column;
          }

          .testimonials-wrapper h1 {
            margin-bottom: 100px;
          }

          .testimonials-items {
            max-width: 550px;
            text-align: center;
            align-self: center;
          }

          .user {
            margin-top: 100px;
            display: flex;
            flex-direction: row;
            justify-content: center;
          }

          .user img {
            width: 80px;
            height: 80px;
          }

          .user-details {
            padding-left: 20px;
            text-align: left;
            align-self: center;
          }

          .user-details h3 {
            margin: 5px 0;
          }

          .caret::after {
            display: inline-block;
            width: 16px;
            height: 9px;
            margin-left: 40px;
            vertical-align: 3px;
            content: "";
            border: none;
            background-image: url(../static/images/ic-caret.svg);
            background-size: 16px;
          }

          .dropdown-menu {
            position: absolute;
            min-width: 300px;
            transform: translate3d(0px, 0px, 0px);
            z-index: 1000;
            display: none;
            float: left;
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
            max-height: 200px;
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
          }

          .dropdown-button:active,
          .dropdown-button:focus {
            outline: none;
          }

          a.dropdown-item {
            transition: none;
          }

          .feature {
            display: flex;
            align-items: center;
            margin: 0;
          }

          hr {
            border-color: 1px solid #eaeaea;
          }

          .cta-primary {
            flex-basis: 100%;
          }

            @media only screen and (max-width: 414px) {
              #menuToggle .main-cta {
                position: absolute;
                right: 0;
              }
              .external-link-right {
                lex-basis: 40%;
                margin-left : 20px;
                margin-top: 0px;
              }
              .btn-secondary-2 {
                background: #32cd32d4;
                border: none;
                color: white;
                padding: 8px 18px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-size: 16px;
                border-radius: 4px;
                transition: all 0.2s ease-in-out;
                box-shadow: 0 1px 3px 0 rgba(0,0,0,0.08), 0 4px 6px 0 rgba(21,35,60,0.15);
                margin-left: 414px;
                
              }
            .reverse-img{
              padding-right : 23px !important;
              width : 6% !important
            }

            .fixed-btn{
             width: 70px !important;
             height: 70px !important;
             line-height: 45px !imoprant;

             bottom: 3%;
             right: 6.5%;
              }

            .store{
              display: block;
            }

            .store img{
              width: 50%;
              height: 50%;
            }

            .logo{
              text-align: left;
              padding-left: 10px;
              display: block;

            }

            .logo img {
              width :50%;
              height :50%;
              margin-top: 10px !important;
              margin-bottom: 10px !important;
            }
            .left-container {
              margin-top: 0;
              padding-bottom:0px !important;
            }
            .mobile-sell-buy{
              display: block;
            }
            h1 {
              font-size: 1.8rem;
              line-height: 1.5;
              text-align: center;
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
              height: 50vh;
            }

            .partners{
              display:none;
            }

            .partners-mobile {
            margin-top: -7px;
            padding-top: 50px;
            background-color: #FFF;
            width:100%;
            text-align: center;
            display: block;
          }

          .partners-mobile h1 {
            text-align: center;
            margin-bottom: 30px;
          }


          .partners-wrapper-mobile {
            flex-direction: column;
          }

          .partners-container-mobile {
            display: flex;
            justify-content: center;
          }

          .partner-item-mobile {
            flex-basis:20%;
            align-self: center;
            padding:0px 20px;
          }

          .partner-item-mobile img {
            max-width: 80%;
            padding-bottom: 25px;
          }

          .partner-item-mobile-small {
            flex-basis:20%;
            align-self: center;
            padding:0px 20px;
          }

          .partner-item-mobile-small img{
            max-width:100%;
          }
          .desktop{
            display:none;
          }
          .left-container h1{
            display:none;
          }

          .right-container {
            margin-top: 0px ;
          }

          .right-bottom-container{
            display: inline-block;
          }

          .hero{
            padding-bottom: 20px;
          }

          .features{
            display: none;
          }

          .features-mobile {
            display: inline-block;
            padding: 100px 0;
            background-color: #FFF;
            text-align: center;
          }

          .left-feature-container-mobile,
          .right-feature-container {
            flex-basis: 50%;
          }

          .features-mobile .container-mobile {
            display: flex;
            flex-direction: column;
          }

          .features-mobile .container-mobile .row {
            display: flex;
            margin: 100px 0;
          }

          .left-feature-container-mobile img{
            width: 80%;
          }
          .right-feature-container-mobile h2{
            margin-top:0px !important;

            padding: 0px 20px;
          }
          .right-feature-container-mobile p{
            padding: 0px 10px;
            margin-bottom: 40px !important;
          }
          .testimonials h1 {
            text-align: center;
            margin: 20px 0px !important;
            margin-bottom: 40px !important;
          }

          .feature-item p{
            margin-bottom: 40px !important;
          }

          .testimonials-wrapper{
            padding-top:50px !important;
          }

          .user {
            margin-top: 40px;
            display: flex;
            flex-direction: row;
            justify-content: center;
          }
          }

        `}</style>
        <div id={"row-footer"}>
	<Footer />
	</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  if (state.user.user_data != null) {
    return {
      isApproved: !!state.user.user_data.isApproved,
      rate: state.rate.rates,
      adjustedRates: state.fx.adjustedRates
    }
  } else {
    return {
      rate: state.rate.rates,
      adjustedRates: state.fx.adjustedRates
    }
  }

};

export default connect(mapStateToProps, actions)(Index);
