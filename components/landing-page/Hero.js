import React, { useEffect, useState } from 'react'
import NumberFormat from 'react-number-format'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PrButton, ScButton, WAButton } from './Buttons'

export const MapBackground = styled.div`
  background-image: url('../static/images/Asset Web/content/batik-world-map.png');
  background-repeat: no-repeat;
  height: 750px;`

export const Overlay = styled.div`
  background: linear-gradient(178.43deg, #009FE3 1.26%, rgba(0, 159, 227, 0) 96.85%);
  height: 780px;`

export const HeroDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin: 0 auto;
  padding-top: 6rem;
  max-width: 1124px;
  z-index: 2;
  color: #FFFFFF;
  h1 {
    color: #FFFFFF;
    font-size: 2.5rem;
    line-height: 140%;
  }`

export const Converter = styled.div`
  background: #FFFFFF;
  border-radius: 16px;
  color: #626B79;
  padding: 15px 0 23px;
  flex-basis: 35%;`

export const ReverseButton = styled.div`
  text-align: right;
  img {
    width: 1.25rem;
    height: 1.25rem; 
    margin: 0.5rem 3.5rem 0 0;
    cursor: pointer; }`

const Exchange = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 1.25rem;

    input {
      width: 100%;
      border: 0.5px solid #E2E2E2;
      border-radius: 5px;
      font-family: "Avenir LT Pro Black";
      font-size: 1.25rem;
      padding: 0.75rem 1.25rem;
    }

    input:focus {
      border: 1.5px solid #068EC8;
      outline: none;
    }`

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
      text-transform: uppercase;
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
      margin-right: 0.5rem;
    }`

const DropDownMenu = styled.div`
    position: absolute;
    right: 5%;
    width: 300px;
    z-index: 1000;
    padding: .5rem 0;
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
    padding: 14px 20px 8px;
    color: #15233C;
    transition: background-color 0.1s ease-out;
    &:hover {
      background-color: #469DDD;
      color: #FFFFFF;
      cursor: pointer;
    }`

/* List of Flags */
export function FlagOptions(props) {
  
  const [flags, setFlags] = useState([
    { country: "idr", cur: "Indonesian Rupiah" },
    { country: "gbp", cur: "British Poundsterling" },
    { country: "usd", cur: "US Dollar" },
    { country: "aud", cur: "Australian Dollar" },
    { country: "eur", cur: "European Euro" }
  ])

  return (
    props.show ?
    <DropDownMenu>
      <ul>
      {flags.map((flag, index) => (
        <DropDownItem
          key={index}
          onClick={() => props.onSelect(flag.country)}>
          <span className={"flag-icon flag-icon-" + flag.country.substring(0,2) + " flag-icon-squared" }/>
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
    <Exchange>
      <span>{props.label}</span>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: "0.75rem" }}>
        <NumberFormat
        type="text"
        thousandSeparator={true}
        decimalScale={2}
        allowNegative={false}
        value={props.amount}
        onChange={(e) => props.onChange(e)} />
        <Currency>
          <button onClick={() => props.onClick()}>
            <span className={"flag-icon flag-icon-"+ props.currency.substring(0,2) +" flag-icon-squared"}/>
            { props.currency }
            <FontAwesomeIcon className="caret" icon="caret-down" />
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
    margin-top: 2rem;
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
            fontSize: "1.25rem", 
            fontFamily: "Avenir LT Pro Black" 
          }}
          displayType={'text'}
          thousandSeparator={true}
          decimalScale={2}
          value={props.rate}/>
      </ResultFlex>
      <ResultFlex>
        <span>Transfer fee</span>
        <span style={{ textAlign: "right", fontSize: "1.25rem", fontFamily: "Avenir LT Pro Black" }}>{props.fee}</span>
      </ResultFlex>
    </ResultConversion>
  )
}

export function Title() {
  
  const TitleDiv = styled.div`
    flex-basis: 60%;
    p { width: 90%; }`

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

function Hero() {

  // State
  const [fromCurrency, setFromCurrency] = useState("gbp")
  const [toCurrency, setToCurrency] = useState("idr")
  const [fromAmount, setFromAmount] = useState(1000)
  const [toAmount, setToAmount] = useState(0)
  const [rate, setRate] = useState(0)

  // componentDidMount()
  // useEffect(() => {
  //   setRate(props.rate - (props.rate * props.adjustedRates.lowerMargin / 100))
  //   setToAmount(fromAmount * (props.rate - props.rate * props.adjustedRates.lowerMargin / 100))
  // })

  // Methods
  const reverse = (from, to) => {
    // Switch options
    setFromCurrency(to)
    setToCurrency(from)
  }
  
  return (
    <MapBackground>
      <Overlay>
        <HeroDiv>
          <Title/>
          <Converter>
            <InputNumber
              label={"You send"}
              amount={fromAmount}
              currency={fromCurrency}/>
            <ReverseButton>
              <img src="../../static/images/reverse.png" alt="rv"
                onClick={() => reverse(fromCurrency, toCurrency)}/>
            </ReverseButton>
            <InputNumber label={"Recipient gets"} amount={toAmount} currency={toCurrency} />
            <RateAndFee/>
            <div style={{ padding: "1rem 1.25rem 0 1.25rem", fontSize: "0.75rem" }}>
              Your transfer will be processed immediately. 
              The recipient will get the money in next working day.
              <PrButton style={{ marginTop: "1rem", width: "100%" }}>Try it For Free</PrButton>
            </div>
            <WAButton/>
          </Converter>
        </HeroDiv>
      </Overlay>
    </MapBackground>
  )
}
