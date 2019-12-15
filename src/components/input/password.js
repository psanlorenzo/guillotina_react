import React from 'react'
import {Input} from './input';


export const PasswordInput = ({ value = '', ...rest }) => {
    return <Input type="email"
      value={value}
      type="password"
      {...rest}
    />;
}
