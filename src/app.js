import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { injectGlobal } from 'styled-components';
import styledNormalize from 'styled-normalize';
import { Router } from '@reach/router';

import MainPage from 'components/main-page';
import EventModal from 'components/event-modal';

const client = new ApolloClient({
  uri: process.env.LETSEVENTS_GRAPHQL_ENDPOINT,
});

const injectGlobalStyle = () => injectGlobal`
  ${styledNormalize}

  body {
    -webkit-overflow-scrolling : touch;
    font-family: Helvetica Neue,Helvetica,Arial,Sans-Serif;
  }

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
          <Router>
            <MainPage path="/">
              <EventModal path="/events/:id" />
            </MainPage>
          </Router>
        </ApolloProvider>
      </React.Fragment>
    );
  }
}

export default App;
