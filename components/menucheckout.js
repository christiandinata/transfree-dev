import Link from 'next/link';

const MenuCheckout = () => (
  <div className="row">
    <div className="container">
      <div className="header-container">
        <div className="logo">
            <Link href="/myaccount"><a><img src="../static/images/transfree-logo.png" alt="logo"/></a></Link>
        </div>
        <div className="header-menu">
        </div>
        <div className="header-cta">
          <ul>
            <li>Adhi Wicaksono</li>
          </ul>
        </div>
      </div>
    </div>
    <style jsx>{`
        .row {
          border-bottom: 1px solid #eaeaea;
        }

        .header-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 75px;
          background-color: #F6F8FB;
        }

        .logo {
          display: flex;
          justify-content: flex-start;
          flex-grow: 1;
        }

        .logo img {
          height: 37px;
        }

        .header-menu {
          display: flex;
          justify-content: center;
          flex-grow: 8;
        }

        .header-cta {
          display: flex;
          justify-content: flex-end;
          flex-grow: 1;
        }

        ul {
          list-style-type: none;
          margin: 0;
          padding: 0;
        }

        li {
          display: inline;
          margin: 0 30px;
        }

        li > img{
          height: 20px;
        }

        .header-cta a {
          margin: 0 5px;
        }

      `}</style>
  </div>
)

export default MenuCheckout
