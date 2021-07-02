import React from 'react'
import styled from 'styled-components'

const MobileDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0,1fr));
  margin-left: auto;
  margin-right: auto;
  padding-top: 4rem;
  max-width: 1124px;
  align-items: center;
  img {
    display: block;
    max-width: 320px;
    margin: 0 auto; 
  }
  h2 {
    font-family: "Avenir LT Pro Black", sans-serif !important; 
    font-size: 1.75rem;
    line-height: 125%;
    width: 80%;
  }
  p { 
    width: 80%;
    margin-bottom: 2.5rem;
  }
  @media only screen and (max-width: 800px) {
    display: flex;
    flex-direction: column;
    row-gap: 2rem;
    width: 90%;
    text-align: center;
    h2, p {
      margin: 1rem auto;
    }
  }
`

const StoreBadge = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  width: 80%;
  margin-top: 2rem;
  img {
    width: 100%;
    max-width: 216px;
  }
  @media only screen and (max-width: 800px) {
    flex-direction: column;
    margin-bottom: 4rem;
    width: 100%;
  }
`

export function MobilePlatform() {
  return (
    <MobileDiv>
      <img src="../static/images/ASSET/mockup-new-3.svg" 
          alt="mobile" />
      <div>
        <h2>Does your family need it for an emergency?</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
          sed do eiusmod tempor incididunt ut labore</p>
        <StoreBadge>
          <a href="https://play.google.com/store/apps/details?id=com.transfree.id" target="_blank">
            <img src="../static/images/ASSET/play-store.svg" />
          </a>
          <a href="https://apps.apple.com/us/app/transfree/id1493107400?ls=1" target="_blank">
            <img src="../static/images/ASSET/app-store.svg" />
          </a>
        </StoreBadge>
      </div>
    </MobileDiv>
  )
}