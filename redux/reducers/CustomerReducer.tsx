// reducers/CustomerReducer.ts
import { Customer } from "../../models/customer.model";
import { EDIT_CUSTOMER } from "../actions/EditCustomer";

const initialState = {
  customer: {
    adult: 0,
    child: 0,
    baby: 0,
  } as Customer,
};

const CustomerReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case EDIT_CUSTOMER:
      return { ...state, customer: action.payload };
      
    default:
      return state;
  }
};

export default CustomerReducer;