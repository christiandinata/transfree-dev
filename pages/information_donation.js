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
            <Link href="/donation">
                <a style={{paddingRight: "35px",paddingLeft: "35px",paddingTop: "9.5px",paddingBottom: "9.5px"}} className="btn-secondary-2">Donate Now</a>
            </Link>
            </div>
        </div>
        <br></br>
        <img src="../static/images/info-donation.jpeg" height="600" width="600"/>
        
        <p>
            BERSAMA TANGGAP CORONA
        </p>
        <p>
            PPI UK bersama dengan Mata Garuda LPDP dan Transfree berkolaborasi
            untuk mengajak seluruh pelajar untuk #tanggapcorona
        </p>
        <p>
        Yuk berikan donasimu dalam bentuk GBP yang akan dikirim dan dikonversikan
        dengan kurs tengah tanpa fee, melalui
        <a href="https://transfree.id/">&nbsp; www.transfree.id &nbsp;</a>
        Klik Tab Berwarna Hijau Donation for Corona
        </p>
        <p>
        Kamu juga bisa berkontribusi berupa 
        - Masker dan Hand Sanitizer ke 
        Gedung LPDP Danadyaksa Cikini  Jl. Cikini Raya No.91, RT.1/RW.2 a.n. Husni (081281979884, mohon konfirmasi sebelum melakukan pengiriman) 
        - Uang Rupiah 
        ke Rekening:
        BRI a/n Yayasan Mata Garuda
        0417010000370307
        Dengan menambahkan 1 rupiah di setiap akhir donasi
        </p>
        <p>
        Distribusi penyebaran I dilakukan pada 22 Maret 2020.
        Distribusi selanjutnya dilakukan setiap minggu hingga tanggal 15 April 2020
        </p>
        <p>
        #Bergerakbersama
        #Tanggapcorona
        #MatagarudaLPDP
        </p>
      </div>
    </div>
    <style jsx>{`
        
        .btn-secondary-2 {
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
            margin-left: 414px;
            
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
