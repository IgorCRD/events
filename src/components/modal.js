import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { Box } from 'grid-styled';

const FullShadow = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
`;

const moveIn = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0px);
  }
`;

const moveOut = keyframes`
  from {
    transform: translateX(0px);
  }
  to {
    transform: translateX(-100%);
  }
`;

const FlexModalBox = styled.div`
  overflow-y: auto;
  background-color: #2f343b;
  box-shadow: inset 0 5px 25px 0 rgba(0, 0, 0, 0.75);
  height: 100%;
  width: 100%;
  animation: ${props => (props.animationState === 'openning' ? moveIn : moveOut)} 0.5s;
`;

class Modal extends React.Component {
  static propTypes = {
    children: PropTypes.element,
    closeModalCallback: PropTypes.func.isRequired,
  };

  static defaultProps = {
    children: null,
  };

  state = {
    animationState: 'openning',
  };

  handleMoveOut = (closeModalCallback) => {
    const { right } = this.modal.getBoundingClientRect();
    if (right > 2) {
      window.requestAnimationFrame(() => this.handleMoveOut(closeModalCallback));
    } else {
      closeModalCallback();
    }
  };

  handleCloseModalCallback = () => {
    this.setState({ animationState: 'closing' });

    const { closeModalCallback } = this.props;
    this.handleMoveOut(closeModalCallback);
  };

  handleRef = (modal) => {
    this.modal = modal;
  };

  handleClickPropagation = (event) => {
    event.stopPropagation();
    return false;
  };

  render() {
    const { children } = this.props;
    const { animationState } = this.state;
    return (
      <FullShadow onClick={this.handleCloseModalCallback}>
        <Box width={[4 / 5]} style={{ height: '100%' }} onClick={this.handleClickPropagation}>
          <FlexModalBox innerRef={this.handleRef} animationState={animationState}>
            {children}
          </FlexModalBox>
        </Box>
      </FullShadow>
    );
  }
}

export default Modal;
