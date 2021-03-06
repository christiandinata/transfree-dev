import styled from 'styled-components';
//Bagian paling bawah, ada "about us", "contact us", "License", dan "Office"
//Dipakai di index.js dan dashboard.js

const Base = styled.div`
  background: #FFFFFF;
  border-bottom: 1px solid #9A9A9A;
  display: flex;
  justify-content: center;
  padding-top: 80px;
  padding-bottom: 80px;

  @media only screen and (max-width: 900px) {
    padding-top: 49.31px;
    display: block;
    // justify-content: space-between;
  }
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

  @media only screen and (max-width: 900px) {
    grid-template-columns: repeat(auto-fill, 
                           minmax(150px, 1fr));
    grid-gap: 17px;
    padding-right: 20px;
  }
`;

const Column = styled.section`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 24px;

  @media only screen and (max-width: 900px) {
    margin-left: 16px;
  }
`;

const Contacts = styled.div`
  padding-top: 45px;
  padding-left: 50px;
  padding-right: 36px;

  @media only screen and (max-width: 900px) {
    display: flex;
    // margin: 0 16px 36px 20px;
    margin-bottom: 36px;
    padding: 0;
    justify-content: space-between;
  }

  @media only screen and (max-width: 450px) {
    display: block;
  }
`;

const Brand = styled.img`
  width: 270.68px;
  height: 47.14px;
  object-fit: scale-down;
  margin-bottom: 27.43px;

  @media only screen and (max-width: 900px) {
    max-width: 30%;
    height: auto;
    margin-bottom: 0;
    margin-left: 20px;
  }
`;

const LogoDiv = styled.div`
  margin-right: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media only screen and (max-width: 900px) {
    margin-right: 16px;
  }

  @media only screen and (max-width: 450px) {
    justify-content: flex-start;
    margin-top: 20px;
  }
`;

const SocialLogo = styled.a`
  margin-left: 20px;
  text-decoration: none;
`;

const SocialPic = styled.img`
  width: 24px;
  height: 24px;
  object-fit: scale-down;
  -webkit-filter: grayscale(100%);
  filter: grayscale(100%);

  &:hover {
    -webkit-filter: none;
    filter: none;
  }
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

  &:hover {
    color: #009fe3;
  }
`;

const FooterText = styled.span`
  all: unset;
  color: #626B79;
  font-size: 16px;
  line-height: 24px;
  font-style: normal;
  font-weight: normal;
  margin-bottom: 16px;
`;

const FooterEmail = styled.button`
  outline: none;
  text-decoration: none;
  border: none;
  background-color: #fff;
  color: #626B79;
  font-size: 16px;
  line-height: 24px;
  font-style: normal;
  font-weight: normal;
  margin-bottom: 16px;
  text-align: left;
  padding: 0;

  &:hover {
    color: #009fe3;
  }
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

  @media only screen and (max-width: 900px) {
    padding: 24px 16px;
    margin-bottom: -5em;
  }
`;

const TrademarkText = styled(FooterText)`
  text-align: center;
  display: block;
  margin-top: 1em;
  margin-bottom: 1em;

  @media only screen and (max-width: 900px) {
    display: none;
  }
`;

const handleEmailClick = () => {
  // Terlalu ngezoom tampilannya
  window.location.href = 'https://mail.google.com/mail/?view=cm&fs=1&to=' + 'admin@transfree.id'

  // Open ke Mail app
  // window.location.href = 'mailto:admin@transfree.id'

  // Compose doang
  // window.location.href = 'https://mail.google.com/mail/u/0/#compose'
}

const Footer = () => (
  <div>
    <Base>
      <Contacts>
        <Brand src = "../static/images/transfree-logo.png"></Brand> 
        <LogoDiv>
          <SocialLogo href = "https://www.facebook.com/transfree.id.9"><SocialPic src = "../static/images/Footer/facebook-logo.png"></SocialPic></SocialLogo>
          <SocialLogo href = "https://www.instagram.com/transfree_id/?hl=en"><SocialPic src = "../static/images/Footer/instagram-logo.png"></SocialPic> </SocialLogo>
          <SocialLogo href = "https://www.linkedin.com/company/transfreeid"><SocialPic src = "../static/images/Footer/linkedin-logo.png"></SocialPic> </SocialLogo>
          <SocialLogo href = "https://www.youtube.com/channel/UCGZ9uWFrBSAKwh6YE4q2hyA/videos"><SocialPic src = "../static/images/Footer/youtube-logo.png"></SocialPic></SocialLogo>
          <SocialLogo href = "https://medium.com/transfree"><SocialPic src = "../static/images/Footer/medium-logo.png"></SocialPic> </SocialLogo>
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
          <FooterLink href="https://api.whatsapp.com/send?phone=447490090659&text=Hello%20Transfree" target="_blank">+44 7985 497391</FooterLink>
          <FooterEmail onClick = {handleEmailClick}>admin@transfree.id</FooterEmail>
          {/* <FooterText>admin@transfree.id</FooterText> */}
          <FooterLink href = "/complaint_feefback">Complaint and Feedback</FooterLink>
        </Column>

        <Column>
          <Title>Office</Title>
          <FooterText>Innovation Room - Mezanine Floor. Kementerian Ketenegakerjaan RI. Jl. Gatot Subroto No.Kav.51, Jakarta Selatan, 12950 Indonesia</FooterText>
        </Column>

        <Column>
          <Title>License</Title>
          <LicensePhoto src = "../static/images/partners/logo-bank-indonesia.png"></LicensePhoto>
        </Column>
      </Row>
    </Base>

    <Copyright>
      <CopyrightText>Transfree ?? Copyright 2021. All rights reserved.</CopyrightText>
      <TrademarkText>Transfree is a trademark of PT. Pelita Transfer Nusantara. Registered in the Directorate General of Intellectual Property of the United Kingdom</TrademarkText>
    </Copyright>
  </div>
)
export default Footer