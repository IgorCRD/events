import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'grid-styled';

import ShadowBox from 'components/shadow-box';
import SmallPosterImg from 'components/small-poster-img';

const Event = ({ name, pic }) => (
  <div
    style={{
      padding: '0 1em 25px 1em',
      flexGrow: 1,
      flexShrink: 0,
    }}
  >
    <ShadowBox style={{ height: '100%' }}>
      <Flex flexDirection="column" justifyContent="center">
        <SmallPosterImg src={pic} alt="Event poster" />
        <span
          style={{
            padding: '1em',
            maxWidth: '280px',
          }}
        >
          {name}
        </span>
      </Flex>
    </ShadowBox>
  </div>
);

Event.propTypes = {
  name: PropTypes.string,
  pic: PropTypes.string,
};

Event.defaultProps = {
  name: '',
  pic: '',
};

export default Event;
