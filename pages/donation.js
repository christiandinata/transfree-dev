import Header from '../components/header.js';
import Menu from '../components/menu.js';
import Footer from '../components/footer.js';

//Untuk donasi
const About = () => (
  <div>
    <Header />
    <Menu/>
    <div className="row">
      <div className="container">
        <h1>Donation For Corona</h1>
        <iframe src="https://forms.gle/hkUSUWg4ZME1Ryc27" width="640" height="1050" frameborder="0" marginheight="0" marginwidth="0">Memuat…</iframe>
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
