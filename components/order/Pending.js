import styled from "styled-components";

const ContentContainer = styled.div`
  display: flex;
  padding: 0px 20px 0px 20px;
  align-items: center;
  text-align: center;
  flex-direction: column;
  max-width: 600px;
  margin: 0 auto;
  margin-top: 90px;
  margin-bottom: 40px;

  p{
    text-align: center;
    margin-top: -10px;
    margin-bottom: 35px;
    color: #626B79;
  }

  h2{
    font-size: 32px;
    // font-family: "Avenir Next LT Pro Bold";
  }
`;

const IconContainer = styled.div`
  margin-top: 30px;
  
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

  justify-content: center;
  align-items: center;
  padding: 8px 24px;
  margin-bottom: 10px;
  transition: 0.2s;

  background-color: #009FE3;
  color: white;
`;

export function AwaitingConfirmation(){
    return (
      <ContentContainer>
        <IconContainer>
          <img className="icon" src="../static/images/Asset Web/send money/ic-wait.svg" alt="checked"/>
        </IconContainer>
        <h2>Awaiting Account Confirmation</h2>
        <p>We are now reviewing your account details. We will send you an email & WhatsApp message once the verification process is completed.
        <br/>Please contact us by email <span style={{color:'#009FE3'}}>admin@transfree.id</span> or 
        WhatsApp <span style={{color:'#009FE3'}}>+44 7490 090659</span> for faster process.</p>
        <Button onClick={(e) => {e.preventDefault();
                            window.location.href='/home';
                          }}>Back to Homepage</Button>
      </ContentContainer>
    )
  };

export function EmptyTransaction(){
    return (
      <ContentContainer>
        <IconContainer>
          <img className="icon" src="../static/images/Asset Web/transaction/file.svg" alt="checked"/>
        </IconContainer>
        <h2>No transactions</h2>
        <p>You haven’t sent money using Transfree. Get started now and enjoy fast and cheap international money transfer. </p>
        <Button onClick={(e) => {e.preventDefault();
                            window.location.href='/order';
                          }}>Send Money</Button>
      </ContentContainer>
    )
  
  };
