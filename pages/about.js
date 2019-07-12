import Header from '../components/header.js';
import Menu from '../components/menu.js';
import Footer from '../components/footer.js';

const About = () => (
  <div>
    <Header />
    <Menu/>
    <div className="row">
      <div className="container">
        <h1>About Us</h1>
        <p>
          There are a lot of difficulties when you sending or receiving money from Indonesia.
          Starting from the total transfer time, the complexity of the procedure, to the limitations of existing regulations.
          Some also being scammed and lost their money. These are the problem that often arise in systems that already exist.
          We feels the same way when living abroad. From students who receive money from home or workers who send money to their families.
        </p>

        <p>
          Because of that, we try to find a new way to eliminate the problems with a more efficient way yet secure and reliable.
          Transfree make the process of international money transfer feels like local transfer.
          We understand your problem and will simplify your process to transfer money.
          Till today, we are improving our service to be better.
        </p>

        <p>
          Now that you know our story, let’s give it a try using our service to feel the difference.
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
