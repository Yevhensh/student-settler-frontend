import {PaymentDetails} from "../PaymentDetails";

export interface PaymentState {
    paymentDetails: PaymentDetails,
    price: number,
    paymentResponseText: string,
    isSnackbarOpen: boolean,
    isStudentPresent: boolean,
    errorMessageIfStudentNotPresent: string,
    isFormFilled: boolean
}