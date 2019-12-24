import CardDetails from "./CardDetails";

export class PaymentDetails {

    private _studentNumber: string;
    private _cardDetails: CardDetails;

    constructor(studentNumber: string, cardDetails: CardDetails) {
        this._studentNumber = studentNumber;
        this._cardDetails = cardDetails;
    }

    get studentNumber(): string {
        return this._studentNumber;
    }

    set studentNumber(value: string) {
        this._studentNumber = value;
    }

    get cardDetails(): CardDetails {
        return this._cardDetails;
    }

    set cardDetails(value: CardDetails) {
        this._cardDetails = value;
    }
}