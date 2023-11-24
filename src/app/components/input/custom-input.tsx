import{useState,memo}from 'react';
import {TCustomInput} from './types/custom-input.type'

export const CustomInput=memo(function CustomInput({form,
    disabled,name,startValue}:TCustomInput){
const[value,setValue]=useState(startValue);
const handleInput=(e: React.ChangeEvent<HTMLInputElement>)=>{
    setValue(e.target.value.trim())
}
const cancellSending=(e: React.KeyboardEvent<HTMLInputElement>)=>e.key=="Enter"&&e.preventDefault()
    return(
        <input name={name}onChange={(e)=>handleInput(e)} value={value} onKeyDown={(e)=>cancellSending(e)} type="text" form={form} disabled={disabled}/>
    )
})