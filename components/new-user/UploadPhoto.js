import { useState, Fragment } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import StyledDropzone from '../StyledDropzone'
import photoActions from '../../redux/actions/photoActions'
import { PrButton } from '../landing-page/Buttons'

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
  max-width: 95%;
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

const SectionName = styled.div`
  margin-top: 0;
  margin-bottom: 4px;
  font-style: normal
  font-weight: bold;
  font-size: 20px;
  line-height: 28px;
  color: #232933;
`

const Warning = styled.p`
  color: #FF0000;
  font-size: 0.9rem;
  text-align: left;
  margin-bottom: 0.5rem;
`

function UploadPhoto (props) {
  const [photoId, setPhotoId] = useState('')
  const [photoFace, setPhotoFace] = useState('')
  const [isTermsAgreed, setIsTermsAgreed] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  function handleOnClickButton(e) {
    e.preventDefault()
    //Cek apakah user sudah setuju dengan terms dan mengumpulkan foto
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

  //Periksa apakah foto sudah diupload
  function checkPhotoValid() {
    if (photoId === '' || photoFace === '') {
      setErrorMessage('Neither photo can be empty!')
      return false
    }
    return true
  }

  //Periksa apakah Terms sudah disetujui
  function checkTermsAgreed() {
    if (!isTermsAgreed) {
      setErrorMessage('You can continue if you agree with our Terms and Condition!')
      return false
    }
    return true
  }

  return (
    <Fragment>
      <InstructionDiv>
        <SectionName>Please upload 2 pictures for the verification purpose:</SectionName>
        <p>1. ID Card picture (Passport/ ID Card/ SIM) Make sure we can read the ID number clearly.</p>
        <p>2. Selfie with the ID Card. Make sure we can read the ID number clearly </p>
      </InstructionDiv>
      <DropzonesDiv>
        <StyledDropzone title='Your ID Card' id='card' image='../static/images/new-ui/ic-id-card.svg' onDrop={ setPhotoId } onError={ setErrorMessage } />
        <StyledDropzone title='Selfie with ID Card' id='photo' image='../static/images/new-ui/ic-employee.svg' onDrop={ setPhotoFace } onError={ setErrorMessage } />
      </DropzonesDiv>
      <ConsentDiv>
        <p>We will not under any circumstances, use your personal information irresponsibly. 
          For more information see our <a href="/privacy-policy">Privacy Policy</a></p>
        <CheckDiv>
          <input type="checkbox" id="agree" checked={ isTermsAgreed } onChange={ () => setIsTermsAgreed(!isTermsAgreed) }/>
          <label htmlFor="agree">I agree to the <a href="/terms">Terms and Condition</a></label>
        </CheckDiv>
        <Warning>{ errorMessage ? errorMessage : null }</Warning>
        <PrButton onClick={ handleOnClickButton }>
        {
          props.isInProgress ?
          (<FontAwesomeIcon icon='sync-alt' spin/>)
          :
          "Send Profile"
        }</PrButton>
      </ConsentDiv>
    </Fragment>
  )
}

//Memunculkan data user di pop up
const mapStateToProps = (state) => {
  return {
    isInProgress: state.photo.inProgress,
    errorMessage: state.photo.errorMessage
  }
}

export default connect(mapStateToProps, photoActions)(UploadPhoto)
