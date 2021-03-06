import React, { useState } from "react"
import Slider from "react-slick"
import styled from "styled-components"

const TestimoniesBG = styled.div`
  background: linear-gradient(to right, #009FE3 0%, #009FE3 15%, #F39200 15%, #F39200 100%);
  max-width: 1280px;
  overflow: hidden;
  margin: 0 auto;
  padding-bottom: 1rem;
  @media only screen and (max-width: 800px) {
    background: #F39200;
  }`

const TestimonyDiv = styled.div`
  align-items: center;
  column-gap: 0.75rem;
  margin-right: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  color: #FFFFFF;
  img {
    border-radius: 5px;
    width: 15rem;
    height: 17rem;
    object-fit: cover;
  }
  @media only screen and (max-width: 800px) {
    flex-direction: column;
    align-items: center;
    img {
      width: 85%;
      height: 85%;
    }
  }`

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  overflow: hidden;
  column-gap: 0.75rem;
  @media only screen and (max-width: 800px) {
    margin-top: 1.5rem;
  }`

const Arrow = styled.img`
  width: 2.75rem;
  height: 2.75rem;
  transition: all 0.1s ease-in;
  cursor: pointer;
  &:hover {
    transform: translateY(-3px);
  }
  @media only screen and (max-width: 800px) {
    display: none;
  }`

const Subtitle = styled.div`
  color: #FFFFFF;
  display: flex;
  flex-direction: column;
  flex-grow: 0;
  align-items: center;
  margin: 0 auto;
  text-align: center;
  max-width: 1124px;
  padding: 2rem 0;
  h2 { 
    font-size: 1.75rem; 
    margin: 0;
    color: black;
  }
  p { width: 60%; color: #3E495E; }
  @media only screen and (max-width: 800px) {
    p { width: 90%; }
  }`

const Quote = styled.div`
  font-size: 2.5rem;
  font-family: "Avenir Next LT Pro Bold", sans-serif;
  line-height: 1;
`

const Review = styled.p`
  max-height: 250;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 0;
`

const Reviewer = styled.div`
  font-size: 1.25rem;
  font-family: "Avenir Next LT Pro Bold";
  text-transform: uppercase;
`

const Place = styled.div`
  font-weight: 600;
  margin-bottom: 1rem;
`

const carouselStyle = {
  margin: "3% 0 0.5rem 6%",
  width: "110%",
  columnGap: "1rem"
}

const carouselStyleMobile = {
  margin: "3% 0 0.5rem 6%",
  width: "95%",
  columnGap: "1rem"
}

const settings = {
  style: carouselStyle,
  arrows: false,
  slidesToShow: 2,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1000,
      settings: {
        slidesToShow: 1,
        style: carouselStyleMobile
      }
    }
  ]
}

const left = { marginLeft: "10.2%" }
const right = { marginLeft: "2rem" }

// Testimonies list
const listTestimonies = [
  {
    img: "../../static/images/mahdi.png",
    name: "Mahdi",
    review: `As a customer I feel satisfied for the service. 
    It is secure and I get my money in less than 24 hours.`
  },
  {
    img: "../../static/images/hasiando.png",
    name: "Hasiando",
    review: `Saya menggunakan transfree beberapa 
    kali dan pelayanannya oke, rate bagus dan aman.`
  },
  {
    img: "../../static/images/riahna.png",
    name: "Riahna",
    review: `Dulu menggunakan transfree sewaktu membayar deposit rumah 
    dan juga bayar sewa rumah. Sempat agak ragu akan keamanan nya. Tetapi karena founder 
    nya sesama awardee LPDP, akhirnya saya menggunakan jasa transfree karena 
    kalaupun ada tipu menipu mudah melacaknya. Dan beberapa kali aman-aman saja dan juga cepat.`
  },
  {
    img: "../../static/images/adi.png",
    name: "Adi Sepang",
    review: `My experience with Transfree was flawless. 
    It was easy to use and gave me a good value for money.`
  },
  {
    img: "../../static/images/iqbal.png",
    name: "Iqbal",
    review: `I used transfree several times 
    and had a good experience using it. 
    I get the currency rate I want`
  },
  {
    img: "../../static/images/hendry.png",
    name: "Hendry S",
    review: `Fast Response and gives a better rate. 
    I get my money transferred in less than 24 hours`
  },
  {
    img: "../../static/images/zhabrinna.png",
    name: "Zhabrinna",
    review: `It is simple and I get a better rate than Transferwise with of course a very fast transfer system!`
  },
  {
    img: "../../static/images/mukti.png",
    name: "Mukti",
    review: `Good service and competitive rate. 
    The transfer process is also fast. 
    It's very helpful for those who want transfer 
    money from Indonesia to UK and vice versa.`
  }
]

function Testimony(props) {
  return(
    <TestimonyDiv>
      <img src={ props.img } alt="image"/>
      <Content>
        <Quote>???</Quote>
        <div>
          <Review>{ props.review }</Review>
          <Reviewer>{ props.name }</Reviewer>
          <Place>{ props.place || " " }</Place>
        </div>
      </Content>
    </TestimonyDiv>
  )
}

export function Testmonies() {

  const [slider, setSlider] = useState()
  
  return (
    <>
      <Subtitle>
        <h2>What our customer say?</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
      </Subtitle>
      <TestimoniesBG>
        <Slider
          ref={refSlider => setSlider(refSlider)}
          {...settings}>
          {listTestimonies.map((test, index) => (
            <div key={index}>
              <Testimony 
                key={index} 
                img={test.img} 
                name={test.name}
                review={test.review}
              />
            </div>
          ))}
        </Slider>
        <Arrow
          onClick={() => slider.slickPrev()}
          style={left}
          src="../static/images/ASSET/left-arrow.svg"/>
        <Arrow
          onClick={() => slider.slickNext()}
          style={right} 
          src="../static/images/ASSET/right-arrow.svg"/>
      </TestimoniesBG>
    </>
  )
}