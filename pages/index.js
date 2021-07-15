import Menu from '../components/menu.js';
import Header from '../components/header.js';
import Footer from '../components/footer.js';
import React from 'react';
import { connect } from 'react-redux';

import actions from '../redux/actions';
import initialize from '../utils/initialize';
import '@fortawesome/fontawesome-svg-core/styles.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import * as Hero from '../components/landing-page/Hero';
import { PrButton, WAButton } from '../components/landing-page/Buttons.js';
import { Primary } from '../components/landing-page/Primary.js';
import { CountriesDisplay } from '../components/landing-page/CountriesDisplay.js';
import { Testmonies } from '../components/landing-page/Testimonies.js';
import { LeftFeatureRow, RightFeatureRow, FeatureCarousel, listFeatures } from '../components/landing-page/Feature.js';
import { MobilePlatform } from '../components/landing-page/MobilePlatform.js';
import { VideoCollab } from '../components/landing-page/VideoCollab.js';

//Index untuk homepage kalau belum login
class Index extends React.Component {

  constructor( props ) {
    super(props);
    this.state = {
      isSourceActive: false,
      isDestinationActive: false,
      fromCurrency: 'gbp',
      toCurrency: 'idr',
      fromAmount: 1000,
      toAmount: 0,
      isMobile: false
    };
    this.toggleSource = this.toggleSource.bind(this);
    this.hideSource = this.hideSource.bind(this);
    this.toggleDestination = this.toggleDestination.bind(this);
    this.hideDestination = this.hideDestination.bind(this);
    this.handleSourceChange = this.handleSourceChange.bind(this);
    this.handleDestinationChange = this.handleDestinationChange.bind(this);
    this.selectDestination = this.selectDestination.bind(this);
    this.selectSource = this.selectSource.bind(this);
  }

  static async getInitialProps(ctx) {
    initialize(ctx);
    await ctx.store.dispatch(actions.getAdjustedRates('IDR', 'getAdjustedRates'));
    await ctx.store.dispatch(actions.getRates('GBP', 'IDR'));
    return {}
  };

  componentDidMount() {
    this.setState({
      rate: this.props.rate - (this.props.rate * this.props.adjustedRates.lowerMargin / 100),
      toAmount: this.state.fromAmount * (this.props.rate - (this.props.rate * this.props.adjustedRates.lowerMargin / 100)),
      isMobile: window.innerWidth <= 800
    })
    window.addEventListener('resize', () => {
      this.setState({ isMobile: window.innerWidth <= 800 })
    })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => {
      this.setState({ isMobile: window.innerWidth <= 800 })
    })
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
        <Header />
        {/* <Menu isApproved={this.props.isApproved} homepage = "true"/> */}

        {/* Hero Component */}
        <Hero.MapBackground><Hero.Overlay>
          <Hero.HeroDiv>
            <Hero.Title/>
            <Hero.Converter>
              <Hero.InputNumber
                label={"You send"}
                amount={this.state.fromAmount}
                currency={this.state.fromCurrency}
                onChange={this.handleSourceChange}
                onSelect={this.selectSource} 
                onClick={this.toggleSource}
                show={this.state.isSourceActive}/>
              <Hero.InputNumber
                label={"Recipient gets"}
                amount={this.state.toAmount}
                currency={this.state.toCurrency}
                onChange={this.handleDestinationChange}
                onSelect={this.selectDestination} 
                onClick={this.toggleDestination}
                show={this.state.isDestinationActive}/>
              <Hero.RateAndFee
                rate={this.state.rate}
                fee={0}/>
              <div style={{ padding: "1rem 1.25rem 0 1.25rem", fontSize: "0.75rem" }}>
                Your transfer will be processed immediately. 
                The recipient will get the money in next working day.
                <a href="/signup">
                  <PrButton style={{
                    marginTop: "1rem",
                    width: "100%" 
                  }}>Try it For Free</PrButton>
                </a>
              </div>
              {/* <WAButton/> */}
            </Hero.Converter>
          </Hero.HeroDiv>
        </Hero.Overlay></Hero.MapBackground>

        {/* Features */}
        <div className="row">
          <Primary/>
        </div>
        
        { this.state.isMobile ?
          <>
            <FeatureCarousel listFeatures={listFeatures}/>
          </>
          :
          <>
            {
              listFeatures.map((ftr, idx) => (
                idx % 2 == 0 ? 
                <LeftFeatureRow {...ftr}/> :
                <RightFeatureRow {...ftr}/>
              ))
            } 
          </>
        }

        {/* Video and Collaborators */}
        <div className="row">
          <VideoCollab/>
        </div>

        {/* Review */}
        <div className="row" style={{ marginBottom: "3.5rem" }}>
          <Testmonies/>
        </div>

        {/* Countries */}
        <div className="row" style={{ backgroundColor: "#1E345B", padding: "2.5rem" }}>
          <CountriesDisplay/>
        </div>
        
        {/* Mobile App */}
        <div className="row" style={{ backgroundColor: "#F3F5F7", paddingTop: '2rem' }}>
          <MobilePlatform/>
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

export default connect(mapStateToProps, actions)(Index);
