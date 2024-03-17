import React, { useState, useEffect } from "react";
import styles from "./InputFiled.module.scss";
import classNames from "classnames/bind";
import InputText from "../InputText/InputText";
import { Input, TextField } from "@mui/material";
import removeSpecialCharacters from "../../helpers/removeSpecialCharacters";
import CardInfo from "../CardInfo/CardInfo";

const cx = classNames.bind(styles);

function InputFiled({
  dataProfile,
  dataEducation,
  dataadditionInfoFiled,
  dataExperience = [],
  dataSkill,
}) {
  let result = dataSkill?.map((item) => item[0].text).join(", ");

  console.log(dataEducation);

  return (
    <div class={cx("formInput")}>
      <div className={cx("basicInfoField")}>
        <div className={cx("title-Section")}>
          <label>BASIC INFOMATION</label>
        </div>
        <div className={cx("profile")}>
          <InputText
            label="Name"
            value={dataProfile?.name}
            className={cx("inputText")}
          />
          <InputText
            label="Mail"
            value={dataProfile?.email}
            className={cx("inputText")}
          />
          <InputText label="Phone" value={dataProfile?.phone} />
          <InputText label="link" value={dataProfile?.url} />
          <InputText label="location" value={dataProfile?.location} />
        </div>
        <div className={cx("title-Section")}>
          <label>EDUCATION</label>
        </div>
        <div className={cx("education")}>
          <InputText label="School" value={dataEducation?.school} />
          <InputText label="Degree" value={dataEducation?.degree} />
        </div>
        <div className={cx("title-Section")}>
          <label>SKILL</label>
        </div>
        <div className={cx("skill")}>
          <TextField
            className={cx("textFiled")}
            multiline
            rows={4}
            variant="standard"
            value={result ? result : ""}
            sx={{
              width: "100%",
              fontSize: "16px",
            }}
            InputLabelProps={{ shrink: true }}
            label=""
          />
        </div>
        <div className={cx("title-Section")}>
          <label>PROJECT</label>
        </div>
        <div>
          <div>
            {!!dataExperience &&
              Object.values(dataExperience).map((data, index) => (
                <CardInfo
                  key={index}
                  data={data}
                  InputLabelProps={{ shrink: true }}
                />
              ))}
          </div>
        </div>
      </div>
      <div className={cx("additionInfoFiled")}></div>
    </div>
  );
}

export default InputFiled;
