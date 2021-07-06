import styled from "styled-components";
import NumberFormat from 'react-number-format';

const Row = styled.div`
  display: flex;
  width: 100%;

  @media only screen and (max-width: 800px) {
    flex-direction: column;
  }
`;

const Column = styled.div`
  padding: 10px;
`;

const PaymentContainer = styled.div `
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

const PolicyContainer = styled.div `
  background: #FFFFFF;
  margin: 0px 25px 0px 25px;
  min-width: 392px;
  max-width: 392px;
  border: 0.5px solid #009FE3;
  border-radius: 4px;
  color: #9A9A9A;

  @media only screen and (max-width: 1000px) {
    min-width: 300px;
    margin: 0px 10px 0px 10px;
  }

  @media only screen and (max-width: 800px) {
    max-width: 495px;
    margin: 0px 15px 0px 15px;
  }
`;

const PaymentTitle = styled.h3 `
  font-size: 20px;
  margin-bottom: 10px;
`;

const PaymentDetails = styled.p`
  color: #626B79;
`;

const PolicyTitle = styled.div `
  background: #009FE3;
  font-size: 20px;
  border-radius: 4px 4px 0px 0px;
  padding: 20px;
  color: white;
`;

const PolicyContent = styled.div`
  font-size: 16px;
  padding: 20px;

  >.link{
    color: #009FE3;
  }
`;

const AmountContainer = styled.div`
  background: #1E345B;
  color: white;
  margin: 20px -30px 30px -30px;
  padding: 0px 20px 0px 20px; 


  @media only screen and (max-width: 800px) {
    margin: 20px -20px 30px -20px;
  }
`;

const BankDetailContainer = styled.div`
  background: #009FE3;
  color: white;
  padding: 0px 5px 0px 5px; 
  margin-bottom: 5px;

  @media only screen and (max-width: 800px) {
    font-size: 14px;
  }
`;

const PaymentDetailContainer = styled.div`
  background: #F39200;
  color: white;
  padding: 5px 15px 5px 15px; 
`;

const ItemContainer = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 800px) {
    padding: 15px 8px 15px 8px ;
  }
`;

const ItemRow = styled.div`
  display: flex;
  padding: 2.5px 0px 2.5px;
  
  ${({ hide }) => hide && `
    display: none;
  `}
`;

const AmountColumn = styled.span`
  color: white;
  padding-top: ${props => props.left ? '4.75px' : '2.5px'};
  flex-basis: ${props => props.left ? '60%' : '40%'};
  text-align: ${props => props.left ? 'left' : 'right'};
  font-size: ${props => props.left ? '16px' : '20px'};
  font-family: ${props => props.left ? 'Avenir LT Pro' : 'Avenir LT Pro Black'};
`;


const BankDetailColumn = styled.span`
  color: white;
  font-size: 16px;
  padding-top: 2.5px;
  flex-basis: ${props => props.left ? '40%' : '60%'};
  text-align: ${props => props.left ? 'left' : 'right'};
  font-weight: ${props => props.left ? 'normal' : 'bolder'};
`;

const ButtonContainer = styled.div`
  padding-top: 20px;
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

const BankList = styled.ul`
  padding: 0;
  list-style: none;
`;

const RadioButton = styled.input.attrs({
  type: "radio",
})`
  height: 18px;
  width: 18px;
  cursor: pointer;
  background: black;
  border: 10px solid #90DDD0 !important;
  margin-right: 20px; 
  pointer-events: none;

`;

const BankItem = styled.li`
  display: flex;
  align-items: center;
  border: 0.5px solid #B4B4B4;
  padding: 15px;
  transition: all 0.2s ease;
  cursor: pointer;
  font-size: 16px;
  z-index: 1;

  ${({ active }) => active && `
    box-shadow: 0 0 1px 1px #068EC8;
    border-color: #068EC8;
    outline: none;
  `}

  >.bank-img{
    max-width: 85px;
    margin-right: 15px;
  }
`;

const BankDetail = styled.div`
  height: 0;
  overflow: hidden;
  background-color: #F6F8FB;
  text-align: left;
  transition: 0.5s ease-in-out;

  ${({ open }) => open && `
    height: auto;
    margin-top: 8px;
    margin-bottom: 8px;
  `}
`;

/* Render button based on payment method*/
function RenderButton(props){
  return(
    props.method == 'direct_transfer_via_email' ?
    <Button onClick={() => props.addOrder(props.method)}>Send payment instruction to email</Button>:
    <Button onClick={() => props.addOrder(props.method)}>Send Money</Button>
  )
}

/* Render one item of bank detail  */
function RenderBankDetail(props){
  return(
    <div>
      <BankDetailContainer>
          <ItemContainer>
            <ItemRow>
              <BankDetailColumn left>
                Bank Name
              </BankDetailColumn>
              <BankDetailColumn right>
                {props.bankName}
              </BankDetailColumn>
            </ItemRow>
            <ItemRow>
              <BankDetailColumn left>
                Account Name
              </BankDetailColumn>
              <BankDetailColumn right>
                Pelita Transfer Nusantara
              </BankDetailColumn>
            </ItemRow>
            <ItemRow>
              <BankDetailColumn left>
                Account Number
              </BankDetailColumn>
              <BankDetailColumn right>
                {props.accountNumber}
              </BankDetailColumn>
            </ItemRow>
          </ItemContainer>
        </BankDetailContainer>
        <PaymentDetailContainer>
          Please pay with your own bank account. If you are paying from different account, 
          your payment is considered invalid.
      </PaymentDetailContainer>
    </div>
  )
}

function RenderVaDetail(props){
  return(
    <div>
      <BankDetailContainer>
          <ItemContainer>
            <ItemRow>
              <BankDetailColumn left>
                Bank Name
              </BankDetailColumn>
              <BankDetailColumn right>
                {props.bankName}
              </BankDetailColumn>
            </ItemRow>
            <ItemRow>
              <BankDetailColumn left>
                VA Number
              </BankDetailColumn>
              <BankDetailColumn right>
                {props.vaNumber}
              </BankDetailColumn>
            </ItemRow>
          </ItemContainer>
        </BankDetailContainer>
        <PaymentDetailContainer>
          Please follow the instruction of your bank to transfer money into virtual account number
          and please pay with your own bank account. If you are paying from different account, 
          your payment is considered invalid.
      </PaymentDetailContainer>
    </div>
  )
}

class Pay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bankSelected: '',
      method: '',
      isVAgenerated: false,
      isTransferBCA: false,
      isTransferBNI: false,
      isTransferMandiri: false
    };

    this.generateVA = this.generateVA.bind(this);
    this.transferBank = this.transferBank.bind(this);
    this.addOrder = this.addOrder.bind(this);
  }

  generateVA(bankName) {
    this.props.generateVA(bankName);
  }

  transferBank(bankName) {
    this.setState({
      bankSelected: bankName,
      method: 'direct_transfer_via_' + bankName
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.data.vaNumber != prevProps.data.vaNumber) {
      this.setState({
        isVAgenerated: true
      });
    }
  }

  addOrder(method) {
    if(method != ''){
      this.props.saveValues({paymentMethod: method}).then(()=>{
        this.props.addOrder();
      })
      this.props.nextStep();
    }
    else{
      alert("Please select the bank")
    }
  }

  render() {
    let content;
    let button;

    if (this.props.data.fromCurrency != 'idr') {
      content = <p>We will send payment instruction to your email. Confirm by clicking the button below</p>;
      button = <RenderButton data={this.props.data} addOrder = {this.addOrder} method='direct_transfer_via_email'/>
    } else {
      if (this.state.isVAgenerated) {
        content = <VAGenerated vaNumber={this.props.data.vaNumber} addOrder={this.addOrder}/>;
      } 
      else {  
        content = 
        <ItemContainer>
          <BankList>
            <BankItem 
              style={{borderRadius: '4px 4px 0px 0px'}} 
              active = {this.state.bankSelected == 'bni'} 
              onClick = {() => this.transferBank('bni')}>
                <RadioButton checked = {this.state.bankSelected == 'bni'}/>
                <img className='bank-img' src="../static/images/bank_logos/bni.png" alt="BNI"/>
                <span>Bank BNI</span>
            </BankItem>
            <BankDetail open = {this.state.bankSelected == 'bni'}>
              {this.props.data.vaNumber != 0 ? 
              <RenderVaDetail bankName={'BNI'} vaNumber={this.props.data.vaNumber}/> 
              : 
              <RenderBankDetail bankName={'BNI'} accountNumber={'07 5555 4711'}/>} 
            </BankDetail>

            <BankItem 
              style={{marginTop: '-0.5px'}} 
              active = {this.state.bankSelected == 'bca'} 
              onClick = {() => this.transferBank('bca')}>
                <RadioButton checked = {this.state.bankSelected == 'bca'}/>
                <img className='bank-img' src="../static/images/bank_logos/bca.png" alt="BCA"/>
                <span>Bank BCA</span>
            </BankItem>
            <BankDetail open = {this.state.bankSelected == 'bca'}>
              {this.props.data.vaNumber != 0 ? 
              <RenderVaDetail bankName={'BCA'} vaNumber={this.props.data.vaNumber}/> 
              : 
              <RenderBankDetail bankName={'BCA'} accountNumber={'206 37 555 67'}/> } 
            </BankDetail>

            <BankItem 
              style={{borderRadius: '0px 0px 4px 4px', marginTop: '-1px'}} 
              active = {this.state.bankSelected == 'mandiri'} 
              onClick = {() => this.transferBank('mandiri')}>
                <RadioButton checked = {this.state.bankSelected == 'mandiri'}/>
                <img className='bank-img' src="../static/images/bank_logos/mandiri.png" alt="Mandiri"/>
                <span>Bank Mandiri</span>
            </BankItem>  
            <BankDetail open = {this.state.bankSelected == 'mandiri'}>
              {this.props.data.vaNumber != 0 ? 
              <RenderVaDetail bankName={'Mandiri'} vaNumber={this.props.data.vaNumber}/> 
              :
              <RenderBankDetail bankName={'Mandiri'} accountNumber={'122 00 1025188 5'}/> } 
            </BankDetail>      
          </BankList>
        </ItemContainer>
        
        button = <RenderButton data={this.props.data} addOrder = {this.addOrder} method={this.state.method}/>
      }
    }
    return (
      <div>
         <Row>
          <Column>
            <PaymentContainer>
              <PaymentTitle>Payment Method</PaymentTitle>
              <PaymentDetails>Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt </PaymentDetails>
               {content}
                <AmountContainer>
                <ItemContainer>
                  <ItemRow>
                      <AmountColumn left>
                        You Send
                      </AmountColumn> 
                      <AmountColumn right>
                        <NumberFormat displayType={'text'} decimalScale={2} thousandSeparator={true} value={this.props.data.fromAmount} /> {this.props.data.fromCurrency.toUpperCase()} 
                      </AmountColumn>
                  </ItemRow>
                  <ItemRow>
                      <AmountColumn left>
                        {this.props.data.fromCurrency.toUpperCase()}/{this.props.data.toCurrency.toUpperCase()} Conversion Rates
                      </AmountColumn> 
                      <AmountColumn right>
                        <NumberFormat displayType={'text'} thousandSeparator={true} decimalScale={2} value={this.props.data.rate}/>
                      </AmountColumn>
                  </ItemRow>
                  <ItemRow>
                      <AmountColumn left>
                        Transfer Out Fee
                      </AmountColumn> 
                      <AmountColumn right>
                        0
                      </AmountColumn>
                  </ItemRow>
                  <ItemRow>
                      <AmountColumn left>
                        Recipient Gets
                      </AmountColumn> 
                      <AmountColumn right>
                        <NumberFormat  displayType={'text'} decimalScale={2} thousandSeparator={true} value={this.props.data.toAmount} /> {this.props.data.toCurrency.toUpperCase()} 
                      </AmountColumn>
                  </ItemRow>
                </ItemContainer>
              </AmountContainer>
              <p>Please check all of the details above are correct and check your email for the notification</p>
              <ButtonContainer>
                {button}
                <Button secondary onClick={this.props.previousStep}>Previous</Button>
              </ButtonContainer>
            </PaymentContainer>
          </Column>
          <Column>
            <PolicyContainer>
              <PolicyTitle className = "bold">
                Is it safe to use Transfree service?
              </PolicyTitle>
              <PolicyContent>
                Yes, you are in a trusted company. We are legally incorporated as PT Pelita Transfer Nusantara, 
                office at Innovation Room Kemnaker RI. We are the official partner of Indonesian Community 
                in several countries and collaborating with the governement. <br/><br/>
                <a className = "link" href="../index#row-footer" target = "_blank">See our Partners & Collaboratos</a>
              </PolicyContent>
            </PolicyContainer>
          </Column>
        </Row>
      </div>
    )
  }
}

export default Pay
