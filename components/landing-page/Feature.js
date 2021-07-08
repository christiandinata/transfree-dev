import React, { useRef, useState } from 'react'
import Slider from 'react-slick'
import styled from 'styled-components'
import { PrLineButton } from './Buttons'

const FeatureRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 95%;
  max-width: 1124px;
  margin: 1rem auto;
  transition: all 0.3s ease-in;
  button { margin-top: 2rem; }
  @media only screen and (max-width: 800px) {
    flex-direction: ${ props => props.left ? "column" : "column-reverse" };
    text-align: center;
    margin-bottom: 4rem;
  }`

const ImageContainer = styled.div`
  display: flex;
  flex-basis: 50%;
  justify-content: center;
  img { 
    margin-top: 1rem; 
    height: 500px; 
  }
  @media only screen and (max-width: 720px) {
    img {
      height: 320px;
    }
  }
`

const TextContainer = styled.div`
  flex-basis: 50%;
  h2 { 
    font-size: 1.75rem;
    font-family: "Avenir LT Pro Black", sans-serif !important;
    margin-bottom: 16px;
    color: #232933;
  }
  p { margin-top: 0; }
`

export function LeftFeatureRow({ imageSrc, title, subtitle }) {
  return (
    <FeatureRow left>
      <ImageContainer>
        <img src={imageSrc} alt="transfree"/>
      </ImageContainer>
      <TextContainer>
        <h2>{ title }</h2>
        <p>{ subtitle }</p>
        <a href="/signup">
          <PrLineButton>Daftarkan Akun</PrLineButton>
        </a>
      </TextContainer>
    </FeatureRow>
  )
}

export function RightFeatureRow({ imageSrc, title, subtitle }) {
  return (
    <FeatureRow>
      <TextContainer>
        <h2>{ title }</h2>
        <p>{ subtitle }</p>
        <a href="/signup">
          <PrLineButton>Daftarkan Akun</PrLineButton>
        </a>
      </TextContainer>
      <ImageContainer>
        <img src={imageSrc} alt="transfree"/>
      </ImageContainer>
    </FeatureRow>
  )
}

const ArrowDiv = styled.button`
  position: absolute;
  z-index: 2;
  top: 25%;
  background: none;
  outline: none;
  border: none;
  ${ props => props.left ? 'left: 6%;' : 'right: 6%;' }
`

const ArrowSvg = styled.svg`
  width: 40px;
  height: 40px;
  fill: #626B79;
  cursor: pointer;
  transition: fill 0.2s ease-in;
  &:hover {
    fill: #009FE3;
  }
`

const Layout = styled.div`
  height: auto;
  position: relative;
`

export const listFeatures = [
  {
    imageSrc: "../static/images/new-ui/mockup-new-1.svg",
    title: "Lorem ipsum dolor sit amet",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
  },
  {
    imageSrc: "../static/images/new-ui/mockup-new-2.svg",
    title: "Lorem ipsum dolor sit amet",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
  }
]

export function FeatureCarousel({ listFeatures }) {

  const [slider, setSlider] = useState()

  return(
    <>
      <Layout>
        <Slider
          ref={refSlider => setSlider(refSlider)}>
            {
              listFeatures.map((ftr, idx) => (
                <div key={idx}>
                  <LeftFeatureRow {...ftr}/>
                </div>
              ))
            }
        </Slider>
        <ArrowDiv left onClick={() => slider.slickPrev()}>
          <ArrowSvg
            viewBox="0 0 40 40" 
            xmlns="http://www.w3.org/2000/svg">
            <path d="M20 0C31.0457 0 40 8.9543 40 20C39.9881 31.0407 31.0407 39.9881 20 40C8.9543 40 0 31.0457 0 20C0 8.9543 8.9543 0 20 0ZM9.65502 21.1667L17.155 28.6667C17.8145 29.2398 18.8045 29.2064 19.4238 28.5901C20.0432 27.9739 20.0815 26.984 19.5117 26.3217L15.5684 22.3767C15.4501 22.2574 15.415 22.0786 15.4795 21.9235C15.544 21.7683 15.6953 21.6671 15.8634 21.6667H30C30.9205 21.6667 31.6667 20.9205 31.6667 20C31.6667 19.0795 30.9205 18.3334 30 18.3334H15.8634C15.6931 18.335 15.539 18.233 15.474 18.0756C15.4091 17.9182 15.4464 17.7372 15.5684 17.6184L19.5117 13.6667C19.9449 13.2482 20.1187 12.6286 19.9662 12.0458C19.8137 11.4631 19.3586 11.008 18.7759 10.8555C18.1931 10.703 17.5735 10.8768 17.155 11.31L9.65502 18.81C9.00438 19.4609 9.00438 20.5159 9.65502 21.1667Z"/>
          </ArrowSvg>
        </ArrowDiv>
        <ArrowDiv onClick={() => slider.slickNext()}>
          <ArrowSvg
            viewBox="0 0 40 40" 
            xmlns="http://www.w3.org/2000/svg">
              <path d="M20 40C8.9543 40 0 31.0457 0 20C0.0128579 8.95963 8.95963 0.0128579 20 0C31.0457 0 40 8.9543 40 20C40 31.0457 31.0457 40 20 40ZM30.345 18.8184L22.845 11.3184C22.191 10.6867 21.1515 10.6958 20.5086 11.3387C19.8657 11.9815 19.8567 13.0211 20.4883 13.675L24.4317 17.6217C24.5511 17.7409 24.5869 17.9203 24.5223 18.0762C24.4577 18.2321 24.3054 18.3337 24.1367 18.3334H10C9.07952 18.3334 8.33333 19.0795 8.33333 20C8.33333 20.9205 9.07952 21.6667 10 21.6667H24.1367C24.3033 21.6683 24.4528 21.7691 24.517 21.9228C24.5812 22.0766 24.5476 22.2537 24.4317 22.3734L20.4883 26.3183C19.8567 26.9723 19.8657 28.0118 20.5086 28.6547C21.1515 29.2976 22.191 29.3066 22.845 28.675L30.345 21.175C30.9956 20.5242 30.9956 19.4692 30.345 18.8184Z"/>
          </ArrowSvg>
        </ArrowDiv>
      </Layout>
    </>
  )
}