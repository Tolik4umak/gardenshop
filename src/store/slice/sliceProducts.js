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
                    image: `http://localhost:3333/${item.image}`,
                    show: {
                        price: true,
                        discont: true,
                    }
                }
            ))
            
            console.log(clearData);

            return clearData

        }catch(error){
            return rejectWithValue(error.message)
        }
    }
)

const getFinalPrice = ({price, discont_price}) => {
    return discont_price || price
} 


const productsSlice = createSlice({
    name: 'products',
    initialState: {
        list: [],
        status: null,
        error: null,
    },
    reducers: {
        searchFilterByPrice: (state, {payload}) => {
            const {minFilterPrice, maxFilterPrice} = payload
            state.list.map(item => {
                const finalPrice = item.discont_price || item.price
                if(minFilterPrice <= finalPrice && maxFilterPrice >= finalPrice){
                    item.show.price = true
                }else{
                    item.show.price = false
                }
            })
        },
        searchFilterByDiscount: (state, {payload}) => {
            state.list.map(item => {
                if(payload){
                    item.show.discont = item.discont_price ? true : false
                }else{
                    item.show.discont = true
                }
            })
        },
        sortFilterProducts: (state, {payload}) => {
            if(payload === 'priceAscending'){
                state.list.sort((a , b) => getFinalPrice(a) - getFinalPrice(b) )
            }
            if(payload === 'priceDescending'){
                state.list.sort((a , b) => getFinalPrice(b) - getFinalPrice(a) )
            }
            if(payload === 'date'){   
                // state.list.sort((a , b) => new Date(a.updatedAt) - new Date(b.updatedAt) )
                state.list.sort((a , b) => a.categoryId - b.categoryId )
            }
        },
        resetProductsFilters: (state) => {
            state.list.sort((a,b) => {
                a.show = {price: true, discont: true}
                b.show = {price: true, discont: true}
                return a.id - b.id
            })
        }
        

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



export const {searchFilterByPrice, searchFilterByDiscount, sortFilterProducts, resetProductsFilters} = productsSlice.actions 
export default productsSlice.reducer