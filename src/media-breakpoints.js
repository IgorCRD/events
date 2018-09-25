import { css } from 'styled-components';

const sizes = {
  desktop: '64em',
  tablet: '48em',
  phone: '32em',
};

/* eslint no-param-reassign:
["error", { "props": true, "ignorePropertyModificationsFor": ["accumulator"] }] */
const media = Object.keys(sizes).reduce((accumulator, label) => {
  const emSize = sizes[label];
  accumulator[label] = (...args) => css`
    @media (max-width: ${emSize}) {
      ${css(...args)};
    }
  `;
  return accumulator;
}, {});

export default media;
