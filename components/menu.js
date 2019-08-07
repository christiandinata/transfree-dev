import Link from 'next/link';
import { connect } from 'react-redux';
import authActions from '../redux/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';

const Menu = ({isAuthenticated, isApproved, deauthenticate}) => (
  <div className="row">
    <div className="container">
      <div id="menuToggle">
        <div className="main-cta">
          {!isAuthenticated && <Link href="/login"><a className="btn-secondary">Log in</a></Link>}
          {isAuthenticated && <li><Link href="/logout"><a>Logout</a></Link></li>}
        </div>
        <input type="checkbox" />

        <span></span>
        <span></span>
        <span></span>

        <ul id="menu">
          {!isAuthenticated && <li><Link href="/about"><a>About</a></Link></li>}
          {!isAuthenticated && <li><Link href="/faq"><a>FAQ</a></Link></li>}
          {/* !isAuthenticated && <li><Link href="/"><a>How it works</a></Link></li> */}
          {isAuthenticated && isApproved && <li><Link href="/order"><a>Send money</a></Link></li>}
          {isAuthenticated && isApproved && <li><Link href="/account"><a>Transactions</a></Link></li>}
          <hr/>
          {!isAuthenticated && <li><Link href="/login"><a>Log in</a></Link></li>}
          {!isAuthenticated && <li><Link href="/signup"><a>Signup</a></Link></li>}
          {isAuthenticated && <li><Link href="/logout"><a>Logout</a></Link></li>}
        </ul>
      </div>
      <div className="header-container">
        <div className="logo">
            {(isAuthenticated && (<Link href="/"><a><img src="../static/images/transfree-logo.png"/></a></Link>)) ||
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
          flex-grow: 1;
        }

        .header-cta {
          display: flex;
          justify-content: flex-end;
          flex-grow: 1;
        }

        .btn-primary {
          width: auto;
          padding: 10px 20px;
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

        hr {
          border: 1px solid #eaeaea;
        }

        // MENU Start
        #menuToggle
        {
          display: none;
          position: relative;
          top: 50px;
          left: 50px;

          z-index: 100;

          -webkit-user-select: none;
          user-select: none;
        }

        #menuToggle input
        {
          display: block;
          width: 40px;
          height: 32px;
          position: absolute;
          top: -7px;
          left: -5px;

          cursor: pointer;

          opacity: 0; /* hide this */
          z-index: 2; /* and place it over the hamburger */

          -webkit-touch-callout: none;
        }

        /*
         * Just a quick hamburger
         */
        #menuToggle span
        {
          display: block;
          width: 33px;
          height: 4px;
          margin-bottom: 5px;
          position: relative;

          background: #cdcdcd;
          border-radius: 3px;

          z-index: 1;

          transform-origin: 4px 0px;

          transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                      background 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                      opacity 0.55s ease;
        }

        #menuToggle span:first-child
        {
          transform-origin: 0% 0%;
        }

        #menuToggle span:nth-last-child(2)
        {
          transform-origin: 0% 100%;
        }

        /*
         * Transform all the slices of hamburger
         * into a crossmark.
         */
        #menuToggle input:checked ~ span
        {
          opacity: 1;
          transform: rotate(45deg) translate(-2px, -1px);
          background: #232323;
        }

        /*
         * But let's hide the middle one.
         */
        #menuToggle input:checked ~ span:nth-last-child(3)
        {
          opacity: 0;
          transform: rotate(0deg) scale(0.2, 0.2);
        }

        /*
         * Ohyeah and the last one should go the other direction
         */
        #menuToggle input:checked ~ span:nth-last-child(2)
        {
          transform: rotate(-45deg) translate(0, -1px);
        }

        /*
         * Make this absolute positioned
         * at the top left of the screen
         */
        #menu
        {
          position: absolute;
          width: 300px;
          margin: -100px 0 0 -50px;
          padding: 50px;
          padding-top: 125px;

          background: #ededed;
          list-style-type: none;
          -webkit-font-smoothing: antialiased;
          /* to stop flickering of text in safari */

          transform-origin: 0% 0%;
          transform: translate(-100%, 0);

          transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0);
        }

        #menu li
        {
          padding: 10px 0;
          font-size: 22px;
          display: block;
        }

        /*
         * And let's slide it in from the left
         */
        #menuToggle input:checked ~ ul
        {
          transform: none;
        }

        #menuToggle .main-cta {
          position: absolute;
          right: 0;
        }

        #menuToggle {
          padding-bottom: 30px;
          border-bottom: 1px solid #eaeaea;
        }
        // MENU End
        @media only screen and (max-width: 414px) {
          #menuToggle {
            display: block;
          }
          .header-container {
            display: none;
          }
          li {
            display; block;
          }
          #menu {
            height: 100vh;
            width: 100%;
            background-color: #F6F8FB;
          }
          .row {
            border: none;
          }
          #menuToggle {
            top: 20px;
            left: 0;
          }
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
