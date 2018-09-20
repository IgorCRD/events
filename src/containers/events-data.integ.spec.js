import React from 'react';
import { render } from 'react-testing-library';
import EventsData from 'containers/events-data';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import mockResolvesAfter from '../test-utils';

describe('EventsData data fetch container tests', () => {
  it('EventsData should fetch and return events data or an error', () => {
    const client = new ApolloClient({
      uri: 'http://dev.lets.events/graphql',
    });

    const mockPromise = mockResolvesAfter(2 /* calls */, () => 'test');
    const functionChild = mockPromise.mock;
    render(
      <ApolloProvider client={client}>
        <EventsData>{functionChild}</EventsData>
      </ApolloProvider>,
    );

    return mockPromise.then(() => {
      const firstCall = functionChild.mock.calls[0][0];
      const secondCall = functionChild.mock.calls[1][0];

      expect(firstCall.loading).toBeTruthy();
      expect(!secondCall.loading && (secondCall.error || secondCall.data)).toBeTruthy();
    });
  });

  it('EventsData should be able to filter results by its search query prop', () => {
    const client = new ApolloClient({
      uri: 'http://dev.lets.events/graphql',
    });

    const mockPromise = mockResolvesAfter(2 /* calls */, () => 'test');
    const functionChild = mockPromise.mock;
    const searchQuery = 'LatAm';
    render(
      <ApolloProvider client={client}>
        <EventsData search={searchQuery}>{functionChild}</EventsData>
      </ApolloProvider>,
    );

    return mockPromise.then(() => {
      const secondCall = functionChild.mock.calls[1][0];

      expect(secondCall.data.events.nodes).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ name: expect.stringContaining(searchQuery) }),
        ]),
      );
    });
  });
});
