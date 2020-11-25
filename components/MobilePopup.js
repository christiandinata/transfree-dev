import '../styles/components/MobilePopup.css';
//Berisi tentang popup yang akan muncul pada mobile

function MobilePopupConfirmation (props) {
  //Untuk konfirmasi
  return (
    <div className='mobile-popup-confirmation'>
      <button className='mobile-popup-button mobile-popup-button-confirm' onClick={ props.onConfirm }>
        { props.confirmMessage }
      </button>
    </div>
  )
}

function MobilePopupChoice (props) {
  //Untuk konfirmasi yang memiliki pilihan
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
  //component besar yang menampilkan salah satu dari dua component di atas sesuai kebutuhan
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
