import { DateRange } from "../../models/date.model";

export const EDIT_DATE = "EDIT_DATE";
export const EDIT_RANGE = "EDIT_RANGE";
export const EDIT_NIGHTS = "EDIT_NIGHTS";

export const EditDate = (date: DateRange) => {
    return {
        type: EDIT_DATE,
        payload: date,
    }
}

export const EditRange = (range: string | null) => {
    return {
        type: EDIT_RANGE,
        payload: range,
    }
}

export const EditNights = (nights: number) => {
    return {
        type: EDIT_NIGHTS,
        payload: nights,
    }
}