import { EDIT_DATE } from "../actions/EditDate";

const initialState = {
    date: {
        checkInDate: null,
        checkOutDate: null,
    }
};

const DateReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case EDIT_DATE:
            return {
                ...state,
                date: {
                    ...state.date,
                    ...action.payload,
                },
            };

        default:
            return state;
    };
};

export default DateReducer;