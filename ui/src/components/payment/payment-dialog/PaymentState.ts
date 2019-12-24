import {StudentDetails} from "../StudentDetails";
import Dormitory from "../../model/Dormitory";
import Room from "../../model/Room";

export interface PaymentState {
    studentDetails: StudentDetails,
    pricePerMonth: number,
    paymentResponseText: string,
    isSnackbarOpen: boolean,
    isStudentPresent: boolean,
    errorMessageIfStudentNotPresent: string,
    dormitories?: Dormitory[],
    rooms?: Room[],
    isFormFilled: boolean
}