import Link from 'next/link';
import { connect } from 'react-redux';
import authActions from '../redux/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';

const Menu = ({isAuthenticated, isApproved, deauthenticate, username}) => (
  <div className="row">
    <div className="container">
      <div id="menuToggle">
        <div className="main-cta">
          <a href="/" ><img style={{height:"30px"}} src="../static/images/transfree-logo.png"/></a>
          {!isAuthenticated && <Link href="/login"><a className="btn-secondary">Log in</a></Link>}
          {isAuthenticated && <li><a href="/user-profile"><img className="profile-pic" src="../static/images/navbar/profile.png"/></a></li>}
        </div>
        <input type="checkbox" />

        <span></span>
        <span></span>
        <span></span>

        <ul id="menu">
          {!isAuthenticated && <li><Link href="/about"><a>How it works</a></Link></li>}
          {!isAuthenticated && <li><Link href="/faq"><a>About Us</a></Link></li>}

          {isAuthenticated && isApproved && <li><Link href="/order"><a>Send Money</a></Link></li>}
          {isAuthenticated && isApproved && <li><Link href="/account"><a>Transactions</a></Link></li>}
          <hr/>
          {!isAuthenticated && <li><Link href="/signup"><a className="btn-secondary-login">Sign up</a></Link></li>}
          {isAuthenticated && <li><Link href="/user-profile"><a className="btn-secondary-login">Profile</a></Link></li>}
          {isAuthenticated && <li><Link href="/logout"><a className="btn-secondary-login">Logout</a></Link></li>}
        </ul>
      </div>
      <div className="header-container">
        <div className="logo">
            {(!isAuthenticated && (<Link href="/"><a><img style={{height:"50px"}} src="../static/images/transfree-logo.png"/></a></Link>))}
            {(isAuthenticated && (<Link href="/home"><a><img style={{height:"50px"}} src="../static/images/transfree-logo.png"/></a></Link>))}
        </div>
        <div className="authorized-menu">
          <ul>
            {isAuthenticated && <li><Link href="/order"><a>Send Money</a></Link></li>}
            {isAuthenticated && <li><Link href="/account"><a>Transactions</a></Link></li>}
          </ul>
        </div>
        <div className="unauthorized-menu">
          <ul>
            {!isAuthenticated && <li><Link href="https://www.youtube.com/watch?v=8RzCs_sQ8Ak" target="_blank"><a>How it works</a></Link></li>}
            {!isAuthenticated && <li><Link href="/about"><a>About Us</a></Link></li>}
          </ul>
        </div>
        <div className="header-cta">
          {!isAuthenticated && <Link href="/login"><a id="login" className="btn-primary">Login</a></Link>}
          {!isAuthenticated && <Link href="/signup"><a id="signup" className="btn-primary">Sign Up</a></Link>}

          {isAuthenticated && <li><Link href="/user-profile"><a id="profile">{username}</a></Link></li>}
          {isAuthenticated && <li><a href="/user-profile"><img className="profile-pic" src="../static/images/navbar/profile.png"/></a></li>}

        </div>
      </div>
    </div>
    <style jsx>{`
        .btn-secondary {
          font-size: 12px;
          width: fit-content;
          margin-left: 8%;
        }
        
        .btn-secondary-login {
          background: transparent;
          border: 2px solid #FFFFFF;
          color: #469DDD;
          padding: 8px 18px;
          text-align: center;
          text-decoration: none;
          font-size: 16px;
          border-radius: 24px;
          transition: all 0.2s ease;
          margin-left:0px;
        }
        .row {
          border-bottom: 1px solid #FFFFFF;
          //  position: fixed;
          // top: 0;
          //  width: 100%;
        }
        .header-container {
          display: flex;
          position: fixed;
          // top: 0;
          width: auto;
          width: 99%;
          justify-content: center;
          align-items: center;
          height: 60px;
          padding:0 3.5% 0 0.5%;
          background-color: #FFFFFF;
          box-shadow: 0px 5px 10px 0px rgba(0,0,0,0.5);
          z-index:1000;
        }
        .logo {
          display: flex;
          justify-content: flex-start;
          flex-grow: 1;
        }
        .logo img {
          height: 37px;
        }
        .unauthorized-menu {
          justify-content: flex-end;
        }
        
        .authorized-menu {
          display: flex;
          justify-content: center;
          flex-grow: 10;
        }
        .profile-pic {
          height: 50px;
          vertical-align: middle;
        }
        .header-cta {
          justify-content: flex-end;
        }
        .btn-primary {
          width: auto;
          padding: 10px 20px;
        }
        
        #login {
          background-color: #FAAF40;
          border-color: #FAAF40;
          font-weight: bold;
        }
        
        #signup {
          background-color: #5BB7DE;
          border-color: #5BB7DE;
          font-weight: bold;
        }
        
        #profile {
          color: black;
          text-decoration: none;
        }
        
        ul {
          list-style-type: none;
          margin: 0;
          padding: 0;
        }
        .authorized-menu li {
          margin: 0 40px;
          display: inline;
          
        }
        
        .unauthorized-menu li {
          margin: 0 20px;
          display: inline;
        
        }
        
        .authorized-menu li a {
          font-family: "Open Sans", sans-serif;   
          color: black !important;
          text-decoration: none;
          font-size: 1.3rem;
          font-weight: 100;
          vertical-align: middle;
        }      
          
        .unauthorized-menu li a {

          font-family: "Open Sans", sans-serif;  

          color: black !important;
          text-decoration: none;
          font-weight:semi-bold;
        }
        
        .header-cta a {
          margin: 0 5px;
          color: white;
        }
        
        .header-cta li {
           display: inline;
        }
        hr {
          border: 1px solid #eaeaea;
        }
        // MENU Start
        #menuToggle
        {
          display: none;
          position: fixed;
          // left: 50px;
          z-index: 100;
          height: 5vh;
          // margin-left: 2%;
          // margin-top: 2.5%;
          
          -webkit-user-select: none;
          user-select: none;
          position:fixed;
          width:96%;
          background:#FFFFFF;
          //  display:flex;
          // justify-content:center;
           padding:10px;
           align-items:center;
          // margin:30px;
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
          width: 40px;
          height: 15%;
          margin-bottom: 4px;
        //  margin-top:90px; 
          position: relative;
          background: #5BB7DE;
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
          transform-origin: 10% 100%;
        }
        /*
         * Transform all the slices of hamburger
         * into a crossmark.
         */
        #menuToggle input:checked ~ span
        {
           opacity: 1;
           transform: rotate(40deg) translate(-2px, -1px);
          background: #FFFFFF;
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
          height:50px;
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
          padding: 0px 0px;
          font-size: 22px;
          display: block;
          margin-bottom:20px;
          margin-top:20px;
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
          display:flex;
          padding-right: 5%;
          list-style: none;
          width: 100%;
          justify-content: flex-end;
        }
        // MENU End
        @media only screen and (max-width: 700px) {
          #menuToggle {
            display: block;
            position:fixed;
          }
          .header-container {
            display: none;
          }
          li {
            display; block;
          }
          
          .profile-pic {
            height: 40px;
          }
          
        
          ul > li > a {
            color:#FFFFFF;
            text-decoration: none;
            transition: 0.2s ease-in;
            font-size: 20px;
            font-family: 'Open Sans', sans-serif;
            
          }
          #menu {
            height: 40vh;
            width: 100%;
            position:fixed;

            // background-color: #FFFFFF;
            background-image: repeating-linear-gradient( #00d4ff,#35a4ba, #619fac );
            
          }
          .row {
            border: none;
          }
          #menuToggle {
            left: 0;
          }
          
          #menuToggle .main-cta li {
            margin-left: 12%;
          }
        }
      `}</style>
  </div>
)

const mapStateToProps = (state) => {
  return {
    isAuthenticated: !!state.authentication.token,
    username: state.user.user_data ? state.user.user_data.fullname : ""
  }
}

export default connect(mapStateToProps, authActions)(Menu);