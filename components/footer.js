import Link from 'next/link';

const Footer = () => (
 
  <div className="row-footer">
    <div className="row menu">
      <div className="container">
        <div className="footer-item logo">
            <img src="../static/images/transfree-logo.png"/>
        </div>
        <div className="footer-item">
          <h3>About Us</h3>
          <ul >
            <li><Link href="/about"><a>About Us</a></Link></li>
            {/*
              <li>How it works</li>
              <li>Pricing</li>
              <li>Help</li>
            */}
            <li><Link href="/faq"><a>FAQ</a></Link></li>
            <li><Link href="/terms"><a>Terms & conditions</a></Link></li>
            <li><Link href="/privacy-policy"><a>Privacy Policy</a></Link></li>
          </ul>
        </div>
        <div className="footer-item" >
          <h3>Contact Us</h3>
          <ul>
            <li>Phone/WhatsApp: <br/>+44 7985 497391 </li>
            <li>Email: <br/>admin@transfree.id </li>
            <li><Link href="/complaint_feedback"><a >Complaint and Feedback</a></Link></li>
          </ul>
        </div>

        <div className="footer-item" >
          <h3>Follow Us On</h3>
          <ul>
            <li><a href="https://www.instagram.com/transfree_id/?hl=en" target="blank"><img className="img" src="../static/images/instagram.png"></img> </a></li>
            <li><a href="https://www.facebook.com/transfree.id.9" target="blank"><img className="img" src="../static/images/facebook.png"></img></a></li>
            <li><a href="https://www.youtube.com/channel/UCGZ9uWFrBSAKwh6YE4q2hyA/videos" target="_blank"><img className="img" src="../static/images/youtube.png"></img></a></li>
            {/**
            <li><Link ><a href="https://www.instagram.com/transfree_id/?hl=en" target="_blank">Instagram</a></Link></li>
            <li><Link ><a href="#" target="_blank">Facebook</a></Link></li>
            <li><Link ><a href="https://www.youtube.com/channel/UCGZ9uWFrBSAKwh6YE4q2hyA/videos" target="_blank">Youtube</a></Link></li>
             */}
          </ul>
        </div>
      </div>
    </div>
  
    <div className="row2 menu2">
      <div className="container">
        <div className="footer-item logo">
        </div>
        <div className="footer-item-collab" >
          <h3>Collaborators and Partners</h3>
          <ul>
            <li><Link ><a href="https://ristekdikti.go.id/" target="_blank">Ministry of Research Technology and Higher Education</a></Link></li>
            <li><Link ><a href="http://kemnaker.go.id/" target="_blank">Ministry of Manpower Republic of Indonesia</a></Link></li>
            <li><Link ><a href="https://puspiptek.ristekdikti.go.id/tbic/" target="_blank">Technology Business Incubation Center</a></Link></li>
            <li><Link ><a href="https://talentindonesia.id/talent-hub/" target="_blank">Innovation Room - TALENT HUB </a></Link></li>

          </ul>
        </div>
        <div className="footer-item-collab" >
	  <h3>License</h3>
          <img src="../static/images/partners/bank-indonesia.png"></img>
        </div>
      </div>
    </div>

    <div className="row3 menu2">
      <div className="container">
        <div className="footer-item logo">
        </div>
        <div className="footer-item-collab-office">
        <h3>Office</h3>
          <ul>
            <li style={{fontSize: '14px'}}>Innovation Room - Mezanine Floor. Kementerian Ketenegakerjaan RI. Jl. Gatot Subroto No.Kav. 51, Jakarta Selatan, 12950 Indonesia</li>
          </ul>
        </div>
      </div>
    </div>
  
    <div className="copyright">
      Transfree © Copyright 2019. All rights reserved.
      <br></br>
      Transfree is a trademark of PT. Pelita Transfer Nusantara. Registered in the Directorate General of Intellectual Property of the United Kingdom
    </div>
    <style jsx>{`
    .row-footer{
      background-color:#F6F8FC;
      // background-size:cover;
      // overflow:auto;
      clear:both;
      width:auto;
      height:auto;
      padding:0px 0px 10px 20px;
      // width : 1920px 0,36px 0px;
      // height : 1246px 0px 6346,42px
      margin-top:0px;
      padding:0px 0px 0px 10px;
    }
        .row3 {
          border-bottom: 1px solid #eaeaea;
          // margin-top:-90px;
        }
        .container {
          display: flex;
        }
        ul {
          list-style-type: none;
          margin: 0;
          padding: 0;
        }
        h3 {
          color: #000000;
          font-size:20px;
          margin-top:0px;
          font-weight:700;

        }
        li {
          display: block;
          // margin: 16px 0px 6px;
          color: #000000;
        }

        ul > li > a{
          list-style-type: none;
          display: block;
          // margin: 6px 0px 6px;
          color: #000000;
          font-size:16px;
          font-weight:normal;
        }

        ul > li > a > img{
          width:40px;
          height:40px;
          margin-right:30px;
        }

        .menu2  ul > li > a{
          list-style-type: none;
          display: block;
          // margin: 16px 0px -10px;
          color: #000000;
          font-size:16px;
          font-weight:100px;
        }

        .img{
          margin-right: 15px;
          float:left;
          width: 25px;
          height: 25px;
        }
        .footer-item {
          flex-basis: 33%;
        }
        .footer-item-collab {
          flex-basis: 50%;
        }

	.footer-item-collab-office{
	  flex-basis:100%;
		
	}

        .footer-item-collab img {
          width: 35%;
          height: 35%;
        }
        .logo img {
          width: 1920px 0,36px;
          height: 1246px, 0px 6346,42px ;
          margin-top: 10px;
        }
        .menu2 {
          padding-bottom: 15px;
           padding-top: 10px;
          text-align:left;
        }

	.container-partner{
	  display:flex
	}
        .menu {
          padding-top: 5px;
        }
        .copyright {
          color: #A6AEBB;
          text-align: center;
          width:auto;
          padding:10px;
        }
        a {
          font-family: 'Campton-Book', sans-serif;
        }
        h3 {
        margin-bottom:5px;
        }

        @media only screen and (max-width: 900px) {
          .container{
            flex-direction:column;
            margin-left:3px;
          }
        }
      `}</style>
  </div>
)
export default Footer