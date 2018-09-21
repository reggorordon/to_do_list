import gql from 'graphql-tag';

export default gql`
  {
    tasks {
      id
      title
    }
  }
`;

