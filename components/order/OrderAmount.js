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

  saveAndContinue = (e) => {
    e.preventDefault();
    var data = {
      rate: this.props.rate,
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
                <p>You send</p>
                <button className="currency-from dropdown-button" onClick={this.toggleSource}>
                  <span className={'flag-icon flag-icon-'+this.state.fromCurrency.substring(0,2)+' flag-icon-squared'}></span> {this.state.fromCurrency}
                  <FontAwesomeIcon className="caret" icon="caret-down"/>
                </button>
                <div className={this.state.isSourceActive ? 'dropdown-menu show' : 'dropdown-menu'}>
                  <ul>
                    <li onClick={this.selectSource.bind(this,'idr')}>
                      <a className="dropdown-item">
                        <span className="flag-icon flag-icon-id flag-icon-squared"></span> IDR
                      </a>
                    </li>
                    <li onClick={this.selectSource.bind(this,'gbp')}>
                      <a className="dropdown-item">
                        <span className="flag-icon flag-icon-gb flag-icon-squared"></span> GBP
                      </a>
                    </li>
                    <li onClick={this.selectSource.bind(this,'usd')}>
                      <a className="dropdown-item">
                        <span className="flag-icon flag-icon-us flag-icon-squared"></span> USD
                      </a>
                    </li>
                  </ul>
                </div>
                <NumberFormat
                  id="money-from"
                  type="text"
                  thousandSeparator={true}
                  decimalScale={2}
                  value={this.state.fromAmount}
                  onKeyUp={this.handleSourceChange}/>
              </div>
              <div className="destination-container">
                <p>Recipient gets</p>
                <button className="currency-from dropdown-button" onClick={this.toggleDestination}>
                  <span className={'flag-icon flag-icon-'+this.state.toCurrency.substring(0,2)+' flag-icon-squared'}></span> {this.state.toCurrency}
                  <FontAwesomeIcon className="caret" icon="caret-down"/>
                </button>
                <div className={this.state.isDestinationActive ? 'dropdown-menu show' : 'dropdown-menu'}>
                  <ul>
                    <li onClick={this.selectDestination.bind(this,'myr')}>
                      <a className="dropdown-item">
                        <span className="flag-icon flag-icon-my flag-icon-squared"></span> MYR
                      </a>
                    </li>
                    <li onClick={this.selectDestination.bind(this,'krw')}>
                      <a className="dropdown-item">
                        <span className="flag-icon flag-icon-kr flag-icon-squared"></span> KRW
                      </a>
                    </li>
                    <li onClick={this.selectDestination.bind(this,'gbp')}>
                      <a className="dropdown-item">
                        <span className="flag-icon flag-icon-gb flag-icon-squared"></span> GBP
                      </a>
                    </li>
                    <li onClick={this.selectDestination.bind(this,'usd')}>
                      <a className="dropdown-item">
                        <span className="flag-icon flag-icon-us flag-icon-squared"></span> USD
                      </a>
                    </li>
                    <li onClick={this.selectDestination.bind(this,'eur')}>
                      <a className="dropdown-item">
                        <span className="flag-icon flag-icon-eu flag-icon-squared"></span> EUR
                      </a>
                    </li>

                    <li onClick={this.selectDestination.bind(this,'hkd')}>
                      <a className="dropdown-item">
                        <span className="flag-icon flag-icon-hk flag-icon-squared"></span> HKD
                      </a>
                    </li>
                  </ul>
                </div>
                <NumberFormat
                  id="money-to"
                  type="text"
                  thousandSeparator={true}
                  decimalScale={2}
                  value={this.state.toAmount}
                  onKeyUp={this.handleDestinationChange}/>
              </div>
            </div>
            <div className="row rate">
              <span className="rate-desc">Currency rate {this.state.fromCurrency.toUpperCase()}/{this.state.toCurrency.toUpperCase()}</span>
              <span className="rate-value"><span className="live-rate"><NumberFormat displayType={'text'} thousandSeparator={true} value={this.props.rate} /></span></span>
            </div>
            <div className="row note">
              <p>Your transfer will be processed immediately.
              The recipient will get the money in less than <span className="received-on">24 hours.</span>.</p>
            </div>
            <div className="row converter-cta">
              <div className="cta-secondary">
                <Link href="">
                  <a className="btn-secondary">Compare price</a>
                </Link>
              </div>
              <div className="cta-primary">
                <Link href="">
                  <a className="btn-primary" onClick={this.saveAndContinue}>Continue</a>
                </Link>
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
          }

          .source-container {
            flex-basis: 50%;
          }

          .destination-container {
            flex-basis: 50%;
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
          }

          .dropdown-button:active,
          .dropdown-button:focus {
            outline: none;
          }

          a.dropdown-item {
            transition: none;
          }
        `}</style>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  rate: state.rate.rates,
});

export default connect(mapStateToProps, rateActions)(OrderAmount);
