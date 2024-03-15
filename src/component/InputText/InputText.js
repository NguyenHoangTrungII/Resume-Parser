import React, { useState, useEffect } from "react";
import styles from "./InputText.module.scss";
import classNames from "classnames/bind";
import { Input } from "@mui/material";

const cx = classNames.bind(styles);

function InputFiled({label='', value=''}) {

  return <div className={cx('inputContainer')}>
    <label>{label}</label>
    <Input autoFocus={true} value={value} />
    
  </div>
  }

export default InputFiled;
