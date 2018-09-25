import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { Flex } from 'grid-styled';

import Square from 'components/square';
import ErrorIcon from 'components/error-icon';
import Button from 'components/button';

const brake = keyframes`
  from {
    transform: rotateZ(0deg);
  }

  to {
    transform: rotateZ(3deg);
  }
`;

const brakeReverse = keyframes`
  from {
    transform: rotateZ(0deg);
  }

  to {
    transform: rotateZ(-3deg);
  }
`;

const UpperHalf = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  padding-top: 15%;
  padding-bottom: 5%;
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
  background-color: rgb(251, 96, 122);

  animation: ${brake} 0.1s linear 1s;
  animation-fill-mode: forwards;
  box-shadow: -4px 11px 15px 2px lightgrey;
`;

const BottomHalf = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  border-bottom-left-radius: 7px;
  border-bottom-right-radius: 7px;
  background-color: rgb(251, 96, 122);
  animation: ${brakeReverse} 0.1s linear 1.2s;
  animation-fill-mode: forwards;
  box-shadow: -4px 11px 15px 2px lightgrey;
`;

const Error = styled.h1`
  letter-spacing: 0.2em;
  color: white;
  font-family: 'Helvetica', 'Arial';
  font-weight: bold;
  margin: 5px 0px 5px 0.2em;

  animation: ${brake} 0.1s linear 1.4s reverse;
  animation-fill-mode: forwards;
`;

const ErrorMsg = styled.span`
  color: white;
  font-family: 'Helvetica', 'Arial';
  padding-bottom: 10px;
  animation: ${brakeReverse} 0.1s linear 1.6s;
  animation-fill-mode: forwards;
`;

const ErrorCard = ({ errorMsg, buttonCallback }) => (
  <Flex flexDirection="column">
    <UpperHalf>
      <Square width="40%">
        <ErrorIcon />
      </Square>
    </UpperHalf>
    <BottomHalf>
      <Flex flexDirection="column" alignItems="center" pb="15px">
        <Error>ERROR</Error>
        <ErrorMsg>{errorMsg}</ErrorMsg>
        <Button color="rgb(251, 96, 122)" backGroundColor="white" onClick={buttonCallback}>
          Try again
        </Button>
      </Flex>
    </BottomHalf>
  </Flex>
);

ErrorCard.propTypes = {
  errorMsg: PropTypes.string.isRequired,
  buttonCallback: PropTypes.func,
};

ErrorCard.defaultProps = {
  buttonCallback: null,
};

export default ErrorCard;
