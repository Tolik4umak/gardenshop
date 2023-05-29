import { createSlice } from "@reduxjs/toolkit";

const basketSlice = createSlice({
    name: 'basket',
    initialState:{
        list: [],
        count: 0
    },
    reducers: {
        basketAddNewItem: (state, {payload}) => {
            const target = state.list.find(({id}) => id === payload)
            if(!target){
                state.list.push({id: payload, count: 1})
            }else target.count++     
        },
        basketIncrement: (state, {payload}) => {
            state.list.find(({id}) => id === payload).count++
        },
        basketDecrement: (state, {payload}) => {
            const target = state.list.find(({id}) => id === payload)
            
            if(--target.count === 0){
               state.list = state.list.filter(item => item !== target)
            }
        },
        basketRemove: (state, {payload}) => {
            state.list = state.list.filter(({id}) => id !== payload)
        },
        basketClear: (state ) => {
            state.list = []
        }
        

        
    }
})


export default basketSlice.reducer
export const {basketAddNewItem , basketIncrement, basketDecrement, basketRemove, basketClear} = basketSlice.actions

