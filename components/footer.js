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
    <div className="row copyright">
      <p>Transfree © Copyright 2019. All rights reserved.</p>
    </div>
    <style jsx>{`

        .row {
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

        .logo img {
          height: 37px;
          margin-top: 10px;
        }

        .menu {
          padding: 60px 0;
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
