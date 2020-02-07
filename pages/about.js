import Header from '../components/header.js';
import Menu from '../components/menu.js';
import Footer from '../components/footer.js';

const About = () => (
  <div>
    <Header />
    <Menu/>
    <div className="row">
      <div className="container">
        <h1>About Transfree</h1>
        <p>
          Transfree is an Indonesian based company focussing its
          service in cross border money transfer, with a vision to
          make international money transfer feels like local bank
          transfer.       
        </p>

        <p>
          We charge no transaction fee with a competitive
          exchange rate.
        </p>
      </div>
    </div>
    <style jsx>{`
      .row {
        padding: 50px 0 100px;
        background: #F6F8FB;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to bottom, #F6F8FB, #FFF);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to bottom, #F6F8FB, #FFF); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
      }

      .container {
        max-width: 640px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        text-align:Justify;
      }

      h1 {
        font-size: 3rem;
      }

      p {
        font-size: 1.1rem;
        line-height: 1.6;
      }
    `}</style>
    <Footer />
  </div>
);

export default About;
