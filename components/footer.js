import styled from 'styled-components';
//Bagian paling bawah, ada "about us", "contact us", "License", dan "Office"
//Dipakai di index.js dan dashboard.js

const Base = styled.div`
  background: #FFFFFF;
  border: 1px solid #9A9A9A;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  padding-top: 80px;
  padding-bottom: 80px;
`;

const Copyright = styled.div`
  background: #F3F5F7;
  margin-top: -16px;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 
    minmax(184px, 1fr));
  grid-gap: 24px;
  padding-right: 50px;
`;

const Column = styled.section`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 24px;
`;

const Contacts = styled.div`
  padding-top: 45px;
  padding-left: 50px;
  padding-right: 36px;
`;

const Brand = styled.img`
  width: 270.68px;
  height: 47.14px;
  object-fit: scale-down;
  margin-bottom: 27.43px;
`;

const LogoDiv = styled.div`
  // margin-left: 44px;
  margin-left: -5px;
`;

const Logo = styled.a`
  margin-left: 20px;
  text-decoration: none;
`;

const LicensePhoto = styled.img`
  width: 150px;
  height: 150px;
  object-fit: scale-down;
  margin-top: -55px;
`;

const Title = styled.h4`
  color: #232933;
  font-weight: bold;
  font-size: 20px;
  line-height: 28px;
  font-style: normal;
`;

const FooterLink = styled.a`
  color: #626B79;
  font-size: 16px;
  line-height: 24px;
  font-style: normal;
  font-weight: normal;
  text-decoration: none;
  margin-bottom: 16px;
`;

const FooterText = styled.p`
  all: unset;
  color: #626B79;
  font-size: 16px;
  line-height: 24px;
  font-style: normal;
  font-weight: normal;
  margin-bottom: 16px;
`;

const CopyrightText = styled(FooterText)`
  font-weight: 500;
  text-align: center;
  letter-spacing: 0.2px;
  color: #232933;
  padding-top: 20px;
  display: block;
  margin-top: 1em;
  margin-bottom: 1em;
`;

const TrademarkText = styled(FooterText)`
  text-align: center;
  display: block;
  margin-top: 1em;
  margin-bottom: 1em;
`;

const Footer = () => (
  <div>
    <Base>
      <Contacts>
        <Brand src = "../static/images/transfree-logo.png"></Brand> 
        <LogoDiv>
          <Logo href = "https://www.facebook.com/transfree.id.9"><img src = "../static/images/Footer/facebook-logo.png"></img></Logo>
          <Logo href = "https://www.instagram.com/transfree_id/?hl=en"><img src = "../static/images/Footer/instagram-logo.png"></img> </Logo>
          <Logo href = "https://www.youtube.com/channel/UCGZ9uWFrBSAKwh6YE4q2hyA/videos"><img src = "../static/images/Footer/youtube-logo.png"></img></Logo>
        </LogoDiv>
      </Contacts>

      <Row>
        <Column>
          <Title>About Us</Title>
          <FooterLink href = "/about">About Us</FooterLink>
          <FooterLink href = "/faq">FAQ</FooterLink>
          <FooterLink href = "/terms">Terms & Conditions</FooterLink>
          <FooterLink href = "/privacy-policy">Privacy Policy</FooterLink>
        </Column>

        <Column>
          <Title>Contacts</Title>
          <FooterText>+44 7985 497391</FooterText>
          <FooterText>admin@transfree.id</FooterText>
          <FooterLink href = "/complaint_feefback">Complaint and Feedback</FooterLink>
        </Column>

        <Column>
          <Title>Office</Title>
          <FooterText>Innovation Room - Mezanine Floor. Kementerian Ketenegakerjaan RI. Jl. Gatot Subroto No.Kav.51, Jakarta Selatan, 12950 Indonesia</FooterText>
        </Column>

        <Column>
          <Title>License</Title>
          <LicensePhoto src = "../static/images/partners/bank-indonesia.png"></LicensePhoto>
        </Column>
      </Row>
    </Base>

    <Copyright>
      <CopyrightText>Transfree © Copyright 2021. All rights reserved.</CopyrightText>
      <TrademarkText>Transfree is a trademark of PT. Pelita Transfer Nusantara. Registered in the Directorate General of Intellectual Property of the United Kingdom</TrademarkText>
    </Copyright>
  </div>
)
export default Footer