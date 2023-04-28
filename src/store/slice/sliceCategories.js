import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchCategories = createAsyncThunk(
    'categoryes/fetchCategories',
    // async (_, {rejectWithValue}) => {
    //     try{
    //         const resp = await fetch('http://localhost:3333/categories/all')
    //         if(!resp.ok){
    //             throw new Error('Server Error!')
    //         }

    //         const data = await resp.json()
    //         const clearData = data.map(item => (
    //             {
    //                 ...item, 
    //                 image: `http://localhost:3333/${item.image}`
    //             }
    //         ))
    //         return clearData

    //     }catch(error){
    //         return rejectWithValue(error)
    //     }
    // }
    (_, {rejectWithValue}) => {
        return axios.get('http://localhost:3333/categories/all')
                .then(res => {

                    const categories = res.data.map(item => (
                        {
                            ...item, 
                            image: `http://localhost:3333/${item.image}`
                        }
                    ))

                    return categories
                })
                .catch(error => {
                    return rejectWithValue('Server error!')
                })
       
    }
)


export const categoriesSlice = createSlice({
    name: "categories",
    initialState: {
        list:[],
        status: null,
        error: null,
    },
    reducers: {
      
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchCategories.fulfilled, (state, {payload}) => {
                state.status = 'resolve'
                state.list = payload
            })
            .addCase(fetchCategories.rejected, (state, {payload}) => {
                state.status = 'rejected'
                state.error = payload
                console.log(state.error);
            })
    }
})


export const {} = categoriesSlice.actions
export default categoriesSlice.reducer


