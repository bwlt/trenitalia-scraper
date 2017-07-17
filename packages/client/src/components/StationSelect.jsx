// @flow

import { gql, graphql } from "react-apollo";
import compose from "recompose/compose";

import Select from "./Select";

const StationsQuery = gql`
  query {
    stations {
      id
      name
    }
  }
`;

export default compose(
  graphql(StationsQuery, {
    props: props => {
      return {
        options: (props.data.stations || []).map(({ name }) => ({
          label: name,
          value: name
        })),
        ...props.ownProps
      };
    }
  })
)(Select);
