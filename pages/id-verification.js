import Header from '../components/header';
import Menu from '../components/menu';
import Link from 'next/link';
import DatePicker from "react-datepicker";
import { connect } from 'react-redux';
import actions from '../redux/actions';
import initialize from '../utils/initialize';
import { getCookie } from '../utils/cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class IdVerification extends React.Component {
  constructor({ props }) {
    super(props);
    this.state = {
      isIdnumbervalid:true,
      isFullnamevalid: true,
      isPobvalid: true,
      isDobvalid: true,
      isAddressvalid: true,
      idType: 'KTP',
      idNumber: '',
      idName: '',
      dob: '',
      address: '',
      pob: '',
      gender: '',
    };
    this.checkIdnumber = this.checkIdnumber.bind(this);
    this.checkFullname = this.checkFullname.bind(this);
    this.checkPob = this.checkPob.bind(this);
    this.checkDob = this.checkDob.bind(this);
    this.checkAddress = this.checkAddress.bind(this);
  }

  static async getInitialProps(ctx) {
    initialize(ctx);
    if (ctx.isServer) {
      if(ctx.req.headers.cookie) {
        await ctx.store.dispatch(actions.getUser(getCookie('_id', ctx.req),'user'));
      }
    }
  }


  handleChange = (value) => {
    this.setState({dob: value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.verifyId({
        idType: this.state.idType,
        idNumber: this.state.idNumber,
        idName: this.state.idName,
        dob: this.state.dob,
        address: this.state.address,
        pob: this.state.pob,
        gender: this.state.gender,
        email: this.props.email
      },
      'verifyId'
    );
  }

  checkIdnumber(e) {
    if (e.target.value == '') {
      this.setState({isIdnumbervalid: false})
    } else {
      this.setState({isIdnumbervalid: true})
    }
  }
  checkFullname(e) {
    if (e.target.value == '') {
      this.setState({isFullnamevalid: false})
    } else {
      this.setState({isFullnamevalid: true})
    }
  }
  checkPob(e) {
    if (e.target.value == '') {
      this.setState({isPobvalid: false})
    } else {
      this.setState({isPobvalid: true})
    }
  }
  checkDob(e) {
    if (e.target.value == '') {
      this.setState({isDobvalid: false})
    } else {
      this.setState({isDobvalid: true})
    }
  }
  checkAddress(e) {
    if (e.target.value == '') {
      this.setState({isAddressvalid: false})
    } else {
      this.setState({isAddressvalid: true})
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="container-fluid">
          <div className="logo">
            <img src="../static/images/transfree-logo.png"/>
          </div>
          <h1>More Detail</h1>
          <p>According to the regulation from Bank Indonesia, we have to verify your identity. Please provide your identity details below.</p>
          <form className="form-container" onSubmit={this.handleSubmit.bind(this)}>
          <label htmlFor="fullname">Full name</label><br/>
            <input
              type="text"
              id="fullname"
              placeholder="Enter your full name (should match your ID)"
              value={this.state.idName}
              onChange={e => this.setState({ idName: e.target.value })}
              onBlur={this.checkFullname}/>
            <span className={this.state.isFullnamevalid ? 'error-label-hidden' : 'error-label'}>Your Full Name may not be empty.</span>
            
            <label htmlFor="id-type">ID Type</label><br/>
            <select
              id="id-type"
              className="select-css"
              value={this.state.idType}
              onChange={e => this.setState({ idType: e.target.value })}>
              <option value="KTP">KTP</option>
              <option value="Passport">Passport</option>
              <option value="SIM">SIM</option>
            </select>

            <label htmlFor="id-number">ID Number (No. KTP/Passport/SIM)</label><br/>
            <input
              type="tel"
              id="id-number"
              placeholder="Enter ID number"
              value={this.state.idNumber}
              onChange={e => this.setState({ idNumber: e.target.value })}
              onBlur={this.checkIdnumber}/>
            <span className={this.state.isIdnumbervalid ? 'error-label-hidden' : 'error-label'}>You must input your ID Number (KTP/Passport/SIM).</span>

           

            <div style={{marginBottom: "15px"}}>GENDER</div>
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              onChange={e => this.setState({ gender: e.target.value })}/>
            <label htmlFor="male">Male</label><br/>

            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              onChange={e => this.setState({ gender: e.target.value })}/>
            <label htmlFor="female">Female</label><br/>

            <label htmlFor="pob">Place of Birth</label><br/>
            <input
              type="text"
              id="pob"
              placeholder="Enter the city (e.g. Jakarta)"
              value={this.state.pob}
              onChange={e => this.setState({ pob: e.target.value })}
              onBlur={this.checkPob}/>
            <span className={this.state.isPobvalid ? 'error-label-hidden' : 'error-label'}>Your Place of Birth may not be empty.</span>

            <label htmlFor="dob">Date of birth</label><br/>
            <DatePicker
              placeholderText="DD/MM/YYYY"
              dateFormat="dd/MM/yyyy"
              selected={this.state.dob}
              onChange={this.handleChange}
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              onBlur={this.checkDob}/>
            <span className={this.state.isDobvalid ? 'error-label-hidden' : 'error-label'}>Your Day of Birth may not be empty.</span>

            <label htmlFor="address">Address</label><br/>
            <textarea
              id="address"
              placeholder="Enter your full address"
              value={this.state.address}
              onChange={e => this.setState({ address: e.target.value })}
              onBlur={this.checkAddress}/>
            <span className={this.state.isAddressvalid ? 'error-label-hidden' : 'error-label'}>Your address may not be empty.</span> 

            <p className="description"><input type="checkbox"/>I agree to the 
            <a  href="/terms"  target="_blank" className="more-privacy" > Terms and Condition </a></p>

            <p className="description"> * We will not, in any circumstances, share your personal information irresponsibly.
            <a  href="/privacy-policy"  target="_blank" className="more-privacy" > More about Privacy Policy </a></p>

            <button type="submit" className="btn-primary">{this.props.inProgress ? (
              <FontAwesomeIcon icon="sync-alt" spin/>
            ) : 'Continue'}</button>
          </form>
        </div>
        <style jsx>{`
          .container-fluid {
            flex-direction: column;
            position:center;
            margin-right:auto;
            margin-left:auto;
          }
          .select-css {
            width: 100%;
            margin-bottom: 30px;
            border: none;
            border-radius: 0;
            font-size: 16px;
            padding: 15px 0;
            border-bottom: 1px solid #eaeaea;
            font-family: "Campton-Book", sans-serif;
            display: block;
            box-sizing: border-box;
            -moz-appearance: none;
            -webkit-appearance: none;
            appearance: none;
            background-color: #fff;
            background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');
            background-repeat: no-repeat, repeat;
            background-position: right .7em top 50%, 0 0;
            background-size: .65em auto, 100%;
          }
          .select-css::-ms-expand {
            display: none;
          }
          .select-css:hover {
            border-color: #469DDD;
          }
          .select-css:focus {
            border-color: #469DDD;
            outline: none;
          }
          .select-css option {
            font-weight:normal;
          }
          .form-container input[type="radio"] {
            width: 20px;
          }
          .form-container input[type="checkbox"] {
            width: 20px;
          }
          .description{
            color:#e79635;
            font-size: 14px;
            margin: 0px 0px 20px 0px !important;
          }
          .more-privacy{
            color:#e79635;
          }
          .error-label {
            display: block;
            font-size: 14px;
            color: red;
            margin: -25px 0 30px;
          }
          .error-label-hidden {
            display: none;
          }
        `}</style>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    inProgress: state.id.inProgress,
    email: state.user.user_data.email
  }
};

export default connect(
  mapStateToProps,
  actions
)(IdVerification);
