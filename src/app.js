import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { injectGlobal } from 'styled-components';
import styledNormalize from 'styled-normalize';
import MainPage from 'components/main-page';

const client = new ApolloClient({
  uri: process.env.LETSEVENTS_GRAPHQL_ENDPOINT,
});

const injectGlobalStyle = () => injectGlobal`
  ${styledNormalize}

  *, *:: before, *:: after { box-sizing: border-box; }
`;

class App extends React.Component {
  componentDidMount() {
    injectGlobalStyle();
  }

  render() {
    return (
      <React.Fragment>
        <ApolloProvider client={client}>
          <MainPage />
        </ApolloProvider>
      </React.Fragment>
    );
  }
}

export default App;
