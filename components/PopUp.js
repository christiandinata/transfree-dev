import React from 'react'
import Link from 'next/link';
import styled from 'styled-components'
import { PrLineButton, PrButton } from './landing-page/Buttons'

const Modal = styled.div`
  position: fixed;
  background-color: rgba(0,0,0, 0.5);
  width: 100%;
  height: 100%;
  top: 0; bottom: 0;
  left: 0; right: 0;
`

const ModalInner = styled.div`
  position: absolute;
  top: 15%;
  left: 30%;
  right: 30%;
  height: auto;
  width: auto;
  border-radius: 5px;
  background: white;
  text-align: center;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  h2, p {
    margin: 0 auto;
  }
  h2 {
    color: #009FE3;
    margin-bottom: 16px;
  }
  @media only screen and (max-width: 720px) {
    left: 3%;
    right: 3%;
  }`

const ButtonFlex = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 1rem;
  margin-top: 1.5rem;
  button {
    width: 8rem;
  }`

export function PopUp(props) {
  return(
    <div>
      <Modal>
        <ModalInner>
          <h2>Congratulations, <span>{props.text}</span>!</h2>
          <p>You have successfully registered.</p>
          <p>Please complete your information detail!</p>
          <ButtonFlex>
            <PrLineButton onClick={props.closePopup} >Later</PrLineButton>
            <Link href="/new-user">
              <PrButton>Go Now</PrButton>
            </Link>
          </ButtonFlex>
        </ModalInner>
      </Modal>
    </div>
  )
}
