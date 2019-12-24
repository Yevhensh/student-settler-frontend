import axios from 'axios';
import {BackendHost} from "../../util/BackendHost";
import {PaymentResponse} from "../payment/PaymentResponse";
import {PaymentDetails} from "../payment/PaymentDetails";

interface PaymentDetailsPayload {
    studentNumber: string;
    cardNumber: string;
    ownerName: string;
    expirationDate: string;
    cvc: string;
}

export class PayService {

    private paymentEndpoint: string;

    constructor() { 
        this.paymentEndpoint = BackendHost.url + "/payment/pay";
    }

    public async payForDormitory(payment: PaymentDetails): Promise<PaymentResponse> {
        return axios.post<PaymentResponse>(this.paymentEndpoint, this.formPaymentPayload(payment))
            .then(res => res.data);
    }

    private formPaymentPayload = (payment: PaymentDetails) => {
        const {studentNumber, cardDetails} = payment;
        const {cardNumber, ownerName, expirationDate, cvc} = cardDetails;
        const paymentPayload: PaymentDetailsPayload = {
            studentNumber: studentNumber,
            cardNumber: cardNumber,
            ownerName: ownerName,
            expirationDate: expirationDate,
            cvc: cvc
        };
        return paymentPayload;
    };
}