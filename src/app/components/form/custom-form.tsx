import { useState } from "react";
export type TCustomForm={
  participant:string,
  handleForm:(e: React.FormEvent<HTMLFormElement>, participantId: string) => Promise<void>
}
export const CustomForm=({participant,handleForm}:TCustomForm)=>{
  const [hasChanged,setHasChanged]=useState(false)
  
    return (
        <form
        onSubmit={(e) => handleForm(e, participant)}
        key={participant}
        id={participant}
      ></form>
    )
}