import React from 'react';
import PropTypes from 'prop-types';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  uri: process.env.LETSEVENTS_GRAPHQL_ENDPOINT,
});

const App = ({ appName }) => (
  <ApolloProvider client={client}>
    <div>{appName}</div>
  </ApolloProvider>
);

App.propTypes = {
  appName: PropTypes.string,
};

App.defaultProps = {
  appName: '',
};

export default App;
