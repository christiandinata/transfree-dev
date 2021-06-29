import Head from 'next/head';

//Menampilkan tulisan yang berada di component head
const Header = () => (
  <div>
    <Head>
      <title>Transfree - Transfer Free Overseas</title>
      <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate, max-age=4" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <link rel="icon" href="../static/images/tr2_1.png"/>
      <link href="../static/misc/flag-icon-css/css/flag-icon.min.css" rel="stylesheet"/>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      <meta name="description" content="International money transfer service to various worlds with a very cheap, fast and reliable process. Currently Transfree serves transfers to several currencies, such as: MYR (Malaysian Ringgit), GBP (British Pound Sterling), USD (US Dollar), AUD (Australian Dollar), EUR (European Euro), and HKD (Hongkong Dollar)"/>

    </Head>
    <style jsx global>{`
      @font-face {
        font-family: 'Avenir LT Pro';
        src: url('../static/fonts/AvenirLTProBook.otf');
      }

      @font-face {
        font-family: 'Avenir LT Pro Bold';
        src: url('../static/fonts/AvenirLTProHeavy.otf');
      }

      @font-face {
        font-family: 'Avenir LT Pro Black';
        src: url('../static/fonts/AvenirLTProBlack.otf');
      }

      body {
        font-family: "Avenir LT Pro", sans-serif; 
        line-height: 1.6;
        letter-spacing: 0.2px;
        color: #3E495E;
        margin: 0px ;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-color: #F3F5F7;
      }

      input, button{
        font-family: "Avenir LT Pro", sans-serif; 
      }
      
      h1, h2, h3, h4, b, .bold{
        font-family: 'Avenir LT Pro Bold', sans-serif;
      }
      
      button:hover {
        cursor: pointer;
        opacity: 0.8;
      }
      .container {
        width: auto;
        margin: 0px auto;
      }
      button:focus {
        outline: none;
      }
      .btn-primary {
        background-color: #46B2E0;
        border:  3px #46B2E0;
        color: white;
        padding: 10px 20px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 12px;
        border-radius: 4px;
        transition: all 0.2s ease-in-out;
        box-shadow: 0 1px 3px 0 rgba(0,0,0,0.08), 0 4px 6px 0 rgba(21,35,60,0.15);
      }
      .btn-secondary-login {
        background: transparent;
        border: 2px solid #FFFFFF;
        color: #469DDD;
        padding: 8px 18px;
        text-align: center;
        text-decoration: none;
        font-size: 16px;
        border-radius: 24px;
        transition: all 0.2s ease;
        margin-left:10px;
      }
      .btn-secondary {
        background:  #FAAF40;
        border: 3px solid #FAAF40;
        color: #FFFFFF;
        padding: 5px 18px ;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        border-radius: 4px;
        transition: all 0.2s ease;
        
      }
      .btn-tertiary {
        background-color: #EBF6FB;
        color: #469DDD;
        border: none;
        padding: 10px 20px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        border-radius: 4px;
        transition: all 0.2s ease;
      }
      .btn-disabled {
        background-color: #DADADA;
        border: none;
        color: white;
        padding: 10px 20px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        border-radius: 4px;
        transition: all 0.2s ease-in-out;
        box-shadow: 0 1px 3px 0 rgba(0,0,0,0.08), 0 4px 6px 0 rgba(21,35,60,0.15);
      }
      .btn-primary:hover,
      .btn-secondary:hover,
      .btn-tertiary:hover {
        transform: translateY(-1px);
      }
      .btn-primary:hover {
        background-color: #5FB4F3;
      }
      .btn-secondary:hover {
        border: 2px solid #5FB4F3;
        color: #5FB4F3;
      }
      .btn-danger {
        background: #DC2020;
        color: #FFF;
        padding: 8px 18px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        border-radius: 4px;
        transition: 0.2s;
        width: 100%;
        padding: 15px 0;
        margin-top: 15px;
      }
      .row:after {
        content: "";
        display: table;
        clear: both;
      }
      ul > li > a {
        color: #000000;
        text-decoration: none;
        transition: 0.2s ease-in;
        font-family: "Avenir LT Pro", sans-serif; 
        font-weight: bold;
      }
      ul > li > a:hover {
        color: #000000;
      }
      .react-phone-number-input__row {
        width: 100%;
        margin-bottom: 30px;
        border: none;
      }
      .react-phone-number-input__input {
        padding: 15px 0;
        font-family: "Avenir LT Pro", sans-serif;
        font-size: 16px;
      }
      .react-phone-number-input__icon {
        margin-top: 5px;
        height: initial;
        border: 0;
      }
      ::placeholder {
        color: #CACACA;
      }
      .converter-container input {
        width: 100%;
        font-family: 'Avenir LT Pro', sans-serif;
        font-size: 22px;
        color: #15233C;
        border: none;
        padding: 0 10px 10px;
        box-sizing: border-box;
      }
      .converter-container input:focus {
        outline: none;
      }
      .converter-container .source-container input,
      .converter-container .destination-container input {
        border-radius: 4px 0 0 4px;
      }
      .converter-container-order input {
        width: 100%;
        font-family: 'Avenir LT Pro', sans-serif;
        font-size: 22px;
        color: #15233C;
        border: none;
        padding: 0 10px 10px;
        box-sizing: border-box;
        background-color: #ECECEE;
      }
      .converter-container-order input:focus {
        outline: none;
      }
      .converter-container-order .source-container input {
        border-radius: 4px 0 0 4px;
        border-right: 2px solid #FFF;
      }
      .converter-container-order .destination-container input {
        border-radius: 0 4px 4px 0;
      }
      .converter-container .flag-icon.flag-icon-squared,
      .converter-container-order .flag-icon.flag-icon-squared {
        border-radius: 50%;
        border: 1px solid #EAEAEA;
        width: 34px;
        height: 34px;
        margin-right: 10px;
      }
      .svg-inline--fa.caret {
        margin-left: 10px;
      }
      .accordion__button {
        width: auto;
        background-color: #EDF0F3;
      }
      .accordion__button:focus {
        outline: none;
      }
      .box-title{
        width: 389px;
        padding:12px 25px 12px 25px;
        display:flex;
        justify-content:center;
        border-radius:2px 2px 2px 2px;
        background:#FAAF40;
        color:#FFFFFF;
        font-size:30px;
        font-family: "Avenir LT Pro", sans-serif;
        font-weight:700;       
      }

      .form-container h1{
        font-size:20px;
      }

      //show and hide password
      .pass-wrapper {
        position: relative;
        display: flex;
        // margin-bottom: 14px;
        flex-direction:row;
      }
      
      i {
        position: absolute;
        top: 0px;
        right: 6%;
        width:20px;
      }

      i:hover {
        color: #FAAF40;
        cursor: pointer;
      }

      .form-container {
        width: 335px;
        height: auto;
        padding: 0px 50px 30px 50px;
        background: #FFFFFF;
        border:1px solid grey;
        box-shadow: 0 10px 40px 0px rgba(0,0,0,0.10);
        border-radius: 0px 0px 32px 32px;
        border-top:none;
        
      }
      .form-container label {
        font-size: 14px;
        text-transform: uppercase;
        // margin-bottom:-10px;
      }
      .rectangle {
        width:580px;
        height:90px;
        background:#FAAF40;
        border-radius: 8px;
        text-align:center;
        z-index:5;
    }

      .form-container input,
       .form-container textarea {
         width: 100%;
        //  margin-bottom: 20px;
         border: none;
         font-size: 16px;
         padding: 10px 0;
         border-bottom: 1px solid #eaeaea;
         font-family: 'Avenir LT Pro', sans-serif;
         font-color:#707070;
         
       }
       .form-container input:focus,
       .form-container textarea:focus {
         outline: none;
         border-bottom: 1px solid #469DDD;
       }
      ::placeholder {
        color: #CACACA;
      }
      .btn-primary {
        width: 100%;
        padding: 15px 0;
        margin: 19px 1px;
      }

      .form-container .btn-primary {
        width: 100%;
        padding: 8px 0;
         margin: 0px;
         font-size:18px;
         border-radius:12px 12px;
         color:#FFFFFF;
         font-size:20px;
         font-family: "Avenir LT Pro", sans-serif;
         font-weight:700;    
         
      }
      .right .form-container p {
        margin: 5px 0;
      }
      .right  .link {
        color: #469DDD;
        font-family: "Avenir LT Pro", sans-serif;
        font-weight:600;
        // text-decoration: none;
        
      }

    
      .error-container {
        width: 400px;
        height: auto;
        padding: 10px;
        // margin-bottom: 30px;
        background-color: #FF3A43;
        color: #FFF;
        border-radius: 8px;
        display: none;
      }
      .success-container {
        width: 400px;
        height: auto;
        padding: 20px;
        margin-bottom: 30px;
        background-color: #4BB543;
        color: #FFF;
        border-radius: 8px;
        display: none;
      }
      .error-show,
      .success-show {
        display: block;
      }
      .container-fluid {
        // display: flex;
        // height: 100vh;
        align-items: center;
      }
      .container-fluid p {
        max-width: 500px;
        text-align: center;
      }
      .container-fluid h1 {
        margin: 10px auto;
      }
      .logo img {
        height: 28px;
        margin: 10px auto;
      }
      ul.pagination {
        list-style-type: none;
      }
      ul.pagination  li {
        display: inline-block;
      }
      ul.pagination li a {
        padding: 8px 16px;
      }
      ul.pagination li.active a {
        background-color: #469DDD;
        border-radius: 2px;
        color: white;
      }
      ul.pagination li a:hover {
        background-color: #eaeaea;
        border-radius: 2px;
      }

   
      @media only screen and (max-width: 414px) {
        h1 {
          font-size: 18.5px;
        }
        .container,
        .container-fluid {
          width: 355px;
          flex-direction: column;
          margin: 0 auto;
        }

        .logo img{
          display:none;
        }

        .form-container label {
          display:flex;
          
        }

       

        .container-fluid{
           background-image: url('../static/images/testimoni/background.png');
           background-size:cover;
            justify-content:center;
           background-repeat:no-repeat;
          //  align-items: center;
           margin:0 auto;
           padding:0px;
           width:auto;
           z-index:-1;
        }
        .feature {
          flex-direction: column;
        }
        .exchange-container {
          flex-direction: column;
          flex-basis: 0;
        }
        .converter-cta {
          flex-direction: column;
        }
        .features-container {
          flex-direction: column;
        }
        .container-fluid h1 {
          margin: 15px auto;
        }
        .right p {
          margin: 15px auto;
        }
        .form-container {
          width: 315px;
          padding: 15px;
        
        }
        .box-title{
          width: 320px;
          padding: 20px;
          margin-top:30px;
          border-radius: 2px 2px 2px 2px;
        }

        .box-title{
          font-size:20px;
        }
        .error-container,
        .success-container {
          width: 85%;
        }

        .form-container{
           margin-bottom:10px;
        }

        .form-container{
          border-radius: 0px 0px 0px 0px;
        }

        .form-container .btn-primary{
          padding:18px;
        }       

    

     
       
      }
    `}</style>
  </div>
)
//Mengirimkan header
export default Header