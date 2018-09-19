import React from 'react';
import { render } from 'react-testing-library';
import EventsData from 'containers/events-data';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import mockResolvesAfter from '../test-utils';

describe('EventsData data fetch container tests', () => {
  const client = new ApolloClient({
    uri: 'http://dev.lets.events/graphql',
  });

  it('EventsData should fetch and return events data or an error', (done) => {
    const mockPromise = mockResolvesAfter(2 /* calls */, () => 'test');
    const functionChild = mockPromise.mock;
    render(
      <ApolloProvider client={client}>
        <EventsData search="">{functionChild}</EventsData>
      </ApolloProvider>,
    );

    mockPromise.then(() => {
      const firstCall = functionChild.mock.calls[0][0];
      const secondCall = functionChild.mock.calls[1][0];

      try {
        expect(firstCall.loading).toBe(true);
        expect(!secondCall.loading && (!!secondCall.error || !!secondCall.data)).toBe(true);
        done();
      } catch (e) {
        done().fail(e);
      }
    });
  });
});
