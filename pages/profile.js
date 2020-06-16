import Header from '../components/header.js';
import Menu from '../components/menu.js';
import { connect } from 'react-redux';
import actions from '../redux/actions';
import initialize from '../utils/initialize';
import { getCookie } from '../utils/cookie';
class Profile extends React.Component{
    constructor(){
        super()
        this.state={
        }
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
                        {/* <div>
                            <div>
                                <a className="updatePhoneNumber btn-primary" href="/updatePhoneNumber">Update Phone Number</a>
                            </div>
                        </div>
                        <br></br> */}
                        <div>
                            <div className = "label">Nama</div>
                            <div className = "field">{fullname ? fullname: '-'}
                            </div>
                            
                        </div>
                        <div>
                            <div className = "label">Email</div>
                            <div className = "field">{email?email:'-'}
                            </div>
                        </div>
                        <div>
                            <div className = "label">ID Type</div>
                            <div className = "field">{idType?idType:'-'}
                            </div>
                        </div>
                        <div>
                            <div className = "label">ID Number</div>
                            <div className = "field">{idNumber?idNumber:'-'}
                            </div>
                        </div>
                        <div>
                            <div className = "label">ID Name</div>
                            <div className = "field">{idName?idName:'-'}
                            </div>
                        </div>
                        <div>
                            <div className = "label">Gender</div>
                            <div className = "field">{gender?gender:'-'}
                            </div>
                        </div>
                        <div>
                            <div className = "label">Date of birth</div>
                            <div className = "field">{dob?dob:'-'}
                            </div>
                        </div>
                        <div>
                            <div className = "label">Place of Birth</div>
                            <div className = "field">{pob?pob:'-'}
                            </div>
                        </div>
                        <div>
                            <div className = "label">Address</div>
                            <div className = "field">{address?address:'-'}
                            </div>
                        </div>
                        {/* <div>
                            <div className = "label">Phone Number</div>
                            <div className = "field">{phone?phone:'-'}
                            </div>
                        </div> */}
                    </div>
                </div>
                <style jsx>{`
                  
                  .form-container .label{
                    opacity: 0.8;
                    font-size: 15px;
                  }

                  .form-container .field {
                      opacity: 1;
                      margin-bottom:16px;
                      font-size: 20px;
                      
                  }
                    p {
                        text-align: left;
                        margin-top:20px;
                    }
                    .container-fluid {
                        display: flex;
                        flex-direction: column;
                        min-height: 100vh;
                        align-items: center;
                    }

                    .form-container {
                        width: 630px;
                        height: auto;
                        padding: 30px;
                        margin: 30px auto;
                        background: #FFFFFF;
                        box-shadow: 0 10px 30px 0 rgba(0,0,0,0.10);
                        border-radius: 8px;
                        display:grid;
                        grid-template-columns: 46% auto;
                        
                    }
                    .updatePhoneNumber{
                        width: 70%;
                        height: auto;
                        float:left;
                        padding:8px;
                        
                    }
                    
                 `}</style>
            </div>  
        )
    }

}

// melakukan konversi state yang diambil dari store kedalam props
const mapStateToProps = (state) => ({
    users: state.user.user_data,
})
  
// menghubungkan props dengan Profile
export default connect(mapStateToProps)(Profile);
  

