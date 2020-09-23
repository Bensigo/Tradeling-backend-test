import {customerModel} from "./model";
import {DaBase} from "../../base/da-base";


class Da extends DaBase {}
export const daCustomer: Da = new Da(customerModel);
