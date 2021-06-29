import styled from "styled-components";

const ContentContainer = styled.div`
  display: flex;
  padding: 0px 20px 0px 20px;
  align-items: center;
  text-align: center;
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 0 auto;
  margin-top: 40px;

  p{
    text-align: center;
    margin-top: -10px;
    margin-bottom: 35px;
  }
`;

const IconContainer = styled.div`
  margin-top: 30px;
  
  >.icon{
    max-width: 96px;
  }
`;

export function PendingLayout(){
    return (
      <ContentContainer>
        <IconContainer>
          <img className="icon" src="../static/images/Asset Web/send money/ic-check.svg" alt="checked"/>
        </IconContainer>
        <h2>Awaiting Confirmation</h2>
        <p>We are now reviewing your account details. We will send you an email & WhatsApp message once the verification process is completed.</p>
        <p>Please contact us by email (admin@transfree.id) or WhatsApp (+44 7490 090659) for faster process.</p>
      </ContentContainer>
    )
  
  }