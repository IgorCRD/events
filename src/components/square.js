import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const SquareDiv = styled.div`
  position: relative;
  width: ${props => props.width};
  padding-bottom: ${props => props.width};
`;

const SquareContent = styled.div`
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
`;

const Square = ({ children, width }) => (
  <SquareDiv width={width}>
    <SquareContent>{children}</SquareContent>
  </SquareDiv>
);

Square.propTypes = {
  children: PropTypes.element,
  width: PropTypes.string.isRequired,
};

Square.defaultProps = {
  children: null,
};

export default Square;
