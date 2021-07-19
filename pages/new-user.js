import Router from 'next/router';
import { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { getCookie } from '../utils/cookie';
import { NavBarWhite } from '../components/MenuComponents.js';
import StyledDropzone from '../components/StyledDropzone';
import initialize from '../utils/initialize';
import Header from '../components/header';
import styled from 'styled-components';
import CreateProfile from '../components/new-user/CreateProfile';
import UploadPhoto from '../components/new-user/UploadPhoto';
import * as Profile from '../components/ProfileComponents';
import userActions from '../redux/actions/userActions';
import '../styles/new-user.css';
import Link from 'next/link';
import { PrButton } from '../components/landing-page/Buttons.js';

//Component yang menampilkan opsi pengisian detail dari user baru 
function Progress (props) {
  const items = []

  for (let i = 1; i <= props.totalSteps; i++) {
    if (i === props.currentStep) {
      items.push(<img src='../../static/images/step_round_filled.svg' />)
    } else {
      items.push(<img src='../../static/images/step_round.svg' />)
    }
  }

  return items
}

function CurrentStepWindow (props) {
  switch(props.currentStep) {
    case 1:
      return <CreateProfile userData={ props.userData } nextStep={ props.onNextStep } />
    case 2:
      return <UploadPhoto userData={ props.userData } nextStep={ props.onNextStep  } />
    default:
      return ''
  }
}

const SectionTitle = styled.h2`
  color: #FFFFFF;
  text-align: center;
  margin: 1rem auto;
`

const Steps = styled.div`
  margin: 1rem auto;
  text-align: center;
`

const CheckDiv = styled.div`
  margin-bottom: 45px;
  label, input[type=checkbox] {
    width: 1.5rem;
    height: 1.5rem;
    vertical-align: middle;
    margin-right: 1rem;
  }
`

function NewUser (props) {
  const totalSteps = 2
  const [photoId, setPhotoId] = useState('')
  const [currentStep, setCurrentStep] = useState(props.userData.registrationStep - 1)

  useEffect(() => {
    switch(currentStep) {
      case 1:
        break
      case 2:
        break
      default:
        Router.replace('/')
    }
  })

  return (
    <Fragment>
      <Header />
      <NavBarWhite isAuthenticated={props.isAuthenticated} username={props.username} id={props.id}/>
      <Profile.Wrapper>
        {/* Blue BG Sidebar */}
        <Profile.ActionSect>
          <Profile.ActionChoiceActive>
            <Profile.ChoiceImg src = "../static/images/profile/detail-profile-blue.png"/>
            <Profile.AccountLinkActive>Detail Profile</Profile.AccountLinkActive>
            <Profile.ArrowRightImg src = "../static/images/profile/arrow-right-blue.png"/>
          </Profile.ActionChoiceActive>
          <Profile.ActionChoice>
            <Profile.ChoiceImg src = "../static/images/profile/edit-profile-white.png"/>
            <Profile.AccountLink>Edit Profile</Profile.AccountLink>
            <Profile.ArrowRightImg src = "../static/images/profile/arrow-right-white.png"/>
          </Profile.ActionChoice>
        </Profile.ActionSect>

        {/* Profile */}
        <Profile.ProfileSect>
          <Profile.ProfileAction>
            <h2 style={{
              color: "white",
              textAlign: "center",
              margin: "24px auto"
            }}>Information Detail</h2>
          </Profile.ProfileAction>

          <div style={{
            margin: "40px auto",
            textAlign: "center"
          }}>
            <Profile.SectionName>Please upload 2 pictures for the verification purpose:</Profile.SectionName>
            <p>1. ID Card picture (Passport/ ID Card/ SIM) Make sure we can read the ID number clearly.</p>
            <p>2. Selfie with the ID Card. Make sure we can read the ID number clearly </p>
          </div>

          <div style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }}>
            <StyledDropzone title='Your ID Card' id='card' image='../static/images/Sign Up ASSET WEB/ktp.png' onDrop={ setPhotoId } />
            <StyledDropzone title='Selfie with ID Card' id='photo' image='../static/images/Sign Up ASSET WEB/selfie.png' onDrop={ setPhotoId } />
          </div>

          <div style={{
            display: "flex",
            flexDirection: "column",
            margin: "40px auto",
            width: "75%",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center"
          }}>
            <p>We will not under any circumstances, use your personal information irresponsibly. 
              For more information see our <Link href="/privacy-policy">Privacy Policy </Link> </p>
            <CheckDiv>
                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
                <label for="vehicle1">I agree to the Terms and Condition</label>
            </CheckDiv>
            <PrButton style={{ width: "45%" }}>Send Profile</PrButton>
          </div>  
        
        </Profile.ProfileSect>
      </Profile.Wrapper>
    </Fragment>
  );
}

NewUser.getInitialProps = async (ctx) => {
  initialize(ctx)
  await ctx.store.dispatch(userActions.getUser(getCookie('_id', ctx.req), 'user', ctx.req))
  return {};
}

const mapStateToProps = (state) => {
  if (state.user.user_data != null) {
    return {
      userData: state.user.user_data,
      isAuthenticated: true,
      username: state.user.user_data.fullname,
      id: state.user.user_data.idNumber
    }
  } else {
    return {
      userData: state.user.user_data,
      isAuthenticated: false
    }
  }
}

export default connect(mapStateToProps)(NewUser);
