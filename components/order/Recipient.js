import Link from 'next/link';
import NumberFormat from 'react-number-format';

class Recipient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNameValid: true,
      isEmailValid: true,
      isBankNameValid: true,
      isBankAccountNumberValid: true,
      isAccountNumberValid: true,
      isSortCodeValid: true,
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

    if (this.bankName.current.value == '') {
      this.setState({isBankNameValid: false});
      return;
    }

    if (this.state.toCurrency == 'gbp') {
      if (this.state.sortcode == '') {
        this.setState({isSortCodeValid: false});
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

          <label htmlFor="email">( Optional ) Recipient's email address</label><br/>
          <input
            type="email"
            id="email"
            placeholder="name@example.com"
            ref={this.email}
            defaultValue={this.props.data.email}/>
          <span className={this.state.isEmailValid ? 'error-label-hidden' : 'error-label'}>Email address is not valid.</span>
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
