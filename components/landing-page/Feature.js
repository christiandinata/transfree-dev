import React from 'react'
import styled from 'styled-components'
import { PrLineButton } from './Buttons'

const FeatureRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 1124px;
  margin: 1rem auto;
`

const ImageContainer = styled.div`
  display: flex;
  flex-basis: 50%;
  justify-content: center;
  img { margin-top: 1rem; height: 500px; }
`

const TextContainer = styled.div`
  flex-basis: 50%;
  h2 { font-size: 1.75rem; }
`

export function LeftFeatureRow() {
  return (
    <FeatureRow>
      <ImageContainer>
        <img src="../static/images/ASSET/mockup-new-1.svg" alt="transfree"/>
      </ImageContainer>
      <TextContainer>
        <h2>Lorem Ipsum Dolor Sit Amet</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
        </p>
        <a href="/signup">
          <PrLineButton>Daftarkan Akun</PrLineButton>
        </a>
      </TextContainer>
    </FeatureRow>
  )
}

export function RightFeatureRow() {
  return (
    <FeatureRow>
      <TextContainer>
        <h2>Lorem Ipsum Dolor Sit Amet</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
        </p>
        <a href="/signup">
          <PrLineButton>Daftarkan Akun</PrLineButton>
        </a>
      </TextContainer>
      <ImageContainer>
        <img src="../static/images/ASSET/mockup-new-1.svg" alt="transfree"/>
      </ImageContainer>
    </FeatureRow>
  )
}