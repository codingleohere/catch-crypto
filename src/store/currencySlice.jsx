import { createSlice } from '@reduxjs/toolkit';
import supportedCurrencies, { timeZoneToCurrency } from '../config/supportedCurrencies';

const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const currencyCode = timeZoneToCurrency[userTimeZone] || "USD";

const currencySlice = createSlice({
    name: 'currencySlice',
    initialState: {
        currency: currencyCode,
        currencySymbol: supportedCurrencies[currencyCode],
    },
    reducers: {
        updateCurrency(state, action) {
            state.currency = action.payload;
            state.currencySymbol = supportedCurrencies[state.currency]
        }
    }
})
export const curencyActions = currencySlice.actions

export default currencySlice; 