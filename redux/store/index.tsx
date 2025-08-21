import { configureStore } from "@reduxjs/toolkit";
import DateReducer from "../reducers/DateReducer";
import CustomerReducer from "../reducers/CustomerReducer";

const store = configureStore({
    reducer: {
        DateReducer: DateReducer,
        customer: CustomerReducer,
    }
});

export default store;