import styled from 'styled-components';

const ErrorIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: Calc(100% - 8px);
  height: Calc(100% - 8px);
  border-radius: 50%;
  border: 4px solid white;
  transform: rotateZ(45deg);

  ::before {
    display: block;
    content: '';
    width: 4px;
    height: 80%;
    background-color: white;
    border-radius: 50% / 4px;
    transform: rotateZ(90deg);
  }
  ::after {
    display: block;
    content: '';
    position: absolute;
    width: 4px;
    height: 80%;
    background-color: white;
    border-radius: 50% / 4px;
  }
`;

export default ErrorIcon;
