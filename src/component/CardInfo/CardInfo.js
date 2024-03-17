import React, { useState, useEffect } from "react";
import styles from "./CardInfo.module.scss";
import classNames from "classnames/bind";
import { Input, TextField } from "@mui/material";

const cx = classNames.bind(styles);

function CardInfo({ data }) {
  console.log(data);
  return (
    <div>
      <div className={cx("projectName")}>
        <label className={cx("title")}>Project Name:</label>
        <label className={cx("inputTitle")}>
          <Input
            value={data?.title}
            style={{ width: "100%", fontSize: "14px" }}
          />
        </label>
      </div>
      <div className={cx("projectDetail")}>
        <label className={cx("detail")}>Details:</label>
        <label className={cx("inputDetail")}>
          {" "}
          <TextField
            defaultValue={data?.lines.map((item) => item[0].text).join(" ")}
            multiline
            rows={4}
            variant="standard"
            sx={{
              width: "100%",
              fontSize: 16,
            }}
            inputProps={{
              style: { fontSize: 15 },
            }}
            InputLabelProps={{ shrink: true, style: { fontSize: 40 } }}
            label=""
          />
        </label>
      </div>
    </div>
  );
}

export default CardInfo;
