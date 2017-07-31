// @flow

import { gql, graphql } from "react-apollo";
import compose from "recompose/compose";

import Select from "./Select";

const StationsQuery = gql`
  query {
    stations
  }
`;

export default compose(
  graphql(StationsQuery, {
    props: props => {
      return {
        options: (props.data.stations || []).map((station) => ({
          label: station,
          value: station
        })),
        ...props.ownProps
      };
    }
  })
)(Select);
