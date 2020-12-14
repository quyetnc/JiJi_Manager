
import {LOAD_PROFILE}  from '../actionTypes';
//Profile Actions
export const loadProfileAction=(token)=>{
    return{
        type: LOAD_PROFILE, 
        data:{token},
    }
}