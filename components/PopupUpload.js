import '../styles/components/new-user/PopUp.css';

//Popup yang meminta user mengupload foto untuk verifikasi saat mereka pertama login
class PopupUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showPopup: true
        };
    }

    togglePopup() {
        document.querySelector('#popup').style.display = 'none';
    }
    renderContent() {
        return(
            <div className="popup_dekstop" id="popup"> 
            <div className="popup_inner">
            <p style={{marginBottom:-10}}>Please Upload 2 pictures for the verification purpose: </p>
            <div className = "description" style={{textAlign:"left",marginTop:0}}>
                <p>1. ID Card Picture (Passport/ KTP/ SIM. Make sure we can read the ID number clearly)<br></br>
                2. Selfie with the ID Card (Make sure we can read the ID number clearly)</p>
            </div>
                <div className="field_popup">
                    {/* Bagian foto kartu identitas  */}
                    <div className="popup-left">
                        <h1>Id Card Example</h1>
                        <img src="../static/images/Sign Up ASSET WEB/ktp.png" alt="KTP"></img>
                    </div>
                    {/* Bagian foto diri */}
                    <div className="popup-right">
                        <h1>Selfie with the ID Card Example</h1>
                        <img src="../static/images/Sign Up ASSET WEB/selfie.png" alt="Selfie"></img>
                    </div>

                </div>
                <div className="buttonPopUp">
                    <button className="btn-popup" onClick={this.togglePopup} >Understand</button>
                </div>
            </div>
        </div>
        )
    }
    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        )
    }
}

export default PopupUpload;