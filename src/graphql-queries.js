import gql from 'graphql-tag';

export const searchEventQuery = {
  operationName: 'events',
  variables: {
    first: null,
    after: null,
    search: null,
  },
  query: gql`
    query events($first: Int, $after: String, $search: String) {
      events(
        first: $first
        after: $after
        filter: { search_query: $search, start_state: [UNSTARTED] }
        sort: [{ by: STARTS_AT, dir: ASC }]
      ) {
        pageInfo {
          startCursor
          endCursor
          hasNextPage
          __typename
        }
        nodes {
          id
          name
          starts_at
          ends_at
          slug
          share_link
          address {
            name
            state
            street
            city
            country
            complement
            zip_code
            neighborhood
            number
            __typename
          }
          photo {
            small_url
            cover_url
            __typename
          }
          __typename
        }
        __typename
      }
    }
  `,
};

export const eventsDataQuery = {
  operationName: 'eventOffer',
  variables: null,
  query: gql`
    query eventOffer {
      event_offer(id: "lets-react-the-grand-tournament") {
        id
        name
        description
        photo {
          cover_url
        }
        address {
          name
          city
          state
          country
          street
        }
        ticket_offers {
          nodes {
            id
            name
            description
            batches {
              id
              number
              price
              purchaseable_quantities
              payment_methods {
                due_amount
                due_service_fee
                payment_type
              }
            }
          }
        }
      }
    }
  `,
};
