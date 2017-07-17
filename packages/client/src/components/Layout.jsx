// @flow

import React from "react";
import AntLayout from "antd/lib/layout";

import Container from "./Container";

type Props = {
  children?: mixed
};

const styles = {
  layout: {
    height: "100%"
  },
  headerTitle: {
    color: "white",
    textAlign: "center"
  },
  content: {
    marginTop: 20
  }
};

export default (props: Props) =>
  <AntLayout style={styles.layout}>
    <AntLayout.Header>
      <Container>
        <h1 style={styles.headerTitle}>
          Trenitalia Scraper
        </h1>
      </Container>
    </AntLayout.Header>
    <AntLayout.Content style={styles.content}>
      <Container>
        {props.children}
      </Container>
    </AntLayout.Content>
  </AntLayout>;
