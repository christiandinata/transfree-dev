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

            idTypeArray: [
                {
                    title: "KTP",
                    onPress: () => {
                        this.setState({ idType: "KTP", idTypeError: "" })
                    }
                },
                {
                    title: "Pasport",
                    onPress: () => {
                        this.setState({ idType: "Pasport", idTypeError: "" })
                    }
                }
            ],

            genderArray: [
                {
                    title: "Male",
                    onPress: () => {
                        this.setState({ gender: "Male", genderError: "" })
                    }
                },
                {
                    title: "Female",
                    onPress: () => {
                        this.setState({ gender: "Female", genderError: "" })
                    }
                }
            ],

            // isSpinner: false,
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
        } else if (this.state.step == 3 && !this.state.verificationCode) {
            this.setState({ verificationCodeError: "Please insert verification code !" });
            return false
        } else {
            return true
        }
    }

    static async getInitialProps(ctx) {
        initialize(ctx);
        await ctx.store.dispatch(actions.getUser(getCookie('_id', ctx.req),'user'));
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
                        // "isRegisStep": mode == "Registration" ? true : false
                        
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
                    console(user_data)

                    this.props.onChangeUser(this.user_data)
                    this.props.onChangeUserEmailLogin(this.state.emailUser)
                    this.setState({ isSpinner: false });
                }).catch((error) => {
                    // Toast.show({
                    //     text: error,
                    //     position: 'bottom',
                    //     buttonText: 'Okay',
                    //     type: 'danger'
                    // })
                    this.setState({ isSpinner: false });
                });
             }
         }
    


         render() {
            return (
                <div>
                    <Header/>
                    <div className = "container-fluid">
                    <div className={"error-container "+(this.state.errorMessage != '' && this.state.errorMessage != undefined ? "error-show" : "") }>
                         {/* {this.props.errorMessage} */}deadead                    </div>
                        <div className = "form-container">
                            <div class="grid">
                            <div className="logo">
                                <img className="img" src="../static/images/transfree-logo.png"/>
                            </div>
                            <h3>Edit Profile</h3>
                            <div class="row">
                                
                                <label>Name</label>
                                <input type="text" name="fullname" 
                                    value={this.state.fullname} 
                                    onChange = {this.handleChange.bind(this)} 
                                    errorName={this.state.fullnameError}/>
                                <label>Email</label>
                                <input type="text" name="emailUser" value = {this.state.emailUser} onChange ={this.handleChange.bind(this)}  />
                                <label>Address</label>
                                <input type="text" name="address" placeholder="address"/>
                                
                                <label>Gender</label>
                                <br></br>
                                <select name = "gender" className="gender" onChange={this.handleChange.bind(this)} >
                                    <option value = "Male">Male</option>
                                    <option value = "Female">Female</option>
                                </select>
                                <label>Place of Birth</label>
                                <input type="text" name="pob" placeholder="place of birth" />
                                <label>Date of Birth</label>
                                <input type="date" name="dob" placeholder="Date of birth" defaultValue = {this.state.dob} onChange = {this.handleChange.bind(this)}  />
                                <label><br></br></label>
                                <a href="/profile" type="button" className="btn btn-secondary">Back</a>
                                
                                <button type="submit" className="btn-primary btnSubmit " onClick = {this.updateUser}>Save</button>
                                
                            </div>
                            </div>
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
                        input, select{
                            width: 580px;
                            padding: 6px 25px;
                        }
                        .gender{
                            width:620px;
                            border:none;    
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
                        .error-container {
                            width: 400px;
                            height: auto;
                            padding: 20px;
                            background-color: #FF3A43;
                            color: #FFF;
                            border-radius: 8px;
                            display: none;
                          }
                
                          .error-show {
                            display: block;
                          }
                     `}</style>
                </div>  
            )
        }
    
    }

// melakukan konversi state yang diambil dari store kedalam props
const mapStateToProps = (state) => ({
    // users: state.user.user_data,
       token: state,
       user: state.user.user_data,
    //   token: state.auth.token,
    //   user: state.auth.user,
})

const mapDispatchToProps = (dispatch) => ({
    onChangeToken: (value) => dispatch(onChangeToken(value)),
    onChangeUser: (value) => dispatch(onChangeUser(value)),
    onChangeUserEmailLogin: (value) => dispatch(onChangeUserEmailLogin(value)),
    onChangeUserPasswordLogin: (value) => dispatch(onChangeUserPasswordLogin(value)),
})
  
// menghubungkan props dengan Profile
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);