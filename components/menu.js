import Link from 'next/link';
import { connect } from 'react-redux';
import authActions from '../redux/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Navbar from './MenuComponents';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { useEffect, useState } from 'react';

const Menu = ({isAuthenticated, isApproved, deauthenticate, username, id, is_homepage}) => {
  const [scrolled, setScrolled] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [isHomepage, setIsHomepage] = useState(is_homepage)

  const handleScrolled = () => {
    // if(isHomepage === undefined) {
    //   console.log("4")
    //   setIsHomepage(true)
    // }
    if(isHomepage == true) {
      if(window.scrollY >= 20) {
        console.log("1")
        setScrolled(true)
      }
      else {
        console.log("2")
        setScrolled(false)
      }
    }
    else {
      console.log("3")
      setScrolled(true)
    }
  }

  const checkIsHomepage =() => {
    if(isHomepage === undefined) {
      console.log("4")
      setIsHomepage(true)
    }
  }

  const handleExpandClick = () => {
    setClicked(!clicked)
  }

  useEffect(() => {
    checkIsHomepage()
    handleScrolled()
    window.addEventListener('scroll', handleScrolled)
  }, [isHomepage])

  return(
    <Navbar.Nav scrolled = {scrolled} homepage = "true" marginTop = "-72px" clicked = {clicked} isAuth = {isAuthenticated}>
      {/* {console.log("scrolled")}
      {console.log(scrolled)}
      {console.log("ishomepage")}
      {console.log(isHomepage)} */}
      <Navbar.NavInner scrolled = {scrolled} homepage = "true" clicked = {clicked}>
        <Navbar.HeaderWrapper clicked = {clicked}>
          <a href = "/"><Navbar.Logo src="../static/images/transfree-logo.png" scrolled = {scrolled} homepage = "true"/></a>
          <Navbar.ExpandButton onClick = {handleExpandClick} clicked = {clicked}>
            <Navbar.ExpandImage src = "../static/images/navbar-expand.png" clicked = {clicked}/>
            <Navbar.ExpandClose src = "../static/images/navbar-close.png" clicked = {clicked}/>
          </Navbar.ExpandButton>
        </Navbar.HeaderWrapper>
        
        {!isAuthenticated ? 
        <React.Fragment>
          <Navbar.Navigation clicked = {clicked}>
            <Navbar.NavigationChild href="https://www.youtube.com/watch?v=8RzCs_sQ8Ak" scrolled = {scrolled} homepage = "true" navChildColor = "#f5f5f5">
              How It Works
            </Navbar.NavigationChild>

            <Navbar.NavigationChild href="/about" scrolled = {scrolled} homepage = "true" navChildColor = "#f5f5f5">
              About Us
            </Navbar.NavigationChild>

            <Navbar.SignInButton href = "/login" scrolled = {scrolled} homepage = "true">
              Sign In
            </Navbar.SignInButton>

            <Navbar.RegisterButton href = "/signup" scrolled = {scrolled} homepage = "true">
              Register
            </Navbar.RegisterButton>
          </Navbar.Navigation>
        </React.Fragment> 
        : null}

        {isAuthenticated ? 
        <React.Fragment>
          <Navbar.NavigationCenter clicked = {clicked}>
            <Navbar.NavigationChild href = "/order" scrolled = {scrolled} homepage = "true" navChildColor = "#f5f5f5">
              Send Money
            </Navbar.NavigationChild>

            <Navbar.NavigationChild href = "/account" scrolled = {scrolled} homepage = "true" navChildColor = "#f5f5f5">
              Transactions
            </Navbar.NavigationChild>

            <Navbar.NavigationChild href = "https://www.youtube.com/watch?v=8RzCs_sQ8Ak" scrolled = {scrolled} homepage = "true" navChildColor = "#f5f5f5">
              How It Works
            </Navbar.NavigationChild>

            <Navbar.NavigationChild href = "/about" scrolled = {scrolled} homepage = "true" navChildColor = "#f5f5f5">
              About Us
            </Navbar.NavigationChild>
            
            <Navbar.NavigationChild href = "/user-profile" scrolled = {scrolled} homepage = "true" navChildColor = "#f5f5f5">
              <Navbar.ProfileInfo scrolled = {scrolled} name = "true" clicked = {clicked}>
                {username}
              </Navbar.ProfileInfo>
              <Navbar.ProfileInfo scrolled = {scrolled} id = "true" clicked = {clicked}>
                {id}
              </Navbar.ProfileInfo>
            </Navbar.NavigationChild>
          </Navbar.NavigationCenter>
        </React.Fragment>
        :
        null}

      </Navbar.NavInner>
    </Navbar.Nav>
  )
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: !!state.authentication.token,
    username: state.user.user_data ? state.user.user_data.fullname : "",
    id: state.user.user_data ? state.user.user_data.idNumber : ""
  }
}
//Mengirimkan menu
export default connect(mapStateToProps, authActions)(Menu);