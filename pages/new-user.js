import Router from 'next/router'
import { useState, useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import { getCookie } from '../utils/cookie'
import { NavBarWhite } from '../components/MenuComponents.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import StyledDropzone from '../components/StyledDropzone'
import initialize from '../utils/initialize'
import Header from '../components/header'
import styled from 'styled-components'
import CreateProfile from '../components/new-user/CreateProfile'
import UploadPhoto from '../components/new-user/UploadPhoto'
import * as Profile from '../components/ProfileComponents'
import userActions from '../redux/actions/userActions'
import photoActions from '../redux/actions/photoActions'
import { PrButton } from '../components/landing-page/Buttons.js'

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
  color: white;
  text-align: center;
  margin: 24px auto;
`

const Actions = styled.section`
  background: #1687e5;
  padding-top: 38px;
  @media only screen and (max-width: 800px) {
    display: none;
  }`

const CheckDiv = styled.div`
  margin-bottom: 45px;
  label, input[type=checkbox] {
    width: 1.5rem;
    height: 1.5rem;
    vertical-align: middle;
    margin-right: 1rem;
  }`

const DropzonesDiv = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 3%;
  row-gap: 3rem;
  justify-content: center;
  align-items: center;
  max-width: 95%;
  margin: 0 auto;
  @media only screen and (max-width: 1100px) {
    flex-direction: column;
  }`

const InstructionDiv = styled.div`
  margin: 40px auto;
  text-align: center;
  @media only screen and (max-width: 800px) {
    text-align: left;
    width: 95%;
  }`

const ConsentDiv = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 40px auto;
  text-align: center;
  width: 75%;
  a {
    text-decoration: none;
    color: #009FE3;
  }
  button {
    width: 28rem;
  }
  @media only screen and (max-width: 800px) {
    width: 95%;
    button {
      width: 95%;
    }
  }`

const Warning = styled.p`
  color: #FF0000;
  font-size: 0.9rem;
  text-align: left;
  margin-bottom: 0.5rem;
`

function NewUser (props) {

  const [errorMsg, setErrorMsg] = useState('')
  const [isTermsAgreed, setIsTermsAgreed] = useState(false)
  const [photoId, setPhotoId] = useState('')
  const [photoFace, setPhotoFace] = useState('')
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

  const checkPhotoValid = () => {
    if (photoId === '' || photoFace === '') {
      setErrorMsg('Neither photo can be empty!')
      return false
    }
    return true
  }

  const checkTermsAgreed = () => {
    if (!isTermsAgreed) {
      setErrorMsg('You can continue if you agree with our Terms and Condition!')
      return false
    }
    return true
  }

  const handleOnClick = (e) => {
    e.preventDefault()
    if (!checkPhotoValid() || !checkTermsAgreed()) {
      return
    }

    if (props.userData.registrationStep === 2) {
      props.uploadPhotoFillAdmin({
        photoId: photoId,
        photoFace: photoFace,
        email: props.userData.email,
        },
        'uploadPhotoFillAdmin'
      )
    } else if (props.userData.registrationStep === 3) {
      props.uploadPhoto({
        photoId: photoId,
        photoFace: photoFace,
        email: props.userData.email,
        },
        'uploadPhoto'
      )
    }
  }

  return (
    <Fragment>
      <Header />
      <NavBarWhite isAuthenticated={props.isAuthenticated} username={props.username} id={props.id}/>
      <Profile.Wrapper>
        {/* Blue BG Sidebar */}
        <Actions>
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
        </Actions>
        {/* Profile */}
        <Profile.ProfileSect>
          <Profile.ProfileAction>
            <SectionTitle>Information Detail</SectionTitle>
          </Profile.ProfileAction>
          <InstructionDiv>
            <Profile.SectionName>Please upload 2 pictures for the verification purpose:</Profile.SectionName>
            <p>1. ID Card picture (Passport/ ID Card/ SIM) Make sure we can read the ID number clearly.</p>
            <p>2. Selfie with the ID Card. Make sure we can read the ID number clearly </p>
          </InstructionDiv>
          <DropzonesDiv>
            <StyledDropzone title='Your ID Card' id='card' image='../static/images/new-ui/ic-id-card.svg' onDrop={ setPhotoId } />
            <StyledDropzone title='Selfie with ID Card' id='photo' image='../static/images/new-ui/ic-employee.svg' onDrop={ setPhotoFace } />
          </DropzonesDiv>
          <ConsentDiv>
            <p>We will not under any circumstances, use your personal information irresponsibly. 
              For more information see our <a href="/privacy-policy">Privacy Policy</a></p>
            <CheckDiv>
                <input type="checkbox" id="agree" checked={ isTermsAgreed } onChange={ () => setIsTermsAgreed(!isTermsAgreed) }/>
                <label for="agree">I agree to the <a href="/terms">Terms and Condition</a></label>
            </CheckDiv>
            <Warning>{ errorMsg ?  `*) ${ errorMsg }` : null }</Warning>
            <PrButton onClick={ handleOnClick }>
              {
                props.isInProgress ?
                (<FontAwesomeIcon icon='sync-alt' spin/>)
                :
                "Send Profile"
              }</PrButton>
          </ConsentDiv>
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
      id: state.user.user_data.idNumber,
      isInProgress: state.photo.inProgress,
      errorMessage: state.photo.errorMessage
    }
  } else {
    return {
      userData: state.user.user_data,
      isAuthenticated: false,
      isInProgress: state.photo.inProgress,
      errorMessage: state.photo.errorMessage
    }
  }
}

export default connect(mapStateToProps, photoActions)(NewUser);
