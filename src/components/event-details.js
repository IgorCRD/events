import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'grid-styled';
import styled from 'styled-components';

import media from 'src/media-breakpoints';
import Ingresso from 'components/ingresso';
import numberFormatter from 'src/utils';

const ModalContent = styled(Flex)`
  color: white;
  flex-direction: column;

  ${media.tablet`padding: 2em`};
  ${media.phone`padding: 1em`};
`;

const EventTitle = styled.h3`
  :after {
    content: '';
    margin-top: 0.9em;
    display: block;
    width: 3em;
    height: 4px;
    background-color: #7ab55c;
  }
`;

const Address = styled(Flex)`
  flex-direction: column;
  margin-top: 2em;
  padding-bottom: 1em;
  border-bottom: 1px solid #5c6570;
  font-weight: lighter;
`;

const Ingressos = styled(Flex)`
  padding: 1em 0;
  margin: 0;
`;

class EventDetails extends React.Component {
  total = (type) => {
    /* eslint-disable-next-line prefer-destructuring */
    const state = this.state;

    if (!this.state) return 0;
    return Object.keys(this.state)
      .map(
        ingressoId => (type === 'CREDIT' ? state[ingressoId].totalCredit : state[ingressoId].totalBankSlip),
      )
      .reduce((sum, current) => sum + current, 0);
  };

  updateTotals = (ingressoId, totalCredit, totalBankSlip) => {
    this.setState({
      [ingressoId]: {
        totalCredit,
        totalBankSlip,
      },
    });
  };

  render() {
    const { event } = this.props;
    return (
      <ModalContent p="3em">
        <EventTitle>{event.name}</EventTitle>
        <span>{event.description}</span>
        {event.address && (
          <Address>
            <span>{event.address.street}</span>
            <span>{`${event.address.city}, ${event.address.state}`}</span>
            <span>{event.address.country}</span>
          </Address>
        )}
        {event.ticket_offers
          && event.ticket_offers.nodes && (
            <Flex flexDirection="column">
              <Ingressos is="h4">Ingressos</Ingressos>
              {event.ticket_offers.nodes.length > 0 ? (
                event.ticket_offers.nodes.map(ingresso => (
                  <Ingresso
                    key={ingresso.id}
                    ingresso={ingresso}
                    updateTotals={this.updateTotals}
                  />
                ))
              ) : (
                <span>Esgotado</span>
              )}
            </Flex>
        )}
        {event.ticket_offers
        && event.ticket_offers.nodes
        && event.ticket_offers.nodes.length > 0 ? (
          <Flex is="section" p="2em" flexDirection="column">
            <Flex
              flexDirection="row"
              justifyContent="space-between"
              style={{
                borderBottom: '1px solid #7ab55c',
                paddingBottom: '0.5em',
                marginBottom: '0.5em',
              }}
            >
              <div>Total sem desconto</div>
              <div>{numberFormatter.format(this.total('CREDIT'))}</div>
            </Flex>

            <Flex flexDirection="row" justifyContent="space-between">
              <div>Total com desconto</div>
              <div>{numberFormatter.format(this.total('BANK_SLIP'))}</div>
            </Flex>
          </Flex>
          ) : null}
      </ModalContent>
    );
  }
}

EventDetails.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    photo: PropTypes.shape({
      cover_url: PropTypes.string,
      __typename: PropTypes.string,
    }),
    address: PropTypes.shape({
      name: PropTypes.string,
      city: PropTypes.string,
      state: PropTypes.string,
      country: PropTypes.string,
      street: PropTypes.string,
      __typename: PropTypes.string,
    }),
    ticket_offers: PropTypes.shape({
      nodes: PropTypes.arrayOf(Ingresso.propTypes.ingresso),
      __typename: PropTypes.string,
    }),
    __typename: PropTypes.string,
  }).isRequired,
};

export default EventDetails;
