import { EDIT_CUSTOMER } from "../actions/EditCustomer";

const initialState = {
    customer: {
        adult: 1,
        child: 0,
        baby: 0,
    }
};

const CustomerReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case EDIT_CUSTOMER:
            return {
                ...state,
                date: {
                    ...state.customer,
                    ...action.payload,
                },
            };

        default:
            return state;
    };
};

export default CustomerReducer;