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
  }

  span{
    color: #009FE3;
    cursor: pointer;
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

export function IconTextLayout(props){
  return( 
    <ContentContainer>
      <IconContainer>
        <img className="icon" src={props.icon}/>
      </IconContainer>
      <h2>{props.title}</h2>
      {props.desc}
      <Button onClick={() => window.location.href=props.location}>
        {props.buttonText}
      </Button>
    </ContentContainer>
    )
};

export function AwaitingConfirmation(){
    return (
      <IconTextLayout
        icon = {"../static/images/Asset Web/send money/ic-wait.svg"}
        title = {"Awaiting Account Confirmation"}
        desc = {<p>We are now reviewing your account details. We will send you an email & WhatsApp message once the verification process is completed.
                <br/>Please contact us by email <span onClick={()=>window.open("mailto:admin@transfree.id")}>admin@transfree.id</span> or 
                WhatsApp <span onClick={()=>window.open("https://api.whatsapp.com/send?phone=447490090659&text=Hello%20Transfree")}>+44 7490 090659</span> for faster process.</p>}
        location = {"/home"}
        buttonText = {"Back to Homepage"}
      />
    )
  };
