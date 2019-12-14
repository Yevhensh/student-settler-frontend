import {PaymentDetails} from "../PaymentDetails";
import Dormitory from "../../model/Dormitory";
import Room from "../../model/Room";

export interface PaymentState {
    paymentDetails: PaymentDetails,
    pricePerMonth: number,
    paymentResponseText: string,
    isSnackbarOpen: boolean,
    isStudentPresent: boolean,
    errorMessageIfStudentNotPresent: string,
    dormitories?: Dormitory[],
    rooms?: Room[],
    isFormFilled: boolean
}