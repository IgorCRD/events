import React from 'react';
import Header from 'components/header';
import SearchBar from 'components/search-bar';
import EventsData from 'containers/events-data';
import { Flex } from 'grid-styled';

const MainPage = () => (
  <React.Fragment>
    <Header />
    <Flex is="section" flexDirection="column" alignItems="center" mt="-2.5em">
      <SearchBar>
        {({ searchValue }) => (
          <EventsData search={searchValue}>
            {({ data }) => (
              <div style={{ width: '100%' }}>
                <ul>
                  {data
                    && data.events
                    && data.events.nodes
                    && data.events.nodes.map(event => <li key={event.id}>{event.name}</li>)}
                </ul>
              </div>
            )}
          </EventsData>
        )}
      </SearchBar>
    </Flex>
  </React.Fragment>
);

export default MainPage;
