import Header from '../components/header';
import Menu from '../components/menu';
import Link from 'next/link';
import Router from 'next/router';
import { connect } from 'react-redux';
import initialize from '../utils/initialize';
import actions from '../redux/actions';
import { getCookie } from '../utils/cookie';
import PhoneInput from 'react-phone-number-input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//Component update nomor HP
class Phone extends React.Component {
  constructor({ props }) {
    super(props);
    this.state = {
      phone: '+44',
    };
  }

  static async getInitialProps(ctx) {
    initialize(ctx);
    if (ctx.isServer) {
      if(ctx.req.headers.cookie) {
        await ctx.store.dispatch(actions.getUser(getCookie('_id', ctx.req),'user',ctx.req));
      }
    }
    return {};
  }


  handleSubmit(e) {
    e.preventDefault();
    this.props.verify({
      phone: this.state.phone,
      email: this.props.email
    },
      'verify','edit'
    );
  }

  handleChange = (value) => {
    this.setState({phone: value});
  }

  render() {
    //console.log(this.props.errorMessage);
    return (
      <div>
        <Header />
        <div className="container-fluid">
          <div className="logo">
            <img src="../static/images/transfree-logo.png"/>
          </div>
          <h1>Update Phone Number</h1>
          <p>Input your new number</p>
          <div className={"error-container "+(this.props.errorMessage != '' && this.props.errorMessage != undefined ? "error-show" : "") }>
            {this.props.errorMessage}
          </div>
          <form className="form-container" onSubmit={this.handleSubmit.bind(this)}>
            <label htmlFor="phone">Phone Number</label><br/>
            <PhoneInput
              placeholder="Enter phone number"
              country="GB"
              value={ this.state.phone }
              onChange={ phone => this.setState({ phone }) }/>

            <button type="submit" className="btn-primary">{this.props.inProgress ? (
              <FontAwesomeIcon icon="sync-alt" spin/>
            ) : 'Continue'}</button>

          </form>
        </div>
        <style jsx>{`
          .container-fluid {
            flex-direction: column;
          }
          `}
        </style>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    email: state.user.user_data.email,
    isAuthenticated: !!state.authentication.token,
    inProgress: state.verify.inProgress,
    errorMessage: state.verify.errorMessage

  }
};

export default connect(
  mapStateToProps,
  actions
)(Phone);
