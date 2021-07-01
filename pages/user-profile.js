import CustomDatePicker from '../components/CustomDatePicker';
import moment from 'moment';
import Header from "../components/header";
import Menu from "../components/menu";
import { NavBarWhite } from '../components/MenuComponents';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faEye,
	faEyeSlash,
	faArrowCircleLeft,
} from "@fortawesome/free-solid-svg-icons";
import * as Profile from '../components/ProfileComponents';
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
import React, { useEffect, useState } from 'react';

function UserProfile(props) {
    // console.log(props)
    const [info, setInfo] = useState({
		emailUser: props.user.email,
        fullName: props.user.fullname,
        idNumber: props.user.idNumber,
        gender: props.user.gender,
        dob: moment(props.user.dob).format('LL'),
        pob: props.user.pob,
        address: props.user.address,
        password: "123",
        confirmPassword: "123",
        phone: "+" + props.user.phone
	});

    const [choice, setChoice] = useState('edit')
    const [hiddenPass, setHidden] = useState(true)
    const [hiddenConfirm, setConfirm] = useState(true)

    useEffect(() => {
        // console.log(props)
    })

    const handleChoiceChange = (e) => {
        e.preventDefault()
        e.currentTarget.value == 'detail' ? setChoice('detail') : setChoice('edit')
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target
        setInfo({...info, [name]: value})
    }

    const toggleHiddenPass = () => {
        setHidden(!hiddenPass)
    }

    const toggleHiddenConfirm = () => {
        setConfirm(!hiddenConfirm)
    }

    const updateUser = async () => {
        axios
            .post(
                ENV.API + `/v1/user/checkEmail`,
                { email: info.emailUser },
                {
                    headers: {
                        Authorization: `Bearer ${getCookie("token")}`,
                    },
                }
            )
            .then(async (response) => {
                if (response.data.duplicate) {
                    alert("Email already used");
                } else {
                    let urlFetch = ENV.API + `/v1/user/editProfile`;
                    let data;
                    if (info.password != "") {
                        data = {
                            email: info.emailUser,
                            gender: info.gender,
                            address: info.address,
                            password: info.password,
                        };
                    } else {
                        data = {
                            email: info.emailUser,
                            gender: info.gender,
                            address: info.address,
                        };
                    }

                    await axios
                        .post(urlFetch, data, {
                            headers: {
                                Authorization: `Bearer ${getCookie(
                                    "token"
                                )}`,
                            },
                        })
                        .then(async () => {
                            let user_data = props.user;

                            user_data.email = info.emailUser;
                            user_data.gender = info.gender;
                            user_data.address = info.address;
                        })
                        .catch((error) => {
                            console.log(error);
                            alert("Please check your data");
                        });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const cancelEdit = () => {
        setChoice("detail")
    }

    return(
        <React.Fragment>
            <Header/>
            <NavBarWhite username = {info.fullName} id = {info.idNumber}/>

            {choice == 'detail' ? 

            <Profile.Wrapper>
                <Profile.ActionSect>
                    <Profile.ActionChoiceActive onClick = {handleChoiceChange} value = "detail">
                        <Profile.ChoiceImg src = "../static/images/profile/detail-profile-blue.png"/>
                        <Profile.AccountLinkActive>Detail Profile</Profile.AccountLinkActive>
                        <Profile.ArrowRightImg src = "../static/images/profile/arrow-right-blue.png"/> 
                    </Profile.ActionChoiceActive>

                    <Profile.ActionChoice onClick = {handleChoiceChange} value = "edit">
                        <Profile.ChoiceImg src = "../static/images/profile/edit-profile-white.png"/>
                        <Profile.AccountLink>Edit Profile</Profile.AccountLink>
                        <Profile.ArrowRightImg src = "../static/images/profile/arrow-right-white.png"/>
                    </Profile.ActionChoice>
                </Profile.ActionSect>

                <Profile.ProfileSect>
                    <Profile.ProfileAction>
                        <Profile.AccountText>Account Profile</Profile.AccountText>
                        <Profile.LogOutButton href = "/logout">Log Out</Profile.LogOutButton>
                    </Profile.ProfileAction>

                    <div>
                        <Profile.Data>
                            <Profile.DataSubPersonal>
                                <Profile.SectionName>Personal Data</Profile.SectionName>
                                <Profile.SectionExp>Your personal basic information.</Profile.SectionExp>
                            </Profile.DataSubPersonal>

                            <Profile.Table>
                                <tbody>
                                    <Profile.TableRow>
                                        <Profile.TableHeading>Full Name</Profile.TableHeading>
                                        <Profile.TableDetailPersonal>{info.fullName}</Profile.TableDetailPersonal>
                                    </Profile.TableRow>

                                    <Profile.TableRow>
                                        <Profile.TableHeading>ID Number</Profile.TableHeading>
                                        <Profile.TableDetailPersonal>{info.idNumber}</Profile.TableDetailPersonal>
                                    </Profile.TableRow>

                                    <Profile.TableRow>
                                        <Profile.TableHeading>Gender</Profile.TableHeading>
                                        <Profile.TableDetailPersonal>{info.gender}</Profile.TableDetailPersonal>
                                    </Profile.TableRow>

                                    <Profile.TableRow>
                                        <Profile.TableHeading>Place of Birth</Profile.TableHeading>
                                        <Profile.TableDetailPersonal>{info.pob}</Profile.TableDetailPersonal>
                                    </Profile.TableRow>

                                    <Profile.TableRow>
                                        <Profile.TableHeading>Date of Birth</Profile.TableHeading>
                                        <Profile.TableDetailPersonal>{info.dob}</Profile.TableDetailPersonal>
                                    </Profile.TableRow>

                                    <Profile.TableRow>
                                        <Profile.TableHeading>Address</Profile.TableHeading>
                                        <Profile.TableDetailPersonal>{info.address}</Profile.TableDetailPersonal>
                                    </Profile.TableRow>
                                </tbody>
                            </Profile.Table>
                        </Profile.Data>

                        <Profile.Divider></Profile.Divider>

                        <Profile.Data>
                            <Profile.DataSubAccount>
                                <Profile.SectionName>Account</Profile.SectionName>
                                <Profile.SectionExp>Your personal account information.</Profile.SectionExp>
                            </Profile.DataSubAccount>

                            <Profile.Table>
                                <tbody>
                                    <Profile.TableRow>
                                        <Profile.TableHeading>Email Address</Profile.TableHeading>
                                        <Profile.TableDetail>{info.emailUser}</Profile.TableDetail>
                                    </Profile.TableRow>

                                    <Profile.TableRow>
                                        <Profile.TableHeading>Password</Profile.TableHeading>
                                        <Profile.TableDetail>{info.password}</Profile.TableDetail>
                                    </Profile.TableRow>

                                    <Profile.TableRow>
                                        <Profile.TableHeading>Phone Number</Profile.TableHeading>
                                        <Profile.TableDetail>{info.phone}</Profile.TableDetail>
                                    </Profile.TableRow>
                                </tbody>
                            </Profile.Table>
                        </Profile.Data>
                        
                        <Profile.Divider></Profile.Divider>

                    </div>
                </Profile.ProfileSect>
            </Profile.Wrapper> 
        : 
            <Profile.Wrapper>
                <Profile.ActionSect>
                    <Profile.ActionChoice onClick = {handleChoiceChange} value = "detail">
                        <Profile.ChoiceImg src = "../static/images/profile/detail-profile-white.png"/>
                        <Profile.AccountLink>Detail Profile</Profile.AccountLink>
                        <Profile.ArrowRightImg src = "../static/images/profile/arrow-right-white.png"/> 
                    </Profile.ActionChoice>

                    <Profile.ActionChoiceActive onClick = {handleChoiceChange} value = "edit">
                        <Profile.ChoiceImg src = "../static/images/profile/edit-profile-blue.png"/>
                        <Profile.AccountLinkActive>Edit Profile</Profile.AccountLinkActive>
                        <Profile.ArrowRightImg src = "../static/images/profile/arrow-right-blue.png"/>
                    </Profile.ActionChoiceActive>
                </Profile.ActionSect>

                <Profile.ProfileSect>
                    <Profile.ProfileAction>
                        <Profile.AccountText>Account Profile</Profile.AccountText>
                        <Profile.LogOutButton href = "/logout">Log Out</Profile.LogOutButton>
                    </Profile.ProfileAction>
                    
                    <Profile.EditWrapper>
                        <div>
                            <Profile.EditData>
                                <Profile.SectionType>
                                    <Profile.SectionTitle>Personal Data</Profile.SectionTitle>
                                    <Profile.SectionExp>Your personal basic information.</Profile.SectionExp>
                                </Profile.SectionType>

                                <form>
                                    <Profile.FormRow>
                                        <Profile.FormLabel>Full Name</Profile.FormLabel>
                                        <Profile.InputText 
                                            type = "text" 
                                            name = "fullName"
                                            value = {info.fullName} 
                                            dis = "true" 
                                            disabled
                                            onChange = {handleInputChange}
                                        />
                                    </Profile.FormRow>

                                    <Profile.FormRow>
                                        <Profile.FormLabel>ID Number</Profile.FormLabel>
                                        <Profile.InputText 
                                            type = "text" 
                                            name = "idNumber"
                                            value = {info.idNumber} 
                                            dis = "true" 
                                            disabled
                                            onChange = {handleInputChange}
                                        />
                                    </Profile.FormRow>

                                    <Profile.FormRow>
                                        <Profile.FormLabel>Date of Birth</Profile.FormLabel>
                                        <Profile.InputText 
                                            type = "text" 
                                            name = "dob"
                                            value = {info.dob} 
                                            dis = "true" 
                                            disabled
                                            required
                                            onChange = {handleInputChange}
                                        />
                                    </Profile.FormRow>

                                    <Profile.FormRow>
                                        <Profile.FormLabel>Place of Birth</Profile.FormLabel>
                                        <Profile.InputText 
                                            type = "text" 
                                            name = "pob"
                                            value = {info.pob} 
                                            dis = "true" 
                                            disabled
                                            required
                                            onChange = {handleInputChange}
                                        />
                                    </Profile.FormRow>

                                    <Profile.FormRow>
                                        <Profile.FormLabel>Gender</Profile.FormLabel>
                                        <Profile.InputText 
                                            type = "text" 
                                            name = "gender"
                                            value = {info.gender} 
                                            dis = "true" 
                                            disabled
                                            required
                                            onChange = {handleInputChange}
                                        />
                                    </Profile.FormRow>

                                    <Profile.FormRow>
                                        <Profile.RadioWrapper>
                                            <Profile.InputRadio 
                                                type = "radio" 
                                                name = "radio_gender" 
                                                checked = {info.gender == 'male' ? "true" : "false"}
                                                disabled
                                            />
                                            <Profile.LabelRadio>Male</Profile.LabelRadio>
                                        </Profile.RadioWrapper>

                                        <Profile.RadioWrapper>
                                            <Profile.InputRadio 
                                                type = "radio" 
                                                name = "radio_gender" 
                                                checked = {info.gender == 'female' ? "true" : "false"}
                                                disabled
                                            />
                                            <Profile.LabelRadio>Female</Profile.LabelRadio>
                                        </Profile.RadioWrapper>
                                    </Profile.FormRow>

                                    <Profile.FormRow>
                                        <Profile.FormLabel>Address</Profile.FormLabel>
                                        <Profile.InputText 
                                            type = "text" 
                                            name = "address"
                                            value = {info.address}
                                            required
                                            onChange = {handleInputChange}
                                        />
                                    </Profile.FormRow>
                                </form>
                            </Profile.EditData>

                            <Profile.EditData>
                                <Profile.SectionType>
                                    <Profile.SectionTitle>Account Data</Profile.SectionTitle>
                                    <Profile.SectionExp>Your personal account information.</Profile.SectionExp>
                                </Profile.SectionType>

                                <form>
                                    <Profile.FormRow>
                                        <Profile.FormLabel>Email Address</Profile.FormLabel>
                                        <Profile.InputText 
                                            type = "text" 
                                            name = "emailUser"
                                            value = {info.emailUser}
                                            required
                                            onChange = {handleInputChange}
                                        />
                                    </Profile.FormRow>

                                    <Profile.FormRow>
                                        <Profile.FormLabel>Password</Profile.FormLabel>
                                        <Profile.InputText 
                                            type = {hiddenPass ? "password" : "text"}
                                            name = "password"
                                            value = {info.password}
                                            onChange = {handleInputChange}
                                        />
                                        <Profile.EyePic>
                                            {hiddenPass ? 
                                                <FontAwesomeIcon
                                                    onClick = {toggleHiddenPass}
                                                    icon = {faEyeSlash}
                                                />
                                            :
                                                <FontAwesomeIcon
                                                    onClick = {toggleHiddenPass}
                                                    icon = {faEye}
                                                />
                                            }
                                        </Profile.EyePic>
                                    </Profile.FormRow>

                                    <Profile.FormRow>
                                        <Profile.FormLabel>Confirm New Password</Profile.FormLabel>
                                        <Profile.InputText 
                                            type = {hiddenPass ? "password" : "text"}
                                            name = "confirmPassword"
                                            onChange = {handleInputChange}
                                        />
                                        <Profile.EyePic>
                                            {hiddenConfirm ? 
                                                <FontAwesomeIcon
                                                    onClick = {toggleHiddenConfirm}
                                                    icon = {faEyeSlash}
                                                />
                                            :
                                                <FontAwesomeIcon
                                                    onClick = {toggleHiddenConfirm}
                                                    icon = {faEye}
                                                />
                                            }
                                        </Profile.EyePic>
                                    </Profile.FormRow>

                                    <Profile.FormRowPhone>
                                        <Profile.FormLabel>Phone Number</Profile.FormLabel>
                                        <Profile.PhoneInput
                                            country = "ID"
                                            value = {info.phone}
                                            name = "phone"
                                            onChange = {(value) => handleInputChange(value)}
                                        />
                                    </Profile.FormRowPhone>
                                </form>
                            </Profile.EditData>

                            <Profile.ButtonSection>
                                <Profile.SaveButton type = "submit" onClick = {updateUser}>Save</Profile.SaveButton>
                                <Profile.CancelButton onClick = {cancelEdit}>Cancel</Profile.CancelButton>
                            </Profile.ButtonSection>
                        </div>
                    </Profile.EditWrapper>
                </Profile.ProfileSect>

                <style jsx global>{`
                    .react-phone-number-input__input {
                        padding: 5px;
                        height: 35px;
                        border: none;
                        font-family: "Avenir LT Pro", sans-serif;
                        font-size: 16px;
                    }

                    .react-phone-number-input__div {
                        // width: 415px;
                    }

                `}
                    
                </style>
            </Profile.Wrapper> 
            }
        </React.Fragment>
    )
}

// UserProfile.getInitialProps = async (ctx) => {
//     initialize(ctx)
//     await ctx.store.dispatch(
//         actions.getUser(getCookie('_id', ctx.req), 'user', ctx.req)
//     )
//     return {}
// }

const mapStateToProps = (state) => ({
    user: state.user.user_data,
})
//Mengirimkan user profile
export default connect(mapStateToProps)(UserProfile);
