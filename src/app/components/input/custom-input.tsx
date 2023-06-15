import{useState,memo}from 'react';
import {TCustomInput} from './types/custom-input.type'

export const CustomInput=memo(function CustomInput({form,
    disabled,name,startValue}:TCustomInput){
const[value,setValue]=useState(startValue);
const handleInput=(e: React.ChangeEvent<HTMLInputElement>)=>{
    setValue(e.target.value)
}
    return(
        <input name={name}onChange={(e)=>handleInput(e)} value={value} type="text" form={form} disabled={disabled}/>
    )
})