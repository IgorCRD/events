import styled from 'styled-components';

const Button = styled.button`
  background-color: ${props => props.backgroundColor};
  border: 0;
  padding: 0.5em 2.5em 0.5em 2.5em;
  border-radius: 50% / 227%;

  color: ${props => props.color};
  font-family: 'Helvetica', 'Arial';
  outline: 0px;
  transition: 0.5s;

  :active {
    transition: 0.1s;
    box-shadow: inset 0px 0px 0.625em;
  }
`;

export default Button;
