import React from 'react';
import { Flex, Box } from 'grid-styled';
import styled from 'styled-components';
import beerTopImg from 'assets/images/show-hero.png';

const HeroImage = styled.img`
  object-fit: cover;
  object-position: top center;
  height: 40vh;
`;

const BeerLoversFlex = styled(Flex)`
  position: absolute;
  color: white;
  mix-blend-mode: difference;
`;

const Header = () => (
  <Flex is="header" flexDirection="column" justifyContent="center" bg="black">
    <BeerLoversFlex p={3} width={[1]} flexWrap="wrap" justifyContent="center" alignItems="center">
      <h1
        style={{
          fontSize: '3.45em',
          margin: '0px',
        }}
      >
        Let
        {"'"}
s Events
      </h1>
      <Box flex="1 1 100%" />
      <h3 style={{ margin: '0px' }}>The simplest way to be part of</h3>
    </BeerLoversFlex>
    <HeroImage src={beerTopImg} alt="show" />
  </Flex>
);

export default Header;
