import Link from 'next/link';
import styled from "styled-components";

const ContentContainer = styled.div`
  padding: 0px 20px 0px 20px;
  align-items: center;
  text-align: center;
  display: flex;
  flex-direction: column;
  max-width: 600px;

  p{
    text-align: center;
    margin-top: -10px;
    margin-bottom: 35px;
  }

  h2{
    font-size: 32px;
  }
`;

const IconContainer = styled.div`
  margin-top: 30px;
  margin-bottom: -20px;
  
  >.icon{
    max-width: 96px;
  }
`;

const Button = styled.button`
  border: 1px solid #009FE3;
  border-radius: 4px;

  max-width: 212px;
  height: 40px;
  font-size: 16px;

  left: 50%;
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

class Status extends React.Component {
  componentWillMount() {
    this.props.addOrder();
  }

  render() {
    return (
      <div>
        <ContentContainer>
          <IconContainer>
            <img className="icon" src="../static/images/Asset Web/send money/ic-check.svg" alt="checked"/>
          </IconContainer>
          <h2>Awaiting Payment Confirmation</h2>
          <p>Thank you, we are now reviewing your order details. We will send you an email regarding your payment instruction. Please check your email.</p>

          <Button onClick={(e) => {e.preventDefault();
                            window.location.href='/account';
                          }}>
            Check Transactions
          </Button>
        </ContentContainer>
      </div>
    )
  }
}

export default Status
