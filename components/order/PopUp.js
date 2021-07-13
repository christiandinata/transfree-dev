import React from 'react'
import styled from 'styled-components';
import Modal from 'react-modal';


const ModalLayout = styled(Modal)`
    >.container{
        width: 456px;       
    }

    h3{
        font-family: 'Avenir LT Pro Bold' !important;
        font-size: 20px;
        margin-left: 20px;
    }

    p{
        text-align: left;
        font-size: 16px:
        color: #626B79;
    }

    @media only screen and (max-width: 600px) {
        >.container{
            min-width: 280px;
            width: 280px;
        }
      }
`;

const Row = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: -10px;

    span{
        font-family: 'Avenir LT Pro Bold';
        font-size: 20px;
        margin-left: 20px;
        margin-top: 0px !important;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 30px;
`;

const Button = styled.button`
  border-radius: 4px;
  border: none;

  width: auto;
  height: 40px;
  font-size: 16px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 24px 8px 24px;
  transition: 0.2s;

  background-color: ${props => props.secondary ? 'white' : '#009FE3'};
  color: ${props => props.secondary ? '#9A9A9A' : 'white'};
`;

export class ModalPopUp extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        if (!this.props.open) {
            return null;
        }
        else{
        return(
            <ModalLayout
                isOpen = {true}
                ariaHideApp={false}
                style={{
                overlay: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(35, 41, 51, 0.8)',
                    zIndex: 1000
                    },
                content: {
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    minWidth: '280px',
                    background: 'white',
                    border: '1px solid #E2E2E2',
                    borderRadius: '4px',
                    outline: 'none',
                    padding: '20px',
                    textAlign: 'center',
                    padding: '20px 30px 20px 30px'
                }
                }}>
                <div className="container">
                    <Row>
                        <img src={this.props.icon}/>
                        <h3>{this.props.title}</h3>
                    </Row>

                    {this.props.content}

                    <ButtonContainer>
                        <Button secondary onClick = {this.props.toggleModal}>Cancel</Button>
                        <Button 
                            style = {{display: this.props.buttonLink ? "none" : "block"}}
                            onClick = {this.props.toggleModal}>
                                {this.props.buttonText}
                        </Button>
                        <Button 
                            style = {{display: this.props.buttonLink ? "block" : "none"}}
                            onClick= {()=>{window.open(this.props.buttonLink)}}>
                                {this.props.buttonText}
                        </Button>
                    </ButtonContainer>
                </div>
                </ModalLayout>
            )
        }
    }
}