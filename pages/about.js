import Header from '../components/header.js';
import Menu from '../components/menu.js';
import Footer from '../components/footer.js';
import styled from 'styled-components';

import * as Info from '../components/Info.js';
import { NavBarWhite } from '../components/MenuComponents.js';
import { MobilePlatform } from '../components/landing-page/MobilePlatform.js';

const Story = styled.div`
  background: #FFFFFF;
  padding: 2rem 0;
  p {
    color: #626B79;
  }
`

const StoryFlex = styled.div`
  width: 95%;
  max-width: 1124px;
  display: flex;
  flex-direction: row;  
  column-gap: 2.5rem;
  margin: 0 auto;
  transition: all 0.5s ease-in;
  img {
    border-radius: 5px;
    object-fit: cover;
    width: 45%;
    height: auto;
    margin: auto 0;
  }
  @media only screen and (max-width: 800px) {
    flex-direction: column;
    text-align: center;
    align-items: center;
    row-gap: 1rem;
    img { width: 90%; height: auto; }
  }`

const HowWeDoing = styled.div`
  display: flex;
  flex-direction: column;
  width: 55%;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  @media only screen and (max-width: 800px) {
    width: 90%;
  }
`

const Accomplishments = styled.div`
  display: flex;
  flex-direction: row;
  padding: 2rem 0;
  column-gap: 2rem;
  align-items: center;
  justify-content: space-between;
  h3, p { margin: 0; }
`

const listAcc = [
  {
    img: "../static/images/ASSET/customer.svg",
    head: "1.2 Million",
    subHead: "All Customers"
  },
  {
    img: "../static/images/ASSET/employee.svg",
    head: "50+",
    subHead: "Employees"
  },
  {
    img: "../static/images/ASSET/currencies.svg",
    head: "24+",
    subHead: "Currencies"
  },
  {
    img: "../static/images/ASSET/countries.svg",
    head: "124",
    subHead: "Countries Covered"
  }
]

// About Page
const About = () => (
  <div>
    <Header />
    <NavBarWhite />
    <Info.BlueHeader>
      <Info.Batik>
        <h1>About Transfree</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim 
          ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
      </Info.Batik>
    </Info.BlueHeader>
    <Story>
      <StoryFlex>
        <img src="../static/images/ASSET/story.png" alt="story" style={{ flexBasis: "200px" }}/>
        <div>
          <h2>Our Story</h2>
          <p>There are a lot of difficulties when you sending or receiving money from Indonesia. 
            Starting from the total transfer time, the complexity of the procedure, to the limitations 
            of existing regulations. Some also being scammed and lost their money. These are the problem 
            that often arise in systems that already exist. We feels the same way when living abroad. From 
            students who receive money from home or workers who send money to their families.</p>
          <p>Because of that, we try to find a new way to eliminate the problems with a more efficient way 
          yet secure and reliable. Transfree make the process of international money transfer feels like local 
          transfer. We understand your problem and will simplify your process to transfer money. Till today, 
          we are improving our service to be better.</p>
          <p>Now that you know our story, let’s give it a try using our service to feel the difference.</p>
        </div>
      </StoryFlex>
    </Story>
    <Story>
      <HowWeDoing>
        <h2>How are we doing so far?</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
          quis nostrud exercitation ullamco laboris. Lorem ipsum dolor sit amet, 
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
          dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
          ullamco laboris.</p>
        <Accomplishments>
          {
            listAcc.map((acc, index) => (
              <div key={index}>
                <img src={ acc.img } alt="icon"/>
                <h3>{ acc.head }</h3>
                <p>{ acc.subHead }</p>
              </div>
            ))
          }
        </Accomplishments>
      </HowWeDoing>
    </Story>
    <div style={{ background: "#F3F5F7" }}>
      <MobilePlatform />
    </div>
    <Footer />
  </div>
);

export default About;
