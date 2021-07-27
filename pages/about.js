import Header from '../components/header.js';
import Footer from '../components/footer.js';
import styled from 'styled-components';

import * as Info from '../components/Info.js';
import { Component } from 'react';
import { connect } from 'react-redux';
import initialize from '../utils/initialize.js';
import actions from '../redux/actions/index.js';
import { getCookie } from '../utils/cookie';
import { NavBarWhite } from '../components/MenuComponents.js';
import Menu from '../components/menu.js';
import { MobilePlatform } from '../components/landing-page/MobilePlatform.js';

const Story = styled.div`
  background: #FFFFFF;
  padding: 2rem 0;
  p {
    color: #626B79;
  }
  h2 {
    font-family: "Avenir LT Pro Black", sans-serif !important;
  }
`

const StoryFlex = styled.div`
  width: 95%;
  max-width: 1124px;
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 2rem;
  margin: 0 auto;
  transition: all 0.5s ease-in;
  img {
    border-radius: 5px;
    object-fit: cover;
    width: 500px;
    height: 400px;
  }
  h2 {
    font-size: 1.75rem;
    margin-bottom: 0;
  }
  p {
    margin-top: 16px;
  }
  @media only screen and (max-width: 800px) {
    flex-direction: column;
    text-align: center;
    align-items: center;
    row-gap: 1rem;
    h2, p {
      width: 90%;
      margin-left: auto;
      margin-right: auto;
    }
    img { 
      width: 95%;
      height: auto;
    }
  }`

const HowWeDoing = styled.div`
  display: flex;
  flex-direction: column;
  width: 55%;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  h2 {
    font-size: 1.75rem;
    margin-bottom: 0;
  }
  @media only screen and (max-width: 800px) {
    width: 90%;
    p { margin: 16px auto; }
    text-align: center;
  }
`

const Accomplishments = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  padding: 2rem 0;
  column-gap: 2rem;
  align-items: center;
  justify-content: space-between;
  h3 {
    margin: 0 auto;
    font-family: "Avenir LT Pro Black", sans-serif !important;
  }
  p {
    margin-top: 0;
  }
  @media only screen and (max-width: 800px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    row-gap: 2rem;
  }`

const imagePath = "../../static/images/new-ui/"

const listAcc = [
  {
    img: "customer.svg",
    head: "1.2 Million",
    subHead: "All Customers"
  },
  {
    img: "employee.svg",
    head: "50+",
    subHead: "Employees"
  },
  {
    img: "currencies.svg",
    head: "24+",
    subHead: "Currencies"
  },
  {
    img: "countries.svg",
    head: "124",
    subHead: "Countries Covered"
  }
]

class About extends Component {

  constructor(props) {
    super(props)
  }

  static async getInitialProps(ctx) {
    initialize(ctx)
    if(getCookie('_id', ctx.req)) {
      await ctx.store.dispatch(actions.getUser(getCookie('_id', ctx.req),'user',ctx.req));
    }
    return {}
  }

  render() {
    return (
      <div>
        <Header />
        {/* <NavBarWhite isAuthenticated={this.props.isAuthenticated} username={this.props.username} /> */}
        {console.log("masuk about")}
        <Menu isAuthenticated = {this.props.isAuthenticated} username = {this.props.username} scrolled_props = "true" is_homepage = "false"/>
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
            <img src={imagePath + "story.png"} alt="story"/>
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
                    <img src={ imagePath + acc.img } alt="icon"/>
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
    )
  }
}

const mapStateToProps = (state) => {
  if (state.user.user_data != null) {
    return {
      isAuthenticated: true,
      username: state.user.user_data.fullname
    }
  } else {
    return {
      isAuthenticated: false
    }
  }
}

export default connect(mapStateToProps, actions)(About);
