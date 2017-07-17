// @flow

import React from "react";

type Props = {
  children?: mixed
};

const styles = {
  layout: {
    width: 800,
    margin: "0 auto"
  }
};

export default (props: Props) =>
  <div style={styles.layout}>
    {props.children}
  </div>;
