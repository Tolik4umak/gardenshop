// import { applyMiddleware, combineReducers, createStore } from "redux";
// import thunk from "redux-thunk";
// import { categoriesReducer } from "./reducers/categoriesReducer";
// import { productsReducer } from "./reducers/productsReducer";



// const rootReducer = combineReducers({
//     categories: categoriesReducer,
//     products: productsReducer  
// })

// export const store = createStore(rootReducer, applyMiddleware(thunk))



import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "./slice/sliceCategories";
import sliceProducts from "./slice/sliceProducts";
import sliceBasket from "./slice/sliceBasket";


export const store = configureStore({
    reducer: {
        categories: categoriesSlice,
        products: sliceProducts,
        basket: sliceBasket
    }
}) 