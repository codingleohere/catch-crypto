import { configureStore } from '@reduxjs/toolkit'
import currencySlice from './currencySlice';
const Store = configureStore({
    reducer: { currency: currencySlice.reducer }
})
export default Store;