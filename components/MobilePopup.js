import '../styles/components/MobilePopup.css';

function MobilePopupConfirmation (props) {
  return (
    <div className='mobile-popup-confirmation'>
      <button className='mobile-popup-button mobile-popup-button-confirm' onClick={ props.onConfirm }>
        { props.confirmMessage }
      </button>
    </div>
  )
}

function MobilePopupChoice (props) {
  return (
    <div className='mobile-popup-choice'>
      <button className='mobile-popup-button mobile-popup-button-confirm' onClick={ props.onConfirm }>
        { props.confirmMessage }
      </button>
      <button className='mobile-popup-button mobile-popup-button-reject' onClick={ props.onReject }>
        { props.rejectMessage }
      </button>
    </div>
  )
}

function MobilePopup (props) {
  return (
    <div className='mobile-popup-overlay'>
      <div className='mobile-popup-container'>
        <div className='mobile-popup-header'>
          { props.title }
        </div>
        <div className='mobile-popup-body'>
          { props.message }
        </div>
        <div className='mobile-popup-interactables'>
          {
            props.isChoice
            ? <MobilePopupChoice
                confirmMessage={ props.confirmMessage }
                onConfirm = { props.onConfirm }
                rejectMessage={ props.rejectMessage }
                onReject={ props.onReject } />
            : <MobilePopupConfirmation
                confirmMessage={ props.confirmMessage }
                onConfirm = { props.onConfirm } />
          }
        </div>
      </div>
    </div>
  )
}

export default MobilePopup
