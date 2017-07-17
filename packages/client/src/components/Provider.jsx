// @flow

import React from "react";
import { createStore, combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { Provider as ReduxProvider } from "react-redux";
import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface
} from "react-apollo";
import LocaleProvider from "antd/lib/locale-provider";
import enUS from "antd/lib/locale-provider/en_US";

import conf from "../conf";

type Props = {
  children?: mixed
};

const networkInterface = createNetworkInterface({
  uri: conf.graphqlURL
});
const rootReducer = combineReducers({
  form: formReducer
});
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
const client = new ApolloClient({
  networkInterface
});

export default (props: Props) =>
  <LocaleProvider locale={enUS}>
    <ReduxProvider store={store}>
      <ApolloProvider client={client}>
        {props.children}
      </ApolloProvider>
    </ReduxProvider>
  </LocaleProvider>;
