import axios from 'axios';
import {PaymentDetails} from "./PaymentDetails";
import {BackendHost} from "../../util/BackendHost";
import {PaymentResponse} from "./PaymentResponse";

export class PayService {

    private paymentEndpoint: string;

    constructor() { 
        this.paymentEndpoint = BackendHost.url + "/payment/pay";
    }

    public async payForDormitory(payment: PaymentDetails): Promise<PaymentResponse> {
        return axios.post<PaymentResponse>(this.paymentEndpoint, payment).then(res => res.data);
    }
}