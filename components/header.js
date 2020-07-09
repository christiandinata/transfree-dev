import Head from 'next/head';

const Header = () => (
  <div>
    <Head>
      <title>Transfree - International Transfer Made Fast and Free</title>
      <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate, max-age=4" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <link rel="icon" href="../static/images/icon-logo.png"/>
      <link href="../static/misc/flag-icon-css/css/flag-icon.min.css" rel="stylesheet"/>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />

    </Head>
    <style jsx global>{`
      @font-face {
        font-family: 'Campton-Book';
        src: url('../static/fonts/Campton_Book.otf');
      }
      @font-face {
        font-family: 'Campton-Bold';
        src: url('../static/fonts/Campton_Bold.otf');
      }
      body {
        font-family: 'Campton-Book', sans-serif;
        line-height: 1.6;
        letter-spacing: 0.2px;
        color: #3E495E;
        margin: 0;
        background-color: #FFFFFF;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      h1, h2, h3, h4, b, .bold, button {
        font-family: 70px 'Campton-Bold', sans-serif;
        font-weight: 900;
        color: #000000;
      }
      a {
        font-family: 'Campton-Bold', sans-serif;
        color: #469DDD;
        text-decoration: none;
      }
      button:hover {
        cursor: pointer;
      }
      .container {
        width: 1124px;
        margin: 0 auto;
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
        font-size: 16px;
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
        font-size: 25px;
        font-family: 'Campton-Bold', sans-serif;
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
        font-family: "Campton-Book", sans-serif;
        font-size: 16px;
      }
      .react-phone-number-input__icon {
        margin-top: 5px;
        height: initial;
        border: 0;
      }
      .react-datepicker-wrapper,
      .react-datepicker__input-container {
        width: 100%;
      }
      .react-datepicker__input-container input {
        width: 100%;
        margin-bottom: 30px;
        border: none;
        font-size: 16px;
        padding: 15px 0;
        border-bottom: 1px solid #eaeaea;
        font-family: "Campton-Book", sans-serif;
      }
      .react-datepicker__input-container input:focus {
        outline: none;
        border-bottom: 1px solid #469DDD;
      }
      ::placeholder {
        color: #CACACA;
      }
      .converter-container input {
        width: 100%;
        font-family: 'Campton-Book', sans-serif;
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
        font-family: 'Campton-Book', sans-serif;
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
      .accordion__button:hover {
        background-color: #E0E4E8;
      }

      // Sign up
      .box-title{
        width: 625px;
        height:30px;
        padding:30px;
        background-color: #FAAF40;
        border-radius:8px;
        align-items: center;
        justify-content: center;
        display:flex;
        
      }
      .box-title h1{
        font-weight:900px;
        color:#FFFFFF;
        font-size:50px;
      }
      .form-container {
        width: 500px;
        height: auto;
        padding: 0px 90px 70px 90px;
        background: #FFFFFF;
        border : 2px solid grey;
        box-shadow: 0 10px 30px 0 rgba(0,0,0,0.10);
        border-radius: 8px;
        border-top-style: none;
      }
      .form-container label {
        font-size: 14px;
        text-transform: uppercase;
      }
      .form-container input,
       .form-container textarea {
         width: 100%;
         margin-bottom: 30px;
         border: none;
         font-size: 23px;
         padding: 15px 0;
         border-bottom: 1px solid #eaeaea;
         font-family: "Campton-Book", sans-serif;
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
      .right p {
        margin: 30px 0;
      }
      .right .link {
        color: #469DDD;
        text-decoration: none;
      }
      .error-container {
        width: 400px;
        height: auto;
        padding: 20px;
        margin-bottom: 30px;
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
        display: flex;
        height: 100vh;
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
        margin: 50px auto;
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
          padding: 10px;
          margin: 0 auto;
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
          width: 305px;
          padding: 15px;
        }
        .box-title{
          width: 305px;
          padding: 15px;
        }
        .error-container,
        .success-container {
          width: auto;
        }
      }
    `}</style>
  </div>
)

export default Header