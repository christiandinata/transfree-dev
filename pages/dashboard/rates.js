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
      adjustedRates : [],
      rates : []
    }
  }

  static async getInitialProps(ctx) {
    initialize(ctx);
    await ctx.store.dispatch(actions.getMultipleRates('IDR', ['MYR','KRW','GBP','USD','EUR','HKD']));
    await ctx.store.dispatch(actions.getAllAdjustedRates('IDR', 'getAllAdjustedRates', ctx.req));
  };

  componentDidMount(){
    this.setState({
      adjustedRates : this.props.adjustedRates,
      rates : this.props.rates
    })
  }

  handleChange(event){    
    console.log(event.target.name)
    let newAdjustedRates = this.state.adjustedRates;
    let i =0; let found=false;

    while((i < newAdjustedRates.length) && (!found)){
      const rateName = newAdjustedRates[i].ratesName;
      if((rateName == event.target.name) || (rateName == event.target.dataset.name)){
        found = true;
      }
      else{
        i++;
      }
    }

    if(found){
      const update = event.target.dataset.updating;
      console.log(update);
      if(update == "upperMargin"){
        newAdjustedRates[i].upperMargin = event.target.value;
      }
      else if(update == "lowerMargin"){
        newAdjustedRates[i].lowerMargin = event.target.value;
      }
      else if(update == "idrToOtherOos"){
        newAdjustedRates[i].idrToOtherOos = event.target.value;
      }
      else if(update == "otherToIdrOos"){
        newAdjustedRates[i].otherToIdrOos = event.target.value;
      }
    }

    this.setState({
      adjustedRates : newAdjustedRates
    })
  }

  render() {
    return (
      <div>
        <Header />
        <MenuAdmin/>
        <div className="container-fluid">
          <div className="container-fixed">
            <div className="list-header">
              <h2>FX Margin and Out of Stock Settings</h2>
            </div>
            {this.state.adjustedRates.map((rates, idx) => {
              let allRates = this.state.rates;
              let selectedRate = [];
              for(var i=0;i<allRates.length;i++){
                if(rates.ratesName == allRates[i][0]){
                  selectedRate = allRates[i];
                }
              }
              const foreignRate = selectedRate[1];

              return(
                <div key={idx} className="form-container">
                  <div className="left">
                    <h3>Live FX Rates</h3>
                    <div>1 {rates.ratesName} = <FormattedNumber value={1/foreignRate} /> IDR</div>
                  </div>

                  <div className="center">
                    <h3>Margin Settings</h3>
                    <label htmlFor={rates.ratesName + " upperMargin"}>IDR to {rates.ratesName} (+)</label><br/>
                    <input
                      type="tel"
                      id={rates.ratesName + " upperMargin"}
                      name={rates.ratesName}
                      data-updating="upperMargin"
                      placeholder="100"
                      value={rates.upperMargin}
                      onChange={e => this.handleChange(e)}/>

                    <label htmlFor={rates.ratesName + " lowerMargin"}>{rates.ratesName} to IDR (-)</label><br/>
                    <input
                      type="tel"
                      id={rates.ratesName + " lowerMargin"}
                      name={rates.ratesName}
                      data-updating="lowerMargin"
                      placeholder="100"
                      value={rates.lowerMargin}
                      onChange={e => this.handleChange(e)}/>
                  </div>

                  <div className="right">
                    <h3>Out of Stock Settings</h3>
                    {/* IDR to Other Out Of Stock*/}
                    <h4>IDR to {rates.ratesName}</h4>
                    <label htmlFor={rates.ratesName + " idrToOtherOos"}>TRUE</label>
                    <input
                      type="radio"
                      id={rates.ratesName + " idrToOtherOos"}
                      name={`idrTo${rates.ratesName}Oos`}
                      data-name={rates.ratesName}
                      data-updating="idrToOtherOos"
                      placeholder="100"
                      value="true"
                      checked={rates.idrToOtherOos == "true"}
                      onChange={e => this.handleChange(e)}/>

                    <label htmlFor={rates.ratesName + " idrToOtherOos"}>FALSE</label>
                    <input
                      type="radio"
                      id={rates.ratesName + " idrToOtherOos"}
                      name={`idrTo${rates.ratesName}Oos`}
                      data-name={rates.ratesName}
                      data-updating="idrToOtherOos"
                      placeholder="100"
                      value="false"
                      checked={rates.idrToOtherOos == "false"}
                      onChange={e => this.handleChange(e)}/>

                    {/* Other to IDR Out Of Stock*/}
                    <h4>{rates.ratesName} to IDR</h4>
                    <label htmlFor={rates.ratesName + " otherToIdrOos"}>TRUE</label>
                    <input
                      type="radio"
                      id={rates.ratesName + " otherToIdrOos"}
                      name={`${rates.ratesName}ToIdrOos`}
                      data-name={rates.ratesName}
                      data-updating="otherToIdrOos"
                      placeholder="100"
                      value="true"
                      checked={rates.otherToIdrOos == "true"}
                      onChange={e => this.handleChange(e)}/>

                    <label htmlFor={rates.ratesName + " otherToIdrOos"}>FALSE</label>
                    <input
                      type="radio"
                      id={rates.ratesName + " otherToIdrOos"}
                      name={`${rates.ratesName}ToIdrOos`}
                      data-name={rates.ratesName}
                      data-updating="otherToIdrOos"
                      placeholder="100"
                      value="false"
                      checked={rates.otherToIdrOos == "false"}
                      onChange={e => this.handleChange(e)}/>
                  </div>
                </div>
              );
            })}
            
            {/* <form className="form-container" onSubmit={this.handleSubmit.bind(this)}>
              <div className="left">
                <h3>Live FX rates</h3>
                <ul>
                  <li>1 MYR equals <FormattedNumber value={1/this.props.rates.MYR} /> IDR</li>
                  <li>1 KRW equals <FormattedNumber value={1/this.props.rates.KRW} /> IDR</li>
                  <li>1 GBP equals <FormattedNumber value={1/this.props.rates.GBP} /> IDR</li>
                  <li>1 USD equals <FormattedNumber value={1/this.props.rates.USD} /> IDR</li>
                  <li>1 EUR equals <FormattedNumber value={1/this.props.rates.EUR} /> IDR</li>
                  <li>1 HKD equals <FormattedNumber value={1/this.props.rates.HKD} /> IDR</li>
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
            <div className="list-header">
              <h2>Out Of Stock Settings</h2>
            </div>
            <form className="form-container" onSubmit={this.handleSubmit.bind(this)}>
             
              <div className="right">

                <label>IDR to GBP</label><br/>
                <input
                  type="tel"
                  id="idrToGbpOos"
                  placeholder="100"
                  value={this.state.idrToGbpOos}
                  onChange={e => this.setState({ idrToGbpOos: e.target.value })}/>
                <label>GBP to IDR</label><br/>
                <input
                  type="tel"
                  id="gbpToIdrOos"
                  placeholder="100"
                  value={this.state.gbpToIdrOos}
                  onChange={e => this.setState({ gbpToIdrOos: e.target.value })}/>
                <label>IDR to EUR</label><br/>
                <input
                  type="tel"
                  id="idrToEurOos"
                  placeholder="100"
                  value={this.state.idrToEurOos}
                  onChange={e => this.setState({ idrToEurOos: e.target.value })}/>
                <label>EUR to IDR</label><br/>
                <input
                  type="tel"
                  id="eurToIdrOos"
                  placeholder="100"
                  value={this.state.eurToIdrOos}
                  onChange={e => this.setState({ eurToIdrOos: e.target.value })}/>

                

                <button type="submit" className="btn-primary">{this.props.inProgress ? (
                  <FontAwesomeIcon icon="sync-alt" spin/>
                ) : 'Update'}</button>
              </div>

            </form> */}
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

          input[type=radio]{
            text-align:left;
            margin: 0;
          }

          ::placeholder {
            color: #CACACA;
          }

          .btn-tertiary {
            margin: 20px auto;
          }

          .left,
          .center,
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
