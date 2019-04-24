import Menu from '../components/menu.js';
import Header from '../components/header.js';
import Footer from '../components/footer.js';
import Link from 'next/link';

const Index = () => (
  <div>
    <Header />
    <Menu />
    <div className="row hero">
      <div className="container">
        <div className="left-container">
          <h1>International money transfer feels like local transfer</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pretium
          pretium tempor. Ut eget imperdiet neque. In volutpat ante semper diam
          molestie, et aliquam erat </p>
          <Link href="">
            <a className="btn-secondary">See how it works</a>
          </Link>
          <div className="benefits">
            <div className="benefit-item">
              <img src="../static/images/benefit-1.svg"/>
              <p>Official partner Persatuan Pelajar Indonesia</p>
            </div>
            <div className="benefit-item">
              <img src="../static/images/benefit-2.svg"/>
              <p>Winner Entrepreneur Summit LPDP 2018</p>
            </div>
          </div>
        </div>
        <div className="right-container">
          <div className="converter-container">
            <div className="row exchange-container">
              <div className="source-container">
                <p>You send</p>
                <div className="currency-from">
                  <span className="flag-icon flag-icon-gb flag-icon-squared"></span> GBP
                </div>
                <input id="money-from" type="text" value="1,000"/>
              </div>
              <div className="destination-container">
                <p>Recipient gets</p>
                <div className="currency-from">
                  <span className="flag-icon flag-icon-id flag-icon-squared"></span> IDR
                </div>
                <input id="money-to" type="text" value="18,765,432.10"/>
              </div>
            </div>
            <div className="row rate">
              <span className="rate-desc">GBP/IDR Conversion rate</span> <span className="rate-value">18,765.43 IDR</span>
            </div>
            <div className="row note">
              <p>Your transfer will be processed in less than 24 hours.
              The recipient will get the money on <span className="received-on">5 April</span>.</p>
            </div>
            <div className="row converter-cta">
              <div className="cta-secondary">
                <Link href="">
                  <a className="btn-secondary">Compare price</a>
                </Link>
              </div>
              <div className="cta-primary">
                <Link href="/send">
                  <a className="btn-primary">Get started</a>
                </Link>
              </div>
            </div>
          </div>
          <div className="promo">
            <div className="promo-desc">
            Let's lighten their burden: <b>Banjir Bandang Papua</b>
            </div>
            <div className="promo-cta">
              <Link href="">
                <a className="btn-primary">Donate now</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="row">
      <img className="curve" src="../static/images/curve-bg.svg"/>
    </div>
    <div className="row partners">
      <h1>Our partners</h1>
      <div className="container partners-wrapper">
        <div className="row partners-container">
          <div className="partner-item">
            <img src="../static/images/partners/ppi-mib.png"/>
          </div>
          <div className="partner-item">
            <img src="../static/images/partners/ppi-london.png"/>
          </div>
          <div className="partner-item">
            <img src="../static/images/partners/ppi-denhaag.png"/>
          </div>
          <div className="partner-item">
            <img src="../static/images/partners/ppi-liverpool.png"/>
          </div>
          <div className="partner-item">
            <img src="../static/images/partners/ppi-rotterdam.png"/>
          </div>
        </div>
        <div className="row partners-container">
          <div className="partner-item">
            <img src="../static/images/partners/ppi-delft.png"/>
          </div>
          <div className="partner-item">
            <img src="../static/images/partners/ppi-gm.png"/>
          </div>
          <div className="partner-item">
            <img src="../static/images/partners/ppi-newcastle.png"/>
          </div>
          <div className="partner-item">
            <img src="../static/images/partners/ppi-amsterdam.png"/>
          </div>
        </div>
      </div>
    </div>
    <div className="row features">
      <div className="container">
        <div className="row">
          <div className="left-feature-container"></div>
          <div className="right-feature-container">
            <h2>Best rate for transfer, cheaper than competitors</h2>
            <p>Curabitur lobortis id lorem id bibendum. Ut id consectetur magna.
            Quisque volutpat augue enim, pulvinar lobortis nibh lacinia at.
            Vestibulum nec erat ut mi sollicitudin porttitor id sit amet risus.
            Nam tempus vel odio vitae aliquam.</p>
          </div>
        </div>
        <div className="row">
          <div className="left-feature-container">
            <h2>Best rate for transfer, cheaper than competitors</h2>
            <p>Curabitur lobortis id lorem id bibendum. Ut id consectetur magna.
            Quisque volutpat augue enim, pulvinar lobortis nibh lacinia at.
            Vestibulum nec erat ut mi sollicitudin porttitor id sit amet risus.
            Nam tempus vel odio vitae aliquam.</p>
          </div>
          <div className="right-feature-container">
          </div>
        </div>
        <div className="row">
          <div className="left-feature-container"></div>
          <div className="right-feature-container">
            <h2>Best rate for transfer, cheaper than competitors</h2>
            <p>Curabitur lobortis id lorem id bibendum. Ut id consectetur magna.
            Quisque volutpat augue enim, pulvinar lobortis nibh lacinia at.
            Vestibulum nec erat ut mi sollicitudin porttitor id sit amet risus.
            Nam tempus vel odio vitae aliquam.</p>
          </div>
        </div>

      </div>
    </div>
    <div className="row testimonials">
      <div className="container">
        <h1>Why using Transfree?</h1>
        <div className="features-container">
          <div className="feature-item">
            <img src="../static/images/benefit-1.svg"/>
            <h2>Cheaper & faster</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            In lobortis libero ac neque vehicula, in bibendum metus mollis.</p>
          </div>
          <div className="feature-item">
            <img src="../static/images/benefit-2.svg"/>
            <h2>Rp 18 Billion+ transactions</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            In lobortis libero ac neque vehicula, in bibendum metus mollis.</p>
          </div>
          <div className="feature-item">
            <img src="../static/images/benefit-1.svg"/>
            <h2>750+ customers</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            In lobortis libero ac neque vehicula, in bibendum metus mollis.</p>
          </div>
        </div>
        <div className="testimonials-wrapper">
          <h1>What our customers say</h1>
          <div className="testimonials-items">
            <div className="message">
              “It is very difficult to send money from IDR to GBP and Transfree
              come out with the best solution ever. First time I use it when
              I was in Indonesia to pay for my flat deposit and rent.
              And now I'm still use Transfree to transfer money from the UK to Indonesia.
              It gives me a fair rate and many times, the rate is better than transferwise.”
            </div>
            <div className="user">
              <img src="../static/images/dummy-photo.png"/>
              <div className="user-details">
                <h3 className="user-name">Yolanda</h3>
                <div className="user-affiliation">Imperial College London</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <style jsx>{`
      .container {
        display: flex;
      }

      .hero {
        padding-bottom: 100px;
      }

      .left-container {
        flex-basis: 60%;
        margin-top: 100px;
      }

      .left-container p {
        max-width: 80%;
        margin-bottom: 30px;
      }

      .right-container {
        flex-basis: 40%;
        margin-top: 120px;
        z-index: 1000;
      }

      h1 {
        font-size: 42px;
      }

      .benefits {
        display: flex;
        margin-top: 50px;
      }

      .benefit-item {
        flex-basis: 40%;
        text-align: center
      }

      .benefit-item p {
        margin: 0 auto;
      }

      .benefit-item img {
        margin-bottom: 20px;
      }

      .converter-container {
        padding: 20px;
        background: #15233C;
        box-shadow: 0 10px 30px 0 rgba(0,0,0,0.30);
        border-radius: 8px;
        color: #AAB2C0;
      }

      .exchange-container {
        display: flex;
      }

      .source-container {
        flex-basis: 50%;
      }

      .destination-container {
        flex-basis: 50%;
      }

      .flag-icon {
        border-radius: 50%;
        width: 34px;
        height: 34px;
        margin-right: 10px;
      }

      .currency-from {
        display: flex;
        align-items: center;
        font-size: 20px;
        font-family: 'Campton-Bold', sans-serif;
        color: #FFF;
      }

      input {
        margin-top: 20px;
        width: 100%;
        font-size: 22px;
        font-family: 'Campton-Bold', sans-serif;
        color: #15233C;
        border: none;
        padding: 12px;
        box-sizing: border-box;
      }

      input:focus {
        outline: none;
      }

      .source-container input {
        border-radius: 4px 0 0 4px;
        border-right: 2px solid #15233C;
      }

      .destination-container input {
        border-radius: 0 4px 4px 0;
      }

      .rate {
        display: flex;
        margin: 20px 0;
      }

      .rate-desc {
        flex-basis: 50%;
      }

      .rate-value {
        flex-basis: 50%;
        text-align: right;
        font-family: 'Campton-Bold', sans-serif;
        color: #FFF;
      }

      .note {
        margin-bottom: 20px;
      }

      .received-on {
        font-family: 'Campton-Bold', sans-serif;
        color: #FFF;
      }

      .converter-cta {
        display: flex;
      }

      .cta-secondary,
      .cta-primary {
        flex-basis: 50%;
        padding: 5px;
      }

      .cta-secondary a,
      .cta-primary a {
        width: 100%;
      }

      .cta-secondary a {
        padding: 8px 0;
      }

      .cta-primary a {
        padding: 10px 0;
      }

      .promo {
        display: flex;
        align-items: center;
        padding: 20px;
        margin-top: 40px;
        background: #EBF6FB;
        color: #3E495E;
        border-radius: 8px;
      }

      .promo-desc {
        flex-basis: 60%;
      }

      .promo-cta {
        flex-basis: 40%;
        text-align: center;
      }

      .promo a {
        font-size: 14px;
      }

      .curve {
        width: 100%;
        height: auto;
      }

      .partners {
        margin-top: -7px;
        padding-top: 50px;
        background-color: #FFF;
      }

      .partners h1 {
        text-align: center;
        margin-bottom: 50px;
      }

      .partners-wrapper {
        flex-direction: column;
      }

      .partners-container {
        display: flex;
        justify-content: center;
      }

      .partner-item {
        flex-basis: 20%;
        align-self: center;
      }

      .partner-item img {
        max-width: 60%;
      }

      .features {
        padding: 100px 0;
        background-color: #FFF;
      }

      .left-feature-container,
      .right-feature-container {
        flex-basis: 50%;
      }

      .features .container {
        display: flex;
        flex-direction: column;
      }

      .features .container .row {
        display: flex;
        margin: 100px 0;
      }

      .testimonials {
        background-image: url('../static/images/curve-gradient-bg.svg');
        background-size: contain;
        background-repeat: no-repeat;
        background-color: #FFF;
        width: 100%;
        min-height: 962px;
        margin-top: -180px;
        padding-top: 80px;
      }

      .testimonials .container {
        flex-direction: column;
      }

      .testimonials h1 {
        text-align: center;
        margin-bottom: 100px;
      }

      .features-container {
        display: flex;
      }

      .feature-item {
        flex-basis: 33.33%;
      }

      .testimonials {
        padding: 100px 0;
      }

      .testimonials-wrapper {
        padding-top: 100px;
        display: flex;
        flex-direction: column;
      }

      .testimonials-wrapper h1 {
        margin-bottom: 100px;
      }

      .testimonials-items {
        max-width: 550px;
        text-align: center;
        align-self: center;
      }

      .user {
        margin-top: 100px;
        display: flex;
        flex-direction: row;
        justify-content: center;
      }

      .user img {
        width: 80px;
        height: 80px;
      }

      .user-details {
        padding-left: 20px;
        text-align: left;
        align-self: center;
      }

      .user-details h3 {
        margin: 5px 0;
      }

    `}</style>
    <Footer />
  </div>
)

export default Index
