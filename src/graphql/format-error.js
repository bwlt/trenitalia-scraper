// @flow

import type { GraphQLError, GraphQLFormattedError } from "graphql";

const { NODE_ENV } = process.env,
  isProduction = NODE_ENV === "production";

export default (error: GraphQLError): GraphQLFormattedError => {
  const formatted = {};

  (formatted.message = error.message), (formatted.locations =
    error.locations), (formatted.path = error.path);

  if (!isProduction) formatted.stack = error.stack;

  return formatted;
};
