import { SEE_DETAILS } from "./type";

export function seeDetailsApiSuccess(data){
    return {type:SEE_DETAILS , data}
}
export function seeDetailApiAction(data){
    return(dispatch)=>{
        dispatch(seeDetailsApiSuccess(data))
    }
}