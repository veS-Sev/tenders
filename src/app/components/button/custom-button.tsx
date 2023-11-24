import {memo} from 'react';

export type TCustomButton={
    disabled:boolean,type:"button" | "submit" | "reset" | undefined,form:string, text:string,onClick?:(e:any)=>void
}

export const CustomButton=memo(function CustomButton({disabled,type,form, text,onClick}:TCustomButton){

    return(
        <button disabled={disabled} type={type} form={form}
        onClick={onClick}>{text}</button>
    )
})