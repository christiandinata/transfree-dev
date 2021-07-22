import React, { useState } from 'react'
import NumberFormat from 'react-number-format'
import styled from 'styled-components'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Converter = styled.div`
  background: #FFFFFF;
  border-radius: 16px;
  color: #626B79;
  padding: 15px 0 23px;
  flex-basis: 35%;`

const Exchange = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 1.25rem;
    font-size: 16px;
    margin-bottom: 30px;

    input {
      width: 100%;
      height: 52px;
      border: 0.5px solid #E2E2E2;
      border-radius: 5px;
      font-family: "Avenir Next LT Pro Bold" !important;
      font-size: 20px;
      padding: 0 20px;
      transition: 0.3s;
    }

    input:focus {
      box-shadow: 0 0 0 2px #068EC8;
      outline: none;
    }
    
    >.label{
      font-size: 12px;
    }

    ${({ active }) => active && `
      >.label{
        color: #068EC8;
      }
    `}`
    

const Currency = styled.div`
    position: relative;

    button {
      align-items: center;
      border: none;
      border-radius: 5px;
      background-color: #1F345A;
      color: #FFFFFF;
      display: flex;
      font-size: 1.25rem;
      justify-content: space-between;
      text-transform: uppercase;
      transition: background-color 0.2s ease-in;
      padding: 0.75rem 0.75rem;
      width: 120px;
      height: 52px;
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
    right: 5%;
    z-index: 1000;
    padding: 0 0 .5rem;
    margin: .125rem 0 0;
    font-size: 1rem;
    background-color: #fff;
    border: 1px solid rgba(0,0,0,.15);
    border-radius: 5px;
    min-width: 330px;
    ul {
      height: auto;
      max-height: 200px;
      overflow-y: auto;
      margin: 0;
      padding: 0;
    }

    @media only screen and (max-width: 380px) {
      width: 310px;
      min-width: 0px;
    }
  
  `;

const DropDownItem = styled.li`
    display: flex;
    align-items: center;
    padding: 1rem 1rem;
    color: #15233C;
    transition: background-color 0.1s ease-out;
    &:hover {
      background: #009FE380;
      color: #FFFFFF;
      cursor: pointer;
    }
    `

const SearchBar = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  background-color: #1E345B;
  border-radius: 5px 5px 0 0;
  min-width: 330px;
  padding: 0px 10px 0px 10px;

  input {
    border: none;
    background-color: transparent;
    color: #FFFFFF;
    font-family: "Avenir Next LT Pro" !important;
    outline: none;
    padding-left: 10px;
  }
  input:focus { 
    box-shadow: none;
    border: none; 
  }
  input::placeholder {
    color: #FFFFFF;
  }


  @media only screen and (max-width: 380px) {
    max-width: 301px;
    min-width: 0px;
    padding-right: 0px;
    
    input{
      font-size: 18px;
    }
  }
`

const iconStyle = {
  width: "20px",
  color: "#FFFFFF"
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
          onClick={() => props.onSelect(flag.country)}>
          <span style={{marginRight: "10px"}}className={"flag-icon flag-icon-" + flag.country.substring(0,2) + " flag-icon-squared" }/>
          { `(${flag.country.toUpperCase()}) ${flag.cur}` }
        </DropDownItem>
      ))}
      </ul>
    </DropDownMenu>
    :
    ""
  )
}

export function InputNumber(props) {

  return (
    <Exchange active={props.activeCondition}>
      <span className="label">{props.label}</span>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: "0.75rem" }}>
        <NumberFormat
        type="text"
        thousandSeparator={true}
        decimalScale={2}
        allowNegative={false}
        value={props.amount}
        onChange={(e) => props.onChange(e)}
        onFocus={(e) => props.onFocus(e)}
        onBlur={(e) => props.onBlur(e)}
        id={props.id}/>
        <Currency>
          <button onClick={() => props.onClick()}>
            <span className={"flag-icon flag-icon-"+ props.currency.substring(0,2) +" flag-icon-squared"}/>
            <span style={{fontSize: "16px", margin: "0px 8px 0px 2px"}}> { props.currency } </span>
            <FontAwesomeIcon className="caret" icon="caret-down" style = {{width: "10px"}}/>
          </button>
          <FlagOptions
            show={props.show}
            onSelect={(c) => props.onSelect(c)} />
        </Currency>
      </div>
    </Exchange>
  )
}

export function RateAndFee(props) {
  
  const ResultConversion = styled.div`
    background-color: #1E345B;
    color: #FFFFFF;
    margin-top: 10px;
    padding: 1rem 1.25rem;`

  const ResultFlex = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    span {
      width: 50%;
    }`

  return (
    <ResultConversion>
      <ResultFlex>
        <span>Conversion Rate</span>
        <NumberFormat
          style={{ 
            textAlign: "right", 
            fontSize: "20px", 
            fontFamily: "Avenir Next LT Pro Bold" 
          }}
          displayType={'text'}
          thousandSeparator={true}
          decimalScale={2}
          value={props.rate}/>
      </ResultFlex>
      <ResultFlex>
        <span>Transfer fee</span>
        <span style={{ textAlign: "right", fontSize: "1.25rem", fontFamily: "Avenir Next LT Pro Bold" }}>{props.fee}</span>
      </ResultFlex>
    </ResultConversion>
  )
}