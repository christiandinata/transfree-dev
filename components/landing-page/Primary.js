import React from 'react'
import styled from 'styled-components'

const Features = styled.div`
  margin: -6rem auto 3rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 95%;
  max-width: 1124px;
  h2 {
    font-size: 1.75rem;
    line-height: 1;
    margin-bottom: 0;
    color: #232933;
    font-family: "Avenir Next LT Pro Bold", sans-serif !important;
  }
  p { width: 60%; }
  @media only screen and (max-width: 800px) {
    margin-top: -12rem;
    p { width: 95%; }
  }`

const Benefit = styled.div`
  display: flex;
  margin-top: 5%;
  gap: 1rem;
  @media only screen and (max-width: 800px) {
    flex-direction: column;
  }
`

const BoxBenefit = styled.div`
  background-color: #FFFFFF;
  padding: 1.25rem !important;
  color: #232933;
  transition: all 0.2s ease-in-out;
  box-shadow: 0px 20px 50px rgba(98, 107, 121, 0.15);
  img {
    margin-top: 1rem;
    width: 80px !important;
  }
  h3 {
    font-family: "Avenir Next LT Pro Bold", sans-serif !important;
    margin-bottom: 0;
  }
  p {
    margin-top: 16px;
    width: 100%;
    color: #626B79;
  }
`

const imagePath = "../../static/images/new-ui/"

export function Primary() {
  return (
    <Features>
      <h2>Why should you use Transfree?</h2>
      <p>
        Does your family need it for an emergency? And when you use a cheaper option, 
        it sometimes takes longer for your money to arrive Don't worry, we are here now
      </p>
      <Benefit>
        <BoxBenefit>
          <img src={imagePath + "ic-better rate.svg"} />
          <h3>Better rate for Transfree</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
            eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
        </BoxBenefit>
        <BoxBenefit>
          <img src={imagePath + "ic-time.svg"} />
          <h3>Quickly sent quickly arrived</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
            eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
        </BoxBenefit>
        <BoxBenefit>
          <img src={imagePath + "ic-uncharge.svg"} />
          <h3>Unchargeable for Transfer</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
            eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
        </BoxBenefit>
      </Benefit>
    </Features>
  )
}