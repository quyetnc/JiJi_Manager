import {POST_LOGIN,RESET_LOGIN,LOAD_USER}  from '../actionTypes';
//Login Action
export const loginAction = (username, password) => {
    return {
        type: POST_LOGIN,
        data: { username, password }
    }
}

export const loadInformationUser=(token)=>{
    return{
        type: LOAD_USER, 
        data:{token},
    }
}

export const resetLoginAction = () => {
    return {
        type: RESET_LOGIN,
        data: null,
    };
};