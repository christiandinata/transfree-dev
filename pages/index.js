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
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
 



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
    const properties = {
      dots: true,
      autoplay: true,
      infinite: true,
      slidesToShow: 1,
      speed:500,
      fade:true,
      slidesToScroll:1,
      className: "slides"
    };


    
    return (
      <div>
        <Header/>
        <Menu isApproved={this.props.isApproved}/>
        <div className="row hero">
          <div className="container">
            <div className="left-container">
              <div className="text">
                    <h1 style={{fontWeight:400}}>International</h1>
                    <h2 style={{fontWeight:900}}> Money</h2>
              </div>
              <div className="text">
                    <h1 style={{fontWeight:900}}>Transfer</h1>
                    <h1 style={{fontWeight:400}}> feels like </h1>
                    <h2 style={{fontWeight:900}}> Local</h2>
              </div>
              <h3 style={{marginTop:0}}>Send today, receive money in sameday or next working day</h3>
              <a href="https://www.youtube.com/watch?v=8RzCs_sQ8Ak" target="_blank" className="btn-primary-start" style={{fontSize:15}}>Touch in action</a>
              {/* <div style={{marginTop:40}}>
               

                <a href="https://apps.apple.com/us/app/transfree/id1493107400?ls=1" target="_blank">
                <img src="../static/images/appstore.png"/></a>
                <a href="https://play.google.com/store/apps/details?id=com.transfree.id" target="_blank">
                <img src="../static/images/playstore.png" style={{marginLeft:20}}/></a>
                
              </div> */}
              <div className="desktop">
                <div className="fixed-btn">
                  <a href="https://api.whatsapp.com/send?phone=447490090659&text=Hello%20Transfree" target="_blank">
                  <img style={{width: "75%",height:"75%", marginTop: "13%",zIndex:999}} src="../static/images/wa-logo.png"/></a>
                </div>
              </div>
            </div>
            <div className="right-container">
              <div className="converter-container" >
                <h1 style={{float:"center",fontSize:20,textAlign:"center"}}>Transfer With Transfree</h1>
                <div className="row exchange-container">
                  <div className="source-container">
                    <div className="money-input-container">
                      <div className="money-input">
                        <span >You send</span>
                        <NumberFormat
                          style={{fontWeight:800,marginLeft:10}}
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
						// :
					// 	(this.state.fromCurrency == 'hkd' && this.state.toCurrency == 'idr' ) ?
					// 	this.reverse.bind(this,'hkd' , 'idr')
					// 	:
					// 	(this.state.fromCurrency == 'gbp' && this.state.toCurrency == 'myr' ) ?
					// 	this.reverse.bind(this,'gbp' , 'myr')
					// 	:
					// 	(this.state.fromCurrency == 'myr' && this.state.toCurrency == 'gbp' ) ?
					// 	this.reverse.bind(this,'myr' , 'gbp')
					// 	:
					// /**	(this.state.fromCurrency == 'gbp' && this.state.toCurrency == 'krw' ) ?
					// 	this.reverse.bind(this,'gbp' , 'krw')
					// 	:
					// 	(this.state.fromCurrency == 'krw' && this.state.toCurrency == 'gbp' ) ?
					// 	this.reverse.bind(this,'krw' , 'gbp')
          //   :
          //   */
					// 	(this.state.fromCurrency == 'gbp' && this.state.toCurrency == 'usd' ) ?
					// 	this.reverse.bind(this,'gbp' , 'usd')
					// 	:
					// 	(this.state.fromCurrency == 'usd' && this.state.toCurrency == 'gbp' ) ?
					// 	this.reverse.bind(this,'usd' , 'gbp')
					// 	:
					// 	(this.state.fromCurrency == 'gbp' && this.state.toCurrency == 'eur' ) ?
					// 	this.reverse.bind(this,'gbp' , 'eur')
					// 	:
					// 	(this.state.fromCurrency == 'eur' && this.state.toCurrency == 'gbp' ) ?
					// 	this.reverse.bind(this,'eur' , 'gbp')
					// 	:
					// 	(this.state.fromCurrency == 'gbp' && this.state.toCurrency == 'aud' ) ?
					// 	this.reverse.bind(this,'gbp' , 'aud')
					// 	:
					// 	(this.state.fromCurrency == 'aud' && this.state.toCurrency == 'gbp' ) ?
					// 	this.reverse.bind(this,'aud' , 'gbp')
					// 	:
					// 	(this.state.fromCurrency == 'gbp' && this.state.toCurrency == 'hkd' ) ?
					// 	this.reverse.bind(this,'gbk' , 'hkd')
					// 	:
					// 	(this.state.fromCurrency == 'hkd' && this.state.toCurrency == 'gbp' ) ?
					// 	this.reverse.bind(this,'hkd' , 'gbp')
					// 	:

					// 	(this.state.fromCurrency == 'usd' && this.state.toCurrency == 'myr' ) ?
					// 	this.reverse.bind(this,'usd' , 'myr')
					// 	:
					// 	(this.state.fromCurrency == 'myr' && this.state.toCurrency == 'usd' ) ?
					// 	this.reverse.bind(this,'myr' , 'usd')
					// 	:
					// /** 	(this.state.fromCurrency == 'usd' && this.state.toCurrency == 'krw' ) ?
					// 	this.reverse.bind(this,'usd' , 'krw')
					// 	:
					// 	(this.state.fromCurrency == 'krw' && this.state.toCurrency == 'usd' ) ?
					// 	this.reverse.bind(this,'krw' , 'usd')
          //   :
          //   */
					// 	(this.state.fromCurrency == 'usd' && this.state.toCurrency == 'eur' ) ?
					// 	this.reverse.bind(this,'usd' , 'eur')
					// 	:
					// 	(this.state.fromCurrency == 'eur' && this.state.toCurrency == 'usd' ) ?
					// 	this.reverse.bind(this,'eur' , 'usd')
					// 	:
					// 	(this.state.fromCurrency == 'usd' && this.state.toCurrency == 'aud' ) ?
					// 	this.reverse.bind(this,'usd' , 'aud')
					// 	:
					// 	(this.state.fromCurrency == 'aud' && this.state.toCurrency == 'usd' ) ?
					// 	this.reverse.bind(this,'aud' , 'usd')
					// 	:
					// 	(this.state.fromCurrency == 'usd' && this.state.toCurrency == 'hkd' ) ?
					// 	this.reverse.bind(this,'usd' , 'hkd')
					// 	:
					// 	(this.state.fromCurrency == 'hkd' && this.state.toCurrency == 'usd' ) ?
					// 	this.reverse.bind(this,'hkd' , 'usd')
					// 	:

					// 	(this.state.fromCurrency == 'aud' && this.state.toCurrency == 'myr' ) ?
					// 	this.reverse.bind(this,'aud' , 'myr')
					// 	:
					// 	(this.state.fromCurrency == 'myr' && this.state.toCurrency == 'aud' ) ?
					// 	this.reverse.bind(this,'myr' , 'aud')
					// 	:
					// 	/**
          //   (this.state.fromCurrency == 'aud' && this.state.toCurrency == 'krw' ) ?
					// 	this.reverse.bind(this,'aud' , 'krw')
					// 	:
					// 	(this.state.fromCurrency == 'krw' && this.state.toCurrency == 'aud' ) ?
					// 	this.reverse.bind(this,'krw' , 'aud')
          //   :
          //   */
					// 	(this.state.fromCurrency == 'aud' && this.state.toCurrency == 'eur' ) ?
					// 	this.reverse.bind(this,'aud' , 'eur')
					// 	:
					// 	(this.state.fromCurrency == 'eur' && this.state.toCurrency == 'aud' ) ?
					// 	this.reverse.bind(this,'eur' , 'aud')
					// 	:
					// 	(this.state.fromCurrency == 'aud' && this.state.toCurrency == 'hkd' ) ?
					// 	this.reverse.bind(this,'aud' , 'hkd')
					// 	:
					// 	(this.state.fromCurrency == 'hkd' && this.state.toCurrency == 'aud' ) ?
					// 	this.reverse.bind(this,'hkd' , 'aud')
					// 	:

					// 	(this.state.fromCurrency == 'eur' && this.state.toCurrency == 'myr' ) ?
					// 	this.reverse.bind(this,'eur' , 'myr')
					// 	:
					// 	(this.state.fromCurrency == 'myr' && this.state.toCurrency == 'eur' ) ?
					// 	this.reverse.bind(this,'myr' , 'eur')
					// 	:
					// 	/**
          //   (this.state.fromCurrency == 'eur' && this.state.toCurrency == 'krw' ) ?
					// 	this.reverse.bind(this,'eur' , 'krw')
					// 	:
					// 	(this.state.fromCurrency == 'krw' && this.state.toCurrency == 'eur' ) ?
					// 	this.reverse.bind(this,'krw' , 'eur')
					// 	:
          //   */
          //   (this.state.fromCurrency == 'eur' && this.state.toCurrency == 'hkd' ) ?
					// 	this.reverse.bind(this,'eur' , 'hkd')
					// 	:
					// 	(this.state.fromCurrency == 'hkd' && this.state.toCurrency == 'eur' ) ?
					// 	this.reverse.bind(this,'hkd' , 'eur')
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
                        style={{fontSize:25,fontWeight:800,marginLeft:10}}
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
               
               <div className="result-conversion">
               <div className="row rate">
                  <span className="rate-desc">Conversion rate</span> <span className="rate-value"><span className="live-rate"><NumberFormat displayType={'text'} thousandSeparator={true} decimalScale={5} value={this.state.rate} /></span></span>
                </div>
                <div className="row rate"style={{marginTop:"-20px"}} >
                  <span className="rate-desc" >Transfer fee </span> <span className="rate-value" style={{textAlign:"right",marginLeft:"5px"}}><span ><NumberFormat displayType={'text'} thousandSeparator={true} decimalScale={2} value="0" /></span></span>
                </div>
               </div>
                <div className="row note" style={{width:"90%",marginLeft:"auto",marginRight:"auto",float:"center",textAlign:"center"}}>
                  <p style={{maxWidth: "100%", marginBottom: "0",color:"#FFFFFF",fontSize:12}}>Your transfer will be processed immediately.
                  The recipient will get the money in next working day. </p>
		  {/*<span className="received-on">24 hours</span>*/}
                </div>
                {/* <a href="/order" className="btn-primary-2" style={{width:"80%",marginRight:"auto",marginLeft:"10%",textAlign:"center",float:"center"}}>Get started</a> */}

                <div className="row converter-cta" >
              
                  <div className="row cta-primary">
                      <a href="/order" className="btn-primary-2" style={{width:"80%",marginRight:"auto",marginLeft:"10%",textAlign:"center",float:"center"}}>Get started</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>


        <div className="row features">
          <div className="container">
          <div className="images">
                  <div className="monas">
                      <img src="../static/images/features/monas.png" style={{marginTop:66}}  alt="monas" name="monas" id="monas" ></img>
                  </div>
                  <div className="rumah" style={{marginLeft:"3%"}}>
                  <img src="../static/images/features/rumah.png"  alt="rumah"  id="rumah"  style={{marginTop:55}}></img>
                  </div>
                  <div className="bali" style={{marginLeft:"7%"}}>
                  <img src="../static/images/features/bali.png" alt="bali" style={{marginTop:50}}></img>
                  </div>
                  <div className="surabaya" style={{marginLeft:"4%"}}>
                  <img src="../static/images/features/surabaya.png" alt="surabaya" style={{marginTop:45}}></img>
                  </div>
                  <div className="borobudur" style={{marginLeft:"6%"}}>
                  <img src="../static/images/features/borobudur.png"  alt="borobudur" style={{marginTop:40}}  ></img>
                  </div>
          </div>
                <h1 style={{color:"#000000",textAlign:"center",marginTop:60}}>Why should you use Transfree</h1>
               
          {/* </div> */}
         

              <div className="benefit">
                  {/* <div className="column"> */}
                    <div className ="btn-primary-start">
                    <img src="../static/images/features/money.png" style={{width:140}}></img>
                    <h1>Better rate for Transfree</h1>
                    </div>
                {/* </div> */}
                <div className ="btn-primary-start">
                  <img src="../static/images/features/time.png" style={{float:"center",position:"center"}}></img>
                    <h1>Quickly sent quickly arrived</h1>
                </div>
                <div className ="btn-primary-start">
                  <img src="../static/images/features/search.png" style={{float:"center",position:"center"}}></img>
                    <h1>Unchargeable for Transfer</h1>
                </div>
                    {/* </div> */}
                
                </div>

                <div className="message">
                      <h3 style={{color:"#000000",textAlign:"center",marginTop:100}}>Does your family need it for an emergency? And when you use</h3>
                      <h3 style={{color:"#000000", textAlign:"center",marginTop:-20}}>a cheaper option, it sometimes takes longer for your money to arrive</h3>
                      <h3 style={{color:"#000000",textAlign:"center",marginTop:-20}}>Don't worry, we are here now</h3>
                </div>
          </div>
        </div>


        <div className="row fiture-mobile">
          <div className="container">
          <div className="images">
                  <div className="monas">
                      <img src="../static/images/features/monas.png" style={{marginTop:-6}} alt="monas" name="monas" id="monas" ></img>
                  </div>
                  <div className="rumah" style={{marginLeft:"10%"}}>
                  <img src="../static/images/features/rumah.png"  alt="rumah"  id="rumah"  style={{marginTop:58}}></img>
                  </div>
                  <div className="bali" style={{marginLeft:"10%"}}>
                  <img src="../static/images/features/bali.png" alt="bali" ></img>
                  </div>
                  <div className="surabaya" style={{marginLeft:"10%"}}>
                  <img src="../static/images/features/surabaya.png" alt="surabaya" style={{marginTop:9}}></img>
                  </div>
                  <div className="borobudur" style={{marginLeft:"10%"}}>
                  <img src="../static/images/features/borobudur.png"  alt="borobudur" style={{marginTop:30}}  ></img>
                  </div>
          </div>
           <div className="fiture-mobile-message">
              <h1 style={{fontWeight:400}}>Internasional <span style={{fontWeight:900}}> Money</span></h1>
             
              <h1 style={{marginTop:-30}}>Transfer <span style={{fontWeight:400}}>feels like</span> local</h1>
              <h2 style={{textAlign:"center",marginLeft:20,marginTop:-10,fontSize:"13pt",color:"#000000"}}>Send. Arrives. Pick-up in 5 minutes</h2>
           </div>
           <a href="https://www.youtube.com/watch?v=8RzCs_sQ8Ak" target="_blank" className="btn-primary-start" style={{fontSize:20,width:"70%",marginLeft:"auto",marginRight:"auto"}}>Touch in action</a>
           <hr className="line"/>
           <p style={{textAlign:"center"}}>Why we should to use Transfree?</p>
          <div className="fiture-mobile-benefit">
              <div className="first-benefit" style={{marginBottom:"5%"}}>
              <button className="btn-primary-2" style={{fontSize:"80%",width:"70%",marginLeft:"13%",marginRight:"auto"}}>Better rate for transfer</button>
              <div className="first-message">
                <h1 style={{textAlign:"center",fontSize:"15pt",marginTop:10}}>Better rate for transfer</h1>
                <p style={{textAlign:"center"}}>Does your family need it for an emergency? And when you use a cheaper option,it sometimes takes longer for your money to arriveDon't worry, we are here now</p>
              </div>
              </div>

              <div className="first-benefit" style={{marginBottom:"5%"}} >
              <button className="btn-primary-2" style={{fontSize:"80%",width:"70%",marginLeft:"13%",marginRight:"auto"}}>Quickly sent quickly arrived</button>
              <div className="first-message">
                <h1 style={{textAlign:"center",fontSize:"15pt",marginTop:10}}>Quickly sent quickly arrived</h1>
                <p style={{textAlign:"center"}}>Does your family need it for an emergency? And when you use a cheaper option,it sometimes takes longer for your money to arriveDon't worry, we are here now</p>
              </div>
              </div>

              <div className="first-benefit" style={{marginBottom:"5%"}}>
              <button className="btn-primary-2" style={{fontSize:"80%",width:"70%",marginLeft:"13%",marginRight:"auto"}}>Unchargeable for Transfer</button>
              <div className="first-message">
              <h1 style={{textAlign:"center",fontSize:"15pt",marginTop:10}}>Unchargeable for Transfer</h1>
                <p style={{textAlign:"center"}}>Does your family need it for an emergency? And when you use a cheaper option,it sometimes takes longer for your money to arriveDon't worry, we are here now</p>
              </div>
              </div>
          </div>
         


           </div>
        </div> 

        
     
     

        <div className="row application">
          <div className="container">
          <div className="left-container">
            <img src="../static/images/ASSET/Mockup.png"></img>
          </div>

          <div className="right-container">
              <h1>Mobile Application now in</h1>

          <div >


          <a href="https://apps.apple.com/us/app/transfree/id1493107400?ls=1" target="_blank" >
          <img src="../static/images/appstore.png"/></a>
                    
            
          </div>
          
            <div>
            <a href="https://play.google.com/store/apps/details?id=com.transfree.id" target="_blank">
            <img src="../static/images/playstore.png"/></a>
             
            </div>
          </div>
        
          </div>
        </div>

        <div className="row application-mobile">
          <div className="container">
            <div className="main-container">
                <div className="left-container">
                <img src="../static/images/ASSET/Mockup.png" style={{width:"80%",height:"100%",marginLeft:40}}></img>
                </div>
                <div className="right-container">
                <h1>Avaliable in</h1>
                  <div>
                      <a href="https://apps.apple.com/us/app/transfree/id1493107400?ls=1" target="_blank">
                      <img src="../static/images/appstore.png" /></a>
                  </div>
                  <div>
                      <a href="https://play.google.com/store/apps/details?id=com.transfree.id" target="_blank">
                      <img src="../static/images/playstore.png"/></a>
                  </div>

                </div>
            </div>
          </div>

        </div>



        <div className="row achievement">
            <div className="container">
             <div className="content-achievement" style={{textAlign:"center"}}>
                <h1 style={{marginLeft:340,marginTop:30}}>What we have achieved?</h1>
             </div>
            </div>
        </div>


        <div className="row achievement-mobile">
          <div className="container">
          <h1 style={{textAlign:"center"}}>What we have achieved?</h1>
          <img src="../static/images/achievment/Button_official partner.png" style={{width:"100%",height:200}}></img>
          <img src="../static/images/achievment/Button_entrepreneur winner.png" style={{height:200}}></img>
          </div>
        </div>


        <div className="row testimonial">
          <div className="container">
          <h1 style={{textAlign:"center",color:"#000000"}}>What our Customer say?</h1> 
              <img src="../static/images/testimoni/dummy-photo.png" alt="first slide"></img>
                <div style={{textAlign:"center"}}>
                    <h1 >YOLANDA</h1>
                    <h1 style={{textAlign:"center",marginTop:-20}}>Imperial College London</h1>
                </div>
          {/* </div> */}
            <div className="message">
                <p style={{marginLeft:50}}>It is very difficult to send money from IDR to GDP and</p>
                <p>Transfree come out with the best solution ever. First time I use it when</p>
                <p>I was in Indonesia to pay for my flat deposit and rent. And now I'm still use</p>
                <p>Transfree to transfer money from the UK to Indonesia. It gives me a fair rate</p>
            </div> 
            <a href="/testimoni" style={{textAlign:"center",color:"#000000",fontSize:"20pt"}}><p>More Testimonials</p></a>
          </div>
        </div>

        <div className="row testimonial-mobile">
          <div className="container">
          <div className="profile-testimonial" style={{textAlign:"center"}}>
          <h1 style={{textAlign:"center",fontSize:20}}>What our Customer say?</h1> 
              <img src="../static/images/testimoni/dummy-photo.png" alt="first slide"></img>
                <div className="textTesti">
                    <h1 style={{}}>YOLANDA</h1>
                    <h1 style={{marginTop:-20}}>Imperial College London</h1>
                </div>
          </div>
            <div className="message">
                <p >It is very difficult to send money from IDR to GDP and Transfree come out with the best solution ever. First time I use
                  it when I was in Indonesia to pay for my flat deposit and rent. And now I'm still use Transfree to transfer money from the UK to Indonesia. It gives me a fair rate</p>
            </div>
            <a href="/testimoni" style={{textAlign:"center",color:"#000000",fontSize:"20pt"}}><p>More Testimonials</p></a> 
          </div>
        </div>


        <style jsx>{`

        .right-container .result-conversion{
          box-shadow: 0 2px 3px 0 rgba(0,0,0,0.08), 0 4px 6px 0 rgba(21,35,60,0.15);
          height:auto;
          font-size:11px;
          padding:1px 20px 1px 20px;
          margin-top:4px;
         
        }

      h2,h1,h3{
        color:#FFFFFF;
      }
      hr.line{
          border: 1px solid black;
          width:300px;
      }


       .features{
        background:url('../static/images/features/background-batik.png');
        background-repeat: no-repeat;
        background-position: center;
        background-size:auto 1300px;
        margin-top:-110px;
        height:1300px;
        padding:100px 0px 0px 0px;
        z-index:-99;
       }

       .features .container{
         display:flex;
         flex-direction: column;
         
       }

    

     .fiture-mobile {
       display:none;
     }

      .features .images{
        display:flex;
        margin-top:-200px;
       
        
      }

      .features .images img{
         width:80px;
         height:110px;
         margin:auto;
        
      }

      
     .features .message{
        background:url('../static/images/features/chat-box.png');
        background-repeat: no-repeat;
        background-position: center;
        background-size:contain;
        height:300px;
        width:90%;
        margin-left:auto;
        margin-right:auto;
        opacity:0.8;
        padding:0px 30px 90px 50px;
       
     }

     .features .message {
       font-size:23px;
     }

      .testimonial .message{
        background-image:url('../static/images/testimoni/box-message.png');
        background-repeat: no-repeat;
        background-position: center;
        background-size:100% 100%;
        width:auto;
        padding:90px 40px 80px 40px;
        text-align:center;
        
      }

      .testimonial .message p{
        color:#000000;
        font-size:28px;
        text-align:center;
        margin-top:-25px;
        
      }


      .box-message{
        margin-top:500px;
        width:auto;
        height:auto;
      }

     

      .profile-testimonial .textTesti{

      }

      .testimonial img{
        width:20%;
        margin-left:auto;
        margin-right:auto;
        display:block;
       
      }

      .text h1,h2{
        display:inline;
        font-size:35px;
      }

      .text{
        margin-top:0px;
      }

    


      .features .btn-primary-start {
        background-color: #5BB7DE;
        border: none;
        width:360px;
        height:330px;
        margin-bottom:20px;
        color: white;
        
        text-align: center;
        text-decoration: none;
        display: inline-block;
        border-radius: 21px;
        font-size:29px;
        margin-right:10px;
        transition: all 0.2s ease-in-out;
        box-shadow: 0 1px 3px 0 rgba(0,0,0,0.08), 0 4px 6px 0 rgba(21,35,60,0.15);
      }

      .features .btn-primary-start:hover {
        background-color: #FAAF40;
        border: none;
        -ms-transform: scale(1);
        -webkit-transform:scale(1);
        transform:scale(1.5);
        margin-bottom:20px;
        color: white;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        border-radius: 21px;
        font-size:29px;
        margin-right:10px;
        transition: all 0.2s ease-in-out;
        box-shadow: 0 1px 3px 0 rgba(0,0,0,0.08), 0 4px 6px 0 rgba(21,35,60,0.15);
      }

       .btn-primary-start:hover {
        background-color: #FAAF40;
        border: none;
        transform: translateY(2px);
        margin-bottom:20px;
        color: white;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        border-radius: 21px;
        font-size:29px;
        margin-right:10px;
       
        box-shadow: 0 1px 3px 0 rgba(0,0,0,0.08), 0 4px 6px 0 rgba(21,35,60,0.15);
      }

      // .column {
      //   flex :23.35%;
        
      // }

      .features .benefit{
       display:flex;
      }

       .features .background img{
        height:1000px;
        width:2000px;
        margin-left:-480px;
        margin-top:-100px;
       }


       .benefit img{
         width:120px;
         height:120px;
       }

       .benefit{
         margin-right:100px;
         margin-left:100px;
       }

       .benefit .btn-primary-start{
         padding:10px 0px 0px 0px;
         height:auto;
       }


       .left-container h1 {
        font-family: 70px 'Open Sans', sans-serif;
        font-weight: 700;
        color: #FFFFFF;
      }

      .left-container img {
        height:70px;
        width:200px;
      }

      .application .left-container img {
        height:600px;
        width:300px;
        margin-left:auto;
        margin-right:auto;
        
        text-align:center;
        
        
      }

      .application .right-container img{
        width:50%;
       
      }

      

        // container{
        //   background-color: #d2222f;
        //   width:20px;
        // }

        .application{
          display:flex;
          justify-content: center;
          align-items: center;
          margin-top:-100px;
          height:auto;
        }

        .application .right-container{
          justify-content:center;
          text-align:center;
          margin-top:10%;
          
         
        }

        .application .left-container{
          justify-content:center;
          text-align:center;
        }

        

        .application h1{
        font-family: 800em ,'Open Sans', sans-serif;
        font-weight: 900;
        color: #000000;
        text-shadow: 1px 1px 1px #000000;
       
        
        }

        .achievement{
           background:url('../static/images/achievment/achievement.png') no-repeat ;
          background-position: center;
          background-size:100% 100%;
          height:800px;
          // filter: drop-shadow( 0px 5px 9px #000 );
          z-index:-1;
        }

        .testimonial {
          background:url('../static/images/achievment/lingkaran setengah.png'),url('../static/images/testimoni/background.png');
          background-repeat: no-repeat;
          background-position:  0px -100px,center;
          background-size:100% 200px,100% 100%;
          height:auto;
          width:auto;
          z-index:-1;
          margin-top:-100px;
          padding:130px 0px 0px 0px;
        }



        .testimonial div{
          display:block;
        }

        .content-testimonial{
          background:url('../static/images/testimoni/background.png');
          background-repeat: no-repeat;
        
          margin-top:-240px;
          height:950px;
         
          background-size:2200px 2000px;
          margin-right:-100px;
          padding:25px;
          z-index:-5;
          
        }


      

        .title{
          margin-top:20px;
        }

        .title h1{
          display: inline-block;
        }

       

        .achievement h1{
          color:#000000;
          font-size:40px;
          width:auto;
          display:flex;
          text-shadow: 1px 1px 1px #000000;

        }


        .top-right {
          position:center;
          left:10px;
          float:center;
        }
        
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
          width:140px;
        }

        

        .btn-primary-2 {
          background-color: #5BB7DE;
          border: none;
          color: white;
          padding: 10px 20px;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          border-radius: 12px;
          font-size:20px;
          transition: all 0.2s ease-in-out;
          box-shadow: 0 1px 3px 0 rgba(0,0,0,0.08), 0 4px 6px 0 rgba(21,35,60,0.15);
          padding:10px 10px 10px 10px;
        }

        .btn-primary-2:hover {
          background-color: #5BB7DE;
          border: none;
          transform: translateY(2px);
          margin-bottom:20px;
          color: white;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          border-radius: 21px;
          font-size:29px;
          margin-right:10px;
         
          box-shadow: 0 1px 3px 0 rgba(0,0,0,0.08), 0 4px 6px 0 rgba(21,35,60,0.15);
        }


        .btn-primary-start {
          background-color: #FAAF40;
          border: none;
          width:150px;
          margin-bottom:20px;
          color: white;
          padding: 10px 10px;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          border-radius: 12px;
          font-size:20px;
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
            background-image:url('../static/images/Asset Web/content/Banner_Web.png');
            background-repeat: no-repeat;
            background-position: center;
            background-size:auto;
            margin-top:0px;
            
          }

         

          .left-container {
            flex-basis: 55%;
            margin-top:40px;
            margin-left:30px;
            margin-right:10px;
           
            
          }

          .left-container h1{

          }


          .left-container p {
            max-width: 80%;
            margin-bottom: 30px;
          }

          .right-container {
            flex-basis: 60%;
            margin-top: 55px;
           
          }

          .hero .right-container{
            flex-basis: 38%;
            margin-top: 15px;
            margin-right:0px;
            margin-left:0px;
          }

          .right-bottom-container{
            margin-top:20px !important;
            display: none;
          }
          .store{
            margin-top: 15px;
           
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
            padding: 15px 20px 33px 20px;
            background: #354E7A;
            box-shadow: 0 10px 30px 0 rgba(0,0,0,0.30);
            border-radius: 30px;
            color: #AAB2C0;
          }

          .exchange-container {
            display: flex;
            flex-direction: column;
            
            
          }

          .money-input-container {
            display: flex;
            background-color: #FFFFFF;
            border-radius:30px;
          }

          .money-input {
            display: flex;
            flex-basis: 85%;
            flex-direction: column;
            padding:5px;
          }

          .money-input span {
            margin: 5px 0 0 20px;
            font-size:14px;
          }

          .currency-change {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-basis: 35%;
            width: 35%;
            background-color: #1F345A;
            border-radius: 0 30px 20px 0;
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
            color:#FFFFFF;
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

         

          

          .left-feature-container,
          .right-feature-container {
            flex-basis: 50%;
          }


      

          .logo-left{
            background:url('../static/images/Asset Web/content/Group 296.png'), url('../static/images/Asset Web/content/Rectangle 160.png');
            background-repeat: no-repeat;
            flex-basis:100%;
            background-size:100px 100px,auto;
            background-position:center,center;
            padding:100px;
            display:flex;
            
          }

          .logo-left h1{
            display:flex
            margin-top:300px;
          }


          // .features .container .row {
          //   display: flex;
          //   padding: 30px 0;
          // }

          .features-mobile{
            display: none;
          }

          .testimonials {
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

          .application-mobile{
            display:none;
          }

          .achievement-mobile{
            display:none;
          }

          .testimonial-mobile{
            display:none;
          }

          

            @media only screen and (max-width: 414px) {
              #menuToggle .main-cta {
                position: absolute;
                right: 0;
              }

              .hero .money-input span{ 
                font-size:12px;
              }

              .hero .money-input NumberFormat{
                font-size:11px;
              }

              .hero .right-container{
                margin-right:0px;
                
              }

              .store img{
                display:none;
              }


              .testimonial-mobile{
                background:url('../static/images/testimoni/background.png');
                display: flex;
                background-size:100% 100%;
                height:auto;
                width:auto;
                margin-top:0%;
                z-index:1;
              }

              .achievement-mobile h1{
                color:#000000;
                 font-size:15pt;
                 width:auto;
                margin-top:30px;
                text-shadow: 1px 1px 1px #000000;
              }

              .note{
                width:100px;
              }

              .testimonial-mobile img{
                width:30%;
                height:30%;
                
                text-align:center;
               
              }

              .testimonial-mobile .textTesti h1{
                font-size:20px;
              }


              .achievement-mobile{
                  background:url('../static/images/achievment/Box_World Map.png');
                  padding:10px 10px 50px 0px;
                  display: flex;
                  background-size:100% 100%;
                  height:auto;
                  width:auto;
                  
                }

                .testimonial-mobile .message{
                  background-image:url('../static/images/testimoni/box-message.png');
                  background-repeat: no-repeat;
                  background-position: center;
                  background-size:100% 100%;
                  width:auto;
                  padding:80px 40px 80px 40px;
                  text-align:center;

                }

                .testimonial-mobile .p{
                  letter-spacing: 2px
                  text-align:center;
                  
                }
          

              .main-container{
                display:flex;
                display: -moz-flex;
                display: -o-flex;
                display: -webkit-flex;
              
                justify-content: space-around;
                padding:5px;
              }
        
              .main-container .left-container{
                height: 350px;
                margin: 10px;
                text-align:center:
              }
        
              .main-container .right-container{                
                height: 350px;
                text-align:center;
                align-items:center;
                vertical-align: middle;
               
              
              }

              .application-mobile{
                display:block;
              }

              
              .application-mobile h1{
                font-family: 10em ,'Open Sans', sans-serif;
                font-weight: 900;
                color: #000000;
                font-size:15px;
                margin-top:90%;
                text-shadow: 1px 1px 1px #000000;
              
                
                }

              .main-container .right-container img{
                width:80%;
                height:100%;
                float:center;
                text-align:center;
               
              }

              .application{
                display:none;
              }

              .first-benefit:hover .first-message {
                display: block;
                animation: fade-in 1s;
              }

              .first-benefit:hover .btn-primary-2 {
                display: none;
                animation: fade-in 1s;
              }

              .feature .images{
                display:none;
              }

              @keyframes fade-in {
                from {
                  opacity: 0;
                }
                to {
                  opacity: 1;
                }
              }
              
              @keyframes fade-out {
                from {
                  opacity: 1;
                }
                to {
                  opacity: 0;
                }
              }
              
              

              .achievement{
                display:none;
              }


              .application .left-container,
              .application .right-container{
                flex-basis:50%
              }

              .testimonial{
                display:none;
              }

              .testimonial .message{
                display:none;
              }

              
              .external-link-right {
                lex-basis: 40%;
                margin-left : 20px;
                margin-top: 0px;
              }

              .features .benefit{
                display:none;
              }

                 .fiture-mobile{
                    background:url('../static/images/features/background-batik.png');
                    padding:10px 10px 80px 10px;
                    display:flex;
                   }
            
                   .fiture-mobile .images{
                    margin-top:-105px;
                    display:flex;
                    
                    position:absolute;
                  }
            
                  .fiture-mobile .message{
                    background:url('../static/images/features/chat-box.png');
                    background-repeat: no-repeat;
                    background-position: center;
                    background-size:1200px 300px;
                    margin-top:760px;
                    margin-left:-160px;
                    height:300px;
                    width:1300px;
                    position:absolute;
                    opacity:0.8;
                    padding:70px 30px 0px 50px;
                 }

                .fiture-mobile-benefit{
                  display:flex;
                  flex-direction: column;
                }

                .first-message{
                  display:none;
                }

                .first-message{
                  background:url('../static/images/features/Why should we use Transfree_Pop up button.png');
                  background-repeat: no-repeat;
                  background-position: center;
                  background-size:100% 100%;
                  padding:0px 10px 0px 10px;
                  height:auto;
                }

                .application{
                  width:100%;
                }

                 .fiture-mobile .message {
                   font-size:23px;
                 }

                 .fiture-mobile-message h1{
                   font-size:30px;
                   color:#000000;
                 }

                 .fiture-mobile-message {
                  display:block;
                  margin-top:40px;

                }

              .features .message{
               
                display:none;
              }

              .fiture-mobile{
                background-size:100% 100%;
                height:auto;
                width:auto;
                margin-top:-140px;
                margin-left:-30px;
              
              }

              .fiture-mobile .btn-primary-start{
                width:30%;
              }

              

             .fiture-mobile{
              display: flex;
              flex-direction: column;

             }

              .features {
                display:none;
              }

              .achievement{
                background-size:100% 100%;
                height:500px;
                width:420px;
                margin-top:-120px;
                margin-left:-30px;
              
              }

              .fiture-mobile .images{
                margin-left:0px;
              }

              .fiture-mobile .images img{
                width:50px;
                height:50px;
                margin-top:20px;
              }

              .fiture-mobile .images .monas  { 
                margin-top:25%;
                margin-left:9%;
                transform: rotate(-10deg);
              }
              
              .fiture-mobile .images .bali{
                margin-top:7%;
                transform: rotate(2deg);
              }

              .fiture-mobile .images .surabaya{
                margin-top:13%;
                margin-left:2%;
                transform: rotate(10deg);
              }

              .fiture-mobile .images .rumah{
                margin-top:-7%;
                
              }

              .fiture-mobile .images .borobudur{
                margin-top:13%;

               
              }

              .fiture-mobile .images .borobudur img{
                transform: rotate(21deg);

               
              }
              


              .hero {
                display: flex;
                flex-wrap: wrap;
                flex-direction: row-reverse;
                padding:0px 0px 180px 30px;
              }

              .hero .left-container{
                display:none;
              }

              .hero .right-container{
                order:1;
              }

             

              .testimonial{
                width:10px;
              }

              .testimonial .message{
                width:10px;
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

         

          // .features{
          //   display: none;
          // }

          .features-mobile {
            // display: inline-block;
            // padding: 100px 0;
            // background-color: #FFF;
            // text-align: center;

            display:none;
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
