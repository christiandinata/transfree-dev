import React from 'react'
import styled from 'styled-components'

const MobileDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(2,minmax(0,1fr));
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
  h2, p { width: 80%; }
`

const StoreBadge = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 1rem;
  img {
    height: 3rem;
  }
`

export function MobilePlatform() {
  return (
    <MobileDiv>
      <div>
        <img 
          src="../static/images/ASSET/mockup-new-3.svg" 
          alt="mobile" />
      </div>
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