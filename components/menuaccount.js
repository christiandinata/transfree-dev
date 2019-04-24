import Link from 'next/link';

const MenuAccount = () => (
  <div className="row">
    <div className="container">
      <div className="header-container">
        <div className="logo">
            <Link href="/account"><a><img src="../static/images/transfree-logo.png"/></a></Link>
        </div>
        <div className="header-menu">
          <ul>
            <li><Link href="/send"><a>Send money</a></Link></li>
            <li><Link href="/myaccount"><a>Transactions</a></Link></li>
          </ul>
        </div>
        <div className="header-cta">
          <ul>
            <li><img src="../static/images/ic-notification.svg"/></li>
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

export default MenuAccount
