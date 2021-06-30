import React, { useEffect, useRef, useState } from "react"
import Slider from "react-slick"
import styled from "styled-components"

const TestimoniesBG = styled.div`
  background: linear-gradient(to right, #009FE3 0%, #009FE3 15%, #F39200 15%, #F39200 100%);
  max-width: 1280px;
  overflow: hidden;
  height: 400px;
  margin: 0 auto;`

const TestimonyDiv = styled.div`
  align-items: flex-start;
  column-gap: 0.75rem;
  margin-right: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  color: #FFFFFF;
  overflow: hidden;
  img {
    border-radius: 5px;
    width: 15rem;
    height: 17rem;
    object-fit: cover;
  }`

const Arrow = styled.img`
  width: 2.75rem;
  height: 2.75rem;
  transition: all 0.1s ease-in;
  cursor: pointer;
  &:hover {
    transform: translateY(-3px);
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
    font-family: "Avenir LT Pro Black", sans-serif !important; 
  }
  p { width: 60%; color: #3E495E; }`

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
      <div style={{ fontSize: "2.5rem", fontFamily: "Avenir LT Pro Black", lineHeight: 1 }}>“</div>
      <div>
        <p style={{ maxHeight: 300, overflow: "hidden", textOverflow: "ellipsis" }}>{ props.review }</p>
        <div style={{ fontSize: "1.25rem", fontFamily: "Avenir LT Pro Black" }}>{ props.name }</div>
        <div style={{ fontWeight: 600 }}>{ props.place || "" }</div>
      </div>
    </TestimonyDiv>
  )
}

export function Testmonies() {

  const refSlider = useRef()
  const [slider, setSlider] = useState()

  useEffect(() => {
    // console.log(refSlider.current)
  }, [])
  
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