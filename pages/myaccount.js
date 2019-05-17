import Header from '../components/header.js';
import MenuAccount from '../components/menuaccount.js';
import Link from 'next/link';

const MyAccount = () => (
  <div>
    <Header />
    <MenuAccount />
    <div className="container-fixed">
      <div className="list-header">
        <div className="left"><h2>Recent transactions</h2></div>
        <div className="right">
          <input type="text" placeholder="Search transactions"/>
        </div>
      </div>
      <form className="form-container">

        <div className="list-item">
          <div className="left">
            <div className="recipient">Transfer to <b>Jake Wharton</b></div>
            <div className="date">Completed, 24 April 2019</div>
          </div>
          <div className="right">
            <div className="source">1,000 GBP</div>
            <div className="destination bold">19,876,432.10 IDR</div>
          </div>
        </div>

        <div className="list-item">
          <div className="left">
            <div className="recipient">Transfer to <b>Budi Hariadi</b></div>
            <div className="date">Completed, 23 April 2019</div>
          </div>
          <div className="right">
            <div className="source">1,000 GBP</div>
            <div className="destination bold">19,876,432.10 IDR</div>
          </div>
        </div>

        <div className="list-item">
          <div className="left">
            <div className="recipient">Transfer to <b>Asti Ananta</b></div>
            <div className="date">Completed, 22 April 2019</div>
          </div>
          <div className="right">
            <div className="source">1,000 GBP</div>
            <div className="destination bold">19,876,432.10 IDR</div>
          </div>
        </div>

        <div className="list-item">
          <div className="left">
            <div className="recipient">Transfer to <b>Joko Purnomo</b></div>
            <div className="date">Completed, 22 April 2019</div>
          </div>
          <div className="right">
            <div className="source">1,000 GBP</div>
            <div className="destination bold">19,876,432.10 IDR</div>
          </div>
        </div>

        <div className="list-item">
          <div className="left">
            <div className="recipient">Transfer to <b>Krisna Risyaldi</b></div>
            <div className="date">Completed, 21 April 2019</div>
          </div>
          <div className="right">
            <div className="source">1,000 GBP</div>
            <div className="destination bold">19,876,432.10 IDR</div>
          </div>
        </div>

        <Link href="#">
          <a className="btn-tertiary">Load more</a>
        </Link>
      </form>
    </div>
    <style jsx>{`
      .container-fixed {
        max-width: 768px;
        margin: 100px auto;
      }

      .form-container {
        width: 768px;
        height: auto;
        margin: 30px auto;
        background: #FFFFFF;
        box-shadow: 0 10px 30px 0 rgba(0,0,0,0.10);
        border-radius: 8px;
        text-align: center;
      }

      .list-header {
        display: flex;
        width: 100%;
        font-size: 14px;
        margin-bottom: 30px;
      }

      .list-header div {
        flex-basis: 50%;
      }

      .list-header .right {
        text-align: right;
        align-self: flex-end;
      }

      .list-header a {
        text-decoration: none;
        color: #469DDD;
      }

      .list-item {
        display: flex;
        width: 100%;
        border-bottom: 1px solid #EAEAEA;
      }

      .list-item div {
        flex-basis: 50%;
        margin: 10px 0;
      }

      .list-item .left {
        text-align: left;
        margin-left: 20px;
      }

      .list-item .right {
        text-align: right;
        margin-right: 20px;
      }

      .bold {
        font-family: "Campton-Bold", sans-serif;
      }

      hr {
        display: block;
        height: 1px;
        border: 0;
        border-top: 1px solid #eaeaea;
        margin: 30px 0;
        padding: 0;
      }

      h2 {
        margin: 0;
      }

      .list-item .date {
        opacity: 0.7;
      }

      .btn-tertiary {
        margin: 20px auto;
      }

      input[type=text] {
        border: 1px solid #EAEDF2;
        font-size: 14px;
        padding: 8px 8px 8px 30px;
        border-bottom: 1px solid #eaeaea;
        font-family: "Campton-Book", sans-serif;
        background-color: #EAEDF2;
        border-radius: 8px;
        transition: all 0.4s ease-in-out;
        width: 200px;
        background-image: url('../static/images/ic-search.svg');
        background-position: 8px 8px;
        background-repeat: no-repeat;
      }

      input[type=text]:focus {
        outline: none;
        border: 1px solid #469DDD;
        background-color: #ECF3FA;
        width: 300px;
      }

      ::placeholder {
        color: #CACACA;
      }

    `}</style>
  </div>
)

export default MyAccount
