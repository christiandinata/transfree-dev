import { useState } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DatePicker from 'react-datepicker'
import profileActions from '../../redux/actions/profileActions'
import * as Profile from '../ProfileComponents'
import { PrButton } from '../landing-page/Buttons'
import styled from 'styled-components'

const InfoFlex = styled.div`
  margin: 2rem auto;
  width: 55%;
  select {
    border: 1px solid #e2e2e2;
  }
  input, select {
    box-sizing: border-box;
    padding: 12px 16px;
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
    input {
      border: ${ props => props.dateError ? "2px solid red" : "1px solid #E2E2E2"};
      &:focus {
        border: 2px solid #068EC8;
        color: #232933;
      }
    }
  }
  .react-datepicker__header {
    background-color: #FFFFFF;
  }
  img {
    position: absolute;
    bottom: 0.6rem;
    right: 0.75rem;
  }
  a {
    font-size: 1rem;
    color: #068EC8;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  @media only screen and (max-width: 720px) {
    width: 95%;
  } 
`

const InfoInput = styled.input`
  border: ${ props => props.error ? "2px solid red" : "1px solid #E2E2E2" };
`

const InfoLabel = styled.label`
  margin-top: 1.5rem;
  display: block;
  margin-left: 8px;
  margin-bottom: 4px;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: ${ props => props.filled ? "#068EC8" : (props.error ? "red" : "#9A9A9A") };
`

const ErrorSpan = styled.span`
  margin: 4px auto 0 8px;
  font-size: 12px;
  color: red;
`

function CreateProfile(props) {

  const [focus, setFocus] = useState({
    idType: false,
    idNumber: false,
    gender: false,
    dob: false,
    pob: false,
    address: false
  })

  const [formData, setFormData] = useState({
    idType: "KTP",
    idNumber: "",
    gender: "Male",
    dob: "",
    pob: "",
    address: ""
  })

  const [error, setError] = useState({
    idType: false,
    idNumber: false,
    gender: false,
    dob: false,
    pob: false,
    address: false
  })

  if (props.response) {
    props.nextStep()
  }

  function handleOnClickButton(e) {
    e.preventDefault()
    
    if(isDataValid()) {
      props.createProfile({
        ...formData,
        email: props.userData.email,
      },
      'createProfile'
      )
    } else {
      setError({
        ...error,
        'dob': !(!!formData['dob']),
        'pob': !(!!formData['pob']),
        'idNumber': !(!!formData['idNumber']),
        'address': !(!!formData['address'])
      })
    }
  }

  // Pengecakan validitas data, disini hanya periksa apakah kosong atau tidak
  function isDataValid() {
    return !Object.values(formData).includes('')
  }

  function handleOnFocus(e) {
    const { name } = e.target
    setFocus({
      ...focus,
      [name]: true
    })
  }

  function handleOnBlur(e) {
    const { name, value } = e.target
    setFocus({
      ...focus,
      [name]: false
    })

    if(!value) {
      setError({
        ...error,
        [name]: true
      })
    } else {
      setError({
        ...error,
        [name]: false
      })
    }
  }

  function handleOnChange(e) {
    const { name, value } = e.target
    console.log(name + " " + value)
    if( name == "idNumber" && /^[A-za-z0-9]*$/.test(value) ){
      setFormData({
        ...formData,
        [name]: value.replace(/[\[\]^`_\\]/gi, '')
      })
    } else if (
      name == "pob" &&
      /^[A-z]*((-|\s)*[A-z\s])*$/.test(value)
    ) {
      setFormData({
        ...formData,
        [name]: value
      })
    } else if (
      name == "address" &&
      /^[A-z0-9\.\,]*((-|\s)*[A-z0-9\.\,\s])*$/.test(value)
    ) {
      setFormData({
        ...formData,
        [name]: value
      })
    } else if ( name == "gender" || name == "idType" ) {
      setFormData({
        ...formData,
        [name]: value
      })
    }
  }

  function handleDateChange(date) {
    setFormData({
      ...formData,
      dob: date
    }) 
    setFocus({
      ...focus,
      dob: false
    })
    setError({
      ...error,
      dob: false
    })
  }

  return(
    // Menanyakan apakah user ingin mengisi profile sendiri atau tidak
    <InfoFlex dateError={ error.dob }>
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
      
      <a onClick={ props.nextStep }>
        Do you want us to fill the form for you?
      </a>

      <form>
        <InfoLabel filled={ focus.idType } error={ false }>ID Type</InfoLabel>
        <select
          name="idType"
          value={ formData.idType }
          onFocus={ handleOnFocus }
          onBlur={ handleOnBlur }
          onChange={ handleOnChange }>
            <option value="KTP">KTP</option>
            <option value="Passport">Passport</option>
            <option value="SIM">SIM</option>
        </select>
        <InfoLabel filled={ focus.idNumber } error={ error.idNumber }>ID Number</InfoLabel>
        <InfoInput
          type="text"
          name="idNumber"
          value={ formData.idNumber }
          onFocus={ handleOnFocus }
          onBlur={ handleOnBlur }
          onChange={ handleOnChange }
          error={ error.idNumber } />
        { error.idNumber ? (<ErrorSpan>ID Number cannot be blank</ErrorSpan>) : null }
        <InfoLabel filled={ focus.gender } error={ false }>Gender</InfoLabel>
        <select
          name="gender"
          value={ formData.gender }
          onFocus={ handleOnFocus }
          onBlur={ handleOnBlur }
          onChange={ handleOnChange }>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
        </select>
        <InfoLabel filled={ focus.pob } error={ error.pob }>Place of Birth</InfoLabel>
        <InfoInput
          type="text"
          name="pob"
          value={ formData.pob }
          onFocus ={ handleOnFocus }
          onBlur={ handleOnBlur }
          onChange={ handleOnChange }
          error={ error.pob } />
        { error.pob ? (<ErrorSpan>Place of birth cannot be blank</ErrorSpan>) : null }
        <InfoLabel filled={ focus.dob } error={ error.dob }>Date of Birth</InfoLabel>
          <div style={{ position: "relative" }}>
            <DatePicker
              name="dob"
              dateFormat="dd-MM-yyyy"
              error={ error.dob }
              selected={ formData.dob }
              onChange={ (date) => handleDateChange(date) }
              showMonthDropdown
              showYearDropdown
              maxDate={ new Date() }
              onFocus ={ handleOnFocus }
              onBlur={ handleOnBlur } />
            <img src="../../static/images/new-ui/ic-calendar.svg" alt="ic-cal"/>
          </div>
        { error.dob ? (<ErrorSpan>Date of birth cannot be blank</ErrorSpan>) : null }
        <InfoLabel filled={ focus.address } error={ error.address }>Address</InfoLabel>
        <InfoInput
          type="text"
          name="address"
          value={ formData.address }
          onFocus ={ handleOnFocus }
          onBlur={ handleOnBlur }
          onChange={ handleOnChange }
          error={ error.address } />
        { error.address ? (<ErrorSpan>Address cannot be blank</ErrorSpan>) : null }
        <Profile.ButtonSection>
          <PrButton 
            type="submit"
            style={{ width: '100%' }}
            onClick={ handleOnClickButton }>
              {
                props.isInProgress ?
                (<FontAwesomeIcon icon='sync-alt' spin/>)
                :
                "Continue"
              }
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
    userData: state.user.user_data
  }
}

export default connect(mapStateToProps, profileActions)(CreateProfile)
