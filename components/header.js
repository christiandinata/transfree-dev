import Head from 'next/head';

const Header = () => (
  <div>
    <Head>
      <title>Transfree - International Transfer Made Fast and Free</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <link href="../static/misc/flag-icon-css/css/flag-icon.min.css" rel="stylesheet"/>
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
        background-color: #F6F8FB;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      h1, h2, h3, h4, b, .bold, button {
        font-family: 'Campton-Bold', sans-serif;
        font-weight: 700;
        color: #15233C;
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
        background-color: #469DDD;
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

      .btn-secondary {
        background: transparent;
        border: 2px solid #469DDD;
        color: #469DDD;
        padding: 8px 18px;
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

      .row:after {
        content: "";
        display: table;
        clear: both;
      }

      ul > li > a {
        color: #469DDD;
        text-decoration: none;
        transition: 0.2s ease-in;
      }

      ul > li > a:hover {
        color: #5FB4F3;
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
        margin-top: 20px;
        width: 100%;
        font-family: 'Campton-Book', sans-serif;
        font-size: 22px;
        color: #15233C;
        border: none;
        padding: 12px;
        box-sizing: border-box;
      }

      .converter-container input:focus {
        outline: none;
      }

      .converter-container .source-container input {
        border-radius: 4px 0 0 4px;
        border-right: 2px solid #15233C;
      }

      .converter-container .destination-container input {
        border-radius: 0 4px 4px 0;
      }

      .converter-container-order input {
        margin-top: 20px;
        width: 100%;
        font-family: 'Campton-Book', sans-serif;
        font-size: 22px;
        color: #15233C;
        border: none;
        padding: 12px;
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
        margin-left: 30px;
      }

      .form-container label {
        font-size: 14px;
        text-transform: uppercase;
      }

      .form-container input {
        width: 100%;
        border: none;
        font-size: 16px;
        padding: 15px 0;
        border-bottom: 1px solid #eaeaea;
        font-family: "Campton-Book", sans-serif;
      }

      .form-container input:focus {
        outline: none;
        border-bottom: 1px solid #469DDD;
      }

      .form-container input.error {
        border-bottom: 1px solid red;
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
    `}</style>
  </div>
)

export default Header
