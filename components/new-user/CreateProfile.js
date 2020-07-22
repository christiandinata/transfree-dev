import { useState, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CustomDatePicker from '../CustomDatePicker';
import MobilePopup from '../MobilePopup';
import '../../styles/components/new-user/CreateProfile.css';

function CreateProfile (props) {
  const [idType, setIdType] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [gender, setGender] = useState('');
  const [placeOfBirth, setPlaceOfBirth] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [address, setAddress] = useState('');
  const [isIdNumberValid, setIsIdNumberValid] = useState(true);
  const [isPobValid, setIsPobValid] = useState(true);
  const [isAddressValid, setIsAddressValid] = useState(true);
  const [isInProgress, setIsInProgress] = useState(false);
  const [isSkipPopupVisible, setIsSkipPopupVisible] = useState(true);

  function checkIdnumber(e) {
    if (e.target.value === '') {
      setIsIdNumberValid(false)
    } else {
      setIsIdNumberValid(true)
    }
  }

  function checkPob(e) {
    if (e.target.value === '') {
      setIsPobValid(false)
    } else {
      setIsPobValid(true)
    }
  }

  function checkAddress(e) {
    if (e.target.value === '') {
      setIsAddressValid(false)
    } else {
      setIsAddressValid(true)
    }
  }

  return(
    <Fragment>
      {
        isSkipPopupVisible
        ? <MobilePopup
            title='Confirmation'
            message='Do you want to fill this form ?'
            isChoice
            confirmMessage='Yes'
            onConfirm= { () => setIsSkipPopupVisible(false) }
            rejectMessage='No'
            onReject={ props.nextStep }
          />
        : ''
      }
      <div className='create-profile-form-body-heading'>
        <div className='create-profile-form-skip'>
          <a onClick={ props.nextStep } >
            I don't want to fill the form
          </a>
        </div>
        <div className='create-profile-profile-picture'>
          <img src='../../static/images/profile.svg' />
        </div>
      </div>
      <div className='create-profile-form-body'>
        <div className='create-profile-form-box'>
          <p className="create-profile-form-description">
            According to the regulation from Bank Indonesia,<br/>we have to verify your identity. Please provide your identity.
          </p>
          <div className='create-profile-form-field-container'>
            <div classname='create-profile-form-field-container-column'>
              <div className='create-profile-form-field'>
                <label className='create-profile-form-label' htmlFor='id-type'>
                  ID Type
                </label>
                <select
                  id='id-type'
                  value={ idType }
                  onChange={ (e) => setIdType(e.target.value) }
                >
                  <option value='KTP'>KTP</option>
                  <option value='Passport'>Passport</option>
                  <option value='SIM'>SIM</option>
                </select>
              </div>
              <div className='create-profile-form-field'>
                <label className='create-profile-form-label' htmlFor='id-number'>
                  ID Number
                </label>
                <input
                  id='id-number'
                  placeholder='Enter ID number'
                  value={ idNumber }
                  onChange={ (e) => setIdNumber(e.target.value) }
                  onBlur={ checkIdnumber }
                />
                <span className={ isIdNumberValid ? 'form-error-label-hidden' : 'form-error-label' }>
                  You must input your ID Number (KTP/Passport/SIM)!
                </span>
              </div>
              <div className='create-profile-form-field'>
                <label className='create-profile-form-label' htmlFor='gender'>
                  Gender
                </label>
                <select
                  id='gender'
                  placeholder='Choose your gender'
                  value={ gender }
                  onChange={ (e) => setGender(e.target.value) }
                >
                  <option value='Male'>Male</option>
                  <option value='Female'>Female</option>
                  <option value='Others'>Others</option>
                </select>
              </div>
            </div>
            <div classname='create-profile-form-field-container-column'>
              <div className='create-profile-form-field'>
                <label className='create-profile-form-label' htmlFor='pob'>
                  Place of Birth
                </label>
                <input
                  id='pob'
                  placeholder='Enter the city (e.g. Jakarta)'
                  value={ placeOfBirth }
                  onChange={ (e) => setPlaceOfBirth(e.target.value) }
                  onBlur={ checkPob }
                />
                <span className={ isPobValid ? 'form-error-label-hidden' : 'form-error-label' }>
                  Your Place of Birth may not be empty.
                </span>
              </div>
              <div className='create-profile-form-field'>
                <label className='create-profile-form-label' htmlFor='dob'>
                  Date of Birth
                </label>
                <CustomDatePicker date={ dateOfBirth } onChange={ setDateOfBirth } />
              </div>
              <div className='create-profile-form-field'>
                <label className='create-profile-form-label' htmlFor='address'>
                  Address
                </label>
                <input
                  id='address'
                  placeholder='Enter your full address'
                  value={ address }
                  onChange={ (e) => setAddress(e.target.value) }
                  onBlur={ checkAddress }/>
                <span className={ isAddressValid ? 'form-error-label-hidden' : 'form-error-label' }>
                  Your address may not be empty.
                </span> 
              </div>
            </div>
          </div>
          <p className="create-profile-form-note">
            *data must match to your id card
          </p>
        </div>
        <button className='form-submit-button' onClick={ () => {console.log('yow')} }>
          {
            isInProgress
              ? ( <FontAwesomeIcon icon='sync-alt' spin/> )
              : 'Continue'
          }
        </button>
      </div>
    </Fragment>
  )
}

export default CreateProfile
