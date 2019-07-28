import Link from 'next/link';
import Header from '../../components/header.js';
import MenuAdmin from '../../components/menuAdmin.js';
import { connect } from 'react-redux';
import initialize from '../../utils/initialize';
import actions from '../../redux/actions';
import { getCookie } from '../../utils/cookie';
import NumberFormat from 'react-number-format';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function FormattedNumber(props) {
  return (
    <NumberFormat value={props.value} displayType={'text'} thousandSeparator={true} decimalScale={2} />
  )
}
class Rates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upperMargin: 0,
      lowerMargin: 0
    }
  }

  static async getInitialProps(ctx) {
    initialize(ctx);
    await ctx.store.dispatch(actions.getMultipleRates('IDR','MYR','KRW','GBP','USD','EUR','HKD'));
    await ctx.store.dispatch(actions.getAdjustedRates('IDR', 'getAdjustedRates'));
  };

  componentDidMount() {
    this.setState({
      upperMargin: this.props.adjustedRates.upperMargin,
      lowerMargin: this.props.adjustedRates.lowerMargin
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.updateRates(
      { base: 'IDR', upperMargin: this.state.upperMargin, lowerMargin: this.state.lowerMargin },
      'updateRates'
    );
  }

  render() {
    return (
      <div>
        <Header />
        <MenuAdmin/>
        <div className="container-fluid">
          <div className="container-fixed">
            <div className="list-header">
              <h2>FX Margin Settings</h2>
            </div>
            <form className="form-container" onSubmit={this.handleSubmit.bind(this)}>
              <div className="left">
                <h3>Live FX rates</h3>
                <p>1 IDR equals</p>
                <ul>
                  <li><FormattedNumber value={1/this.props.rates.MYR} /> MYR</li>
                  <li><FormattedNumber value={1/this.props.rates.KRW} /> KRW</li>
                  <li><FormattedNumber value={1/this.props.rates.GBP} /> GBP</li>
                  <li><FormattedNumber value={1/this.props.rates.USD} /> USD</li>
                  <li><FormattedNumber value={1/this.props.rates.EUR} /> EUR</li>
                  <li><FormattedNumber value={1/this.props.rates.HKD} /> HKD</li>
                </ul>
              </div>
              <div className="right">
                <h3>FX Margin</h3>

                <label htmlFor="upperMargin">IDR to Foreign Currencies (+)</label><br/>
                <input
                  type="tel"
                  id="upperMargin"
                  placeholder="100"
                  value={this.state.upperMargin}
                  onChange={e => this.setState({ upperMargin: e.target.value })}/>

                <label htmlFor="lowerMargin">Foreign Currencies to IDR (-)</label><br/>
                <input
                  type="tel"
                  id="lowerMargin"
                  placeholder="100"
                  value={this.state.lowerMargin}
                  onChange={e => this.setState({ lowerMargin: e.target.value })}/>

                <button type="submit" className="btn-primary">{this.props.inProgress ? (
                  <FontAwesomeIcon icon="sync-alt" spin/>
                ) : 'Update'}</button>
              </div>
            </form>
          </div>
        </div>
        <style jsx>{`
          .container-fluid {
            align-items: flex-start;
            height; auto;
          }
          .container-fixed {
            max-width: 1280px;
            margin: 50px auto;
          }

          p {
            text-align: left;
          }

          .form-container {
            display: flex;
            width: 1280px;
            height: auto;
            margin: 30px auto;
            padding: 0;
            background: #FFFFFF;
            box-shadow: 0 10px 30px 0 rgba(0,0,0,0.10);
            border-radius: 8px;
          }

          h2 {
            margin: 0;
          }

          input[type=text] {
            border: 1px solid #EAEDF2;
            font-size: 14px;
            padding: 8px 8px 8px 30px;
            border-bottom: 1px solid #eaeaea;
            background-color: #EAEDF2;
            border-radius: 8px;
            transition: all 0.4s ease-in-out;
            width: 200px;
            background-image: url('../static/images/ic-search.svg');
            background-position: 8px 8px;
            background-repeat: no-repeat;
          }

          input[type=text]:focus {
            outline: none;
            border: 1px solid #469DDD;
            background-color: #ECF3FA;
            width: 300px;
          }

          ::placeholder {
            color: #CACACA;
          }

          .btn-tertiary {
            margin: 20px auto;
          }

          .left,
          .right {
            width: 50%;
            flex-basis: 50%;
            padding: 20px;
          }

          .right {
            max-width: 30%;
          }

        `}</style>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    inProgress: state.fx.inProgress,
    rates: state.rate.rates,
    adjustedRates: state.fx.adjustedRates
  }
}

export default connect(mapStateToProps, actions)(Rates);
