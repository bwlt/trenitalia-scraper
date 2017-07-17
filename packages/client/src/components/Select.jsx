// @flow

import React from "react";
import PropTypes from "prop-types";
import { Select as AntSelect } from "antd";

type Option = { label: string, value: string };

const Select = ({
  input,
  meta,
  options,
  ...props
}: ReduxFormFieldProps & { options: Option[] }) =>
  <AntSelect
    {...input}
    showSearch
    optionFilterProp="children"
    filterOption={(input, option) =>
      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
    {...props}
  >
    {options.map(({ label, value }, idx) =>
      <AntSelect.Option value={value} key={`${idx}.${value}`}>
        {label}
      </AntSelect.Option>
    )}
  </AntSelect>;

Select.displayName = "Select";

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    }).isRequired
  )
};

Select.defaultProps = {
  options: []
};

export default Select;
