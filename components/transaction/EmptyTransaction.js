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

export function EmptyTransaction(){
    return (
      <ContentContainer>
        <IconContainer>
          <img className="icon" src="../static/images/Asset Web/send money/ic-check.svg" alt="checked"/>
        </IconContainer>
        <h2>No transactions</h2>
        <p>You haven’t sent money using Transfree. Get started now and enjoy fast and cheap international money transfer. </p>
      </ContentContainer>
    )
  
  }