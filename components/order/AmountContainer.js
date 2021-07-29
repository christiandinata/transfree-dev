import styled from "styled-components";

export const ItemRow = styled.div`
  display: flex;
  padding: 2.5px 0px 2.5px;
  
  ${({ hide }) => hide && `
    display: none;
  `}
`;

export const AmountContainer = styled.div`
  background: #1E345B;
  color: white;
  margin: 45px -30px 30px -30px;
  padding: 0px 20px 0px 20px; 

  @media only screen and (max-width: 800px) {
    margin: 45px -20px 30px -20px;
    padding: 0px 10px 0px 10px;
  }
`;
export const AmountColumn = styled.span`
  color: white;
  padding-bottom: ${props => props.left ? '0px' : '2.5px'};
  padding-top: ${props => props.left ? '4.75px' : '2.5px'};
  flex-basis: ${props => props.left ? '50%' : '50%'};
  text-align: ${props => props.left ? 'left' : 'right'};
  font-size: ${props => props.left ? '16px' : '20px'};
  font-family: ${props => props.left ? 'Avenir Next LT Pro' : 'Avenir Next LT Pro Bold'};
`;