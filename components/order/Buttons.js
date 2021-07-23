import styled from 'styled-components';

export const ButtonContainer = styled.div`
  padding-top: 30px;
`;

export const Button = styled.button`
  border: 1px solid #009FE3;
  border-radius: 4px;

  width: 100%;
  height: 50px;
  font-size: 16px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 24px;
  margin-bottom: 10px;
  transition: 0.2s;

  background-color: ${props => props.secondary ? 'white' : '#009FE3'};
  color: ${props => props.secondary ? '#009FE3' : 'white'};

  ${({ disabled }) => disabled && `
    opacity: 0.8;
    background: grey;
    border-color: grey;
    cursor: default !important;
  `}
`;