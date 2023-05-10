import { createSlice } from "@reduxjs/toolkit";



const basketSlice = createSlice({
    name: 'basket',
    initialState:{
        list: []
    },
    reducers: {
        basketAddNewItem: (state, {payload}) => {
            const target = state.list.find(({id}) => id === payload)
            if(!target){
                state.list.push({id: payload, count: 1})
            }else target.count++   
        },
        
    }
})


export default basketSlice.reducer
export const {basketAddNewItem} = basketSlice.actions

