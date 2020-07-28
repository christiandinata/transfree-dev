import Header from '../components/header';
import Menu from '../components/menu';
import Link from 'next/link';
import DatePicker from "react-datepicker";
import { connect } from 'react-redux';
import actions from '../redux/actions';
import initialize from '../utils/initialize';
import { getCookie } from '../utils/cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PendingLayout from './pending-layout';
import AccountLayout from '../components/AccountLayout';


class Popup extends React.Component {
  render() {
    return (
      <div>
    <div className='popup'>
        <div className='popup_inner'>
          <h1>Hello {this.props.text}!</h1>
          <h2>Congratulations!</h2>
          <p>You have successfully registered.</p>
          <p style={{marginTop:"-1%"}}>Please complete your information detail!</p>
        <div className="buttonPopUp">
          <button className="btn-popup" onClick={this.props.closePopup} >Later</button>
          <button className="btn-popup" >Go Now</button>
        </div>
        </div>
        
      </div>
      <div className="popup-mobile">
      
          <div className = "popup-inner-mobile"> 
          <div className="box-title">Hello {this.props.text}!</div>        
            <form className="form-container">
              <p>You have successfully registered</p>
              <p>Do you to fill  the detail information?</p>
                <div className="buttonPopUp">
                <button className="btn-popup-error" onClick={this.props.closePopup} >No</button>
                <button className="btn-popup-verify" >Yes</button>
          </div>
            </form>
          </div>
      </div>
      <style jsx>
          {`

          .popup-mobile{
            display:none;
          }
          .btn-popup {
            border: 2px solid #5BB7DE;
            color: #FFFFFF;
            padding: 5px 23px 5px 23px;
            text-align: center;
            text-decoration: none;
            font-size: 18px;
            border-radius: 24px;
            transition: all 0.2s ease;
            margin-left:10px;
            background:#5BB7DE;
            font-weight:700;
            width:120px;
          }

          .buttonPopUp{
            display:flex;
            flex-direction:row;
            margin-top:30px;
          }
          .popup,
          .popup-mobile {
            position: fixed;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            background-color: rgba(0,0,0, 0.5);
          }
          .popup_inner{
            position: absolute;
            left: 20%;
            right: 20%;
            top: 15%;
            margin: auto;
            height:auto;
            width:auto;
            border-radius: 20px;
            background: white;
            text-align:center;
            padding:1% 0 1% 0;
            display:flex;
            flex-direction:column;
          
            align-items:center;
          }
          .popup-inner-mobile{
            position: absolute;
            left: 20%;
            right: 20%;
            top: 25%;
            margin: auto;
            height:auto;
            width:auto;
            display:flex;
            flex-direction:column;
          
            align-items:center;
          }
          h1{
            color:#5BB7DE;
            font-weight:700;
            font-size:1.3em;
          }
          h2{
            margin:0px;
            padding:0px;
            text-align:center;
            font-weight:700;
            color:#000000;
            font-size:1em;
            margin-bottom:2%;

          }
          p{
            margin:0px;
            padding:0px;
            font-size:0.8em;
            color:#000000;
           

          }

          .popup{
            display:flex;
          }

          .form-container
          ,.box-title{
            border-radius: 0px;
            
           }


          @media only screen and (max-width: 414px) {
            .popup_inner{
              left: 10%;
              right: 10%;
           }

           .popup{
             display:none;
           }

           .popup-mobile{
             display:flex;
           }

           .btn-popup-error,
           .btn-popup-verify {
            border: 2px solid #5BB7DE;
            color: #FFFFFF;
            padding: 5px 20px 5px 20px;
            text-align: center;
            text-decoration: none;
            font-size: 18px;
            border-radius: 18px;
            transition: all 0.2s ease;
           
            background:#5BB7DE;
            font-weight:700;
            
          }

          .btn-popup-error{
            background:#EA5252;
            border: 2px solid #EA5252;
          
            margin-left:15%;
          }

          .btn-popup-verify{
            margin-left:25%;
          }

           .form-container{
            padding:15% 5% ;
           }
           
           
          }

          `}
        </style>
      </div>
    
    );
  }
}

class IdVerification extends React.Component{
  constructor(props){
    super(props);
    this.state = { showPopup: true };
    }

    static async getInitialProps(ctx) {
      initialize(ctx);
      await ctx.store.dispatch(actions.getUser(getCookie('_id', ctx.req),'user',ctx.req));
      await ctx.store.dispatch(actions.getOrderByUid(getCookie('_id', ctx.req),'getOrderByUid',ctx.req));
    };

  togglePopup() {
   this.setState({
     showPopup: !this.state.showPopup
   });
  }

  renderContent() {
    return(
      <div>
        <PendingLayout/>
        {this.state.showPopup ?
         <Popup
          text={this.props.userData.fullname}
          closePopup={this.togglePopup.bind(this)}
         />
         : null
       }
      </div>

    );
  }

  render() {
    return (
      <AccountLayout isApproved={this.props.isApproved}>
        {this.renderContent()}
      </AccountLayout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // isApproved: !!state.user.user_data.isApproved,
    userData: state.user.user_data,
    orderArray: state.order.orders,
    
  }
}

export default connect(mapStateToProps, actions)(IdVerification);
