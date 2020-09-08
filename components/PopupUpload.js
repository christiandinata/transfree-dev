import '../styles/components/new-user/PopUp.css';
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
            <p>Please Upload 2 pictures for the verification purpose: <br></br>
                1. ID Card Picture (Passport/ KTP/ SIM)<br></br>
                2. Selfie with the ID Card </p>
                <div className="field_popup">
                    <div className="popup-left">
                        <h1>Id Card Example</h1>
                        <img src="../static/images/Sign Up ASSET WEB/ktp.png"></img>
                    </div>
                    <div className="popup-right">
                        <h1>Photo Example</h1>
                        <img src="../static/images/Sign Up ASSET WEB/selfie.jpg"></img>
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