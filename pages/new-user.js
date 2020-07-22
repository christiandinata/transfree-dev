import Router from 'next/router';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getCookie } from '../utils/cookie';
import initialize from '../utils/initialize';
import Header from '../components/header';
import Menu from '../components/menu';
import CreateProfile from '../components/new-user/CreateProfile';
import userActions from '../redux/actions/userActions';
import '../styles/new-user.css';

function Progress (props) {
  const items = []

  for (let i = 1; i <= props.totalSteps; i++) {
    if (i === props.currentStep) {
      items.push(<img src='../../static/images/step_round_filled.svg' />)
    } else {
        items.push(<img src='../../static/images/step_round.svg' />)
    }
  }

  return items
}

function CurrentStepWindow (props) {
  switch(props.currentStep) {
    case 1:
      return <CreateProfile nextStep={ props.onNextStep } />
    case 2:
      return <UploadPhoto nextStep={ props.onNextStep  } />
    default:
      return ''
  }
}

function NewUser (props) {
  const totalSteps = 2
  const [currentStep, setCurrentStep] = useState(props.userData.registrationStep - 1)

  useEffect(() => {
    switch(currentStep) {
      case 1:
        break
      case 2:
        break
      default:
        Router.replace('/')
    }
  })

  return (
    <div className='new-user-page'>
      <Header />
      <Menu />

      <div className='new-user-container'>
        <div className='new-user-header'>
          <div className='new-user-progress'>
            <Progress totalSteps={ totalSteps } currentStep = { currentStep } />
          </div>
          <div className='new-user-title'>
            Information Detail
          </div>
          <div className='new-user-close'>
            <a href='/'>
              <img src='../../static/images/close.svg' />
            </a>
          </div>
        </div>
        <CurrentStepWindow currentStep={ currentStep } onNextStep={ () => setCurrentStep(currentStep+1) } />
      </div>
    </div>
  );
}

NewUser.getInitialProps = async (ctx) => {
  initialize(ctx)
  await ctx.store.dispatch(userActions.getUser(getCookie('_id', ctx.req), 'user', ctx.req))
}

const mapStateToProps = (state) => {
  return {
    userData: state.user.user_data,
  }
}

export default connect(mapStateToProps)(NewUser);
