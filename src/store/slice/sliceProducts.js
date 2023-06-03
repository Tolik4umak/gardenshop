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
                        keyWords: true
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
        telStatus: false
    },
    reducers: {
        searchFilterByKeyWords: (state, {payload}) => {
            state.list.map(item => {
                if(item.title.toLowerCase().startsWith(payload.toLowerCase())){
                    item.show.keyWords = true
                }else{
                    item.show.keyWords = false
                }
            })
        },
        searchFilterByPrice: (state, {payload}) => {
            const {min, max} = payload
            state.list.map(item => {
                const finalPrice = item.discont_price || item.price
                if(min <= finalPrice && finalPrice <= max){
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
            if(payload === 'name'){   
                state.list.sort((a , b) => a.title < b.title ? -1 : 1)
            }
        },
        resetProductsFilters: (state) => {
            state.list.sort((a,b) => {
                a.show = {price: true, discont: true,  keyWords: true }
                b.show = {price: true, discont: true,  keyWords: true}
                return a.id - b.id
            })
        },
        applyDiscount: (state) => {
            state.list = state.list.map(({discont_price, ...item}) => ({
                ...item,
                discont_price: discont_price ? discont_price : +(item.price * 95 / 100).toFixed(2)
            }))
            state.telStatus = true
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



export const {
    searchFilterByPrice, 
    searchFilterByDiscount, 
    sortFilterProducts, 
    resetProductsFilters, 
    applyDiscount,
    searchFilterByKeyWords

} = productsSlice.actions 
export default productsSlice.reducer