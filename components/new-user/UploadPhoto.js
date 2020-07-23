import { useState, Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import StyledDropzone from '../StyledDropzone'
import '../../styles/components/new-user/UploadPhoto.css'

function UploadPhoto (props) {
  const [photoId, setPhotoId] = useState('')
  const [photoFace, setPhotoFace] = useState('')
  const [isTermsAgreed, setIsTermsAgreed] = useState(false)

  function sendPhotos() {
    
  }

  return (
    <Fragment>
      <p className='upload-photo-description-mobile'>
      We need to verify your information detail.<br/>
      Please send us your ID Picture and Your Photo
      </p>
      <div className='upload-photo-dropboxes-container'>
        <StyledDropzone title='ID Card' onDrop={ setPhotoId } />
        <StyledDropzone title='Your Photo' onDrop={ setPhotoFace } />
      </div>
      <label class="upload-photo-terms-agreement">
        <input type="checkbox" checked={ isTermsAgreed } onChange={ () => setIsTermsAgreed(!isTermsAgreed) } />
        I agree to the <a className='upload-photo-terms-link' href='/terms'>Terms and Condition</a>
      </label>
      <p className='upload-photo-privacy-policy-statement'>
        We will not under any circumstances,<br/>use your personal information irresponsibly.<br/>
        For more information see our <a className='upload-photo-privacy-policy-link' href='/privacy-policy'>Privacy Policy</a>
      </p>
      <button className='form-submit-button' onClick={ () => {console.log('yow')} }>
        {
          true
            ? ( <FontAwesomeIcon icon='sync-alt' spin/> )
            : 'Send'
        }
      </button>
    </Fragment>
  )
}

export default UploadPhoto
