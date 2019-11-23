

export class PaymentResponse {
    private _message: string;

    constructor(message: string) {
        this._message = message;
    }

    get message(): string {
        return this._message;
    }

    set message(value: string) {
        this._message = value;
    }
}