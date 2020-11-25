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
import Axios from 'axios';

//Menerima argumen dari luar
class EditProfile extends React.Component {
    constructor(props) {
        super(props);
        // if (Platform.OS === 'android') {
        //     UIManager.setLayoutAnimationEnabledExperimental(true);
        // }
        //Mendeklarasikan state react
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
        await ctx.store.dispatch(actions.getUser(getCookie('_id', ctx.req),'user',ctx.req));
      };

      handle = () =>{
        this.setState({
            fullname:event.target.value
        })
      }

//Mengumpulkan state react
      handleSubmit = event => {
        event.preventDefault();
        let urlFetch = ENV.API + `/${this.props.user._id}/user`
    
        const user = {
          name: this.state.fullname
        };
    
        Axios.put(urlFetch, { user })
          .then(res => {
            console.log(res);
            console.log(res.data);
          })
      }

//Untuk memperbarui info user
      updateUser = (e) => {
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

                    
                    //  if (mode == "Registration") {
                    //     this.props.navigation.dispatch({
                    //         type: 'Navigation/RESET',
                    //         index: 0,
                    //         actions: [
                    //             { type: 'Navigation/NAVIGATE', routeName: 'LandingScreen', },
                    //         ]
                    //     })
                    //     this.props.navigation.navigate('RegisterScreen', { mode: 'Login', step: 4 })
                    // } else {
                    //     this.props.navigation.goBack();
                    // }

                     this.props.onChangeUser(this.user_data)
                    //  this.props.onChangeUserEmailLogin(this.state.emailUser)
                     this.setState({ isSpinner: false });
                    // Toast.show({
                    //     text: 'Submit Success',
                    //     position: 'bottom',
                    //     buttonText: 'Okay',
                    //     type: 'success'
                    // })
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
    

//Menampilkan tulisan dibawah
    render() {
        
        return (
            <div>
                <Header/>
                <Menu/>
                <SideBar/>
                <input type = "text"
                onChange = {this.handle}
                name="edit"
                     value = {this.state.fullname}
                    // onChangeText={text => {
                    //     this.setState({ fullname: text, fullnameError: "" });
                       
                    // }}
                    >

                </input>
                        
                        <button onClick={this.updateUser}>deadaedea</button>
            </div>
        )
    }

    
}

// melakukan konversi state yang diambil dari store kedalam props
const mapStateToProps = (state) => ({
    // users: state.user.user_data,
       token: state.authentication.token,
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