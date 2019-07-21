import Link from 'next/link';
import Header from '../components/header.js';

const AuthLayout = ({ children }) => (
  <div>
    <Header />
    <div className="container-fluid">
      <div className="left">
        <Link href="/">
          <a><img src="../static/images/transfree-logo.png"/></a>
        </Link>
      </div>
      <div className="right">
        {children}
      </div>
    </div>
    <style jsx>{`
      .container-fluid {
        display: flex;
        min-height: 100vh;
      }

      .left,
      .right {
        flex-basis: 50%;
      }

      .left {
        background-image: url('../static/images/people.jpg');
        background-size: cover;
        text-align: center;
      }

      .left img {
        height: 37px;
        margin: 50px auto;
      }

      .right {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    `}</style>
  </div>
);

export default AuthLayout;
