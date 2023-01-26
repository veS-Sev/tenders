import React, { useEffect } from "react";
import './timer.scss';
import { useState } from "react";
import { TTimerProps } from "../timer/types/index";
import { FaBeer } from "react-icons/fa";
import counterSlice from "../../../features/counter/counterSlice";
import { useTimer } from "./hook/use-timer.hook";

export const Timer=({hour,min,sec}:TTimerProps)=>{
// const { timerHour,
//   timerMin,
//   timerSec}=useTimer({hour,min,sec})


  return(
    <div className=" timer orange">
<div id="hour">{hour}:</div>
<div id="min">{min}:</div>
<div id="sec">{sec}</div>
<FaBeer />
    </div>
  )
}

//For correctlyy rendering 
//may be use padSrart

// const getHours=(someHour:number)=>{
//   if(someHour<10){
//     return `0+${someHour}`
//   }
// return someHour
// }
// const getMin=(someMin:number)=>{
//   if(someMin>60){
//     return someMin-60
//   }
//   if(someMin<10){
//     return `0+${someMin}`
//   }
// return someMin
// }