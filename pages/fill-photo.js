import NewUser from './new-user';
import Router from 'next/router';
import { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { getCookie } from '../utils/cookie';
import initialize from '../utils/initialize';
import Header from '../components/header';
import Menu from '../components/menu';
import MobileFooter from '../components/MobileFooter';
import CreateProfile from '../components/new-user/CreateProfile';
import UploadPhoto from '../components/new-user/UploadPhoto';
import userActions from '../redux/actions/userActions';
import '../styles/new-user.css';
class FillPhoto extends React.Component{
    render(){
        return(
            <div>
                <NewUser userData={this.props.userData} currentStep={2} ></NewUser>
            </div>
        )
    }
}


FillPhoto.getInitialProps = async (ctx) => {
    initialize(ctx)
    await ctx.store.dispatch(userActions.getUser(getCookie('_id', ctx.req), 'user', ctx.req))
  }
  
  const mapStateToProps = (state) => {
    return {
      userData: state.user.user_data,
    }
  }
  
export default connect(mapStateToProps)(FillPhoto);
