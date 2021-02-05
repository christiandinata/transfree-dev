import Header from '../components/header.js';
import Menu from '../components/menu.js';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import { connect } from 'react-redux';
import actions from '../redux/actions';
import initialize from '../utils/initialize';
import { getCookie } from '../utils/cookie';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import SideBar from './sidebar'
import Profile from './profile'
import ENV from "../config";
import GlobalFunction from "../utils/globalFunction";
import { onChangeToken, onChangeUser, onChangeUserEmailLogin, onChangeUserPasswordLogin } from "../redux/actions/authActions";
import Router from 'next/router';

//Untuk https://www.transfree.id/user-profile
class EditProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emailUser: this.props.user.email ? this.props.user.email : "",
            emailUserError: '',

            fullname: this.props.user.fullname ? this.props.user.fullname : "",
            fullnameError: '',

            idType: this.props.user.idType ? this.props.user.idType : "KTP",
            idTypeError: '',

            idNumber: this.props.user.idNumber ? this.props.user.idNumber : "",
            idNumberError: '',

            idName: this.props.user.idName ? this.props.user.idName : "",
            idNameError: '',

            gender: this.props.user.gender ? this.props.user.gender : "Male",
            genderError: '',

            dob: this.props.user.dob ? this.props.user.dob : "18 jan 2002",
            dobError: '',

            pob: this.props.user.pob ? this.props.user.pob : "",
            pobError: '',

            address: this.props.user.address ? this.props.user.address : "",
            addressError: '',
        };
    }


    validateData = () => {
        if (!GlobalFunction.validateEmail(this.state.emailUser)) {
            this.setState({ emailUserError: "Email format is not valid !" });
            return false
        } else if (!this.state.emailUser) {
            this.setState({ emailUserError: "Please insert your email !" });
            return false
        } else if (!this.state.fullname) {
            this.setState({ fullnameError: "Please insert your name !" });
            return false
        } else if (!this.state.idType) {
            this.setState({ idTypeError: "Please insert your ID type !" });
            return false
        } else if (!this.state.idNumber) {
            this.setState({ idNumberError: "Please insert your ID number !" });
            return false
        } else if (!this.state.idName) {
            this.setState({ idNameError: "Please insert your ID Name !" });
            return false
        } else if (!this.state.gender) {
            this.setState({ genderError: "Please insert your Gender !" });
            return false
        } else if (!this.state.dob) {
            this.setState({ dobError: "Please insert your DOB (Date of birth) !" });
            return false
        } else if (!this.state.pob) {
            this.setState({ pobError: "Please insert your POB (Place of birth) !" });
            return false
        } else if (!this.state.address) {
            this.setState({ addressError: "Please insert your address !" });
            return false
        } else {
            return true
        }
    }

    static async getInitialProps(ctx) {
        initialize(ctx);
        await ctx.store.dispatch(actions.getUser(getCookie('_id', ctx.req),'user',ctx.req));
        return {};
      };

      handleChange(event){
        event.preventDefault();

        this.setState({
            [event.target.name] : event.target.value
        });
    }


      updateUser = (e) => {
              if (this.validateData() == true) {
                let urlFetch = ENV.API + `/${this.props.user._id}/user`
                // alert("deadae");
                fetch(urlFetch,
                {
                    method: 'put',
                    headers: {
                        "Authorization": `Bearer ${GlobalFunction.token ? GlobalFunction.token : this.props.token}`
                    },
                    body: JSON.stringify({
                        "fullname": this.state.fullname,
                        "email": this.state.emailUser,
                        "idType": this.state.idType,
                        "idNumber": this.state.idNumber,
                        "idName": this.state.idName,
                        "gender": this.state.gender,
                        "dob": this.state.dob,
                        "pob": this.state.pob,
                        "address": this.state.address,
                        
                    })
                    
                    
                }).then((response) => response.json()).then(async (responseJson) => {
                    let user_data = this.props.user

                    user_data.email = this.state.emailUser;
                    user_data.fullname = this.state.fullname;
                    user_data.idType = this.state.idType;
                    user_data.idNumber = this.state.idNumber;
                    user_data.idName = this.state.idName;
                    user_data.gender = this.state.gender;
                    user_data.dob = this.state.dob;
                    user_data.pob = this.state.pob;
                    user_data.address = this.state.address;
                    console.log(user_data)

                    this.props.onChangeUser(this.user_data)
                    this.props.onChangeUserEmailLogin(this.state.emailUser)
                    
                    alert("Your update profile is Success");
                    Router.replace('/profile');
                    
                }).catch((error) => {
                     alert("Please check your data");
                });
              }else{
                alert("Please check your data");
              }
         }
    


         render() {
            return (
                <div>
                    <Header/>
                    <div className = "container-fluid">
                        <div className = "form-container">
                            <div class="grid">
                            <div className="logo">
                                <img className="img" src="../static/images/transfree-logo.png" slt="Logo"/>
                            </div>
                            <h3>Edit Profile</h3>
                            <div class="row">
                                <div className="f1">
                                <label>Name</label>
                                    <input className="f1" type="text" name="fullname" value={this.state.fullname} onChange={this.handleChange.bind(this)}/>
                                </div>
                                
                                <div className="f1">
                                <label>Email</label>
                                    <input className="f1"type="text" name="emailUser"  value={this.state.emailUser} onChange = {this.handleChange.bind(this)}/>
                                </div>

                                <div className="f1">
                                    <label>ID Type</label>
                                    <br></br>
                                    <select name="idType" className="gender" type="text" value = {this.state.idType} onChange = {this.handleChange.bind(this)}>
                                        <option value = "KTP">KTP</option>
                                        <option value = "Passport">Passport</option>
                                    </select>
                                </div>

                                <div className="f1">
                                <label>ID Number</label>
                                    <input name = "idNumber" className="f1"type="text" name="idNumber"  value={this.state.idNumber} onChange = {this.handleChange.bind(this)}/>
                                </div>

                                <div className="f1">
                                <label>ID Name</label>
                                    <input name = "idName" className="f1"type="text" name="idName"  value={this.state.idName} onChange = {this.handleChange.bind(this)}/>
                                </div>
                                
                                <div className="f1">
                                    <label>Gender</label>
                                    <br></br>
                                    <select name="gender" className="gender" type="text" value = {this.state.gender} onChange = {this.handleChange.bind(this)}>
                                        <option value = "Male">Male</option>
                                        <option value = "Female">Female</option>
                                    </select>
                                </div>

                                <div className="f1">
                                    <label>Date of Birth</label>
                                    <input className="f1" type="date" name="address" value={this.state.dob} name="dob" onChange = {this.handleChange.bind(this)}/>
                                </div>
                                
                                <div className="f1">
                                    <label>Place of Birth</label>
                                    <input className="f1" type="text" name="pob" value = {this.state.pob} onChange = {this.handleChange.bind(this)}/>
                                </div>
                                
                                
                            </div>
                            <a href="/profile" type="button" className="btn btn-secondary" style={{marginTop:20,marginLeft:20}}>Back</a>
                            <button type="submit" className="btn-primary btnSubmit " style={{float:"right",width:120,marginRight:20}} onClick = {this.updateUser}>Save</button>
                            </div>
                        </div>
                    </div>
                        <style jsx>{`
                        div.f1 {
                            margin:10px;
                            margin-left:50px;
                            float: center;
                            border-radius: 4px;
                            box-sizing: border-box;
                            display: inline-block;
                            width:260px;
                            
                        }
                        div.f1 f1 {
                            width: 100px;
                            height: auto;
                        }
                      
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
                            width: 700px;
                            height: auto;
                            padding: 30px;
                            margin: 30px auto;
                            background: #FFFFFF;
                            box-shadow: 0 10px 30px 0 rgba(0,0,0,0.10);
                            border-radius: 8px;
                            display:grid;
                            float:center;
                            grid-template-columns: 100% auto;
                            
                        }
                       
                        .gender{
                            width:240px;
                            border:6px;
                            margin:3px;
                            padding :13px;
                            margin-right:40px;
                        }
                        .img{
                            display:block;
                            margin-left: 240px;
                        }
                        .btnSubmit{
                            width: 40%;
                            color: white;
                            padding: 12px 2px;
                            border: none;
                            border-radius: 3px;
                            cursor: pointer;
                            margin-right:5px;
                        }
                        
                     `}</style>
                </div>  
            )
        }
    
    }

// melakukan konversi state yang diambil dari store kedalam props
const mapStateToProps = (state) => ({
       token: state.authentication.token,
       user: state.user.user_data,
})

const mapDispatchToProps = (dispatch) => ({
    onChangeToken: (value) => dispatch(onChangeToken(value)),
    onChangeUser: (value) => dispatch(onChangeUser(value)),
    onChangeUserEmailLogin: (value) => dispatch(onChangeUserEmailLogin(value)),
    onChangeUserPasswordLogin: (value) => dispatch(onChangeUserPasswordLogin(value)),
})
  
// menghubungkan props dengan Profile
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);