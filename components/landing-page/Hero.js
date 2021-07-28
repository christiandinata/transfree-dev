import React, { useState } from 'react'
import NumberFormat from 'react-number-format'
import styled from 'styled-components'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ScButton } from './Buttons'

export const MapBackground = styled.div`
  background-image: url('../static/images/new-ui/batik-world-map.png');
  background-size: cover;
  background-repeat: no-repeat;
  height: 750px;
  @media only screen and (max-width: 800px) {
    height: 1280px;
    background: none;
  }`

export const Overlay = styled.div`
  background: linear-gradient(178.43deg, #009FE3 1.26%, rgba(0, 159, 227, 0) 96.85%);
  height: 780px;
  @media only screen and (max-width: 800px) {
    height: 1280px;
  }`

export const HeroDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin: 0 auto;
  padding-top: 7rem;
  width: 95%;
  max-width: 1124px;
  color: #FFFFFF;
  h1 {
    color: #FFFFFF;
    font-size: 2.5rem;
    line-height: 140%;
    margin-bottom: 0;
  }
  transition: all 0.5s ease-in;
  @media only screen and (max-width: 800px) {
    flex-direction: column;
    row-gap: 2rem;
    margin-bottom: 4rem;
    padding-bottom: 4rem;
    text-align: center;
    p {
      margin: 1rem auto;
    }
  }`

export const Converter = styled.div`
  background: #FFFFFF;
  border-radius: 16px;
  color: #626B79;
  position: relative;
  padding: 2rem 0;
  flex-basis: 55%;
  max-width: 400px;
  @media only screen and (max-width: 800px) {
    text-align: left;
  }`

const Exchange = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 1.25rem 1rem 1.25rem;

    input {
      width: 100%;
      border: 0.5px solid #E2E2E2;
      border-radius: 5px;
      font-size: 1.25rem;
      font-family: "Avenir Next LT Pro Bold", sans-serif !important;
      padding: 0.75rem 1.25rem;
      transition: box-shadow 0.2s linear;
    }

    input:focus {
      box-shadow: 0 0 0 2px #068EC8;
      outline: none;
    }

    .label {
      transition: color 0.2s linear;
    }
    
    ${({ active }) => active && `
      > .label {
        color: #068EC8;
      }
    `}
    `

const Currency = styled.div`
    button {
      align-items: center;
      border: none;
      border-radius: 5px;
      background-color: #1F345A;
      color: #FFFFFF;
      display: flex;
      font-size: 1.25rem;
      text-transform: uppercase;
      justify-content: space-between;
      transition: background-color 0.2s ease-in;
      padding: 0.75rem 0.75rem;
      width: 120px;
    }

    button:hover {
      background-color: #274375;
    }

    .flag-icon {
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50%;
    }`

const DropDownMenu = styled.div`
    position: absolute;
    right: 3%;
    z-index: 5;
    padding: 0 0 .5rem;
    margin: .125rem 0 0;
    font-size: 1rem;
    background-color: #fff;
    border: 1px solid rgba(0,0,0,.15);
    border-radius: 5px;
    ul {
      height: auto;
      max-height: 200px;
      overflow-y: auto;
      margin: 0;
      padding: 0;
    }`

const DropDownItem = styled.li`
    display: flex;
    align-items: center;
    padding: 1rem 1rem;
    column-gap: 1rem;
    color: #15233C;
    transition: background-color 0.1s ease-out;
    &:hover {
      background: #009FE380;
      color: #FFFFFF;
      cursor: pointer;
    }

    ${({ disabled }) => disabled && `
    opacity: 0.6;

    &:hover {
      background: grey;
      color: #FFFFFF;
      cursor: default;
    }
  `}    
`

const SearchBar = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  background-color: #1E345B;
  border-radius: 5px 5px 0 0;
  width: 300px;
  padding: 1rem 1.25rem 1rem 0.5rem;
  input {
    border: none;
    background-color: transparent;
    color: #FFFFFF;
    font-family: "Avenir Next LT Pro", sans-serif !important;
    outline: none;
    padding: 0;
  }
  input:focus { 
    box-shadow: none;
  }
  input::placeholder {
    color: #FFFFFF;
  }
`

const ResultConversion = styled.div`
background-color: #1E345B;
color: #FFFFFF;
margin-top: 2rem;
padding: 1rem 1.25rem;`

const ResultFlex = styled.div`
display: flex;
flex-direction: row;
align-items: center;
span {
  width: 50%;
}`

const TitleDiv = styled.div`
    flex-basis: 60%;
    p { 
      width: 80%;
      text-align: left !important; 
    }
    @media only screen and (max-width: 800px) {
      p { text-align: center !important; }
    }`

const InputFlex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 0.75rem;`

const iconStyle = {
  width: "3rem",
  color: "#FFFFFF"
}

const alignRight = {
  textAlign: "right",
  fontSize: "1.25rem",
  fontFamily: "Avenir Next LT Pro Bold, sans-serif"
}

const flags = [
  { country: "idr", cur: "Indonesian Rupiah" },
  { country: "gbp", cur: "British Poundsterling" },
  { country: "usd", cur: "US Dollar" },
  { country: "aud", cur: "Australian Dollar" },
  { country: "eur", cur: "European Euro" }
]

/* List of Flags */
export function FlagOptions(props) {
  
  const [displayedFlags, setDisplayedFlags] = useState(flags)

  // Displays Country or Currency per the query
  const filterFlag = (event) => {
    let query = event.target.value
    setDisplayedFlags(flags.filter(flag => 
      flag.country.includes(query) || flag.cur.includes(query)
    ))
  }

  return (
    props.show ?
    <DropDownMenu>
      <SearchBar>
      <FontAwesomeIcon icon={faSearch} style={iconStyle}/>
        <input
          type="text"
          pattern="[a-zA-Z]*"
          placeholder="Enter a country or a currency"
          onChange={(event) => filterFlag(event)}
        />
      </SearchBar>
      <ul>
      {displayedFlags.map((flag, index) => (
        <DropDownItem
          key={index}
          disabled={props.disabled(flag.country)}
          onClick={() => props.onSelect(flag.country)}>
          <span className={"flag-icon flag-icon-" + flag.country.substring(0,2) + " flag-icon-squared" }/>
          { `(${flag.country.toUpperCase()}) ${flag.cur}` }
        </DropDownItem>
      ))}
      </ul>
    </DropDownMenu>
    :
    null
  )
}

export function InputNumber(props) {

  const [isFocus, setIsFocus] = useState(false)

  return (
    <Exchange active={isFocus}>
      <span className="label">{props.label}</span>
      <InputFlex>
        <NumberFormat
        type="text"
        thousandSeparator={true}
        decimalScale={2}
        allowNegative={false}
        value={props.amount}
        onChange={(e) => props.onChange(e)}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)} />
        <Currency>
          <button className="input-country" onClick={() => props.onClick()}>
            <span className={"flag-icon flag-icon-"+ props.currency.substring(0,2) +" flag-icon-squared"}/>
            { props.currency }
            <FontAwesomeIcon className="caret" icon="caret-down" />
          </button>
          <FlagOptions
            show={props.show}
            disabled={(c) => props.disabled(c)}
            onSelect={(c) => props.onSelect(c)} />
        </Currency>
      </InputFlex>
    </Exchange>
  )
}

export function RateAndFee(props) {

  return (
    <ResultConversion>
      <ResultFlex>
        <span>Conversion Rate</span>
        <NumberFormat
          style={alignRight}
          displayType='text'
          thousandSeparator={true}
          decimalScale={2}
          value={props.rate}/>
      </ResultFlex>
      <ResultFlex>
        <span>Transfer fee</span>
        <span style={alignRight}>{props.fee}</span>
      </ResultFlex>
    </ResultConversion>
  )
}

export function Title() {

  return (
    <TitleDiv>
      <h1>International Money<br/>Transfer Feels Like Local</h1>
      <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Ut enim ad minim veniamm, quis nostrud exercitation ullamco laboris.
      </p>
      <a href="https://www.youtube.com/watch?v=8RzCs_sQ8Ak" target="_blank">
        <ScButton>How it Works</ScButton>
      </a>
    </TitleDiv>
  )
}
