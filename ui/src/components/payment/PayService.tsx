import {Payment} from "./Payment";
import axios from 'axios';
import {BackendHost} from "../../util/BackendHost";
import {PaymentResponse} from "./PaymentResponse";

export class PayService {
    private backendUrl: string;
    private paymentEndpoint: string;

    constructor() {
        const backendHost = new BackendHost();
        this.backendUrl = backendHost.getUrl();
        this.paymentEndpoint = this.backendUrl + "/payment/pay";
    }

    public async payForDormitory(payment: Payment): Promise<PaymentResponse> {
        return axios.post<PaymentResponse>(this.paymentEndpoint, payment).then(res => res.data);
    }
}