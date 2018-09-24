import React from 'react';
import { Flex } from 'grid-styled';
import { FoldingCube } from 'styled-spinkit';

import Header from 'components/header';
import SearchBar from 'components/search-bar';
import EventsData from 'containers/events-data';
import EventsList from 'components/events-list';
import PaginationButtons from 'components/pagination-buttons';
import ErrorCard from 'components/error-card';

const MainPage = () => (
  <React.Fragment>
    <Header />
    <Flex is="section" flexDirection="column" alignItems="center" mt="-2.5em" mb="2.5em">
      <SearchBar>
        {({ searchValue }) => (
          <EventsData search={searchValue}>
            {({
              loading, data, error, retry, nextPage, previousPage,
            }) => {
              if (loading) {
                return (
                  <Flex pt="3em" style={{ height: '100vh' }}>
                    <FoldingCube />
                  </Flex>
                );
              }
              if (error) return <ErrorCard errorMsg={error} buttonCallback={retry} />;
              return (
                data
                && data.events
                && data.events.nodes && (
                  <React.Fragment>
                    <h3>Best events around you</h3>
                    <EventsList events={data.events.nodes} />
                    <PaginationButtons nextCallback={nextPage} previousCallback={previousPage} />
                  </React.Fragment>
                )
              );
            }}
          </EventsData>
        )}
      </SearchBar>
    </Flex>
  </React.Fragment>
);

export default MainPage;
