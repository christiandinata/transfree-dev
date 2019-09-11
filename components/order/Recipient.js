import Link from 'next/link';
import NumberFormat from 'react-number-format';

class Recipient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNameValid: true,
      isEmailValid: true,
      isBankNameValid: true,
      isBankNameVirtual: true,
      isBankAccountNumberValid: true,
      isAccountNumberValid: true,
      isSortCodeValid: true,
      isSortCodeVirtual: true,
      isIBANValid: true,
      isSWIFTValid: true,
      toCurrency: '',
      sortcode: '',
      accountNumber: ''
    };

    this.name = React.createRef();
    this.email = React.createRef();
    this.bankName = React.createRef();
    this.bankAccountNumber = React.createRef();
    this.iban = React.createRef();
    this.swift = React.createRef();

    this.checkName = this.checkName.bind(this);
    this.checkEmail = this.checkEmail.bind(this);
    this.checkBankName = this.checkBankName.bind(this);
    this.checkBankAccountNumber = this.checkBankAccountNumber.bind(this);
    this.checkAccountNumber = this.checkAccountNumber.bind(this);
    this.checkSortCodeValid = this.checkSortCodeValid.bind(this);
    this.checkIBAN = this.checkIBAN.bind(this);
    this.checkSWIFT = this.checkSWIFT.bind(this);
    this.updateSortcode = this.updateSortcode.bind(this);
    this.updateAccountNumber = this.updateAccountNumber.bind(this);
  }

  componentDidMount() {
    this.setState({toCurrency: this.props.data.toCurrency});
  }

  saveAndContinue = (e) => {
    e.preventDefault();
    var data = {
      email: this.email.current.value,
      name: this.name.current.value,
      bankName: this.bankName.current.value,
      bankAccountNumber: this.bankAccountNumber.current.value,
      sortcode: this.state.sortcode,
      accountNumber: this.state.accountNumber,
      iban: this.iban.current.value,
      swift: this.swift.current.value
    }

    if (this.name.current.value == '') {
      this.setState({isNameValid: false});
      return;
    }

    // if (this.email.current.value == '') {
    //   this.setState({isEmailValid: false});
    //   return;
    // }
    if(
      (this.bankName.current.value.toLowerCase() == 'monzo') ||
      (this.bankName.current.value.toLowerCase() == 'monese') ||
      (this.bankName.current.value.toLowerCase() == 'starling') ||
      (this.bankName.current.value.toLowerCase() == 'revolut') ||
      (this.bankName.current.value.toLowerCase() == 'n26') ||
      (this.bankName.current.value.toLowerCase() == 'neat') ||
      (this.bankName.current.value.toLowerCase() == 'chime') ||
      (this.bankName.current.value.toLowerCase() == 'starling bank') ||
      (this.bankName.current.value.toLowerCase() == 'tangerine') ||
      (this.bankName.current.value.toLowerCase() == 'up') ||
      (this.bankName.current.value.toLowerCase() == 'nubank') ||
      (this.bankName.current.value.toLowerCase() == 'doconomy') ||
      (this.bankName.current.value.toLowerCase() == 'paypal') ||
      
      (this.bankName.current.value.toLowerCase() == 'monzo bank') ||
      (this.bankName.current.value.toLowerCase() == 'monese bank') ||
      (this.bankName.current.value.toLowerCase() == 'starling bank') ||
      (this.bankName.current.value.toLowerCase() == 'revolut bank') ||
      (this.bankName.current.value.toLowerCase() == 'n26 bank') ||
      (this.bankName.current.value.toLowerCase() == 'neat bank') ||
      (this.bankName.current.value.toLowerCase() == 'chime bank') ||
      (this.bankName.current.value.toLowerCase() == 'tangerine bank') ||
      (this.bankName.current.value.toLowerCase() == 'up bank') ||
      (this.bankName.current.value.toLowerCase() == 'nubank bank') ||
      (this.bankName.current.value.toLowerCase() == 'doconomy bank') ||
      (this.bankName.current.value.toLowerCase() == 'paypal bank') 
      )
    {
      this.setState({isBankNameVirtual: false});
      return;
    } 
    if (this.bankName.current.value == '') {
      this.setState({isBankNameValid: false});
      return;
    }

    if (this.state.toCurrency == 'gbp') {
      if (this.state.sortcode == '') {
        this.setState({isSortCodeValid: false});
        return;
      }
      else if(this.state.sortcode == '77 49 26'){
        this.setState(
          {isSortCodeVirtual: false});
        return;
      }

      if (this.state.accountNumber == '') {
        this.setState({isAccountNumberValid: false});
        return;
      }
    }

    if (this.state.toCurrency == 'idr') {
      if (this.bankAccountNumber.current.value == '') {
        this.setState({isBankAccountNumberValid: false});
        return;
      }
    }

    if (this.state.toCurrency == 'eur' || this.state.toCurrency == 'usd' || this.state.toCurrency == 'aud') {
      if (this.iban.current.value == '') {
        this.setState({isIBANValid: false});
        return;
      }

      if (this.swift.current.value == '') {
        this.setState({isSWIFTValid: false});
        return;
      }
    }

    this.props.saveValues(data);
    this.props.nextStep();
  }

  updateSortcode(value) {
    this.setState({sortcode: value.formattedValue});
  }

  updateAccountNumber(value) {
    this.setState({accountNumber: value.formattedValue});
  }

  checkName(e) {
    if (e.target.value == '') {
      this.setState({isNameValid: false})
    } else {
      this.setState({isNameValid: true})
    }
  }

  checkEmail(e) {
    if (e.target.value == '') {
      this.setState({isEmailValid: false})
    } else {
      if (this.validateEmail(e.target.value)) {
        this.setState({isEmailValid: true})
      } else {
        this.setState({isEmailValid: false})
      }
    }
  }

  checkBankName(e) {
    if (e.target.value == '') {
      this.setState({isBankNameValid: false})
    } else {
      this.setState({isBankNameValid: true})
    }
  }

  checkBankAccountNumber(e) {
    if (e.target.value == '') {
      this.setState({isBankAccountNumberValid: false})
    } else {
      this.setState({isBankAccountNumberValid: true})
    }
  }

  checkAccountNumber(e) {
    if (e.target.value == '') {
      this.setState({isAccountNumberValid: false})
    } else {
      this.setState({isAccountNumberValid: true})
    }
  }

  checkSortCodeValid(e) {
    if (e.target.value == '') {
      this.setState({isSortCodeValid: false})
    } else {
      this.setState({isSortCodeValid: true})
    }
  }

  checkIBAN(e) {
    if (e.target.value == '') {
      this.setState({isIBANValid: false})
    } else {
      this.setState({isIBANValid: true})
    }
  }

  checkSWIFT(e) {
    if (e.target.value == '') {
      this.setState({isSWIFTValid: false})
    } else {
      this.setState({isSWIFTValid: true})
    }
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  render() {
    return (
      <div>
        <h1>Recipient details</h1>
        <form className="form-container">
          <label htmlFor="fullname">Recipient's name</label><br/>
          <input
            type="text"
            id="fullname"
            className={this.state.isNameValid ? '' : 'error'}
            placeholder="Enter recipient's full name"
            ref={this.name}
            defaultValue={this.props.data.name}
            onBlur={this.checkName}/>
          <span className={this.state.isNameValid ? 'error-label-hidden' : 'error-label'}>Recipient's full name may not be empty.</span>

          <label htmlFor="email">( Optional )Purpose Of Transfer</label><br/>
          <select
              type="email"
              id="email"
              className="select-css"
              ref={this.email}
              defaultValue={this.props.data.email}>
              <option value="Buying Overseas Property">Buying Overseas Property</option>
              <option value="Paying for Overseas Tuition Fees">Paying for Overseas Tuition Fees</option>
              <option value="Overseas Investments">Overseas Investments</option>
              <option value="Sending Money to Friends or Family">Sending Money to Friends or Family</option>
              <option value="Paying for Living Cost">Paying for Living Cost</option>
              <option value="Supporting a Family Member Who is Travelling Overseas">Supporting a Family Member Who is Travelling Overseas</option>
              <option value="Paying for Wedding Abroad">Paying for Wedding Abroad</option>
              <option value="Overseas Mortgage Payments">Overseas Mortgage Payments</option>
              <option value="Paying For Work to be Completed Overseas">Paying For Work to be Completed Overseas</option>
              <option value="Paying For Bills Overseas">Paying For Bills Overseas</option>
              <option value="others">Others</option>
            </select>
    {/*
          <input
            type="email"
            id="email"
            placeholder="name@example.com"
            ref={this.email}
            defaultValue={this.props.data.email}/>
            */}
    
          {/*<span className={this.state.isEmailValid ? 'error-label-hidden' : 'error-label'}>Email address is not valid.</span>*/}
          {
          // <input
          //   type="email"
          //   id="email"
          //   className={this.state.isEmailValid ? '' : 'error'}
          //   placeholder="name@example.com"
          //   ref={this.email}
          //   defaultValue={this.props.data.email}
          //   onBlur={this.checkEmail}/>
          // <span className={this.state.isEmailValid ? 'error-label-hidden' : 'error-label'}>Email address is not valid.</span>
          }

          <label htmlFor="bank">Bank Name</label><br/>
          <input
            type="text"
            id="bank"
            placeholder={this.state.toCurrency == 'idr' ? "Enter recipient's bank name ( E.g. : BCA )" : "Enter recipient's bank name"}
            ref={this.bankName}
            defaultValue={this.props.data.bankName}
            onBlur={this.checkBankName}/>
          <span className={this.state.isBankNameValid ? 'error-label-hidden' : 'error-label'}>Bank name may not be empty.</span>
          <span className={this.state.isBankNameVirtual ? 'error-label-hidden' : 'error-label'}>We can not send money to Digital Bank Account.</span>
    
          <div className={this.state.toCurrency == 'gbp' ? 'div-show' : 'div-hide'}>
            <label htmlFor="sortcode">Sort code</label><br/>
            <NumberFormat
              type="tel"
              id="sortcode"
              placeholder="00 00 00"
              ref={this.sortcode}
              defaultValue={this.props.data.accountNumber}
              format="## ## ##"
              onBlur={this.checkSortCodeValid}
              onValueChange={this.updateSortcode} />
            <span className={this.state.isSortCodeValid ? 'error-label-hidden' : 'error-label'}>Sort code may not be empty.</span>
            <span className={this.state.isSortCodeVirtual ? 'error-label-hidden' : 'error-label'}>Sorry we cannot identify this sort code.</span>

            {/*
              <input
                type="tel"
                id="sortcode"
                placeholder="000000"
                ref={this.sortCode}
                defaultValue={this.props.data.accountNumber}/>
              */}


            <label htmlFor="account">Account Number</label><br/>
            <NumberFormat
              type="tel"
              id="account"
              placeholder="00000000"
              ref={this.accountNumber}
              defaultValue={this.props.data.accountNumber}
              format="########"
              onBlur={this.checkAccountNumber}
              onValueChange={this.updateAccountNumber}  />
            <span className={this.state.isAccountNumberValid ? 'error-label-hidden' : 'error-label'}>Account number may not be empty.</span>
            {/*
              <input
                />
              */}

          </div>

          <div className={this.state.toCurrency == 'idr'
                            || this.state.toCurrency == 'myr'
                            || this.state.toCurrency == 'krw'
                            || this.state.toCurrency == 'hkd'? 'div-show' : 'div-hide'}>
            <label htmlFor="account">Account Number</label><br/>
            <input
              type="tel"
              id="account"
              placeholder="Enter account number"
              ref={this.bankAccountNumber}
              defaultValue={this.props.data.bankAccountNumber}
              onBlur={this.checkBankAccountNumber}/>
            <span className={this.state.isBankAccountNumberValid ? 'error-label-hidden' : 'error-label'}>Account number may not be empty.</span>
          </div>

          <div className={this.state.toCurrency == 'eur' || this.state.toCurrency == 'usd' || this.state.toCurrency == 'aud' ? 'div-show' : 'div-hide'}>
            <label htmlFor="iban">IBAN</label><br/>
            <input
              type="text"
              id="iban"
              placeholder="Enter IBAN"
              ref={this.iban}
              defaultValue={this.props.data.iban}
              onBlur={this.checkIBAN}/>
            <span className={this.state.isIBANValid ? 'error-label-hidden' : 'error-label'}>IBAN may not be empty.</span>

            <label htmlFor="iban">SWIFT</label><br/>
            <input
              type="text"
              id="swift"
              placeholder="Enter SWIFT"
              ref={this.swift}
              defaultValue={this.props.data.swift}
              onBlur={this.checkIBAN}/>
            <span className={this.state.isSWIFTValid ? 'error-label-hidden' : 'error-label'}>SWIFT may not be empty.</span>
          </div>


          <Link href="">
            <a className="btn-primary" onClick={this.saveAndContinue}>Continue</a>
          </Link>
        </form>
        <style jsx>{`
          /** DROP DOWN CSS **/
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
          /** END OF DROP DOWN CSS **/
          .div-show {
            display: block;
          }

          .div-hide {
            display: none;
          }

          h1 {
            text-align:center;
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

          ::placeholder {
            color: #CACACA;
          }

          .btn-primary {
            width: 100%;
            padding: 15px 0;
          }
        `}</style>
      </div>
    )
  }
}

export default Recipient;
