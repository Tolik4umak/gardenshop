import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchCategories = createAsyncThunk(
    'categoryes/fetchCategories',
    (_, {rejectWithValue}) => {
        return axios.get('https://dry-island-42334-f1f2e58883c2.herokuapp.com/categories/all')
                .then(res => {

                    const categories = res.data.map(item => (
                        {
                            ...item, 
                            image: `https://dry-island-42334-f1f2e58883c2.herokuapp.com/${item.image}`
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


