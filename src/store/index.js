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