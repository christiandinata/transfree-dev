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
  }

  static async getInitialProps(ctx) {
    initialize(ctx);
    await ctx.store.dispatch(actions.getRates('GBP','IDR'));
    if (ctx.isServer) {
      if(ctx.req.headers.cookie) {
        await ctx.store.dispatch(actions.getUser(getCookie('_id', ctx.req),'user'));
      }
    }

  };

  componentDidMount() {
    this.setState({
      rate: this.props.rate,
      toAmount: this.state.fromAmount * this.props.rate
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
    this.props.getRates(country,this.state.toCurrency).then(() => {
      this.setState((state) => {
        return {
          fromCurrency: country,
          toAmount: this.state.fromAmount * this.props.rate
        }
      });
      this.hideSource();
    });
  }

  selectDestination(country) {
    this.props.getRates(this.state.fromCurrency,country).then(() => {
      this.setState((state) => {
        return {
          toCurrency: country,
          toAmount: this.state.fromAmount * this.props.rate
        }
      });
      this.hideDestination();
    });
  }

  handleSourceChange(e) {
    const fromAmount = e.target.value.replace(/,/g, '');
    if (this.state.fromCurrency == 'idr') {
      if (fromAmount < 100000) {
        this.setState((state) => {
          return {
            fromAmount: fromAmount,
            toAmount: 0
          }
        })
      } else {
        this.setState((state) => {
          return {
            fromAmount: fromAmount,
            toAmount: fromAmount * this.props.rate
          }
        })
      }
    } else {
      this.setState((state) => {
        return {
          fromAmount: fromAmount,
          toAmount: fromAmount * this.props.rate
        }
      })
    }
  }

  handleDestinationChange(e) {
    const toAmount = e.target.value.replace(/,/g, '');
    this.setState({
      fromAmount: toAmount / this.props.rate,
      toAmount: toAmount
    })
  }

  render() {
    return (
      <div>
        <Header/>
        <Menu isApproved={this.props.isApproved}/>
        <div className="row hero">
          <div className="container">
            <div className="left-container">
              <h1>International money transfer feels like local transfer</h1>
              <div className="desktop">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pretium
                pretium tempor. Ut eget imperdiet neque. In volutpat ante semper diam
                molestie, et aliquam erat </p>
                <Link href="">
                  <a className="btn-secondary">See how it works</a>
                </Link>
                <div className="benefits">
                  <div className="benefit-item">
                    <img src="../static/images/benefit-1.svg"/>
                    <p>Official partner Persatuan Pelajar Indonesia</p>
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
                            <li onClick={this.selectSource.bind(this,'usd')}>
                              <a className="dropdown-item">
                                <span className="flag-icon flag-icon-us flag-icon-squared"></span> USD (US Dollar)
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* <input id="money-from" type="text" value={this.toCurrency(this.state.fromAmount)} onChange={this.handleSourceChange}/> */}
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
                  <span className="rate-desc">{this.state.fromCurrency.toUpperCase()}/{this.state.toCurrency.toUpperCase()} Conversion rate</span> <span className="rate-value"><span className="live-rate"><NumberFormat displayType={'text'} thousandSeparator={true} decimalScale={4} value={this.props.rate} /> {this.state.toCurrency.toUpperCase()}</span></span>
                </div>
                <div className="row note">
                  <p style={{maxWidth: "100%", marginBottom: "0"}}>Your transfer will be processed immediately.
                  The recipient will get the money in less than <span className="received-on">24 hours.</span>.</p>
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
                  </div>
                </div>
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
              <div className="partner-item">
                <img src="../static/images/partners/ppi-rotterdam.png"/>
              </div>
            </div>
            <div className="row partners-container">
              <div className="partner-item">
                <img src="../static/images/partners/ppi-delft.png"/>
              </div>
              <div className="partner-item">
                <img src="../static/images/partners/ppi-gm.png"/>
              </div>
              <div className="partner-item">
                <img src="../static/images/partners/ppi-newcastle.png"/>
              </div>
              <div className="partner-item">
                <img src="../static/images/partners/ppi-amsterdam.png"/>
              </div>
            </div>
          </div>
        </div>
        <div className="row features">
          <div className="container">
            <div className="feature">
              <div className="left-feature-container"><img src="../static/images/artboard_1.svg"/></div>
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
              <div className="right-feature-container">
                <img src="../static/images/artboard_2.svg"/>
              </div>
            </div>
            <div className="feature">
              <div className="left-feature-container"><img src="../static/images/artboard_3.svg"/></div>
              <div className="right-feature-container">
                <h2>We don't charge any fees for your transfer</h2>
                <p>Too good to be true? But this is happening now.
                Yes, we do not charge you any fees. And we have competitive rates as
                compared to other services. So why not try using our services?</p>
              </div>
            </div>

          </div>
        </div>
        <div className="row testimonials">
          <div className="container">
            <h1>Why using Transfree?</h1>
            <div className="features-container">
              <div className="feature-item">
                <img src="../static/images/benefit-3.svg"/>
                <h2>Cheaper & faster</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                In lobortis libero ac neque vehicula, in bibendum metus mollis.</p>
              </div>
              <div className="feature-item">
                <img src="../static/images/benefit-4.svg"/>
                <h2>Rp 18 Billion+ transactions</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                In lobortis libero ac neque vehicula, in bibendum metus mollis.</p>
              </div>
              <div className="feature-item">
                <img src="../static/images/benefit-5.svg"/>
                <h2>750+ customers</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                In lobortis libero ac neque vehicula, in bibendum metus mollis.</p>
              </div>
            </div>
            <div className="testimonials-wrapper">
              <h1>What our customers say</h1>
              <div className="testimonials-items">
                <div className="message">
                  “It is very difficult to send money from IDR to GBP and Transfree
                  come out with the best solution ever. First time I use it when
                  I was in Indonesia to pay for my flat deposit and rent.
                  And now I'm still use Transfree to transfer money from the UK to Indonesia.
                  It gives me a fair rate and many times, the rate is better than transferwise.”
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
          </div>
        </div>
        <style jsx>{`
          .desktop {
            display: block;
          }

          .container {
            display: flex;
          }

          .hero {
            padding-bottom: 100px;
          }

          .left-container {
            flex-basis: 60%;
            margin-top: 100px;
          }

          .left-container p {
            max-width: 80%;
            margin-bottom: 30px;
          }

          .right-container {
            flex-basis: 40%;
            margin-top: 120px;
            z-index: 2;
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
            width: 100%;
            height: auto;
          }

          .partners {
            margin-top: -7px;
            padding-top: 50px;
            background-color: #FFF;
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
            flex-basis: 20%;
            align-self: center;
          }

          .partner-item img {
            max-width: 60%;
          }

          .features {
            padding: 100px 0;
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
            margin: 100px 0;
          }

          .testimonials {
            background-image: url('../static/images/curve-gradient-bg.svg');
            background-size: contain;
            background-repeat: no-repeat;
            background-color: #FFF;
            width: 100%;
            min-height: 962px;
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
            .left-container {
              margin-top: 0;
            }
            .desktop {
              display: none;
            }
            .right-container {
              margin-top: 0;
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
          }

        `}</style>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    rate: state.rate.rates,
  }
  if (state.user.user_data) {
    const userData = JSON.parse(state.user.user_data);
    return {
      isApproved: !!userData.isApproved,
    }
  }

};

export default connect(mapStateToProps, actions)(Index);
