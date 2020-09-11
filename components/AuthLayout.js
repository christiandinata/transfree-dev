import Link from 'next/link';
import Header from '../components/header.js';

const AuthLayout = ({ children }) => (
  <div>
    <Header />
    <div className="container-fluid">
      <div className="left">
        
      </div>
      <div className="right">
        <div className="background-top">
            <img src="../static/images/transfree-logo.png"></img> 
        </div>
        {children}
        <div className="background-bottom">
            <img src="../static/images/features/setengah-lingkaran.png"></img> 
        </div>
      </div>
    </div>
    <style jsx>{`
      .container-fluid {
        display: flex;
        // min-height: 100vh;

      }

      .left,
      .right {
        flex-basis: 50%;
      }

      .left {
        background-image: url('../static/images/Sign Up ASSET WEB/signup.jpg');
        background-size:cover;
        text-align: center;
        min-height: 53vw;
        width:auto;
        background-repeat:no-repeat;
      }

      .left img {
        height: 37px;
        margin: 50px auto;
      }

      .right {
        display: flex;
        flex-direction: column;
        text-align:left;
         min-height: 51vw;
        align-items: center;
        padding:0px 0px 0px 0px;
        // background:blue;
      }

      .background-top img,
      .background-bottom img{
        display:none;

       
    }


      @media only screen and (max-width: 414px) {
        .left {
          display: none;
        }
        
        .background-top{
          background-image: url('../static/images/features/background-mobile.png');
          background-size:100% 100%;
          padding:40px 0px 40px 0px;
          height:30px;
          text-align: center;
          margin-top:-20px;
          background-repeat:no-repeat;
          display:flex;
          align-items:center;
          justify-content:center;
        }

        .background-bottom{
           margin-top:120px;
           width:100%;
        }

        .background-top img{
          width:40%;
          height:90%;
          display:flex;
          text-align:center;
          
      }

      .background-bottom img{
        width:100%;
        height:30px;
        display:flex;
      }

      p{
        font-size:30px;
        color:grey;
      
      }

    
      
      }
    `}</style>
  </div>
);

export default AuthLayout;
