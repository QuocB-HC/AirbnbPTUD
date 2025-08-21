import { EDIT_DATE, EDIT_NIGHTS, EDIT_RANGE } from "../actions/EditDate";

const initialState = {
  date: {
    checkInDate: null,
    checkOutDate: null,
  },
  range: null,
  nights: 0,
};

const DateReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case EDIT_DATE:
      return { ...state, date: action.payload };
    case EDIT_RANGE:
      return { ...state, range: action.payload };
    case EDIT_NIGHTS:
      return { ...state, nights: action.payload };
    default:
      return state;
  }
};

export default DateReducer;
