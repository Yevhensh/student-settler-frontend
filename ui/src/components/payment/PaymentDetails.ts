import CardDetails from "./CardDetails";

export class PaymentDetails {

    private _studentNumber: string;
    private _price: number;
    private _cardDetails: CardDetails;

    constructor(studentNumber: string, price: number, cardDetails: CardDetails) {
        this._studentNumber = studentNumber;
        this._price = price;
        this._cardDetails = cardDetails;
    }

    get studentNumber(): string {
        return this._studentNumber;
    }

    set studentNumber(value: string) {
        this._studentNumber = value;
    }

    get price(): number {
        return this._price;
    }

    set price(value: number) {
        this._price = value;
    }

    get cardDetails(): CardDetails {
        return this._cardDetails;
    }

    set cardDetails(value: CardDetails) {
        this._cardDetails = value;
    }
}