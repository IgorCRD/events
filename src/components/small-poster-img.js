import styled from 'styled-components';

const SmallPosterImg = styled.div`
  width: 100%;
  height: 220px;
  background-size: cover;
  background-position: 50% 50%;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 36px));
  background-image: url(${props => props.src});
`;

export default SmallPosterImg;
