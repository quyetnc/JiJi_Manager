
import {ADD_CHAT,LOAD_CHAT}  from '../actionTypes';
//Floor Action
export const chatAction=(token)=>{
    return{
        type: ADD_CHAT, 
        data:{token},
    }
}
export const loadChatAction=(token)=>{
    return{
        type: LOAD_CHAT, 
        data:{token},
    }
}