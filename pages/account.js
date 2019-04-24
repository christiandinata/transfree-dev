import Header from '../components/header.js';
import MenuAccount from '../components/menuaccount.js';
import Link from 'next/link';

const Account = () => (
  <div>
    <Header />
    <MenuAccount />
    <div className="container-fluid">
      <div className="content">
        <div className="big-icon">
          <img src="../static/images/happy.svg"/>
        </div>
        <h1>No transactions</h1>
        <p>You haven’t sent money using Transfree. Get started now and enjoy fast and cheap international money transfer. </p>

        <Link href="/send">
          <a className="btn-primary">Send money now</a>
        </Link>
      </div>
    </div>
    <style jsx>{`
      .container-fluid {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        align-items: center;
        justify-content: center;
      }

      .logo {
        width: 100%;
        text-align: center;
      }
      .logo img {
        height: 28px;
        margin: 50px auto;
      }

      p {
        max-width: 600px;
        text-align: center;
        margin-bottom: 50px;
      }

      h1 {
        margin: 0;
      }

      .content {
        margin-top: -135px;
        text-align: center;
      }
    `}</style>
  </div>
)

export default Account
