import Head from 'next/head';

const Header = () => (
  <div>
    <Head>
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
        line-height: 1.5;
        letter-spacing: 0.2px;
        color: #3E495E;
        margin: 0;
        background-color: #F6F8FB;
      }

      h1, h2, h3, h4, li, a, b, .bold {
        font-family: 'Campton-Bold', sans-serif;
        color: #15233C;
      }

      .container {
        width: 1124px;
        margin: 0 auto;
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
        transition: 0.2s;
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
        transition: 0.2s;
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
        transition: 0.2s;
      }

      .btn-primary:hover,
      .btn-secondary:hover {
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
    `}</style>
  </div>
)

export default Header
