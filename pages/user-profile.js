import CustomDatePicker from '../components/CustomDatePicker';
import Header from "../components/header";
import Menu from "../components/menu";
import { NavBarWhite } from '../components/MenuComponents';
import Phone from "react-phone-number-input";
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
    const [info, setInfo] = useState({
		emailUser: "",
        fullname: "aaa",
        idNumber: "bbb",
        gender: "",
        dob: "",
        pob: "",
        address: "",
        password: "",
        confirmPassword: "",
	});

    const [choice, setChoice] = useState('edit')

    // useEffect(() => {
    //     setProfile({
    //         ...profile,
    //         emailUser: props.user.email,
    //         fullname: props.user.fullname,
    //         idNumber: props.user.idNumber,
    //         gender: props.user.gender,
    //         dob: props.user.dob,
    //         pob: props.user.pob,
    //         address: props.user.address,
    //         password: "123456",
    //         confirmPassword: "123456"            
    //     })
    // }, [props.user])

    useEffect(() => {
        console.log(props)
    })

    const handleChoiceChange = (e) => {
        e.preventDefault()
        e.currentTarget.value == 'detail' ? setChoice('detail') : setChoice('edit')
    }

    return(
        <React.Fragment>
            <Header/>
            <NavBarWhite username = {info.fullname} id = {info.idNumber}/>

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
                                        <Profile.TableDetailPersonal>Joshua</Profile.TableDetailPersonal>
                                    </Profile.TableRow>

                                    <Profile.TableRow>
                                        <Profile.TableHeading>ID Number</Profile.TableHeading>
                                        <Profile.TableDetailPersonal>ID5627</Profile.TableDetailPersonal>
                                    </Profile.TableRow>

                                    <Profile.TableRow>
                                        <Profile.TableHeading>Gender</Profile.TableHeading>
                                        <Profile.TableDetailPersonal>Male</Profile.TableDetailPersonal>
                                    </Profile.TableRow>

                                    <Profile.TableRow>
                                        <Profile.TableHeading>Place of Birth</Profile.TableHeading>
                                        <Profile.TableDetailPersonal>Bogor</Profile.TableDetailPersonal>
                                    </Profile.TableRow>

                                    <Profile.TableRow>
                                        <Profile.TableHeading>Date of Birth</Profile.TableHeading>
                                        <Profile.TableDetailPersonal>1999</Profile.TableDetailPersonal>
                                    </Profile.TableRow>

                                    <Profile.TableRow>
                                        <Profile.TableHeading>Address</Profile.TableHeading>
                                        <Profile.TableDetailPersonal>Jalan</Profile.TableDetailPersonal>
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
                                        <Profile.TableDetail>blabla</Profile.TableDetail>
                                    </Profile.TableRow>

                                    <Profile.TableRow>
                                        <Profile.TableHeading>Password</Profile.TableHeading>
                                        <Profile.TableDetail>bintang bintang</Profile.TableDetail>
                                    </Profile.TableRow>

                                    <Profile.TableRow>
                                        <Profile.TableHeading>Phone Number</Profile.TableHeading>
                                        <Profile.TableDetail>0812</Profile.TableDetail>
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
                                        <Profile.InputText type = "text" dis = "true" disabled/>
                                    </Profile.FormRow>

                                    <Profile.FormRow>
                                        <Profile.FormLabel>ID Number</Profile.FormLabel>
                                        <Profile.InputText type = "text" dis = "true" disabled/>
                                    </Profile.FormRow>

                                    <Profile.FormRow>
                                        <Profile.FormLabel>Date of Birth</Profile.FormLabel>
                                        <Profile.InputText type = "text" dis = "true" disabled/>
                                    </Profile.FormRow>

                                    <Profile.FormRow>
                                        <Profile.FormLabel>Place of Birth</Profile.FormLabel>
                                        <Profile.InputText type = "text" dis = "true" disabled/>
                                    </Profile.FormRow>

                                    <Profile.FormRow>
                                        <Profile.FormLabel>Gender</Profile.FormLabel>
                                        <Profile.InputText type = "text" dis = "true"disabled/>
                                    </Profile.FormRow>

                                    <Profile.FormRow>
                                        <Profile.RadioWrapper>
                                            <Profile.InputRadio type = "radio" name = "radio_gender" disabled/>
                                            <Profile.LabelRadio>Male</Profile.LabelRadio>
                                        </Profile.RadioWrapper>

                                        <Profile.RadioWrapper>
                                            <Profile.InputRadio type = "radio" name = "radio_gender" disabled/>
                                            <Profile.LabelRadio>Female</Profile.LabelRadio>
                                        </Profile.RadioWrapper>
                                    </Profile.FormRow>

                                    <Profile.FormRow>
                                        <Profile.FormLabel>Address</Profile.FormLabel>
                                        <Profile.InputText type = "text"/>
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
                                        <Profile.InputText type = "text"/>
                                    </Profile.FormRow>

                                    <Profile.FormRow>
                                        <Profile.FormLabel>Password</Profile.FormLabel>
                                        <Profile.InputText type = "password"/>
                                    </Profile.FormRow>

                                    <Profile.FormRow>
                                        <Profile.FormLabel>Confirm New Password</Profile.FormLabel>
                                        <Profile.InputText type = "password"/>
                                    </Profile.FormRow>

                                    <Profile.FormRow>
                                        <Profile.FormLabel>Phone Number</Profile.FormLabel>
                                        {/* Dropdown */}
                                        <Profile.PhoneInput
                                            country = "ID"
                                        />
                                    </Profile.FormRow>
                                </form>
                            </Profile.EditData>

                            <Profile.ButtonSection>
                                <Profile.SaveButton>Save</Profile.SaveButton>
                                <Profile.CancelButton>Cancel</Profile.CancelButton>
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

                `}
                    
                </style>
            </Profile.Wrapper> 
            }
        </React.Fragment>
    )
}

// UserProfile.getInitialProps = async (ctx) => {
//     initialize(ctx)
//     await ctx.store.dispatch(actions.getUser(getCookie('_id', ctx.req), 'user', ctx.req))
//     return {}
// }

const mapStateToProps = (state) => ({
    user: state.user.user_data,
})
//Mengirimkan user profile
export default connect(mapStateToProps)(UserProfile);
