import axios from 'axios';
import {BackendHost} from "../../util/BackendHost";
import {PaymentResponse} from "../payment/PaymentResponse";
import {PaymentDetails} from "../payment/PaymentDetails";

interface CreditCard {
    number: string;
    ownerName: string;
    expirationMonth: string;
    expirationYear: string;
    cvv: string;
}

interface PaymentDetailsPayload {
    studentNumber: string;
    price: number;
    creditCard: CreditCard;
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
            price: payment.price,
            creditCard: {
                number: cardNumber,
                ownerName: ownerName,
                expirationMonth: expirationDate.substr(0, 2),
                expirationYear: expirationDate.substr(2, 4),
                cvv: cvc
            }
        };
        return paymentPayload;
    };
}