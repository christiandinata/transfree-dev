import Header from '../components/header.js';
import Menu from '../components/menu.js';
import Footer from '../components/footer.js';

//Menampilkan tulisan-tulisan dibawah ini
const About = () => (
  <div>
    <Header />
    <Menu/>
    <div className="row">
      <div className="container">
        <h1 className="middle">Testimoni</h1>
        <div className="row features">
          <div className="features-container">
              <div className="feature-item">
                <img src="../static/images/mahdi.png" className="border"/>
                <h2>Mahdi</h2>
                <p className="font">As a customer I feel satisfied for the service. It is secure and I get my money in less than 24 hours.</p>
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <div className="feature-item">
                <img src="../static/images/hasiando.png" className="border"/>
                <h2>Hasiando</h2>
                <p className="font">Saya menggunakan transfree beberapa kali dan pelayanannya oke, rate bagus dan aman.</p>
              </div> 
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <div className="feature-item">
                    <img src="../static/images/riahna.png" className="border"/>
                <h2>Riahna</h2>
                <p className="font">Dulu menggunakan transfree sewaktu membayar deposit rumah dan juga bayar sewa rumah. Sempat agak ragu akan keamanan nya.  Tetapi karena founder nya sesama awardee LPDP, akhirnya saya menggunakan jasa transfree karena kalaupun ada tipu menipu mudah melacaknya. Dan beberapa kali aman-aman saja dan juga cepat.</p>  
              </div>
            </div>
            <div className="features-container">
              <div className="feature-item">
              <br></br><br></br> <br></br> <img src="../static/images/adi.png" className="border"/>
                <h2>Adi Sepang</h2>
                <p className="font">My experience with Transfree was flawless. It was easy to use and gave me a good value for money.</p>  
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <div className="feature-item">
              <br></br><br></br> <br></br>  <img src="../static/images/iqbal.png" className="border"/>
                <h2>Iqbal</h2>
                <p className="font">I used transfree several times and had a good experience using it. I get the currency rate I want</p>  
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <div className="feature-item">
              <br></br><br></br><br></br>   <img src="../static/images/hendry.png" className="border"/>
                <h2>Hendry S</h2>
                <p className="font">Fast Response and gives a better rate. I get my money transferred in less than 24 hours</p>  
              </div>
            </div>
            <div className="features-container">
             <div className="feature-item">
             <br></br><br></br><br></br>   <img src="../static/images/zhabrinna.png" className="border"/>
                <h2>Zhabrinna</h2>
                <p className="font">It is simple and I get a better rate than Transferwise with of course a very fast transfer system!</p>  
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <div className="feature-item">
              <br></br><br></br><br></br>    <img src="../static/images/mukti.png" className="border"/>
                <h2>Mukti</h2>
                <p className="font">Good service and competitive rate. The transfer process is also fast. It's very helpful for those who want transfer money from Indonesia to UK and vice versa.</p>  
              </div>    
              </div>
        </div>
      </div>
    </div>
    <style jsx>{`
    .border{
        border-radius: 100%;
    }
    .font{
        font-size:small;
        text-align:justify;
    }
    .middle{
        text-align: center;
    }
     .feature-item {
        flex-basis: 33.33%;
        position:center;
        
      }

    .features-container {
        display: flex;
        text-align: center;
      }
    .left{
        margin-left:20px;
    }
    .testimoni-1{
        width: 100%;
        position: relative;
        top: 0px;
        bottom: 0px;
    }
    .features-container.jsx-1559367557 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        text-align: center;
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
        color:#000000;
      }
    `}</style>
    <Footer />
  </div>
);

export default About;
