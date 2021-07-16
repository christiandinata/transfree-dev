import Link from 'next/link';
import styled from  'styled-components';
import NumberFormat from 'react-number-format';
import { connect } from 'react-redux';
import orderActions from '../../redux/actions';
import { ModalPopUp } from './PopUp';

const ReviewContainer = styled.div `
  background: #FFFFFF;
  border: 0.5px solid #B4B4B4;
  box-sizing: border-box;
  border-radius: 16px;
  padding: 10px 30px 30px 30px;
  max-width: 495px;
  margin: 0px;

  @media only screen and (max-width: 800px) {
    padding: 10px 20px 30px 20px;
  }
`;

const ReviewTitle = styled.h3 `
  font-size: 20px;
  margin-bottom: 10px;
`;

const RecipientDetails = styled.p`
  color: #626B79;
`;

const RecipientTitle = styled.div `
  font-size: 16px;
  font-weight: bold;
  border: 0.5px solid #B4B4B4;
  border-radius: 4px 4px 0px 0px;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const ItemContainer = styled.div`
  padding: 15px 20px 15px 20px ;
  border: 0.5px solid #B4B4B4;
  border-top: 0px;
  display: flex;
  flex-direction: column;
`;

const ItemRow = styled.div`
  display: flex;
  padding: 2.5px 0px 2.5px;
  
  ${({ hide }) => hide && `
    display: none;
  `}
`;

const TransColumn = styled.span`
  flex-basis: ${props => props.left ? '40%' : '60%'};
  text-align: ${props => props.left ? 'left' : 'right'};
  color: ${props => props.left ? '#9A9A9A' : '#232933'};
  font-weight: ${props => props.left ? 'normal' : 'bolder'};

  >.link {
    color: #009FE3;
  }
`;

const AmountColumn = styled.span`
  color: white;
  padding-bottom: ${props => props.left ? '0px' : '2.5px'};
  padding-top: ${props => props.left ? '4.75px' : '2.5px'};
  flex-basis: ${props => props.left ? '60%' : '40%'};
  text-align: ${props => props.left ? 'left' : 'right'};
  font-size: ${props => props.left ? '16px' : '20px'};
  font-family: ${props => props.left ? 'Avenir LT Pro' : 'Avenir LT Pro Black'};
`;

const BottomColumn = styled.span`
  color: #626B79;
  font-size: 14px;
  flex-basis: ${props => props.left ? '8%' : '92%'};
`;

const NoteSpan = styled.span`
  font-size: 12px;

  ${({ hide }) => hide && `
    display: none;
  `}
`;

const AmountContainer = styled.div`
  background: #1E345B;
  color: white;
  margin: 45px -30px 30px -30px;
  padding: 0px 20px 0px 20px; 

  @media only screen and (max-width: 800px) {
    margin: 45px -20px 30px -20px;
    padding: 0px 10px 0px 10px;
  }
`;

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

class Review extends React.Component {
  constructor({ props }) {
    super(props);
    this.state = {
     isCheck:false,
     errorCheck: false
    };
  }

  saveAndContinue = (e) => {
    e.preventDefault();
    if (this.state.isCheck) {
      this.props.nextStep();
    } else {
      this.toggleModalError();
    }
  }

  toggleCheck = (e) => {
    this.setState({
      isCheck : !this.state.isCheck
    })
  }

  toggleModalError = (e) => {
    this.setState({
      errorCheck : !this.state.errorCheck
    })
  }

  render() {
    return (
      <div>
        <ReviewContainer>
          <ReviewTitle>
            Review Transaction Details
          </ReviewTitle>
          <RecipientDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt 
          </RecipientDetails>

          <div>
          <RecipientTitle>
              <ItemRow>
                <TransColumn left style={{color: "#232933"}}>
                  Recipient
                </TransColumn> 
                <TransColumn right>
                  <Link href=""><a className="link" onClick={this.props.previousStep}>Change</a></Link>
                </TransColumn>
              </ItemRow>
            </RecipientTitle>

            <ItemContainer>
              <ItemRow>
                <TransColumn left>
                  Full Name
                </TransColumn> 
                <TransColumn right>
                  {this.props.data.name}
                </TransColumn>
              </ItemRow>
            </ItemContainer>

            <ItemContainer>
              <ItemRow>
                <TransColumn left>
                  Bank Name
                </TransColumn> 
                <TransColumn right>
                  {this.props.data.bankName}
                </TransColumn>
              </ItemRow>
              <ItemRow hide={!(this.props.data.toCurrency == 'idr'
                            || this.props.data.toCurrency == 'myr'
                            || this.props.data.toCurrency == 'krw'
                            || this.props.data.toCurrency == 'hkd'
                            || this.props.data.toCurrency == 'usd'
                            || this.props.data.toCurrency == 'sgd'
                            || this.props.data.toCurrency == 'gbp')}>
                <TransColumn left>
                  Account Number
                </TransColumn> 
                <TransColumn right>
                  {this.props.data.accountNumber}
                </TransColumn>
              </ItemRow>

              <ItemRow hide={!(this.props.data.toCurrency == 'gbp')}>
                <TransColumn left>
                  Sort Code
                </TransColumn> 
                <TransColumn right>
                  {this.props.data.sortcode}
                </TransColumn>
              </ItemRow>

              <ItemRow hide={!(this.props.data.toCurrency == 'eur')}>
                <TransColumn left>
                  IBAN
                </TransColumn> 
                <TransColumn right>
                  {this.props.data.iban}
                </TransColumn>
              </ItemRow>

              <ItemRow hide={!(this.props.data.toCurrency == 'usd')}>
                <TransColumn left>
                  Routing Number
                </TransColumn> 
                <TransColumn right>
                  {this.props.data.routingNumber}
                </TransColumn>
              </ItemRow>

              <ItemRow hide={!(this.props.data.toCurrency == 'aud')}>
                <TransColumn left>
                  BSB Code
                </TransColumn> 
                <TransColumn right>
                  {this.props.data.bsbCode}
                </TransColumn>
              </ItemRow>
            </ItemContainer>

            <ItemContainer>
              <ItemRow>
                <TransColumn left>
                  Purpose of Transfer
                </TransColumn> 
                <TransColumn right>
                  {this.props.data.purposeTransfer}
                </TransColumn>
              </ItemRow>
            </ItemContainer>
            </div>

            <AmountContainer>
              <ItemContainer style={{border: "none"}}>
                <ItemRow>
                    <AmountColumn left>
                      You Send
                    </AmountColumn> 
                    <AmountColumn right>
                      <NumberFormat className="bolder" displayType={'text'} decimalScale={2} thousandSeparator={true} value={this.props.data.fromAmount} /> {this.props.data.fromCurrency.toUpperCase()} 
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

            <ItemRow>
              <BottomColumn left>
                <img src="../static/images/Asset Web/send money/ic-calendar.svg"/>
              </BottomColumn>
              <BottomColumn right>
                Estimated Delivery - <span style = {{color : "#232933", fontWeight: "bold"}}>{this.props.data.duration == 1 ? 'Next Working Day' : '24 Hours'}</span><br/>
                <NoteSpan hide = {this.props.data.duration != 2}>
                  But kindly note, there is a chance that the money will arrive in more than 36 hours.
                </NoteSpan>
                {this.props.data.duration == 2 ? <br/> : ''} 
              </BottomColumn>
            </ItemRow>
            <ItemRow>
              <BottomColumn left>
                <input
                  type="checkbox"
                  id="isAgree"
                  onChange={ () => this.toggleCheck()}/>
              </BottomColumn>
              <BottomColumn right>
                I understand that my order will be canceled if no payment is made within the next 3 hours
              </BottomColumn>
            </ItemRow>
           
            <ButtonContainer>
              <Button onClick={this.saveAndContinue}>Continue</Button>
              <Button secondary onClick={this.props.previousStep}>Previous</Button>
            </ButtonContainer>
        </ReviewContainer>
        <ModalPopUp
          open={this.state.errorCheck}
          toggleModal={this.toggleModalError}
          icon={'../static/images/Asset Web/send money/ic-error.svg'}
          title={"Transaction Error"}
          content={
            <p>Please check the terms</p>
          }
          buttonText={"OK"}
        />
      </div>
    )
  }
}

export default connect(
  state => state,
  orderActions
)(Review);
