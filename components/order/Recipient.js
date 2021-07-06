import styled from "styled-components";
import NumberFormat from 'react-number-format';
import 'react-tabs/style/react-tabs.css';
import { API } from '../../config';
import axios from 'axios';
import { getCookie } from '../../utils/cookie';

const Row = styled.div`
  display: flex;
  width: 100%;

  @media only screen and (max-width: 800px) {
    flex-direction: column-reverse;
  }
`;

const Column = styled.div`
  padding: 10px;
`

const RecipientContainer = styled.div `
  background: #FFFFFF;
  border: 0.5px solid #B4B4B4;
  box-sizing: border-box;
  border-radius: 16px;
  padding: 10px 30px 30px 30px;
  max-width: 495px;
  margin: 0px 25px 0px 25px;

  @media only screen and (max-width: 1000px) {
    min-width: 420px;
    margin: 0px 10px 0px 10px;
  }

  @media only screen and (max-width: 800px) {
    min-width: 300px;
    max-width: 495px;
    margin: 0px 15px 0px 15px;
    padding: 10px 20px 30px 20px;
  }
`;

const AmountContainer = styled.div `
  background: #FFFFFF;
  margin: 0px 25px 0px 25px;
  min-width: 392px;

  @media only screen and (max-width: 1000px) {
    min-width: 300px;
    max-width: 392px;
    margin: 0px 10px 0px 10px;
  }

  @media only screen and (max-width: 800px) {
    max-width: 495px;
    margin: 0px 15px 0px 15px;
  }
`;

const RecipientTitle = styled.h3 `
  font-size: 20px;
  margin-bottom: 10px;
`;

const RecipientDetails = styled.p`
  color: #626B79;
`;

const RecipientField = styled.div`
  margin-bottom: 10px;

  ${({ hide }) => hide && `
    display: none;
  `}
`;

const RecipientLabel = styled.label`
  font-size: 12px;
  color: #626B79;
  transition: 0.2s;

  ${({ active }) => active && `
    color: #068EC8;
  `}

  ${({ iserror }) => iserror && `
    color: #F80202;
  `}
`;

const RecipientInput = styled.input`
  background: #FFFFFF;
  border: 1px solid #E2E2E2;
  border-radius: 4px;
  width: 95%;
  height: 48px;
  font-size: 16px;
  color: #232933;
  padding-left: 5%;
  transition: 0.2s linear;

  &:focus{
    outline: none;
  }

  ${({ active }) => active && `
    box-shadow: 0 0 0 2px #068EC8;
  `}

  ${({ iserror }) => iserror && `
    box-shadow: 0 0 0 2px #F80202;
  `}
`;

const RecipientInputNumber = styled(NumberFormat)`
  background: #FFFFFF;
  border: 1px solid #E2E2E2;
  border-radius: 4px;
  width: 95%;
  height: 48px;
  font-size: 16px;
  color: #232933;
  padding-left: 5%;
  transition: 0.2s linear;

  &:focus{
    outline: none;
  }

  ${({ active }) => active && `
    box-shadow: 0 0 0 2px #068EC8;
  `}

  ${({ iserror }) => iserror && `
    box-shadow: 0 0 0 2px #F80202;
  `}
`;

const RecipientInputSelect = styled.select`
  font-family: "Avenir LT Pro", sans-serif; 
  background: #FFFFFF;
  border: 1px solid #E2E2E2;
  border-radius: 4px;
  width: 100%;
  height: 48px;
  font-size: 16px;
  color: #232933;
  padding-left: 5%;
  transition: 0.2s linear;

  &:focus{
    box-shadow: 0 0 0 2px #068EC8;
    outline: none;
  }

  option{
    padding-bottom: 3px;
    white-space: pre;
  }
`;

const ErrorLabel = styled.span`
  font-size: 12px;
  color: #F80202;

  ${({ hide }) => hide && `
    display: none;
  `}
`;

const TransactionTitle = styled.div `
  font-size: 16px;
  font-weight: bolder;
  border: 0.5px solid #B4B4B4;
  border-radius: 4px 4px 0px 0px;
  padding: 20px;
`;

const TransItemContainer = styled.div`
  padding: 10px 20px 10px 20px ;
  border: 0.5px solid #B4B4B4;
  border-top: 0px;
  display: flex;
  flex-direction: column;
`;

const TransItemRow = styled.div`
  display: flex;
  padding: 2.5px 0px 2.5px;
`;

const TransColumn = styled.span`
  flex-basis: ${props => props.left ? '60%' : '40%'};
  text-align: ${props => props.left ? 'left' : 'right'};
  color: ${props => props.left ? '#9A9A9A' : '#232933;'};
  font-weight: ${props => props.left ? 'normal' : 'bolder;'};


  >.grey{
    color: '#9A9A9A';
  }
`

const ButtonContainer = styled.div`
  padding-top: 40px;
`;

const Button = styled.button`
  border: 1px solid #009FE3;
  border-radius: 4px;

  width: 100%;
  height: 50px;
  font-size: 16px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 24px;
  margin-bottom: 10px;
  transition: 0.2s;

  background-color: ${props => props.secondary ? 'white' : '#009FE3'};
  color: ${props => props.secondary ? '#009FE3' : 'white'};

`;

class Recipient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeElement: '',
      isNameValid: true,
      isEmailValid: true,
      isBankNameValid: true,
      isBankNameVirtual: true,
      isBankAccountNumberValid: true,
      isAccountNumberValid: true,
      isSortCodeValid: true,
      isSortCodeVirtual: true,
      isSortCodeLength: true,
      isIBANValid: true,
      isRecipientSelected: true,
      isPurposeTransferSelected: true,
      isRoutingNumberValid: true,
      isRoutingNumberLength: true,
      isBsbCodeValid: true,
      toCurrency: '',
      recipientType: 0, // 0 = new, 1 = existing
      recipients: {
        docs: [
          {
            name: 'loading', bankAccountNumber: 'loading'
          }
        ]
      },
      selectedRecipient: null,
      isSaveRecipient: false
    };

    this.name = React.createRef();
    this.email = React.createRef();
    this.bankName = React.createRef();
    this.bankAccountNumber = React.createRef();
    this.iban = React.createRef();
    this.sortcode = React.createRef();
    this.accountNumber = React.createRef();
    this.bsbCode = React.createRef();
    this.routingNumber = React.createRef();
    this.purposeTransfer = React.createRef();

    this.checkName = this.checkName.bind(this);
    this.checkEmail = this.checkEmail.bind(this);
    this.checkBankNameVirtual = this.checkBankNameVirtual.bind(this);
    this.checkBankName = this.checkBankName.bind(this);
    this.checkBankAccountNumber = this.checkBankAccountNumber.bind(this);
    this.checkAccountNumber = this.checkAccountNumber.bind(this);
    this.checkSortCodeVirtual = this.checkSortCodeVirtual.bind(this);
    this.checkSortCodeValid = this.checkSortCodeValid.bind(this);
    this.checkIBAN = this.checkIBAN.bind(this);
    this.checkBsbCode = this.checkBsbCode.bind(this);
    this.checkRoutingNumber = this.checkRoutingNumber.bind(this);
    this.updateSortcode = this.updateSortcode.bind(this);
    this.updateAccountNumber = this.updateAccountNumber.bind(this);
    this.updateBsbCode = this.updateBsbCode.bind(this);
    this.updateRoutingNumber = this.updateRoutingNumber.bind(this);

    this.updateActiveElement = this.updateActiveElement.bind(this);
    this.updateDeactiveElement = this.updateDeactiveElement.bind(this);

    axios.get(`${API}/recipient?uid=${getCookie('_id')}&currency=${this.props.data.toCurrency.toUpperCase()}`, {
      headers: {
        'Authorization': 'Bearer ' + getCookie('token') 
      }
    })
    .then((response) => {
      this.setState({recipients: response.data.order_data_array})
    })
    .catch((iserror) => {
      throw new Error(iserror);
    });
  }

  componentDidMount() {
    this.setState({toCurrency: this.props.data.toCurrency});

    this.sortcode.current.value = this.props.data.sortcode
    this.accountNumber.current.value = this.props.data.accountNumber
    this.bsbCode.current.value = this.props.data.bsbCode
    this.routingNumber.current.value = this.props.data.routingNumber
  }

  saveAndContinue = (e) => {
    e.preventDefault();
    let validAll = true;
      var data = {
        email: this.email.current.value ? this.email.current.value : "-",
        name: this.name.current.value,
        bankName: this.bankName.current.value,
        bankAccountNumber: this.bankAccountNumber.current.value,
        sortcode: this.sortcode.current.value ? this.sortcode.current.value : null,
        accountNumber: this.accountNumber.current.value ? this.accountNumber.current.value : null,
        iban: this.iban.current.value ? this.iban.current.value : null,
        bsbCode: this.bsbCode.current.value ?  this.bsbCode.current.value : null,
        routingNumber: this.routingNumber.current.value ?  this.routingNumber.current.value : null,
        purposeTransfer: this.purposeTransfer.current.value ? this.purposeTransfer.current.value : null,
        isSaveRecipient: this.state.isSaveRecipient
      }
  
      if (this.name.current.value == '') {
        this.setState({isNameValid: false});
        validAll = false;
      }

      if(this.checkBankNameVirtual() == false){
        validAll = false;
      }
     
      if (!this.bankName.current.value) {
        this.setState({isBankNameValid: false});
        validAll = false;
      }

      if (!this.bankAccountNumber.current.value) {
        this.setState({isBankAccountNumberValid: false});
        validAll = false;
      }

      if (!this.accountNumber.current.value) {
        if (['gbp', 'usd', 'idr', 'myr', 'krw','sgd', 'hkd'].includes(this.state.toCurrency)) {
          this.setState({isAccountNumberValid: false});
          validAll = false;
        }
      }
  
      if (this.state.toCurrency == 'gbp') {
        if(!this.sortcode.current.value){
          this.setState({isSortCodeValid: false});
          validAll = false;
        }
        else if(this.checkSortCodeValid() == false){
          validAll = false;
        }
      }
  
      if (this.state.toCurrency == 'eur') {
        if (!this.iban.current.value) {
          this.setState({isIBANValid: false});
          validAll = false;
        }
      }

      if (this.state.toCurrency == 'usd') {
        if(!this.routingNumber.current.value){
          this.setState({isRoutingNumberValid: false});
          validAll = false;
        }
        else if(this.checkRoutingNumber() == false){
          validAll = false;
        }
      }

      if (this.state.toCurrency == 'aud') {
        if (!this.bsbCode.current.value) {
          this.setState({isBsbCodeValid: false});
          validAll = false;
        }
      }
      
      if(validAll){
        this.props.saveValues(data);
        this.props.nextStep();
      }
      else{
        return;
      }
    }

  updateSortcode(value) {
    this.sortcode.current.value = value.formattedValue
  }

  updateAccountNumber(value) {
    this.accountNumber.current.value = value.formattedValue
  }

  updateBsbCode(value) {
    this.bsbCode.current.value = value.formattedValue
  }

  updateRoutingNumber(value) {
    this.routingNumber.current.value = value.formattedValue
  }

  checkName(){
    if (!this.name.current.value) {
      this.setState({isNameValid: false})
    } else {
      this.setState({isNameValid: true})
    }
    this.updateDeactiveElement();
  }

  checkEmail(){
    if (this.email.current.value == '') {
      this.setState({isEmailValid: true})
    } else {
      if (this.validateEmail(this.email.current.value)) {
        this.setState({isEmailValid: true})
      } else {
        this.setState({isEmailValid: false})
      }
    }
    this.updateDeactiveElement();
  }

  checkBankNameVirtual(){
    if(
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
    ){
      this.setState({isBankNameVirtual: false});
      return false;
    }
    else{
      this.setState({isBankNameVirtual: true});
      return true;
    }
  }
  
  checkBankName(){
    if (!this.bankName.current.value) {
      this.setState({isBankNameValid: false})
    } else {
      this.setState({isBankNameValid: true})
    }

    this.checkBankNameVirtual();
    this.updateDeactiveElement();
  }

  checkBankAccountNumber(){
    if (!this.bankAccountNumber.current.value) {
      this.setState({isBankAccountNumberValid: false})
    } else {
      this.setState({isBankAccountNumberValid: true})
    }
    this.updateDeactiveElement();
  }

  checkAccountNumber(){
    if (!this.accountNumber.current.value) {
      this.setState({isAccountNumberValid: false})
    } else {
      this.setState({isAccountNumberValid: true})
    }
    this.updateDeactiveElement();
  }

  checkSortCodeVirtual(){
    if(this.sortcode.current.value == '77 49 26'){
      this.setState({isSortCodeVirtual: false});
      return false;
    }
    else{
      this.setState({isSortCodeVirtual: true});
      return true;
    }
  }

  checkSortCodeValid(){
    let sortcodeTemp = '';
    if (!this.sortcode.current.value) {
      this.setState({isSortCodeValid: false})
    } else {
      this.setState({isSortCodeValid: true})
      sortcodeTemp = (this.sortcode.current.value).replace(/\s/g, '');
    }

    if(sortcodeTemp.length < 6 && sortcodeTemp.length > 0){
      this.setState({isSortCodeLength: false})
      this.updateDeactiveElement();
      return false;
    } else {
      this.setState({isSortCodeLength: true})
    }

    this.checkSortCodeVirtual();
    this.updateDeactiveElement();
  }

  checkIBAN(){
    if (!this.iban.current.value) {
      this.setState({isIBANValid: false})
    } else {
      this.setState({isIBANValid: true})
    }
    this.updateDeactiveElement();
  }

  checkBsbCode(){
    if (!this.bsbCode.current.value) {
      this.setState({isBsbCodeValid: false})
    } else {
      this.setState({isBsbCodeValid: true})
    }
    this.updateDeactiveElement();
  }

  checkRoutingNumber(){
    let routingNumberTemp = '';
    if (!this.routingNumber.current.value) {
      this.setState({isRoutingNumberValid: false})
    }
    else {
      this.setState({isRoutingNumberValid: true})
      routingNumberTemp = this.routingNumber.current.value.replace(/\s/g, '');
    }

    if(routingNumberTemp.length < 9 && routingNumberTemp.length > 0){
      this.setState({isRoutingNumberLength: false})
      this.updateDeactiveElement();
      return false;
    }
    else{
      this.setState({isRoutingNumberLength: true})
    }

    this.updateDeactiveElement();
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  selectExisting(data, key) {
    var data = {
      email: data.email,
      name: data.name,
      bankName: data.bankName,
      bankAccountNumber: data.bankAccountNumber,
      sortcode: data.sortcode ? data.sortcode : null,
      accountNumber: data.accountNumber ? data.accountNumber : null,
      routingNumber: data.routingNumber ? data.routingNumber : null,
      bsbCode: data.bsbCode ? data.bsbCode : null,
      iban: data.iban ? data.iban : null,
      purposeTransfer: data.purposeTransfer ? data.purposeTransfer : null
    }

    this.props.saveValues(data);

    if(this.state.selectedRecipient == key) {
      this.setState({
        selectedRecipient: null
      });
    } else {
      this.setState({
        selectedRecipient: key
      });
    }
  }

  goBack = (e) => {
    e.preventDefault();
    var data = {
      email: this.email.current.value ? this.email.current.value : "-",
      name: this.name.current.value,
      bankName: this.bankName.current.value,
      bankAccountNumber: this.bankAccountNumber.current.value,
      sortcode: this.sortcode.current.value ? this.sortcode.current.value : null,
      accountNumber: this.accountNumber.current.value ? this.accountNumber.current.value : null,
      iban: this.iban.current.value ? this.iban.current.value : null,
      bsbCode: this.bsbCode.current.value ? this.bsbCode.current.value : null,
      routingNumber: this.routingNumber.current.value ? this.routingNumber.current.value : null,
      purposeTransfer: this.purposeTransfer.current.value ? this.purposeTransfer.current.value : null,
      isSaveRecipient: this.state.isSaveRecipient
    }

    this.props.saveValues(data);
    this.props.previousStep();
  }

  checkSaveRecipient = () => {
    this.setState({isSaveRecipient : !this.state.isSaveRecipient})
  }

  updateActiveElement= () => {
    this.setState({activeElement : document.activeElement.id});
  }

  updateDeactiveElement = () => {
    this.setState({activeElement : ''});
  }

  render() {
    return (
      <div>
      <Row>
        <Column left>
          <RecipientContainer>
            <RecipientTitle>Recipient Details</RecipientTitle>
            <RecipientDetails>Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt</RecipientDetails>
            
            <RecipientField>
              <RecipientLabel active = {this.state.activeElement == 'email'} iserror={!this.state.isEmailValid}>Email</RecipientLabel>
              <RecipientInput 
                iserror={!this.state.isEmailValid}
                active={this.state.activeElement=='email'}
                type="email" 
                id="email"
                placeholder="e.g. johndoe@gmail.com"
                ref={this.email}
                defaultValue={this.props.data.email}
                onFocus={this.updateActiveElement}
                onBlur={this.checkEmail}/>
              <ErrorLabel hide={this.state.isEmailValid}>Email address is not valid.</ErrorLabel>
            </RecipientField>

            <RecipientField>
              <RecipientLabel active = {this.state.activeElement == 'bankName'} iserror={!this.state.isBankNameValid || !this.state.isBankNameVirtual}>Bank Name</RecipientLabel>
              <RecipientInput 
                iserror={!this.state.isBankNameValid || !this.state.isBankNameVirtual}
                active = {this.state.activeElement == 'bankName'}
                type="text" 
                id="bankName"
                placeholder="e.g. BCA"
                ref={this.bankName}
                defaultValue={this.props.data.bankName}
                onFocus={this.updateActiveElement}
                onBlur={this.checkBankName}/>
              <ErrorLabel hide={this.state.isBankNameValid}>Bank name may not be empty.</ErrorLabel>
              <ErrorLabel hide={this.state.isBankNameVirtual}>We can not send money to Digital Bank Account.</ErrorLabel>
            </RecipientField>

            <RecipientField>
              <RecipientLabel active = {this.state.activeElement == 'bankAccount'} iserror={!this.state.isBankAccountNumberValid}>Bank Account Name</RecipientLabel>
              <RecipientInput 
                iserror={!this.state.isBankAccountNumberValid}
                active = {this.state.activeElement == 'bankAccount'}
                type="text" 
                id="bankAccount"
                placeholder="e.g. John Doe"
                ref={this.bankAccountNumber}
                defaultValue={this.props.data.bankAccountNumber}
                onFocus={this.updateActiveElement}
                onBlur={this.checkBankAccountNumber}/>
              <ErrorLabel hide={this.state.isBankAccountNumberValid}>Bank account name may not be empty.</ErrorLabel>
            </RecipientField>

            <RecipientField>
              <RecipientLabel active = {this.state.activeElement == 'name'} iserror={!this.state.isNameValid}>Recipient's Name</RecipientLabel>
              <RecipientInput 
                iserror={!this.state.isNameValid}
                active = {this.state.activeElement == 'name'}
                type="text" 
                id="name"
                placeholder="e.g. John Doe Taslim"
                ref={this.name}
                defaultValue={this.props.data.name}
                onFocus={this.updateActiveElement}
                onBlur={this.checkName}/>
              <ErrorLabel hide={this.state.isNameValid}>Recipient's full name may not be empty.</ErrorLabel>
            </RecipientField>

            <RecipientField hide={!(this.state.toCurrency == 'idr'
                                  || this.state.toCurrency == 'myr'
                                  || this.state.toCurrency == 'krw'
                                  || this.state.toCurrency == 'hkd' 
                                  || this.state.toCurrency == 'gbp'
                                  || this.state.toCurrency == 'sgd' 
                                  || this.state.toCurrency == 'usd')}>
              <RecipientLabel active = {this.state.activeElement == 'account'} iserror={!this.state.isAccountNumberValid}>Bank account number</RecipientLabel>
              <RecipientInputNumber
                iserror={!this.state.isAccountNumberValid}
                active = {this.state.activeElement == 'account'}
                type="tel" 
                allowNegative={false}
                allowLeadingZeros={true}
                id="account"
                placeholder="e.g. 3459226721"
                ref={this.accountNumber}
                defaultValue={this.props.data.accountNumber}
                onValueChange={this.updateAccountNumber}
                onFocus={this.updateActiveElement}
                onBlur={this.checkAccountNumber}/>
              <ErrorLabel hide={this.state.isAccountNumberValid}>Bank account number may not be empty.</ErrorLabel>
            </RecipientField>

            <RecipientField hide={this.state.toCurrency != 'gbp'}>
              <RecipientLabel active = {this.state.activeElement == 'sortcode'} iserror={!this.state.isSortCodeValid || !this.state.isSortCodeVirtual || !this.state.isSortCodeLength}>Sort code</RecipientLabel>
              <RecipientInputNumber
                iserror={!this.state.isSortCodeValid || !this.state.isSortCodeVirtual || !this.state.isSortCodeLength}
                active = {this.state.activeElement == 'sortcode'}
                type="tel" 
                id="sortcode"
                placeholder="e.g. 02 32 24"
                ref={this.sortcode}
                defaultValue={this.props.data.sortcode}
                format="## ## ##"
                onValueChange={this.updateSortcode}
                onFocus={this.updateActiveElement}
                onBlur={this.checkSortCodeValid}/>
              <ErrorLabel hide={this.state.isSortCodeValid}>Sort code may not be empty.</ErrorLabel>
              <ErrorLabel hide={this.state.isSortCodeVirtual}>Sorry we cannot identify this sort code.</ErrorLabel>
              <ErrorLabel hide={this.state.isSortCodeLength}>Sort code is not valid.</ErrorLabel>
            </RecipientField>

            <RecipientField hide={this.state.toCurrency != 'eur'}>
              <RecipientLabel active = {this.state.activeElement == 'iban'} iserror={!this.state.isIBANValid}>IBAN</RecipientLabel>
              <RecipientInput
                iserror={!this.state.isIBANValid}
                active = {this.state.activeElement == 'iban'}
                type="text" 
                id="iban"
                placeholder="e.g. NO 93 8601 1117947"
                ref={this.iban}
                defaultValue={this.props.data.iban}
                onFocus={this.updateActiveElement}
                onBlur={this.checkIBAN}/>
              <ErrorLabel hide={this.state.isIBANValid}>IBAN may not be empty.</ErrorLabel>
            </RecipientField>

            <RecipientField hide={this.state.toCurrency != 'aud'}>
              <RecipientLabel active = {this.state.activeElement == 'bsbCode'} iserror={!this.state.isBsbCodeValid}>BSB Code</RecipientLabel>
              <RecipientInputNumber
                iserror={!this.state.isBsbCodeValid}
                active = {this.state.activeElement == 'bsbCode'}
                type="tel" 
                id="bsbCode"
                allowNegative={false}
                allowLeadingZeros={true}
                placeholder="e.g. 033547"
                ref={this.bsbCode}
                defaultValue={this.props.data.bsbCode}
                onValueChange={this.updateBsbCode}
                onFocus={this.updateActiveElement}
                onBlur={this.checkBsbCode}/>
              <ErrorLabel hide={this.state.isBsbCodeValid}>BSB Code may not be empty.</ErrorLabel>
            </RecipientField>

            <RecipientField hide={this.state.toCurrency != 'usd'}>
              <RecipientLabel active = {this.state.activeElement == 'routingNumber'} iserror={!this.state.isRoutingNumberValid || !this.state.isRoutingNumberLength}>Routing number</RecipientLabel>
              <RecipientInputNumber
                iserror={!this.state.isRoutingNumberValid || !this.state.isRoutingNumberLength}
                active = {this.state.activeElement == 'routingNumber'}
                type="tel" 
                id="routingNumber"
                placeholder="e.g. 122105155"
                format="#########"
                ref={this.routingNumber}
                defaultValue={this.props.data.routingNumber}
                onValueChange={this.updateRoutingNumber}
                onFocus={this.updateActiveElement}
                onBlur={this.checkRoutingNumber}/>
              <ErrorLabel hide={this.state.isRoutingNumberValid}>Routing number may not be empty.</ErrorLabel>
              <ErrorLabel hide={this.state.isRoutingNumberLength}>Routing number is not valid.</ErrorLabel>
            </RecipientField>

            <RecipientField>
              <RecipientLabel active = {this.state.activeElement == 'purposeTransfer'}>Purpose of transfer</RecipientLabel>
              <RecipientInputSelect
                id="purposeTransfer"
                ref={this.purposeTransfer}
                defaultValue={this.props.data.purposeTransfer}
                onFocus={this.updateActiveElement}
                onBlur={this.updateDeactiveElement}>
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
              </RecipientInputSelect>
            </RecipientField>

            <ButtonContainer>
              <Button onClick={this.saveAndContinue}>Continue</Button>
              <Button secondary onClick={this.goBack}>Previous</Button>
            </ButtonContainer>
          </RecipientContainer>
        </Column>
        <Column right>
          <AmountContainer>
            <TransactionTitle>Transaction Details</TransactionTitle>
            <TransItemContainer>
              <TransItemRow>
                <TransColumn left>
                  You send
                </TransColumn> 
                <TransColumn right>
                  {this.props.data.fromCurrency.toUpperCase()} <NumberFormat displayType={'text'} decimalScale={2} thousandSeparator={true} value={this.props.data.fromAmount} />
                </TransColumn>
              </TransItemRow>
            </TransItemContainer>

            <TransItemContainer>
              <TransItemRow>
                <TransColumn left>
                  Amount to be exchange
                </TransColumn> 
                <TransColumn right style={{color: '#9A9A9A'}}>
                  {this.props.data.fromCurrency.toUpperCase()} <NumberFormat displayType={'text'} decimalScale={2} thousandSeparator={true} value={this.props.data.fromAmount} />
                </TransColumn>
              </TransItemRow>
            
              <TransItemRow>
                <TransColumn left>
                  Exchange rate
                </TransColumn> 
                <TransColumn right style={{color: '#9A9A9A'}}>
                  <NumberFormat displayType={'text'} thousandSeparator={true} decimalScale={2} value={this.props.data.rate}/>
                </TransColumn>
              </TransItemRow>
            </TransItemContainer>

            <TransItemContainer>
              <TransItemRow>
                <TransColumn left>
                  Transfer out fee
                </TransColumn> 
                <TransColumn right>
                  0
                </TransColumn>
              </TransItemRow>
              <TransItemRow>
                <TransColumn left>
                  Recipient Gets
                </TransColumn> 
                <TransColumn right>
                  {this.props.data.toCurrency.toUpperCase()} <NumberFormat  displayType={'text'} decimalScale={2} thousandSeparator={true} value={this.props.data.toAmount} />
                </TransColumn>
              </TransItemRow>
            </TransItemContainer>
          </AmountContainer>
        </Column>
      </Row>
      </div>
    )
  }
}

export default Recipient;
