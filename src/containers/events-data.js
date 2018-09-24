import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import debounceRender from 'react-debounce-render';

import * as queries from 'src/graphql-queries';

class EventsData extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    search: PropTypes.string,
    first: PropTypes.number,
  };

  static defaultProps = {
    search: '',
    first: 10,
  };

  state = {
    after: '',
    before: [],
  };

  nextPage = (cursor) => {
    this.setState(state => ({
      after: cursor,
      before: [...state.before, state.after],
    }));
  };

  previousPage = () => {
    this.setState(state => ({
      after: state.before[state.before.length - 1],
      before: state.before.slice(0, state.before.length - 1),
    }));
  };

  render() {
    const { children: childFunction, search, first } = this.props;
    const { after, before } = this.state;
    return (
      <Query query={queries.searchEventQuery.query} variables={{ search, first, after }}>
        {({
          loading, error, data, refetch: retry,
        }) => childFunction({
          loading,
          error,
          data,
          retry,
          nextPage:
              data.events && data.events.pageInfo.hasNextPage
                ? () => {
                  this.nextPage(data.events.pageInfo.endCursor);
                }
                : null,
          previousPage: before.length !== 0 ? this.previousPage : null,
        })
        }
      </Query>
    );
  }
}

export default debounceRender(EventsData, 400);
