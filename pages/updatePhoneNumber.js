import React from 'react';
import Header from '../components/header.js';
import Menu from '../components/menu.js';
import Footer from '../components/footer.js';
class UpdatePhoneNumber extends React.Component{
    constructor({ props }) {
        super(props);
        this.state = {
          phone: '+44',
        };
      }

      

    // Memanggil fungsi getUser untuk mendapatkan informasi user
    // static async getInitialProps(ctx) {
    //     initialize(ctx);
    //     await ctx.store.dispatch(actions.getUser(getCookie('_id', ctx.req),'user'));
    //   };

    render(){
        //  const { fullname, email, idType, idNumber, idName, gender, dob, pob, address } = this.props.users // menampung props yang telah diterima
        return(
            <div>
                <Header/>
                <Menu/>
                <div className = "container-fluid">
                    <div className = "form-container">
                        <div>
                            <div className="label">
                                <label>Change Your Phone Number</label>
                            </div>
                            <div>
                                <input className="inputText" 
                                type="text" value={this.state.phone}
                                county="GB"
                                onChange={ phone => this.setState({ phone }) }
                                
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
                        padding-bottom : 5px;
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
                        border: 2px solid green;
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
})
  
// menghubungkan props dengan Profile
// export default connect(mapStateToProps)(Profile);
export default UpdatePhoneNumber;
  

