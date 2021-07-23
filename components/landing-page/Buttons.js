import React from 'react'
import styled from 'styled-components'

const FixBtn = styled.div`
  position: fixed;
  background: #00a82d;
  width: 65px;
  height: 65px;
  bottom: 4%;
  right: 3%;
  border-radius: 50%;
  text-align: center;
  box-shadow: 0 10px 30px 0 rgba(0,0,0,0.30);
  cursor: pointer;
  z-index: 1000;
`

export const PrButton = styled.button`
  background-color: #009FE3;
  border: none;
  outline: none;
  border-radius: 5px;
  color: #FFFFFF;
  font-family: "Avenir Next LT Pro";
  font-size: 1rem;
  transition: all 0.2s ease-in-out;
  padding: 0.75rem 1.5rem;

  &:hover {
    background-color: #068EC8;
  }
`

export const PrLineButton = styled.button`
  border: 1px solid #009FE3;
  border-radius: 5px;
  background-color: #FFFFFF;
  padding: 0.75rem 1.75rem;
  width: 12rem;
  font-family: "Avenir Next LT Pro";
  font-size: 1rem;
  color: #009FE3;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #009FE320;
  }
`

export const ScButton = styled.button`
  background-color: #FAAF40;
  border: none;
  border-radius: 5px;
  color: #FFFFFF;
  font-family: "Avenir Next LT Pro";
  font-size: 1rem;
  transition: all 0.2s ease-in-out;
  padding: 0.75rem 1.5rem;

  &:hover {
    background-color: #FA9A0B;
  }
`

export function WAButton() {
  return (
    <FixBtn>
      <a href="https://api.whatsapp.com/send?phone=447490090659&text=Hello%20Transfree" target="_blank">
      <img style={{ width: "75%", height: "75%", marginTop: "13%", zIndex: 999 }} src="../static/images/wa-logo.png" alt="whatsapp"/></a>
    </FixBtn>
  )
}