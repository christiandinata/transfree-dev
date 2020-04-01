import Header from '../components/header.js';
import Menu from '../components/menu.js';
import Footer from '../components/footer.js';
import Link from 'next/link';
const About = () => (
  <div>
    <Header />
    <Menu/>
    <div className="row">
      <div className="container">
        {/* <h1>Information Donation</h1> */}
        <div className="external-link">
            <div className="external-link-right">
            <Link href="/send_lives">
                <a style={{paddingRight: "35px",paddingLeft: "35px",paddingTop: "9.5px",paddingBottom: "9.5px"}} className="btn-secondary-3">I'm Interested</a>
            </Link>
            </div>
        </div>
        
        <p>
          As the COVID-19 entered Indonesia weeks ago, we realized that it has affected  the economics condition in our country. 
          Inevitably, it creates an insanely exchange rate fluctuation and ended with a devaluation on Rupiah against USD, EUR, and GBP specifically. 
          It has come to our concern that we have to make a movement since we know that many of the customers are scholars that need to send money overseas for living cost.
        </p>
        <p>
          Therefore, during the next 2 weeks Transfree has decided to make #sendforliving movement to enable people sending money without fee and with mid-market rate. 
          We will not take profit from this social movement so we hope if you or someone you know need it, let’s join us and please help to spread the good news!
        </p>
        <p>
          please note:
          The stock for #sendforliving is limited based on availability. It comes with first come first serve basis. 
          However we will try to get as much stock as possible to serve all the demand.
        </p>
        <p>
          more info please contact (whatsapp) +44 7490 090659
        </p>
        
      </div>
    </div>
    <style jsx>{`
        
        .btn-secondary-3 {
            background: #32cd32d4;
            border: none;
            color: white;
            padding: 8px 18px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            border-radius: 4px;
            transition: all 0.2s ease-in-out;
            box-shadow: 0 1px 3px 0 rgba(0,0,0,0.08), 0 4px 6px 0 rgba(21,35,60,0.15);
            margin-left: 453px;
            
          }
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
        text-align: justify;
      }
    `}</style>
    <Footer />
  </div>
);

export default About;
