import { Student } from '../model/Student';
import {StringUtils} from "../../util/StringUtils";

export class PaymentDetails {
    private _student: Student;
    private _dormitoryNumber: number;
    private _roomNumber: string;
    private _monthsCount: number;

    constructor(student: Student, dormitoryNumber: number, room: string, monthsCount: number) {
        this._student = student;
        this._dormitoryNumber = dormitoryNumber;
        this._roomNumber = room;
        this._monthsCount = monthsCount;
    }

    public static emptyData() {
        return new PaymentDetails(Student.emptyData(), null, null, null);
    }

    public emptyDataIfNull() {
        this._student.emptyDataIfNull();
        if (!this.dormitoryNumber) {
            this.dormitoryNumber = 0;
        }
        if (!this.monthsCount) {
            this.monthsCount = 0;
        }
        this.roomNumber = StringUtils.emptyIfNull(this._roomNumber);
    }

    public isDataFilled(): boolean {
        return this._student.isDataFilled()
            && this._dormitoryNumber != null
            && this._roomNumber != null
            && this._monthsCount != null
    }


    get student(): Student {
        return this._student;
    }

    set student(value: Student) {
        this._student = value;
    }

    get dormitoryNumber(): number {
        return this._dormitoryNumber;
    }

    set dormitoryNumber(value: number) {
        this._dormitoryNumber = value;
    }

    get roomNumber(): string {
        return this._roomNumber;
    }

    set roomNumber(value: string) {
        this._roomNumber = value;
    }

    get monthsCount(): number {
        return this._monthsCount;
    }

    set monthsCount(value: number) {
        this._monthsCount = value;
    }
}