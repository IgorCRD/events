import React from 'react';
import { Flex, Box } from 'grid-styled';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import searchIconImg from 'assets/images/search-icon.png';

const FlexSearchBar = styled(Flex)`
  background-color: white;
  box-shadow: 24px -8px 20px -25px grey, -24px -8px 20px -25px grey;
  border-radius: 5px;
  font-size: 1.5em;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  border: none;
  border-bottom: 1px solid lightgray;
  font-family: 'Helvetica', 'Arial';
  color: #25174d;

  &:focus {
    outline: 0;
  }
`;

const SearchIcon = styled(Box)`
  position: absolute;
  width: 1.5em;
  height: 1.5em;
  align-self: flex-end;
  margin: -3px 0 0 -3px;
`;

const SearchBar = ({ input, onChangeCallback }) => (
  <Flex p="1em" width={[1, 3 / 4, 2 / 3]}>
    <FlexSearchBar justifyContent="flex-end" p="1em" width={[1]}>
      <SearchInput value={input} onChange={onChangeCallback} />
      <SearchIcon is="img" src={searchIconImg} alt="search icon" />
    </FlexSearchBar>
  </Flex>
);

SearchBar.propTypes = {
  input: PropTypes.string.isRequired,
  onChangeCallback: PropTypes.func.isRequired,
};

export default SearchBar;
