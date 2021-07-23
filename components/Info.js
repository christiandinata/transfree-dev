import styled from 'styled-components'

export const BlueHeader = styled.div`
  background: #1E345B;
  height: 270px;
  margin-top: 72px;`
  
export const Batik = styled.div`
  position: absolute;
  background: url('../static/images/new-ui/batik-world-map.png');
  background-repeat: no-repeat;
  background-position: center top;
  width: 100%;
  height: 270px;
  color: #FFFFFF;
  text-align: center;
  h1 {
    margin: 4rem 0 0;
    color: #FFFFFF;
  }
  p {
    width: 50%;
    max-width: 800px;
    margin: 1rem auto;
  }
  @media only screen and (max-width: 800px) {
    background: none;
    p { width: 95%; }
    h1 { font-size: 1.75rem; }
  }`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1124px;
  width: 95%;
  align-items: center;
  justify-content: center;
  margin: -7rem auto 3rem auto;
  h1 {
    margin-top: 4rem;
    margin-bottom: 3rem;
    color: #FFFFFF;
  }`

export const Paper = styled.div`
  background: ${ props => props.bg || "#FFFFFF" };
  padding: 2rem;
  text-align: justify;
  color: #626B79;
  h2 {
    color: #232933;
    margin-bottom: 0;
    font-size: 16px; 
  }
  p {
    font-size: 16px;
    margin-top: 0;
  }
  a {
    text-decoration: none;
    color: #009FE3;
  }
  b {
    color: #232933;
  }`

export const paperShadow = { boxShadow: "12px 0px 40px rgba(12, 12, 12, 0.1)", zIndex: 2 }
