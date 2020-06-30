import Header from '../components/header.js';
import Menu from '../components/menu.js';
import Footer from '../components/footer.js';
import Link from 'next/link';


const Terms = () => (
  <div>
    <Header />
    <Menu/>
    <div className="row">
      <div className="slide">
      <div className="margin"><img src="../static/ppt/slide1.PNG"/></div>
      <div className="margin"><img src="../static/ppt/slide2.PNG"/></div>
      <div className="margin"><img src="../static/ppt/slide3.PNG"/></div>
      <div className="margin"><img src="../static/ppt/slide4.PNG"/></div>
      <div className="margin"><img src="../static/ppt/slide5.PNG"/></div>
      <div className="margin"><img src="../static/ppt/slide6.PNG"/></div>
      <div className="margin"><img src="../static/ppt/slide7.PNG"/></div>
      <div className="margin"><img src="../static/ppt/slide8.PNG"/></div>
      <div className="margin"><img src="../static/ppt/slide9.PNG"/></div>
      <div className="margin"><img src="../static/ppt/slide10.PNG"/></div>
      <div className="margin"><img src="../static/ppt/slide11.PNG"/></div>
      <div className="margin"><img src="../static/ppt/slide12.PNG"/></div>
      <div className="margin"><img src="../static/ppt/slide13.PNG"/></div>
      <div className="margin"><img src="../static/ppt/slide14.PNG"/></div>
      </div>
    </div>
    <style jsx>{`
      .row {
        padding: 50px 0 100px;
        background: #F6F8FB;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to bottom, #F6F8FB, #FFF);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to bottom, #F6F8FB, #FFF); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
      }
      .slide{
        margin: -40px 0px -200px 200px;
        width: 100%;
      }
      .margin{
        margin-bottom: 100px;
      }
    `}</style>
    <Footer />
  </div>
);

export default Terms;
