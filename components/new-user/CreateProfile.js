import { useState, Fragment } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DatePicker from 'react-datepicker'
import CustomDatePicker from '../CustomDatePicker'
import MobilePopup from '../MobilePopup'
import profileActions from '../../redux/actions/profileActions'
import * as Profile from '../ProfileComponents'
import { PrButton } from '../landing-page/Buttons'
import styled from 'styled-components'

const InfoFlex = styled.div`
  margin: 2rem auto;
  width: 55%;
  input, select {
    box-sizing: border-box;
    padding: 12px 16px;
    margin-bottom: 1rem;
    border: 1px solid #E2E2E2; 
    border-radius: 4px;
    background: #FFFFFF;
    font-family: "Avenir Next LT Pro", sans-serif;
    outline: none;
    width: 100%;
    color: #9A9A9A;
    &:focus {
      background: #fff;
      border: 2px solid #068EC8;
      color: #232933;
    }
  }
  .react-datepicker {
    font-family: "Avenir Next LT Pro", sans-serif;
  }
  .react-datepicker-wrapper {
    display: block;
  }
  .react-datepicker__header {
    background: #FFFFFF;
  }
  @media only screen and (max-width: 720px) {
    width: 95%;
  } 
`

function CreateProfile (props) {

  const [focus, setFocus] = useState({
    idType: false,
    idNumber: false,
    gender: false,
    dateOfBirth: false,
    placeOfBirth: false,
    address: false
  })

  const [idType, setIdType] = useState('KTP')
  const [idNumber, setIdNumber] = useState('')
  const [gender, setGender] = useState('Male')
  const [placeOfBirth, setPlaceOfBirth] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState()
  const [address, setAddress] = useState('')
  const [isIdNumberValid, setIsIdNumberValid] = useState(true)
  const [isPobValid, setIsPobValid] = useState(true)
  const [isAddressValid, setIsAddressValid] = useState(true)
  const [isSkipPopupVisible, setIsSkipPopupVisible] = useState(true)

  if (props.response && !props.errorMessage) {
    props.nextStep()
  }
  //Function cek validitas nomer identitas
  function checkIdnumber(e) {
    if (e.target.value === '') {
      setIsIdNumberValid(false)
    } else {
      setIsIdNumberValid(true)
    }
  }
  //Function cek validitas tempat lahir
  function checkPob(e) {
    if (e.target.value === '') {
      setIsPobValid(false)
    } else {
      setIsPobValid(true)
    }
  }
  //Function cek validitas alamat
  function checkAddress(e) {
    if (e.target.value === '') {
      setIsAddressValid(false)
    } else {
      setIsAddressValid(true)
    }
  }

  function handleOnClickButton(e) {
    e.preventDefault()

    if (!checkIdDataValid()) {
      return
    }
    //setelah data valid, data disimpan dalam profile
    props.createProfile({
        idType: idType,
        idNumber: idNumber,
        gender: gender,
        pob: placeOfBirth,
        dob: dateOfBirth,
        address: address,
        email: props.userData.email,
      },
      'createProfile'
    )
  }

  //Pengecakan validitas data, disini hanya periksa apakah kosong atau tidak
  function checkIdDataValid() {
    let isValid = true

    if (idNumber === '') {
      isValid = false
      setIsIdNumberValid(false)
    }

    if (placeOfBirth === '') {
      isValid = false
      setIsPobValid(false)
    }

    if (address === '') {
      isValid = false
      setIsAddressValid(false)
    }

    return isValid
  }

  function handleOnFocus(e) {
    const { name } = e.target
    setFocus({
      ...focus,
      [name]: true
    })
  }

  function handleOnBlur(e) {
    const { name } = e.target
    setFocus({
      ...focus,
      [name]: false
    })
  }

  return(
    // Menanyakan apakah user ingin mengisi profile sendiri atau tidak
    <InfoFlex>
      <Profile.EditData>
        <Profile.SectionType>
          <Profile.SectionTitle>
            Please provide your identity.
          </Profile.SectionTitle>
          <Profile.SectionExp>
            According to the regulation from Bank Indonesia, 
            we have to verify your identity.
          </Profile.SectionExp>
        </Profile.SectionType>
      </Profile.EditData>
      
      {/* <div className='create-profile-form-body-heading'>
        <div className='create-profile-form-skip'>
          <a onClick={ props.nextStep } >
            Do you want us to fill the form for you?
          </a>
        </div>
      </div> */}

      <form>
        <Profile.FormLabel filled={ focus.idType }>ID Type</Profile.FormLabel>
        <select
          name="idType"
          onFocus={ handleOnFocus }
          onBlur={ handleOnBlur }>
            <option value="KTP">KTP</option>
            <option value="Passport">Passport</option>
            <option value="SIM">SIM</option>
        </select>
        <Profile.FormLabel filled={ focus.idNumber }>ID Number</Profile.FormLabel>
        <input
          type="text"
          name="idNumber"
          onFocus={ handleOnFocus }
          onBlur={ handleOnBlur }
        />
        <Profile.FormLabel filled={ focus.gender }>Gender</Profile.FormLabel>
        <select
          name="gender"
          onFocus={ handleOnFocus }
          onBlur={ handleOnBlur }>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
        </select>
        <Profile.FormLabel filled={ focus.placeOfBirth }>Place of Birth</Profile.FormLabel>
        <input
          type="text"
          name="placeOfBirth"
          onFocus ={ handleOnFocus }
          onBlur={ handleOnBlur }
        />
        <Profile.FormLabel filled={ focus.dateOfBirth }>Date of Birth</Profile.FormLabel>
          <DatePicker
            name="dateOfBirth"
            dateFormat="dd-MM-yyyy"
            selected={ dateOfBirth }
            onChange={ (date) => {
              setDateOfBirth(date); 
              setFocus({
                dateOfBirth: false
              })
            }}
            onFocus ={ handleOnFocus }
            onBlur={ handleOnBlur }/>
        <Profile.FormLabel filled={ focus.address }>Address</Profile.FormLabel>
        <input
          type="text"
          name="address"
          onFocus ={ handleOnFocus }
          onBlur={ handleOnBlur }/>
        <Profile.ButtonSection>
          <PrButton 
            type="submit"
            style={{ width: '100%' }}
            onClick={ handleOnClickButton }>
              Continue
          </PrButton>
        </Profile.ButtonSection>
      </form>
      
    </InfoFlex>
  )
}

//Memunculkan pop up data user
const mapStateToProps = (state) => {
  return {
    isInProgress: state.profile.inProgress,
    response: state.profile.response,
    errorMessage: state.profile.errorMessage,
  }
}

export default connect(mapStateToProps, profileActions)(CreateProfile)
