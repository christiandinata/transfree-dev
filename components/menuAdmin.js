import Link from 'next/link';
import { connect } from 'react-redux';
import authActions from '../redux/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';

const MenuAdmin = ({deauthenticate}) => (
  <div className="row">
    <div className="container">
      <div className="header-container">
        <div className="logo">
          <Link href="/"><a><img src="../static/images/transfree-logo.png"/></a></Link>
        </div>
        <div className="header-menu">
          <ul>
            <li><Link href="/dashboard/users"><a>Users</a></Link></li>
            <li><Link href="/dashboard/userfill"><a>Requests</a></Link></li>
            <li><Link href="/dashboard/orders"><a>Orders</a></Link></li>
            <li><Link href="/dashboard/rates"><a>FX Margin</a></Link></li>
            <li><Link href="/dashboard/summary"><a>Customer Summary</a></Link></li>
            <li><Link href="/dashboard/notification"><a>Notification</a></Link></li>
            <li><Link href="/dashboard/formspecialevent"><a>Special Event Form</a></Link></li>
            {
            // <li><Link href="/"><a>Donations</a></Link></li>
            // <li><Link href="/"><a>Pages</a></Link></li>
            }
          </ul>
        </div>
        <div className="header-cta">
          <li><Link href=""><a><FontAwesomeIcon icon="bell"/></a></Link></li>
          <li><Link href="/logout"><a>Logout</a></Link></li>
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

        .header-cta a {
          margin: 0 5px;
        }

      `}</style>
  </div>
)

const mapStateToProps = (state) => {return {}}

export default connect(mapStateToProps, authActions)(MenuAdmin);
