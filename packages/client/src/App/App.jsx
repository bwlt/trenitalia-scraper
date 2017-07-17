// @flow

import React from "react";
import { Field } from "redux-form";
import { Form, Button, Table } from "antd";
import moment from "moment";

import DatePicker from "../components/DatePicker";
import StationSelect from "../components/StationSelect";
import Layout from "../components/Layout";
import container from "./container";
import type { Props } from "./container";

const columns = [
  {
    title: "Time",
    key: "time",
    render(record: SolutionObject) {
      const day = moment(record.departuretime).format("DD-MM-YYYY"),
        from = moment(record.departuretime).format("HH:mm"),
        to = moment(record.arrivaltime).format("HH:mm");
      return `${day} | ${from} - ${to}`;
    }
  },
  {
    title: "Price",
    dataIndex: "minprice",
    sorter: (r1: SolutionObject, r2: SolutionObject) =>
      Number(r1.minprice) - Number(r2.minprice),
    render(amount) {
      return `${amount} €`;
    }
  }
];

const styles = {
  results: {
    marginTop: 20,
    padding: 20,
    backgroundColor: "white"
  }
};

const disabledDate = (date?: moment) => {
  if (!date) return false;
  const yesterday = moment().subtract(1, "d");
  return date.isBefore(yesterday);
};

const App = (props: Props) =>
  <Layout>
    <Form layout="inline" onSubmit={props.handleSubmit}>
      <Form.Item label="From">
        <Field name="origin" component={StationSelect} style={{ width: 150 }} />
      </Form.Item>
      <Form.Item label="To">
        <Field
          name="destination"
          component={StationSelect}
          style={{ width: 150 }}
        />
      </Form.Item>
      <Form.Item label="Date">
        <Field name="date" component={DatePicker} disabledDate={disabledDate} />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          disabled={props.invalid}
          loading={props.submitting}
        >
          Search
        </Button>
      </Form.Item>
    </Form>
    <section style={styles.results}>
      <Table
        loading={props.submitting}
        pagination={false}
        dataSource={props.solutions}
        columns={columns}
        bordered
        rowKey={(_, idx) => idx}
        title={() => "Results"}
      />
    </section>
  </Layout>;

export default container(App);
