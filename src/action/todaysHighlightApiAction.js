import { TODAYS_HIGHLIGHT } from "./type";

export function todaysHighlightApiSuccess(data){
    return {type: TODAYS_HIGHLIGHT, data:data}
}
export function todaysHighlightApiAction(data){
    return(dispatch)=>{
        dispatch(todaysHighlightApiSuccess(data));
    }
}