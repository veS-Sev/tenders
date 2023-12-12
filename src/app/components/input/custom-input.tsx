import{useState,memo, useEffect}from 'react';
import {TCustomInput} from './types/custom-input.type';
import {useAppDispatch } from "../../hooks";
import {offerIsChanging}from "../../features/tenders-table/store/offer-change.slice"

export const CustomInput=memo(function CustomInput({form,
    disabled,name,startValue}:TCustomInput){
const[value,setValue]=useState(startValue);
const dispatch=useAppDispatch();
useEffect(()=>{
if(Boolean(disabled)===true){
    setValue(startValue)
}},[disabled])

useEffect(()=>{
    if(value!==startValue){
        dispatch(offerIsChanging({hasChanged:true,offerForm:form}))}
},[value])
const handleInput=(e: React.ChangeEvent<HTMLInputElement>)=>{
    setValue(e.target.value.trim())

}
const cancellSending=(e: React.KeyboardEvent<HTMLInputElement>)=>e.key=="Enter"&&e.preventDefault()
    return(
        <input name={name}onChange={(e)=>handleInput(e)} value={value} onKeyDown={(e)=>cancellSending(e)} type="text" form={form} disabled={disabled}/>
    )
})