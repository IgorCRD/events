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
    // TODO: PR to eslint?
    // eslint bug on rule react/no-unused-state does not detect the use of a
    // state property inside a setState (see nextPage and previousPage handlers)
    /* eslint-disable-next-line react/no-unused-state */
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
    const { after } = this.state;
    return (
      <Query query={queries.searchEventQuery.query} variables={{ search, first, after }}>
        {({ loading, error, data }) => childFunction({
          loading,
          error,
          data,
          nextPage: () => {
            this.nextPage(data.events.pageInfo.endCursor);
          },
          previousPage: this.previousPage,
        })
        }
      </Query>
    );
  }
}

export default debounceRender(EventsData, 400);
