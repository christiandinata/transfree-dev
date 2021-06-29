import React from 'react'
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
  h2 { margin-bottom: 0; }
`

const Collaborators = styled.div`
  column-gap: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  @media only screen and (max-width: 800px) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0,1fr));
    
  }`

const videoStyle = {
  width: "100%",
  maxWidth: 1280,
  height: 480,
  marginTop: "2rem"
}

export function VideoCollab() {
  return (
    <>
      <iframe
        style={videoStyle}
        src="https://www.youtube.com/embed/8RzCs_sQ8Ak?wmode=opague&autoplay=0&controls=0&modestbranding=1"
        title="How it Works - Transfree"
        frameborder="0"
        allowfullscreen/>
      <GreyBg>  
      <Container>
        <SubtitleContainer>
          <h2>Our Collaborators</h2>
          <p>Lorem ipsum dolor sit amet, 
            consectetur adipiscing elit, sed do eiusmod tempor 
            incididunt ut labore et dolore magna aliqua</p>
        </SubtitleContainer>
        <Collaborators>
          <img src="../static/images/ASSET/kemnaker.svg" alt="kemnaker"/>
          <img src="../static/images/ASSET/ristekdikti.svg" alt="ristekdikti"/>
          <img src="../static/images/ASSET/kemnaker.svg" alt="kemnaker"/>
          <img src="../static/images/ASSET/ristekdikti.svg" alt="ristekdikti"/>
        </Collaborators>
      </Container>
      </GreyBg>
    </>
  )
}