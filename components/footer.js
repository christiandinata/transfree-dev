import Link from 'next/link';

const Footer = () => (
  <div>
    <div className="row menu">
      <div className="container">
        <div className="footer-item logo">
            <img src="../static/images/transfree-logo.png"/>
        </div>
        <div className="footer-item">
          <h3>Customer Support</h3>
          <ul>
            <li>Phone/WhatsApp: <br/>+44 7985 497391 </li>
            <li>Email: <br/>admin@transfree.id </li>
          </ul>
        </div>
        <div className="footer-item">
          <h3>About Transfree</h3>
          <ul>
            <li><Link href="/about"><a>Who we are</a></Link></li>
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
        <div className="footer-item">
          <h3>Contact us</h3>
          <ul>
            <li style={{fontSize: '14px'}}>Innovation Room - Mezanine Floor. Kementerian Ketenegakerjaan RI. Jl. Gatot Subroto No.Kav. 51, Jakarta Selatan, 12950 Indonesia</li>
          </ul>
        </div>
      </div>
    </div>
  
    <div className="row2 menu2">
      <div className="container">
        <div className="footer-item logo">
        </div>
        <div className="footer-item-collab">
          <h3>Collaborators and Partners</h3>
          <ul>
            <li><Link ><a href="https://ristekdikti.go.id/" target="_blank">Kementerian Teknologi, Riset, dan Pendidikan Tinggi RI</a></Link></li>
            <li><Link ><a href="http://kemnaker.go.id/" target="_blank">Kementerian Ketenegakerjaan Republik Indonesia</a></Link></li>
            <li><Link ><a href="https://puspiptek.ristekdikti.go.id/tbic/" target="_blank">Technology Business Incubation Center</a></Link></li>
            <li><Link ><a href="https://talentindonesia.id/talent-hub/" target="_blank">Innovation Room - TALENT HUB </a></Link></li>

          </ul>
        </div>

        <div className="footer-item">
          <h3>Follow Us On</h3>
          <ul>
            <li><Link ><a href="https://www.instagram.com/transfree_id/?hl=en" target="blank">Instagram</a></Link></li>
            <li><Link href="/"><a>Facebook</a></Link></li>
            <li><Link ><a href="https://www.youtube.com/channel/UCGZ9uWFrBSAKwh6YE4q2hyA/videos" target="_blank">Youtube</a></Link></li>

          </ul>
        </div>
      </div>
    </div>
  
    <div className="row copyright">
      <p>Transfree © Copyright 2019. All rights reserved.</p>
      <p>Transfree is a trademark of PT. Pelita Transfer Nusantara. Registered in the Directorate General of Intellectual Property of the United Kingdom</p>
    </div>
    <style jsx>{`

        .row2 {
          border-bottom: 1px solid #eaeaea;
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
          color: #469DDD;
        }

        li {
          display: block;
          margin: 6px 0;
          color: #469DDD;
        }

        .footer-item {
          flex-basis: 25%;
        }

        .footer-item-collab {
          flex-basis: 50%;
        }

        .logo img {
          height: 37px;
          margin-top: 10px;
        }

        .menu2 {
          padding-bottom: 60px;
          padding-top: 20px;
        }
        .menu {
          padding-top: 60px;
        }

        .copyright {
          color: #A6AEBB;
          text-align: center;
        }

        a {
          font-family: 'Campton-Book', sans-serif;
        }

      `}</style>
  </div>
)

export default Footer
