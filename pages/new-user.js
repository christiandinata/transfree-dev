import { useState } from 'react';
import { connect } from 'react-redux';
import Header from '../components/header';
import Menu from '../components/menu';
import CreateProfile from '../components/new-user/CreateProfile';
import UploadPhoto from '../components/new-user/UploadPhoto';
import actions from '../redux/actions';
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
    case 2:
      return <CreateProfile nextStep={ () => setCurrentStep(currentStep+1) } />
    case 3:
      return <UploadPhoto nextStep={ () => setCurrentStep(currentStep+1) } />
    default:
      return ''
  }
}

function NewUser (props) {
  const totalSteps = 2
  const [currentStep, setCurrentStep] = useState(1)

  // switch(props.userData.registrationStep) {
  switch(props) {
    case 2:
      setCurrentStep(1)
      break
    case 3:
      setCurrentStep(2)
      break
  }

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
            <a href='/account'>
              <img src='../../static/images/close.svg' />
            </a>
          </div>
        </div>
        <CurrentStepWindow currentStep={ currentStep } />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userData: state.user.user_data,
  }
}

export default connect(mapStateToProps, actions)(NewUser);
