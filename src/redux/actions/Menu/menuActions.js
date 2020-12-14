
import {LOAD_TOPPING,LOAD_MENU,LOAD_CATEGORY}  from '../actionTypes';
//Menu Actions
export const loadMenuAction=(token)=>{
    return{
        type: LOAD_MENU, 
        data:{token},
    }
}
//Topping Actions
export const loadAllToppingAction=(token)=>{
    return{
        type: LOAD_TOPPING, 
        data:{token},
    }
}
//Category Actions
export const loadAllCategoryAction=(token)=>{
    return{
        type: LOAD_CATEGORY, 
        data:{token},
    }
}