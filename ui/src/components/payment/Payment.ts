
export class Payment {
    private _name: string;
    private _surName: string;
    private _studentNumber: number;
    private _dormitoryNumber: number;
    private _room: number;

    constructor(name: string, surName: string, studentNumber: number, dormitoryNumber: number, room: number) {
        this._name = name;
        this._surName = surName;
        this._studentNumber = studentNumber;
        this._dormitoryNumber = dormitoryNumber;
        this._room = room;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get surName(): string {
        return this._surName;
    }

    set surName(value: string) {
        this._surName = value;
    }

    get studentNumber(): number {
        return this._studentNumber;
    }

    set studentNumber(value: number) {
        this._studentNumber = value;
    }

    get dormitoryNumber(): number {
        return this._dormitoryNumber;
    }

    set dormitoryNumber(value: number) {
        this._dormitoryNumber = value;
    }

    get room(): number {
        return this._room;
    }

    set room(value: number) {
        this._room = value;
    }
}