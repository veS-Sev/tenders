import {memo} from 'react';

export type TCustomButton={
    disabled:boolean,type:"button" | "submit" | "reset" | undefined,form:string, text:string
}

export const CustomButton=memo(function CustomButton({disabled,type,form, text}:TCustomButton){

    return(
        <button disabled={disabled} type={type} form={form}>{text}</button>
    )
})