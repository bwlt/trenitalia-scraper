// @flow

import React from "react";
import { DatePicker as AntDatePicker } from "antd";

export default ({ input, meta, ...props }: ReduxFormFieldProps) =>
  <AntDatePicker {...input} {...props} />;
