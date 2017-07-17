// @flow

import React from 'react'
import { Input as AntInput } from 'antd'

export default ({ input, meta, ...props }: ReduxFormFieldProps) =>
  <AntInput {...input} />
