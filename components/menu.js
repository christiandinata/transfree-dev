import Link from 'next/link';
import { connect } from 'react-redux';
import authActions from '../redux/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';

const Menu = ({isAuthenticated, isApproved, deauthenticate}) => (
  <div className="row">
    <div className="container">
      <div className="header-container">
        <div className="logo">
            {(isAuthenticated && (<Link href="/account"><a><img src="../static/images/transfree-logo.png"/></a></Link>)) ||
             (<Link href="/"><a><img src="../static/images/transfree-logo.png"/></a></Link>)}
        </div>
        <div className="header-menu">
          <ul>
            {!isAuthenticated && <li><Link href="/about"><a>About</a></Link></li>}
            {!isAuthenticated && <li><Link href="/faq"><a>FAQ</a></Link></li>}
            {/* !isAuthenticated && <li><Link href="/"><a>How it works</a></Link></li> */}
            {isAuthenticated && isApproved && <li><Link href="/order"><a>Send money</a></Link></li>}
            {isAuthenticated && isApproved && <li><Link href="/account"><a>Transactions</a></Link></li>}
          </ul>
        </div>
        <div className="header-cta">
          {!isAuthenticated && <Link href="/login"><a className="btn-secondary">Log in</a></Link>}
          {!isAuthenticated && <Link href="/signup"><a className="btn-primary">Sign up</a></Link>}
          {isAuthenticated && <li><Link href=""><a><FontAwesomeIcon icon="bell"/></a></Link></li>}
          {isAuthenticated && <li><Link href="/logout"><a>Logout</a></Link></li>}
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

const mapStateToProps = (state) => {
  return {
    isAuthenticated: !!state.authentication.token,

  }
}

export default connect(mapStateToProps, authActions)(Menu);
