import { DateRange } from "../../models/date.model";

export const EDIT_DATE = "EDIT_DATE";

const EditDate = (date: DateRange) => {
    return {
        type: EDIT_DATE,
        payload: date,
    }
}

export default EditDate;