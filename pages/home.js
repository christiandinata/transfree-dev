import Header from '../components/header';
import Menu from '../components/menu';
import Link from 'next/link';
import { connect } from 'react-redux';
import actions from '../redux/actions';
import initialize from '../utils/initialize';
import { getCookie } from '../utils/cookie';
import AccountLayout from '../components/AccountLayout';
import Dashboard from './dashboard.js';
import { PopUp } from '../components/PopUp';

class Home extends React.Component{

  constructor(props){
    super(props);
    this.state = { showPopup: true };
  }

  static async getInitialProps(ctx) {
    initialize(ctx);
    await ctx.store.dispatch(actions.getUser(getCookie('_id', ctx.req),'user',ctx.req));
    await ctx.store.dispatch(actions.getOrderByUid(getCookie('_id', ctx.req),'getOrderByUid',ctx.req));
    await ctx.store.dispatch(actions.getUser(getCookie('_id', ctx.req),'user',ctx.req));
    await ctx.store.dispatch(actions.getAdjustedRates('IDR', 'getAdjustedRates'));
    await ctx.store.dispatch(actions.getRates('GBP', 'IDR'));
    return {};
  };

  componentDidMount() {
    this.setState({
      rate: this.props.rate - (this.props.rate * this.props.adjustedRates.lowerMargin / 100),
      toAmount: this.state.fromAmount * (this.props.rate - (this.props.rate * this.props.adjustedRates.lowerMargin / 100))
    })
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }


  renderDashboard(){
    return(
      <div>
        <Dashboard adjustedRates={this.props.adjustedRates} rate={this.props.rate}/>
      </div>
    )
  }

  renderContent() {
    return(
      <div>
        <Dashboard adjustedRates={this.props.adjustedRates} rate={this.props.rate}/>
        {this.state.showPopup
          ?
          <PopUp
            text={this.props.userData.fullname}
            closePopup={this.togglePopup.bind(this)}
          />
          : null
        }
      </div>
    );
  }

  render() {
    return (
      <AccountLayout isApproved={this.props.isApproved}>
        {this.props.userData.registrationStep == 2 ? this.renderContent() : this.renderDashboard() }
      </AccountLayout>
    );
  }
}

const mapStateToProps = (state) => {
  if (state.user.user_data != null) {
    return {
      isApproved: !!state.user.user_data.isApproved,
      rate: state.rate.rates,
      adjustedRates: state.fx.adjustedRates,
      userData: state.user.user_data,
      orderArray: state.order.orders,
    }
  } else {
    return {
      rate: state.rate.rates,
      adjustedRates: state.fx.adjustedRates
    }
  }
}

export default connect(mapStateToProps, actions)(Home);
