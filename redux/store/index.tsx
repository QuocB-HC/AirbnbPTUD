import { configureStore } from "@reduxjs/toolkit";
import DateReducer from "../reducers/DateReducer";
import CustomerReducer from "../reducers/CustomerReducer";

const store = configureStore({
    reducer: {
        DateReducer: DateReducer,
        CustomerReducer: CustomerReducer,
    }
});

export default store;