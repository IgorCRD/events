import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import { Flex } from 'grid-styled';
import { FoldingCube } from 'styled-spinkit';

import EventDetailsData from 'containers/event-details-data';
import Modal from 'components/modal';
import ErrorCard from 'components/error-card';
import EventDetails from 'components/event-details';

const EventModal = ({ id }) => (
  <Modal closeModalCallback={() => navigate('/')}>
    <EventDetailsData id={id}>
      {({
        loading, error, data, retry,
      }) => {
        if (loading) {
          return (
            <Flex pt="3em" style={{ height: '100vh' }}>
              <FoldingCube />
            </Flex>
          );
        }
        if (error) return <ErrorCard errorMsg={error} buttonCallback={retry} />;
        return data && data.event_offer && <EventDetails event={data.event_offer} />;
      }}
    </EventDetailsData>
  </Modal>
);

EventModal.propTypes = {
  id: PropTypes.string,
};

EventModal.defaultProps = {
  id: '',
};

export default EventModal;
