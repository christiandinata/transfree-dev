import React, { useState } from 'react'
import styled from 'styled-components'

const CenterDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 0;
  align-items: center;
  margin: 0 auto;
  text-align: center;
  max-width: 1124px;
  color: #FFFFFF;
  transition: all 0.2s ease-in;
  h2 {
    color: #FFFFFF;
    margin-bottom: 0;
  }
  p {
    width: 60%;
  }
  button {
    background-color: transparent;
    font-family: "Avenir LT Pro";
    border: 0.5px solid white;
    border-radius: 0.25rem;
    padding: 1rem 1.5rem;
    color: #FFFFFF;
    transition: all 0.2s ease-in;
  }
  button:hover {
    background-color: #FFFFFF55;
  }
`

const FlagsDisplay = styled.div`
  display: grid;
  column-gap: 6rem;
  row-gap: 2rem;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  padding: 1rem 0 2rem;
  
  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    column-gap: 0.5rem;
    color: #FFFFFF;
    background: #FFFFFF66;
    border: none;
    border-radius: 0.25rem;
    padding: 0.75rem 3.5rem 0.75rem 1.5rem;
    text-align: left;
    font-size: 1rem;
  }

  .flag-icon {
    border-radius: 50%;
    width: 1.25rem;
    height: 1.25rem;
  }
`

const flags = [
  { id: "id", name: "Indonesia" },
  { id: "sg", name: "Singapore" },
  { id: "cn", name: "China" },
  { id: "us", name: "United States" },
  { id: "gb", name: "England" },
  { id: "au", name: "Australia" },
  { id: "kr", name: "South Korea" }
]

export function CountriesDisplay() {
  
  const [isFull, setIsFull] = useState(false)

  return(
    <CenterDiv>
      <h2>Send money to over 80 countries worldwide and choose from over 20 currencies</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
        incididunt ut labore et dolore magna aliqua</p>
      <FlagsDisplay>
        {isFull ? flags.map(flag => 
          <div key={flag.id}>
            <i className={'flag-icon flag-icon-' + flag.id + ' flag-icon-squared'}/>
            {flag.name}
          </div>
        ) : flags.slice(0,6).map(flag => 
          <div key={flag.id}>
            <i className={'flag-icon flag-icon-' + flag.id + ' flag-icon-squared'}/>
            {flag.name}
          </div>
        )}
      </FlagsDisplay>
      <button onClick={() => setIsFull(!isFull)}>
        { isFull ? "View Less Countries" : "View All Countries" }
      </button>
    </CenterDiv>
  )
}
