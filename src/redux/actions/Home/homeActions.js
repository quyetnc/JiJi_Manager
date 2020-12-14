
import {LOAD_FLOOR,LOAD_ORDER,LOAD_TOTAL_MONEY_BY_TABLE}  from '../actionTypes';
//Floor Action
export const loadFloorAction=(token)=>{
    return{
        type: LOAD_FLOOR, 
        data:{token},
    }
}
//Load Order Action
export const loadOrderAction=(token)=>{
    return{
        type: LOAD_ORDER, 
        data:{token},
    }
}
//Load Order Action
export const loadTotalMoneyByTableAction=(token)=>{
    return{
        type: LOAD_TOTAL_MONEY_BY_TABLE, 
        data:{token},
    }
}
