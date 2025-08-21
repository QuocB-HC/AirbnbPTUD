import { Customer } from "../../models/customer.model";

export const EDIT_CUSTOMER = "EDIT_CUSTOMER";

export const EditCustomer = (customer: Customer) => {
  return {
    type: EDIT_CUSTOMER,
    payload: customer,
  };
};

export default EditCustomer;