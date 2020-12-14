
import {LOAD_CART}  from '../actionTypes';
//Floor Action
export const loadCartAction=(token)=>{
    return{
        type: LOAD_CART, 
        data:{token},
    }
}
