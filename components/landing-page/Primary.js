import React from 'react'
import styled from 'styled-components'

const Features = styled.div`
  margin: -6rem auto 3rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  max-width: 1124px;
  h2 {
    font-family: "Avenir LT Pro Black";
  }
`

const Benefit = styled.div`
  display: flex;
  margin-top: 5%;
  column-gap: 1rem;
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
  p {
    color: #626B79;
  }
`

export function Primary() {
  return (
    <Features>
      <h2>Why Should you use Transfree?</h2>
      <div style={{ width: "60%" }}>
        Does your family need it for an emergency? And when you use a cheaper option, 
        it sometimes takes longer for your money to arrive Don't worry, we are here now
      </div>
      <Benefit>
        <BoxBenefit>
          <img src="../../static/images/features/rate.png" />
          <h3>Better rate for Transfree</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
            eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
        </BoxBenefit>
        <BoxBenefit>
          <img src="../../static/images/features/time.png" />
          <h3>Quickly sent quickly arrived</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
            eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
        </BoxBenefit>
        <BoxBenefit>
          <img src="../../static/images/features/uncharge.png" />
          <h3>Unchargeable for Transfer</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
            eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
        </BoxBenefit>
      </Benefit>
    </Features>
  )
}