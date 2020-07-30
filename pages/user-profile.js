import CustomDatePicker from '../components/CustomDatePicker';
import Header from "../components/header";
import Menu from "../components/menu";
import '../styles/components/new-user/CreateProfile.css';
import '../styles/new-user.css';
import '../styles/user-profile.css';
import {connect} from "react-redux";
import initialize from "../utils/initialize";
import actions from "../redux/actions";
import {getCookie} from "../utils/cookie";
import Link from 'next/link';
import ENV from "../config";
import * as axios from "axios";

class UserProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            emailUser: this.props.user.email ? this.props.user.email : "",
            fullname: this.props.user.fullname ? this.props.user.fullname : "",
            idNumber: this.props.user.idNumber ? this.props.user.idNumber : "",
            gender: this.props.user.gender ? this.props.user.gender : "Male",
            dob: this.props.user.dob ? this.props.user.dob : new Date(),
            pob: this.props.user.pob ? this.props.user.pob : "",
            address: this.props.user.address ? this.props.user.address : "",
            password: "123456",
            confirmPassword: "123456",
        };
    }

    static async getInitialProps(ctx) {
        initialize(ctx);
        await ctx.store.dispatch(actions.getUser(getCookie('_id', ctx.req), 'user', ctx.req));
    };

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
        this.checkIdNumber();
        this.checkAddress();
        this.checkPOB();
        this.checkEmailAddress();
        this.checkPassword();
    }

    startEdit() {
        document.querySelector('#email-address').disabled = false;
        document.querySelector('#address').disabled = false;
        document.querySelector('#gender').disabled = false;
        document.querySelector('#password').disabled = false;
        document.querySelector('#confirm-password').disabled = false;
        document.querySelector('#confirm-password').style.display = 'block';
        document.querySelector('#confirm-password-label').style.display = 'block';
        document.querySelector('#cancel-button').style.display = 'block';
        document.querySelector('#save-button').style.display = 'block';
        document.querySelector('#edit-button').style.display = 'none';
        document.querySelector('#logout-button').style.display = 'none';
        this.setState({password: ""});
        this.setState({confirmPassword: ""});
    }

    stopEdit() {
        document.querySelectorAll('input').forEach(element => element.disabled = true)
        document.querySelectorAll('select').forEach(element => element.disabled = true)
        document.querySelector('#confirm-password').style.display = 'none';
        document.querySelector('#confirm-password-label').style.display = 'none';
        document.querySelector('#cancel-button').style.display = 'none';
        document.querySelector('#save-button').style.display = 'none';
        document.querySelector('#edit-button').style.display = 'block';
        document.querySelector('#logout-button').style.display = 'block';
        this.setState({password: "123456"});
        document.querySelector("#error-password").className = "form-error-label-hidden";
    }

    componentDidMount() {
        this.stopEdit();
    }

    updateUser = async () => {
        if (this.checkData()) {
            axios.post(ENV.API + `/v1/user/checkEmail`, {"email": this.state.emailUser},
                {
                    headers: {
                        Authorization: `Bearer ${getCookie('token')}`
                    }
                }
            ).then(async (response) => {
                if (response.data.duplicate) {
                    alert("Email already used");
                } else {
                    let urlFetch = ENV.API + `/v1/user/editProfile`;
                    let data;
                    if (this.state.password != "") {
                        data = {
                            "email": this.state.emailUser,
                            "gender": this.state.gender,
                            "address": this.state.address,
                            "password": this.state.password,
                        }
                    } else {
                        data = {
                            "email": this.state.emailUser,
                            "gender": this.state.gender,
                            "address": this.state.address,
                        }
                    }

                    await axios.post(urlFetch, data, {
                        headers: {
                            Authorization: `Bearer ${getCookie('token')}`
                        }
                    }).then(async () => {
                        let user_data = this.props.user;

                        user_data.email = this.state.emailUser;
                        user_data.gender = this.state.gender;
                        user_data.address = this.state.address;

                        this.stopEdit();
                        // window.location.reload();
                    }).catch((error) => {
                        console.log(error)
                        alert("Please check your data");
                    });

                }
            }).catch((error) => {
                console.log(error)
            });
        } else {
            alert("Please check your data");
        }

    }

    checkIdNumber() {
        if (document.querySelector("#id-number").value === "") {
            document.querySelector("#error-idnumber").className = "form-error-label";
        } else {
            document.querySelector("#error-idnumber").className = "form-error-label-hidden";
        }
    }

    checkPOB() {
        if (document.querySelector("#pob").value === "") {
            document.querySelector("#error-pob").className = "form-error-label";
        } else {
            document.querySelector("#error-pob").className = "form-error-label-hidden";
        }
    }

    checkAddress() {
        if (document.querySelector("#address").value === "") {
            document.querySelector("#error-address").className = "form-error-label";
        } else {
            document.querySelector("#error-address").className = "form-error-label-hidden";
        }
    }

    checkEmailAddress() {
        if (document.querySelector("#email-address").value === "") {
            document.querySelector("#error-email").className = "form-error-label";
        } else {
            document.querySelector("#error-email").className = "form-error-label-hidden";
        }
    }

    checkPassword() {
        if (document.querySelector("#password").value !== document.querySelector("#confirm-password").value) {
            document.querySelector("#error-password").className = "form-error-label";
        } else {
            document.querySelector("#error-password").className = "form-error-label-hidden";
        }
    }

    checkData() {
        return document.querySelector("#id-number").value !== "" &&
            document.querySelector("#pob").value !== "" &&
            document.querySelector("#address").value !== "" &&
            document.querySelector("#email-address").value !== "" &&
            document.querySelector("#password").value === document.querySelector("#confirm-password").value;
    }

    render() {
        return (
            <div>
                <Header/>
                <Menu/>
                <div className="new-user-page">
                    <div className="new-user-container">
                        <div className="new-user-header">
                            <div className="new-user-title" id="user-profile-title">Profile Detail</div>
                            <div className="new-user-close">
                                <a href="/">
                                    <img src="../../static/images/close.svg"/>
                                </a>
                            </div>
                        </div>
                        <div className="create-profile-form-body-heading">
                            <div className="create-profile-profile-picture">
                                <img style={{marginTop: "2%"}} src="../../static/images/profile.svg"/>
                            </div>
                        </div>
                        <div className="create-profile-form-body">
                            <div className="create-profile-form-box" style={{flexDirection: "column"}}>
                                <div className="create-profile-form-field-container">
                                    <div className="create-profile-form-field-container-column">
                                        <div className="create-profile-form-field">
                                            <label className="create-profile-form-label" htmlFor="full-name">Full
                                                Name</label>
                                            <input name="fullname" id="full-name" placeholder="Enter Full Name"
                                                   value={this.state.fullname} onChange={this.handleChange.bind(this)}/>
                                        </div>
                                        <div className="create-profile-form-field">
                                            <label className="create-profile-form-label" htmlFor="id-number">ID
                                                Number</label>
                                            <input name="idNumber" id="id-number" placeholder="Enter ID number"
                                                   value={this.state.idNumber} onChange={this.handleChange.bind(this)}/>
                                            <span className="form-error-label-hidden" id="error-idnumber"
                                            >You must input your ID Number (KTP/Passport/SIM)!</span>
                                        </div>
                                        <div className="create-profile-form-field">
                                            <label className="create-profile-form-label" htmlFor="gender">Gender</label>
                                            <select name="gender" id="gender" placeholder="Choose your gender"
                                                    value={this.state.gender} onChange={this.handleChange.bind(this)}>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Others">Others</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="create-profile-form-field-container-column">
                                        <div className="create-profile-form-field">
                                            <label className="create-profile-form-label" htmlFor="pob">Place of
                                                Birth</label>
                                            <input name="pob" id="pob" placeholder="Enter the city (e.g. Jakarta)"
                                                   value={this.state.pob} onChange={this.handleChange.bind(this)}/>
                                            <span
                                                className="form-error-label-hidden" id="error-pob">Your Place of Birth may not be empty.</span>
                                        </div>
                                        <div className="create-profile-form-field">
                                            <label className="create-profile-form-label" htmlFor="dob">Date of
                                                Birth</label>
                                            <CustomDatePicker date={this.state.dob} name="dob" id="dob"
                                                              onChange={(value) => this.setState({dob: value})}/>
                                        </div>
                                        <div className="create-profile-form-field">
                                            <label className="create-profile-form-label"
                                                   htmlFor="address">Address</label>
                                            <input id="address" name="address" placeholder="Enter your full address"
                                                   value={this.state.address} onChange={this.handleChange.bind(this)}/>
                                            <span
                                                className="form-error-label-hidden" id="error-address">Your address may not be empty.</span>
                                        </div>
                                    </div>
                                </div>
                                <h2 className="user-profile-subheader">Account</h2>
                                <div className="create-profile-form-field-container">
                                    <div className="create-profile-form-field-container-column">
                                        <div className="create-profile-form-field">
                                            <label className="create-profile-form-label" htmlFor="email-address">
                                                Email Address</label>
                                            <input name="emailUser" id="email-address" placeholder="Enter Email Address"
                                                   value={this.state.emailUser}
                                                   onChange={this.handleChange.bind(this)}/>
                                            <span className="form-error-label-hidden" id="error-email">
                                                Your Email may not be empty.</span>

                                        </div>
                                        <div className="create-profile-form-field">
                                            <label className="create-profile-form-label"
                                                   htmlFor="password">Password</label>
                                            <input name="password" id="password" type="password"
                                                   placeholder="Enter New Password" value={this.state.password}
                                                   onChange={this.handleChange.bind(this)}/>
                                        </div>
                                        <div className="create-profile-form-field">
                                            <label
                                                className="create-profile-form-label"
                                                htmlFor="confirm-password"
                                                id="confirm-password-label"
                                            >Confirm New Password</label>
                                            <input id="confirm-password" type="password"
                                                   placeholder="Confirm your new password"
                                                   value={this.state.confirmPassword} name="confirmPassword"
                                                   onChange={this.handleChange.bind(this)}/>
                                            <span
                                                className="form-error-label-hidden"
                                                id="error-password">
                                                Password must be match.</span>
                                        </div>
                                    </div>
                                    <div className="create-profile-form-field-container-column"
                                         id="user-profile-field-button">
                                        <div className="create-profile-form-field" id="user-profile-buttons">
                                            <button className='form-submit-button'
                                                    onClick={this.startEdit.bind(this)}
                                                    id="edit-button"
                                            >Edit
                                            </button>
                                            <button className='form-submit-button'
                                                    style={{backgroundColor: '#ea5252'}}
                                                    id="logout-button"
                                            >
                                                <Link href="/logout">Log out</Link>
                                            </button>
                                            <button
                                                className='form-submit-button'
                                                style={{backgroundColor: '#ea5252'}}
                                                onClick={this.stopEdit.bind(this)}
                                                id="cancel-button"
                                            >
                                                Cancel
                                            </button>
                                            <button className='form-submit-button'
                                                    onClick={this.updateUser}
                                                    id="save-button"
                                            >Save
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user.user_data,
})

export default connect(mapStateToProps)(UserProfile);
