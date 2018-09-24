import React from 'react';
import { Flex } from 'grid-styled';
import PropTypes from 'prop-types';

import EventBox from 'components/event-box';

const EventsList = ({ events }) => {
  let tamanho = 3;
  let rowIndex = 0;

  const eventRows = events
    && events.reduce((rows, event) => {
      if (Array.isArray(rows[rowIndex]) && rows[rowIndex].length === tamanho) {
        rowIndex += 1;
        tamanho = tamanho === 3 ? 2 : 3;
      }
      // eslint-disable-next-line no-param-reassign
      if (!Array.isArray(rows[rowIndex])) rows[rowIndex] = [];
      rows[rowIndex].push(event);
      return rows;
    }, []);

  return (
    eventRows
    && eventRows.map(eventRow => (
      <Flex
        key={eventRow.reduce((ids, event) => ids + event.id, '')}
        is="section"
        justifyContent="space-evenly"
        flexWrap="wrap"
        style={{ width: '100%', maxWidth: '1200px' }}
      >
        {eventRow
          && eventRow.map(event => (
            <EventBox key={event.id} id={event.id} name={event.name} pic={event.photo.small_url} />
          ))}
      </Flex>
    ))
  );
};

EventsList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default EventsList;
