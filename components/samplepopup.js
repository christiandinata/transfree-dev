import React from 'react';

const SamplePopUp = () => {
    <div className="popup">
        <div className="popupcontent">
            <h1>{this.props.text}</h1>
            <button className="closebutton" onClick={this.props.closePopUp}>Close</button>
        </div>
    
        <style jsx>{`
            .popup{
                position: fixed;  
                width: 100%;  
                height: 100%;  
                top: 0;  
                left: 0;  
                right: 0;  
                bottom: 0;  
                margin: auto;  
                background-color: rgba(0,0,0, 0.5);  
            }

            .popupcontent{
                position: absolute;  
                left: 25%;  
                right: 25%;  
                top: 25%;  
                bottom: 25%;  
                margin: auto;  
                border-radius: 20px;  
                background: white;
            }

            .closebutton{
                border: 0px;
                background-color: rgb(125,125,255);
                margin-bottom: 20px;
                padding: 8px;
                font-size: 12px;
            }

            .closebutton:hover{
                cursor: pointer;
            }
        `}</style>
    </div>
}

export default SamplePopUp;