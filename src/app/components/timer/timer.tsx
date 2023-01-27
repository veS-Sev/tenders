import React, { useEffect } from "react";
import './timer.scss';
import { useState } from "react";
import { TTimerProps } from "../timer/types/index";
import { BsHourglassSplit } from "react-icons/bs";
// import {}


export const Timer=({hour,min,sec}:TTimerProps)=>{

  return(
    <div className="timer">
<div id="hour">{hour}:</div>
<div id="min">{min}:</div>
<div id="sec">{sec}</div>
<BsHourglassSplit />
    </div>
  )
}
