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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Primary } from '../components/landing-page/Primary.js';

import * as Hero from '../components/landing-page/Hero.js'
import { PrButton, WAButton } from '../components/landing-page/Buttons.js';
import { CountriesDisplay } from '../components/landing-page/CountriesDisplay.js';

//Dashboard untuk Homepage kalau udah login
class Dashboard extends React.Component {

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
    this.selectDestination = this.selectDestination.bind(this);
    this.selectSource = this.selectSource.bind(this);
    this.disabledSource = this.disabledSource.bind(this);
    this.disabledDestination = this.disabledDestination.bind(this);
  }

  static async getInitialProps(ctx) {
    initialize(ctx);
    await ctx.store.dispatch(actions.getAdjustedRates('IDR', 'getAdjustedRates'));
    // await ctx.store.dispatch(actions.getRates('GBP', 'IDR'));
    await ctx.store.dispatch(actions.getUser(getCookie('_id', ctx.req),'user',ctx.req));
    return {};
  };

  componentDidMount() {
    this.setState({
      rate: this.props.rate - (this.props.rate * this.props.adjustedRates.lowerMargin / 100),
      toAmount: this.state.fromAmount * (this.props.rate - (this.props.rate * this.props.adjustedRates.lowerMargin / 100))
    })
  }

  reverse(country, country2) {
    this.setState({
      fromCurrency: country2,
      toCurrency: country,
      toAmount: 0,
      fromAmount: 0
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
        this.props.getRates(country2, country).then(() => {
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
    if (this.state.isDestinationActive)
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
    if (this.state.isSourceActive)
      this.hideSource();
  }

  hideDestination() {
    this.setState({
      isDestinationActive: false
    });
  }

  disabledSource(country){
    if(country == this.state.toCurrency){
      return true;
    }
    else{
      return false;
    }
  }

  disabledDestination(country){
    if(country == this.state.fromCurrency){
      return true;
    }
    else{
      return false;
    }
  }

  selectSource(country) {
    if(country != this.state.toCurrency){
      if (country == 'idr') {
        this.props.getRates(this.state.toCurrency, country).then(() => {
          this.setState({
            rate: this.props.rate + (this.props.rate * this.props.adjustedRates.upperMargin / 100),
            fromCurrency: country,
            toAmount: this.state.fromAmount / (this.props.rate + (this.props.rate * this.props.adjustedRates.upperMargin / 100))
          });
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
  }

  selectDestination(country) {
    if(country != this.state.fromCurrency){
      if (country == 'idr') {
        this.props.getRates(this.state.fromCurrency, country).then(() => {
          this.setState({
            rate: this.props.rate - (this.props.rate * this.props.adjustedRates.lowerMargin / 100),
            toCurrency: country,
            toAmount: this.state.fromAmount * (this.props.rate - (this.props.rate * this.props.adjustedRates.lowerMargin / 100))
          });
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

  render() {
    return (
      <div>
        <Header />
        
        {/* Hero Component */}
        <Hero.MapBackground><Hero.Overlay>
          <Hero.HeroDiv loggedIn>
            <Hero.Title/>
            <Hero.Converter>
              <Hero.InputNumber
                label={"You send"}
                amount={this.state.fromAmount}
                currency={this.state.fromCurrency}
                onChange={this.handleSourceChange}
                onSelect={this.selectSource} 
                onClick={this.toggleSource}
                show={this.state.isSourceActive}
                disabled={this.disabledSource}/>
              <Hero.InputNumber
                label={"Recipient gets"}
                amount={this.state.toAmount}
                currency={this.state.toCurrency}
                onChange={this.handleDestinationChange}
                onSelect={this.selectDestination} 
                onClick={this.toggleDestination}
                show={this.state.isDestinationActive}
                disabled={this.disabledDestination}/>
              <Hero.RateAndFee
                rate={this.state.rate}
                fee={0}/>
              <div style={{ padding: "1rem 1.25rem 0 1.25rem", fontSize: "0.75rem" }}>
                Your transfer will be processed immediately. 
                The recipient will get the money in next working day.
                <PrButton style={{
                  marginTop: "1rem",
                  width: "100%" 
                }}>Try it For Free</PrButton>
              </div>
              <WAButton/>
            </Hero.Converter>
          </Hero.HeroDiv>
        </Hero.Overlay></Hero.MapBackground>

        {/* Feature */}
        <div className="row" style={{ marginBottom: "2rem" }}>
          <Primary/>
        </div>

        <div className="row" style={{ backgroundColor: "#1E345B", padding: "1.25rem 0 2rem" }}>
          <CountriesDisplay/>
        </div>

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

export default connect(mapStateToProps, actions)(Dashboard);