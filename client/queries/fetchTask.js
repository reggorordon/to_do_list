import gql from 'graphql-tag';

export default gql`
  query TaskQuery($id: ID!) {
    task(id: $id) {
      id
      title
      breakdowns {
        id
        content
        likes
      }
    }
  }
`;
