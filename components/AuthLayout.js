import Link from 'next/link';
import Header from '../components/header.js';

const AuthLayout = ({ children }) => (
  <div>
    <Header />
    <div className="container-fluid">
      <div className="left">
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
        height: 100vh;
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

      @media only screen and (max-width: 414px) {
        .left {
          display: none;
        }
      }
    `}</style>
  </div>
);

export default AuthLayout;
