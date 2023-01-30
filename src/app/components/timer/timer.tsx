import React, { useEffect } from "react";
import './timer.scss';
import { useState } from "react";
import { TTimerProps } from "../timer/types/index";
import { BsHourglassSplit } from "react-icons/bs";
// import {}


export const Timer=({hourRemaiming,minRemaiming,secRemaiming}:TTimerProps)=>{

  return(
    <div className="timer">
<div id="hourRemaiming">{String(hourRemaiming).padStart(2,'0')}:</div>
<div id="minRemaiming">{String(minRemaiming).padStart(2,'0')}:</div>
<div id="secRemaiming">{String(secRemaiming).padStart(2,'0')}</div>
<BsHourglassSplit />
    </div>
  )
}
