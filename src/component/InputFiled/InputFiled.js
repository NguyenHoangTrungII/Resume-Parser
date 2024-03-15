import React, { useState, useEffect } from "react";
import styles from "./InputFiled.module.scss";
import classNames from "classnames/bind";
import InputText from "../InputText/InputText";
import { Input, TextField } from "@mui/material";
import removeSpecialCharacters from "../../helpers/removeSpecialCharacters";

const cx = classNames.bind(styles);

function InputFiled({dataProfile, dataEducation, dataadditionInfoFiled, dataSkill}) {


  let result = dataSkill?.map(item => item[0].text).join(', ');

  return (
    <div class= {cx('formInput')}>
        <div className={cx('basicInfoField')}>
          <div className={cx('title-Section')}> 
          <label >BASIC INFOMATION</label>
          </div>
            <div className={cx("profile")}>
              <InputText label="Name" value={dataProfile?.name} />
              <InputText label="Mail" value={(dataProfile?.email)}/>
              <InputText label="Phone" value={(dataProfile?.phone)} />
              <InputText label="link" value={(dataProfile?.url)}/>
              <InputText label="location" value={(dataProfile?.location)} />
            </div>
            <div className={cx('title-Section')}>
            <label >EDUCATION</label>
            </div>
            <div className={cx("education")}>
              <InputText label="School" value={dataEducation?.school}  />
              <InputText label ="Degree" value={dataEducation?.degree}/>
            </div>
            <div className={cx('title-Section')}> 
             <label >SKILL</label>
            </div> 
            <div className={cx("skill")}>
              <TextField
                className={cx("textFiled")}
                label="Skill"
                multiline
                rows={4}
                variant="standard"
                value={result ? result : '' }
                sx={{
                  
                  width: '100%',
                  fontSize: '16px',
              }}              
              />
            </div>

            
        </div> 
        <div className={cx("additionInfoFiled")}>
            
        </div>           
    </div>


    
  );
}

export default InputFiled;
