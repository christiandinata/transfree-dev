import Link from 'next/link';
import { connect } from 'react-redux';
import authActions from '../redux/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Navbar from './MenuComponents';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { useEffect, useState } from 'react';

const Menu = ({isAuthenticated, isApproved, deauthenticate, username, id, homepage}) => {
  const [scrolled, setScrolled] = useState(false)

  const handleScrolled = () => {
    if(window.scrollY >= 20) {
      setScrolled(true)
    }
    else {
      setScrolled(false)
    }
  }

  useEffect(() => {
    handleScrolled();
    window.addEventListener('scroll', handleScrolled)
  }, [])

  return(
    <Navbar.Nav scrolled = {scrolled} homepage = {homepage} marginTop = "-72px">
      <Navbar.NavInner scrolled = {scrolled} homepage = {homepage}>
        <a href = "/"><Navbar.Logo src="../static/images/transfree-logo.png" scrolled = {scrolled} homepage = {homepage}/></a>
        
        {!isAuthenticated ? 
        <React.Fragment>
          <Navbar.Navigation>
            <Navbar.NavigationChild href="/about" scrolled = {scrolled} homepage = {homepage} navChildColor = "#f5f5f5">
              How It Works
            </Navbar.NavigationChild>
            <Navbar.NavigationChild href="/faq" scrolled = {scrolled} homepage = {homepage} navChildColor = "#f5f5f5">
              About Us
            </Navbar.NavigationChild>
            <Navbar.SignInButton href = "/login" scrolled = {scrolled} homepage = {homepage}>
              Sign In
            </Navbar.SignInButton>
            <Navbar.RegisterButton href = "/signup" scrolled = {scrolled} homepage = {homepage}>
              Register
            </Navbar.RegisterButton>
          </Navbar.Navigation>
        </React.Fragment> 
        : null}

        {isAuthenticated ? 
          <React.Fragment>
            <Navbar.NavigationCenter>
              <Navbar.NavigationChild href = "/order" scrolled = {scrolled} homepage = {homepage} navChildColor = "#f5f5f5">
                Send Money
              </Navbar.NavigationChild>
              <Navbar.NavigationChild href = "/account" scrolled = {scrolled} homepage = {homepage} navChildColor = "#f5f5f5">
                Transactions
              </Navbar.NavigationChild>
              <Navbar.NavigationChild href = "https://www.youtube.com/watch?v=8RzCs_sQ8Ak" scrolled = {scrolled} homepage = {homepage} navChildColor = "#f5f5f5">
                How It Works
              </Navbar.NavigationChild>
              <Navbar.NavigationChild href = "/about" scrolled = {scrolled} homepage = {homepage} navChildColor = "#f5f5f5">
                About Us
              </Navbar.NavigationChild>
            </Navbar.NavigationCenter>
            <Navbar.NavigationChild href = "/user-profile" scrolled = {scrolled} homepage = {homepage} navChildColor = "#f5f5f5">
              <Navbar.ProfileInfo scrolled = {scrolled} name = "true">
                {username}
              </Navbar.ProfileInfo>
              <Navbar.ProfileInfo scrolled = {scrolled} id = "true">
                {id}
              </Navbar.ProfileInfo>
            </Navbar.NavigationChild>
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