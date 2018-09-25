import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import debounceRender from 'react-debounce-render';

import * as queries from 'src/graphql-queries';

class EventsDetailsData extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
  };

  state = {};

  render() {
    const { children: childFunction, id } = this.props;
    return (
      <Query query={queries.eventsDataQuery.query(id)}>
        {({
          loading, error, data, refetch: retry,
        }) => childFunction({
          loading,
          error,
          data,
          retry,
        })
        }
      </Query>
    );
  }
}

export default debounceRender(EventsDetailsData);
