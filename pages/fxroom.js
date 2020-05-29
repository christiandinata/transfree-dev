import Header from '../components/header.js';
import Menu from '../components/menu.js';
import Footer from '../components/footer.js';

const Fxroom = () => (
  <div>
    <Header />
    <Menu/>
    <div className="row">
      <div className="container">
        {/* <h1>FX Room Transaction Detail</h1> */}
        <div className="form">
        <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSf4LSBqbcDfqHdTd_bdJ5pbFIBP8rGETd0zcXml7f_h7VMjMA/viewform?embedded=true" width="500" height="700" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
        </div>
      </div>
    </div>
    <style jsx>{`
      .row {
        padding: 30px 0 100px;
        background: #F6F8FB;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to bottom, #F6F8FB, #FFF);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to bottom, #F6F8FB, #FFF); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
      }

      .container {
        max-width: 640px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
      }

      h1 {
        font-size: 2rem;
      }

      p {
        font-size: 1.1rem;
        line-height: 1.6;
      }
    `}</style>
    <Footer />
  </div>
);

export default Fxroom;
