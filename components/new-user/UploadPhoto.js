import { useState, Fragment } from 'react'
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import StyledDropzone from '../StyledDropzone'
import photoActions from '../../redux/actions/photoActions';
import '../../styles/components/new-user/UploadPhoto.css'
import PopupUpload from '../PopupUpload';

function UploadPhoto (props) {
  const [photoId, setPhotoId] = useState('')
  const [photoFace, setPhotoFace] = useState('')
  const [isTermsAgreed, setIsTermsAgreed] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  function handleOnClickButton(e) {
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

  function checkPhotoValid() {
    if (photoId === '' || photoFace === '') {
      setErrorMessage('Neither photo can be empty!')
      return false
    }
    return true
  }

  function checkTermsAgreed() {
    if (!isTermsAgreed) {
      setErrorMessage('You can continue if you agree with our Terms and Condition!')
      return false
    }
    return true
  }

  return (
    <Fragment>
      <PopupUpload></PopupUpload>
      <p className='upload-photo-description-mobile'>
      We need to verify your information detail.<br/>
      Please send us your ID Picture and Your Photo
      </p>
      <div className='upload-photo-dropboxes-container'>
        <StyledDropzone title='ID Card' id='card' onDrop={ setPhotoId } />
        <StyledDropzone title='Your Photo' id='photo' onDrop={ setPhotoFace } />
      </div>
      <label class="upload-photo-terms-agreement">
        <input type="checkbox" checked={ isTermsAgreed } onChange={ () => setIsTermsAgreed(!isTermsAgreed) } />
        I agree to the <a className='upload-photo-terms-link' href='/terms'>Terms and Condition</a>
      </label>
      <p className='upload-photo-privacy-policy-statement'>
        We will not under any circumstances,<br/>use your personal information irresponsibly.<br/>
        For more information see our <a className='upload-photo-privacy-policy-link' href='/privacy-policy'>Privacy Policy</a>
      </p>
      {
        errorMessage
        ? <div className='upload-photo-error-message'>{ errorMessage }</div>
        : props.errorMessage
          ? <div className='upload-photo-error-message'>{ props.errorMessage }</div>
          : ''
      }
      <button className='form-submit-button' onClick={ handleOnClickButton }>
        {
          props.isInProgress
            ? ( <FontAwesomeIcon icon='sync-alt' spin/> )
            : 'Send'
        }
      </button>
    </Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    isInProgress: state.photo.inProgress,
    errorMessage: state.photo.errorMessage,
  }
}

export default connect(mapStateToProps, photoActions)(UploadPhoto)
