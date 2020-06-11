import React from 'react';
import Header from '../components/header.js';
import Menu from '../components/menu.js';
import { connect } from 'react-redux';
import actions from '../redux/actions';
import Footer from '../components/footer.js';
import initialize from '../utils/initialize';
import { getCookie } from '../utils/cookie';
import PhoneInput from 'react-phone-number-input';
import phone from './phone.js';
class UpdatePhoneNumber extends React.Component{
    constructor(){
        super()
        this.state={
            code: ''
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.verify({
            phone: this.props.phone,
            code: this.state.code,
        },
          'check'
        );
      }
    
      

    // Memanggil fungsi getUser untuk mendapatkan informasi user
    static async getInitialProps(ctx) {
        initialize(ctx);
        await ctx.store.dispatch(actions.getUser(getCookie('_id', ctx.req),'user'));
      };

    render(){
        const { phone,fullname, email, idType, idNumber, idName, gender, dob, pob, address } = this.props.users // menampung props yang telah diterima
        return(
            <div>
                <Header/>
                <Menu/>
                <div className = "container-fluid">
                    <div className = "form-container">
                        <div>
                            <div className="label">
                                <label className="label">Change Your Phone Number</label>
                            </div>
                            <div>
                                <input className="inputText" 
                                type="text"
                                name="fullname"
                                value={phone ? phone : '-'}
                                
                                /> 
                            </div>
                            <input className="btn-primary" type="submit" value="Update"/>
                        </div>
                    </div>
                </div>
                <style jsx>{`
                  .form-container .field {
                      opacity: 1;
                      margin-bottom:16px;
                      font-size: 18px;
                      
                  }
                    .form-container {
                        width: 350px;
                        height: auto;
                        padding: 30px;
                        margin: 20px auto;
                        background: #FFFFFF;
                        box-shadow: 0 10px 30px 0 rgba(0,0,0,0.10);
                        border-radius: 8px;
                        display:grid;
                        grid-template-columns: 46% auto;
                        
                    }
                    .btnSubmit{
                        width: 70%;
                        background-color: #4CAF50;
                        color: white;
                        padding: 14px 20px;
                        margin: 5px 0;
                        border: none;
                        border-radius: 4px;
                        cursor: pointer;
                    }
                    .btnSubmit:hover{
                        background-color: #45a049;
                    }
                    .label{
                        padding-bottom : 10px;
                    }
                    .inputText {
                        width: 350px;
                        padding: 12px 20px;
                        margin: 8px 0;
                        display: inline-block;
                        border: 1px solid #ccc;
                        border-radius: 4px;
                        box-sizing: border-box;
                    }
                    .inputText:focus {
                        border: 2px solid btn-primary;
                    }
                    
                 `}</style>
                 <Footer/>
            </div>  
        )
    }

}

// melakukan konversi state yang diambil dari store kedalam props
const mapStateToProps = (state) => ({
    users: state.user.user_data,
    phone: state.user.user_data.phone,
})
  
// menghubungkan props dengan Profile
// export default connect(mapStateToProps)(Profile);
export default connect(mapStateToProps)(UpdatePhoneNumber);
  

