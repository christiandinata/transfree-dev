import React, { useState } from 'react'
import styled from 'styled-components'

const GreyBg = styled.div`
  padding: 2rem 0;
  background-color: #F3F5F7;
`

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  max-width: 1124px;
  margin 0 auto;
  @media only screen and (max-width: 800px) {
    flex-direction: column;
  }
`

const SubtitleContainer = styled.div`
  flex-basis: 55%;
  margin-bottom: 1rem;
  h2 {
    margin-bottom: 0;
    font-size: 1.75rem;
    font-family: "Avenir LT Pro Black", sans-serif !important;
  }
  p {
    margin: 16px auto 0 0;
    width: 70%;
  }
 @media only screen and (max-width: 800px) {
    text-align: center;
 }`

const Collaborators = styled.div`
  column-gap: 2rem;
  display: grid;
  grid-template-columns: repeat(4, minmax(0,1fr));
  img { width: 100%; }`

const ImageBg = styled.div`
  position: relative;
  background-image: url('../static/images/new-ui/how-it-works.png');
  z-index: 2;
  width: 100%;
  max-width: 1280px;
  height: 460px;
  margin-top: 2rem;
  opacity: ${ props => props.fadeOut ? '0' : '1' };
  transition: opacity 0.5s ease-in;
  img:hover {
    filter: drop-shadow(0 0 0.75rem lightgray);
    cursor: pointer;
  }
`

const GreyOverlay = styled.div`
  position: absolute;
  z-index: 3;
  width: 100%;
  max-width: 1280px;
  height: 460px;
  background: linear-gradient(358.55deg, #232933 -43.58%, rgba(35, 41, 51, 0) 110.7%);
  color: #FFFFFF;
  text-align: center;
  h2 {
    color: #FFFFFF;
    font-size: 1.75rem;
    font-family: "Avenir LT Pro Black", sans-serif !important;
    margin-top: 6rem;
    margin-bottom: 0;
  }`

const videoStyle = {
  width: "100%",
  maxWidth: 1280,
  height: 460,
  marginTop: "2rem",
  position: "relative"
}

const imagePath = "../static/images/new-ui/"

export function VideoCollab() {

  const [isOverlay, setIsOverlay] = useState(true)
  const [isFadeOut, setIsFadeOut] = useState(false)

  const handleClick = () => {
    setIsFadeOut(true)
    setTimeout(function() {setIsOverlay(false)}, 550)
  }

  return (
    <>
      {
        isOverlay ?
        <ImageBg fadeOut={isFadeOut}>
          <GreyOverlay>
            <h2>HOW IT WORKS TRANSFREE</h2>
            <p>Cara Mudah, Gratis, dan Terpercaya Kirim Uang Keluar Negeri</p>
            <img src={imagePath + "play-video.svg"} alt="play" onClick={handleClick}/>
          </GreyOverlay>
        </ImageBg>
        :
        <iframe
          style={videoStyle}
          src="https://www.youtube.com/embed/8RzCs_sQ8Ak?wmode=opague&autoplay=1&controls=0&modestbranding=1"
          title="How it Works - Transfree"
          frameBorder="0"
          allow='autoplay'
          allowFullScreen />
      }
      <GreyBg>
      <Container>
        <SubtitleContainer>
          <h2>Our Collaborators</h2>
          <p>Lorem ipsum dolor sit amet, 
            consectetur adipiscing elit, sed do eiusmod tempor 
            incididunt ut labore et dolore magna aliqua</p>
        </SubtitleContainer>
        <Collaborators>
          <img src={imagePath + "kemnaker.svg"} alt="kemnaker"/>
          <img src={imagePath + "ristekdikti.svg"} alt="ristekdikti"/>
          <img src={imagePath + "kemnaker.svg"} alt="kemnaker"/>
          <img src={imagePath + "ristekdikti.svg"} alt="ristekdikti"/>
        </Collaborators>
      </Container>
      </GreyBg>
    </>
  )
}