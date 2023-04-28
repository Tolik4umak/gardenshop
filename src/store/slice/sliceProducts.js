import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";




export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (_, {rejectWithValue}) => {
        
        try{
            const res = await fetch('http://localhost:3333/products/all')
            if(!res.ok){
                throw new Error('Server error!')
            }
            
            const data = await res.json()
            const clearData = data.map(item => (
                {
                    ...item, 
                    image: `http://localhost:3333/${item.image}`
                }
            ))
            return clearData

        }catch(error){
            return rejectWithValue(error.message)
        }
    }
)


const productsSlice = createSlice({
    name: 'products',
    initialState: {
        list: [],
        status: null,
        error: null
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchProducts.rejected, (state, {payload}) => {
                state.status = 'rejected'
                state.error = payload
            })
            .addCase(fetchProducts.fulfilled, (state ,{payload} ) => {
                state.status = 'resolve'
                state.list = payload
            })
    }
})



export const {} = productsSlice.actions 
export default productsSlice.reducer